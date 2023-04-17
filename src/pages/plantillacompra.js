import React, { useState, useEffect } from "react";
import { DataFetching } from "../DataFetching";
import "../assets/styles.scss";
import jsPDF from 'jspdf';
import image from '../assets/images/logo-gelato.png';
import "../assets/imagenlogo.css";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function Plantillacompra() {
    const itemCliente = DataFetching(
        "https://sysprop-production.up.railway.app/compras"
    );

    const [searchQuery] = useState("");

    const filteredUsuarios = itemCliente.filter((user) => {
        const fullName = `${user.nombre}${user.rif}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
    });

    const camposDataClientes = [
        {
            column: "ID",
        },
        {
            column: "Fecha de creacion",
        },
        {
            column: "Total",
        },
        {
            column: "Usuario",
        },
        {
            column: "Proveedor",
        },

    ];

    const Redireccion = () => {
        if (!cookies.get('id')) {
            window.location.href = "/login"
        }
    }

    useEffect(() => {
        Redireccion()
    }, [])

    /*************VALIDAR NOMBRE*******************/


    function generatePDF() {
        const codeSection = document.getElementById('cuerpo');
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'pt',
            format: [1700, 2200], // establecer tamaño de la página aquí
            compress: true,
            lineHeight: 1.5,
            fontSize: 10,
            putOnlyUsedFonts: true,
            floatPrecision: 2
        }); // configuración del documento PDF
        doc.text('Este es un texto de ejemplo', 20, 20);
        doc.html(codeSection, {

            callback: function (doc) {
                // Obtener los datos del PDF como una cadena de datos
                const pdfData = doc.output('datauristring');

                // Abrir una nueva ventana del navegador con los datos del PDF
                const newWindow = window.open();
                newWindow.document.write('<iframe width="100%" height="100%" src="' + pdfData + '"></iframe>');
            }
        });
    }


    return (
        <div>

            {/* <!--CUERPO--> */}
            <div id="cuerpo">
                <div className="row p-4">
                    <div className="imagenbonitaparaformulario">
                        <img src={image} alt="user-login" /* style={{ maxWidth: '100px', }} */ />
                    </div>
                    <h3>SysProp Gelato</h3>
                    <h5>Heladería GelatoEfrutta</h5>
                    <p>Av. Guajira, Maracaibo</p>
                    <p>Proteccion de Copyright ©</p>
                    <div className="col-3"></div>
                    {/* <!-- Botón para abrir la ventana pop-up --> */}
                </div>
                <hr />
                <div className="row m-4" id="supertabla">
                    <h3 className="mb-3">Compras registradas</h3>
                    <table id="tabla-clientes" className="table">
                        <thead>
                            <tr>
                                {camposDataClientes.map(({ column }) => (
                                    <th>{column}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsuarios.map((itemCliente, id) => (
                                <tr key={id}>
                                    <td
                                    >
                                        {itemCliente.id}
                                    </td>
                                    <td>{itemCliente.fechaCreacion}</td>
                                    <td>{itemCliente.total}</td>
                                    <td>{itemCliente.idusuario.nombre}</td>
                                    <td>{itemCliente.idproveedor.nombre}</td>
                                    <td>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
            <button onClick={generatePDF} className="btn btn-success" id="botonplantilla">Descargar PDF</button>
        </div>
    );
}

export default Plantillacompra;
