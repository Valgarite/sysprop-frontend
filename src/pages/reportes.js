import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { DataFetching } from "../DataFetching";
import "../assets/styles.scss";
import Sidebar from "../components/sidebar";
import Cookies from "universal-cookie";
import { Link } from 'react-router-dom';
import {Button} from "reactstrap";

const cookies = new Cookies()


var editClienteId = -1;

function Reportes() {
  const itemCliente = DataFetching(
    "https://sysprop-production.up.railway.app/ventas"
  );
  const [show, setShow] = useState(false);

  const [fechaCreacion, setNombre] = useState("");
  const [total, setCedula] = useState("");
  const [idusuario, setTelefono] = useState("");
  const [idcliente, setDireccion] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Redireccion = () => {
    if(!cookies.get('id')){
      window.location.href="/login"
    }
  }

  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsuarios = itemCliente.filter((user) => {
    const fullName = `${user.idusuario.nombre}${user.total}${user.idcliente.nombre}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  var clienteIndex; // Variable para almacenar el ID del cliente que se modificará

  function editarClick(id) {
    editClienteId = itemCliente[id].id;
    clienteIndex = id;

    setNombre(itemCliente[clienteIndex].fechaCreacion);
    setCedula(itemCliente[clienteIndex].total);
    setTelefono(itemCliente[clienteIndex].idusuario);
    setDireccion(itemCliente[clienteIndex].idcliente);

    handleEditar();
    handleShow();
  }

  function agregarClick() {
    handleAgregar();
    handleShow();
  }

  useEffect(()=>{
    Redireccion()
  },[])

  const [action, setAction] = useState(1); // El estado 1 define que el Modal será utilizado para Agregar un cliente
  const handleAgregar = () => setAction(1);
  const handleEditar = () => setAction(2); // El estado 2 define que el Modal será utilizado para Modificar un cliente existente

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
    <Sidebar/>
    
      {/* <!--CUERPO--> */}
      <div id="cuerpo">
        <div className="row p-4">
          <h3>Buscar Venta</h3>
          <div className="col-6">
            <input  
              type="text"
              className="form-control"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Buscar Venta..."
            />
          </div>
          <div className="col-3"></div>
          {/* <!-- Botón para abrir la ventana pop-up --> */}
        </div>
        <div className="hijueputabton">
            <Link to = "/plantilla"><Button color="primary">Visualizar PDF</Button></Link>
            </div>

        <div className="row m-4">
          <h3 className="mb-3">Ventas Registradas</h3>
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
  .map((itemCliente, id) => (
    <tr key={id}>
      <td className={itemCliente.estado_activo ? "activo" : "desactivo"}>
        {itemCliente.id}
      </td>
      <td>{itemCliente.fechaCreacion}</td>
      <td>{itemCliente.total}</td>
      <td>{itemCliente.idusuario.nombre}</td>
      <td>{itemCliente.idcliente.nombre}</td>
      <td>
        <button
          className="btn btn-primary"
          onClick={function editClick() {
            editarClick(id);
          }}
          id="btnEditar"
        >
          Visualizar Venta
        </button>
      </td>
    </tr>
  ))}
            </tbody>
          </table>
        </div>
      </div>

      
    </div>
  );
}

export default Reportes;

