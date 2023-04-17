import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { DataFetching } from "../DataFetching";
import "../assets/styles.scss";
import Sidebar from "../components/sidebar";
import Cookies from "universal-cookie";

const cookies = new Cookies();

async function agregarCliente(ruta, nombre, cedula, telefono, direccion) {
  if (!nombre || !cedula || !telefono || !direccion) {
    alert("Todos los campos son obligatorios");
    return;
  }
  if (cedula.length < 8 || cedula.length > 12) {
    alert("Cedula Invalida");
    return;
  }
  if (nombre.length < 3 || nombre.length > 64) {
    alert("Nombre Invalido");
    return;
  }
  if (telefono.length <= 10 || telefono.length >= 12) {
    alert("Telefono Invalida");
    return;
  }
  const clientes = await axios.get(ruta);
  const clienteExistente = clientes.data.filter(
    (cliente) => cliente.cedula === cedula
  );
  if (clienteExistente.length > 0) {
    alert("Esta cedula ya se encuentra registrada.");
    return;
  }
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

const editarCliente = async (id, nombre, cedula, telefono, direccion) => {
  if (!nombre || !cedula || !telefono || !direccion) {
    alert("Todos los campos son obligatorios");
    return;
  }
  if (cedula.length < 8 || cedula.length > 12) {
    alert("Cedula Invalida");
    return;
  }
  if (nombre.length < 3 || nombre.length > 64) {
    alert("Nombre Invalido");
    return;
  }
  if (telefono.length <= 10 || telefono.length >= 12) {
    alert("Telefono Invalida");
    return;
  }
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
  } catch (error) {
    console.log(error);
  }

  window.location.reload();
};


function Clientes() {
  const itemCliente = DataFetching(
    "https://sysprop-production.up.railway.app/clientes"
  );
  const [show, setShow] = useState(false);

  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [clienteEdit, setClienteEdit] = useState(-1)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Redireccion = () => {
    if (!cookies.get("id")) {
      window.location.href = "/login";
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsuarios = itemCliente.filter((user) => {
    const fullName = `${user.nombre}${user.cedula}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  function editarClick(id) {
    const clientesActivos = filteredUsuarios.filter((itemCliente) => itemCliente.estado_activo)
    setClienteEdit(clientesActivos[id].id)

    setNombre(clientesActivos[id].nombre);
    setCedula(clientesActivos[id].cedula);
    setTelefono(clientesActivos[id].telefono);
    setDireccion(clientesActivos[id].direccion);

    handleEditar();
    handleShow();
  }

  function agregarClick() {
    handleAgregar();
    handleShow();
  }

  useEffect(() => {
    Redireccion();
  }, []);

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

  /*************VALIDAR NOMBRE*******************/

  const handleInputChange = (event) => {
    const { value } = event.target;
    const regex = /^[a-zñA-ZÑ\s]*$/;
    if (regex.test(value) && value.length <= 64) {
      setNombre(value);
    } else if (!value) {
      setNombre("");
    }
  };

  /******************************************/
  /*************VALIDAR CEDULA*******************/

  const validarCedula = (event) => {
    const { value } = event.target;
    const regex = /^[0-9]*$/;
    if (regex.test(value) && value.length <= 12) {
      setCedula(value);
    } else if (!value) {
      setCedula("");
    }
  };

  /******************************************/
  /*************VALIDAR TELEFONO*******************/

  const validarTelefono = (event) => {
    const { value } = event.target;
    const regex = /^[0-9]*$/;
    if (regex.test(value) && value.length <= 11) {
      setTelefono(value);
    } else if (!value) {
      setTelefono("");
    }
  };

  /******************************************/

  /*************VALIDAR DIRECCION**********/
  const ValidarDireccion = (event) => {
    const { value } = event.target;
    const regex = /^[a-zñA-ZÑ,.0-9()-\s]*$/;
    if (regex.test(value) && value.length <= 120) {
      setDireccion(value);
    } else if (!value) {
      setDireccion("");
    }
  };
  /******************************************/

  return (
    <div>
      <Sidebar />

      {/* <!--CUERPO--> */}
      <div id="cuerpo">
        <div className="row p-4">
          <h3>Buscar Cliente</h3>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Buscar Cliente..."
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
              {filteredUsuarios
                .filter((itemCliente) => itemCliente.estado_activo)
                .map((itemCliente, id) => (
                  <tr key={id}>
                    <td
                      className={
                        itemCliente.estado_activo ? "activo" : "desactivo"
                      }
                    >
                      {itemCliente.id}
                    </td>
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
                  defaultValue={action === 1 ? "" : nombre}
                  value={nombre}
                  required
                  //onChange={(event) => setNombre(event.target.value)}
                  onChange={handleInputChange}
                  readonly
                  minLength={3}
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
                  defaultValue={action === 1 ? "" : cedula}
                  value={cedula}
                  //onChange={(event) => setCedula(event.target.value)}
                  onChange={validarCedula}
                  required
                  minLength={7}
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
                  defaultValue={action === 1 ? "" : telefono}
                  value={telefono}
                  //onChange={(event) => setTelefono(event.target.value)}
                  onChange={validarTelefono}
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
                  defaultValue={action === 1 ? "" : direccion}
                  value={direccion}
                  //onChange={(event) => setDireccion(event.target.value)}
                  onChange={ValidarDireccion}
                  required
                ></textarea>
              </div>
            </div>
            {/* <!--<button type="submit" className="btn btn-primary mt-3">Agregar</button>--> */}
            {action === 1 ? (
              <button
                id="agregar"
                type="button"
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
                type="button"
                className="btn btn-success"
                onClick={() => {
                  editarCliente(
                    clienteEdit,
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
          </form>
          <button
            id="cerrar"
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={handleClose}
          >
            Cerrar
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Clientes;





































/********MMGVO PACHECO */












