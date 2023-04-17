import React, { useState, useEffect } from "react";
import { DataFetching } from "../DataFetching";
import "../assets/styles.scss";
import Sidebar from "../components/sidebar";
import Cookies from "universal-cookie";
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table, Button, Modal, ModalHeader, ModalBody, ModalFooter
} from "reactstrap";

const cookies = new Cookies()

function Reportescompras() {
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const itemCliente = DataFetching(
    "https://sysprop-production.up.railway.app/compras"
  );

  const Redireccion = () => {
    if (!cookies.get('id')) {
      window.location.href = "/login"
    }
  }

  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsuarios = itemCliente.filter((user) => {
    const fullName = `${user.idusuario.nombre}${user.total}${user.idproveedor.nombre}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleModal = (idVenta) => {
    setShowModal(true);
    fetchData(idVenta);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }

  const fetchData = async (id) => {
    try {   
      const response = await fetch(
        `https://sysprop-production.up.railway.app/compras/detalles/${id}`
      );
      const data = await response.json();
      setModalData(data);
      const preciosUsados = data.preciosUsados.split("-");
      setModalData({ ...data, preciosUsados })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Redireccion()
  }, [])

  const camposDataClientes = [
    {
      column: "ID",
    },
    {
      column: "Fecha",
    },
    {
      column: "Total",
    },
    {
      column: "Usuario",
    },
    {
      column: "Cliente",
    },
    {
      column: "Acciones",
    },
  ];


  return (
    <div>
      <Sidebar />

      {/* <!--CUERPO--> */}
      <div id="cuerpo">
        <div className="row p-4">
          <h3>Buscar Compra</h3>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Buscar Compra..."
            />
          </div>
          <div className="col-3"></div>
          {/* <!-- Botón para abrir la ventana pop-up --> */}
        </div>
        <div className="hijueputabton">
          <Link to="/plantillacompra"><Button color="primary">Visualizar PDF</Button></Link>
        </div>

        <div className="row m-4">
          <h3 className="mb-3">Compras Registradas</h3>
          <table id="tabla-clientes" className="table">
            <thead>
              <tr>
                {camposDataClientes.map(({ column }) => (
                  <th>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios
                .reverse().map((itemCliente, id) => (
                  <tr key={id}>
                    <td className={itemCliente.estado_activo ? "activo" : "desactivo"}>
                      {itemCliente.id}
                    </td>
                    <td>{formatDate(itemCliente.fechaCreacion)}</td>
                    <td>{"Bs. " + itemCliente.total}</td>
                    <td>{itemCliente.idusuario.nombre}</td>
                    <td>{itemCliente.idproveedor.nombre}</td>
                    <td>
                      <button
                        className="btn btn-success"
                        id="btnEditar"

                        onClick={() => handleModal(itemCliente.id)}
                      >
                        Visualizar Compra
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>


        </div>
      </div>

     

      <Modal className="Modal-SeleccionarCliente" isOpen={showModal} toggle={() => setShowModal(false)}>
        <ModalHeader toggle={() => setShowModal(false)}>Detalles de la Compra</ModalHeader>
        <ModalBody>
       
          <Card className="detalle-venta">
            <CardHeader style={{ backgroundColor: "#4e73df", color: "white" }}>Detalles</CardHeader>
            <CardBody>
              <Row>
                <Col sm={12}>
                  <Table size="sm">

                    <tbody>
                      <tr>
                      </tr>
                      <tr>
                        <td>Fecha y hora:</td>
                        <td>{modalData ? modalData.fecha : ""}</td>
                      </tr>
                      <tr>
                        <td>Nombre del Cliente:</td>
                        <td>{modalData ? modalData.nombreProveedor : ""}</td>
                      </tr>
                      <tr>
                        <td>Nombre del Usuario:</td>
                        <td>{modalData ? modalData.nombreUsuario : ""}</td>
                      </tr>
                      <tr>
                        <td>Articulos Usados:</td>
                        <td>{modalData ? modalData.nombresRegistro.join(" | ") : ","}</td>
                      </tr>
                      <tr>
                        <td>Precios Usados:</td>
                        <td>{modalData ? modalData.preciosUsados.join(" | ") : ","}</td>
                      </tr>
                      <tr>
                        <td>Total:</td>
                        <td>{modalData ? "Bs. " + modalData.total : "Bs"}</td>
                      </tr>
                      <tr>

                      </tr>
                    </tbody>

                  </Table>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setShowModal(false)}>Cerrar</Button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default Reportescompras;