import React, { useState , useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { DataFetching, DataPost } from "../DataFetching";
import "../assets/styles.scss";
import Sidebar from "../components/sidebar";
import Cookies from "universal-cookie";

const cookies = new Cookies()

async function agregarCliente(ruta, nombre, cedula, telefono, direccion) {
  await axios
    .post(ruta, {
      nombre: nombre,
      cedula: cedula,
      telefono: telefono,
      direccion: direccion,
    })
    .then((res) => console.log("posting data", res))
    .catch((err) => console.log(err));
  window.location.reload();
}

const eliminarCliente = async (id) => {
  if (window.confirm("¿Está seguro de que desea eliminar este Cliente?")) {
    try {
      await axios.delete(
        `https://sysprop-production.up.railway.app/clientes/${id}`
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
};

const editarCliente = async (id, nombre, cedula, telefono, direccion) => {
  try {
    await axios.put(
      `https://sysprop-production.up.railway.app/clientes/${id}`,
      {
        nombre: nombre,
        cedula: cedula,
        telefono: telefono,
        direccion: direccion,
      }
    );
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

var editClienteId = -1;

function Clientes() {
  const itemCliente = DataFetching(
    "https://sysprop-production.up.railway.app/clientes"
  );
  const [show, setShow] = useState(false);

  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Redireccion = () => {
    if(!cookies.get('id')){
      window.location.href="/login"
    }
  }

  var clienteIndex;   // Variable para almacenar el ID del cliente que se modificará

  function editarClick(id) {
    editClienteId = itemCliente[id].id;
    clienteIndex = id;
    
    setNombre(itemCliente[clienteIndex].nombre);
    setCedula(itemCliente[clienteIndex].cedula);
    setTelefono(itemCliente[clienteIndex].telefono);
    setDireccion(itemCliente[clienteIndex].direccion);
    
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
      column: "Nombre",
    },
    {
      column: "Cédula",
    },
    {
      column: "Teléfono",
    },
    {
      column: "Dirección",
    },
    {
      column: "Acciones",
    },
  ];

  return (
    <>
    <Sidebar/>
    <div>
      {/* <!--CUERPO--> */}
      <div id="cuerpo">
        <div className="row p-4">
          <h3>Buscar Cliente</h3>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar cliente..."
            />
          </div>
          <div className="col-3"></div>
          {/* <!-- Botón para abrir la ventana pop-up --> */}
          <button
            type="button"
            className="btn btn-primary col-2"
            data-bs-toggle="modal"
            data-bs-target="#mi-modal"
            onClick={agregarClick}
          >
            Agregar Cliente
          </button>
        </div>

        <div className="row m-4">
          <h3 className="mb-3">Clientes Registrados</h3>
          <table id="tabla-clientes" className="table">
            <thead>
              <tr>
                {camposDataClientes.map(({ column }) => (
                  <th>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {itemCliente.map((itemCliente, id) => (
                <tr key={id}>
                  <td>{itemCliente.id}</td>
                  <td>{itemCliente.nombre}</td>
                  <td>{itemCliente.cedula}</td>
                  <td>{itemCliente.telefono}</td>
                  <td>{itemCliente.direccion}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={function editClick() {
                        editarClick(id);
                      }}
                      id="btnEditar"
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => eliminarCliente(itemCliente.id)}
                      type="submit"
                      id="btnEliminar"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {action === 1 ? "Agregar cliente" : "Modificar cliente"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row g-3">
              <div className="col-md-6">
                <label for="nombre" className="form-label">
                  Nombre:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  defaultValue={
                    action === 1 ? null : nombre
                  }
                  required
                  onChange={(event) => setNombre(event.target.value)}
                />
              </div>
              <div className="col-md-6">
                <label for="cedula" className="form-label">
                  Cédula:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cedula"
                  defaultValue={
                    action === 1 ? "" : cedula
                  }
                  onChange={(event) => setCedula(event.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label for="telefono" className="form-label">
                  Teléfono:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="telefono"
                  defaultValue={
                    action === 1 ? "" : telefono
                  }
                  onChange={(event) => setTelefono(event.target.value)}
                  required
                />
              </div>
              <div className="col-md-12">
                <label for="direccion" className="form-label">
                  Dirección:
                </label>
                <textarea
                  className="form-control"
                  id="direccion"
                  defaultValue={
                    action === 1 ? "" : direccion
                  }
                  onChange={(event) => setDireccion(event.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            {/* <!--<button type="submit" className="btn btn-primary mt-3">Agregar</button>--> */}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={handleClose}
          >
            Cerrar
          </button>
          {action === 1 ? (
            <button
              type="submit"
              onClick={() =>
                agregarCliente(
                  "https://sysprop-production.up.railway.app/clientes",
                  nombre,
                  cedula,
                  telefono,
                  direccion
                )
              }
              className="btn btn-primary"
            >
              Agregar
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-success"
              onClick={() => {
                editarCliente(
                  editClienteId,
                  nombre,
                  cedula,
                  telefono,
                  direccion
                );
              }}
            >
              Guardar cambios
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
}

export default Clientes;
