import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { DataFetching } from "../DataFetching";
import "../assets/styles.scss";
import Sidebar from "../components/sidebar";
import Cookies from "universal-cookie";

const cookies = new Cookies();

async function agregarProveedor(
  ruta,
  nombre,
  rif,
  telefono,
  direccion,
  correo
) {
  if (correo.length === 0 ){
    alert("Correo  Invalido");
    return;
  }
  if (!nombre || !rif || !telefono || !direccion || !correo) {
    alert("Todos los campos son obligatorios");
    return;
  }
  if (rif.length < 8 || rif.length > 11) {
    alert("RIF Invalida");
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
    (cliente) => cliente.cedula === rif
  );
  if (clienteExistente.length > 0) {
    alert("Este rif ya se encuentra registrado.");
    return;
  }
  
  await axios
    .post(ruta, {
      nombre: nombre,
      rif: rif,
      telefono: telefono,
      direccion: direccion,
      correo: correo,
    })
    .then((res) => console.log("posting data", res))
    .catch((err) => console.log(err));

  window.location.reload();
}

const editarCliente = async (id, nombre, rif, telefono, direccion, correo) => {
  if (correo.length === 0 ){
    alert("Correo  Invalido");
    return;
  }
  if (!nombre || !rif || !telefono || !direccion || !correo) {
    alert("Todos los campos son obligatorios");
    return;
  }
  if (rif.length < 8 || rif.length > 12) {
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
  if (telefono.length <= 10 || telefono.length >= 12) {
    alert("Telefono Invalida");
    return;
  }

  try {
    await axios.put(
      `https://sysprop-production.up.railway.app/proveedores/${id}`,
      {
        nombre: nombre,
        rif: rif,
        telefono: telefono,
        direccion: direccion,
        correo: correo,
      }
    );
  } catch (error) {
    console.log(error);
  }

  window.location.reload();
};

var editClienteId = -1;

const camposDataClientes = [
  {
    column: "ID",
  },
  {
    column: "Nombre",
  },
  {
    column: "RIF",
  },

  {
    column: "Telefono",
  },
  {
    column: "Direccion",
  },
  {
    column: "Correo",
  },
  {
    column: "Acciones",
  },
];

function Dashboard() {
  const itemProveedor = DataFetching(
    "https://sysprop-production.up.railway.app/proveedores"
  );
  const [show, setShow] = useState(false);

  const [rif, setRif] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Redireccion = () => {
    if (!cookies.get("id")) {
      window.location.href = "/login";
    }
  };

  /**********FILTRO DE BUSQUEDA**********/
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsuarios = itemProveedor.filter((user) => {
    const fullName = `${user.nombre}${user.rif}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  /****************************/

  var userIndex;

  function editarClick(id) {
    editClienteId = itemProveedor[id].id;
    userIndex = id;

    setNombre(itemProveedor[userIndex].nombre);
    setRif(itemProveedor[userIndex].rif);
    setTelefono(itemProveedor[userIndex].telefono);
    setDireccion(itemProveedor[userIndex].direccion);
    setCorreo(itemProveedor[userIndex].correo);

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
  const handleEditar = () => setAction(2);

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

  const validarRif = (event) => {
    const { value } = event.target;
    const regex = /^[0-9]*$/;
    if (regex.test(value) && value.length <= 12) {
      setRif(value);
    } else if (!value) {
      setRif("");
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

  /*****************CORREO*********************/
  const ValidarCorreo = (event) => {
    const { value } = event.target;
    const regex = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
    if (regex.test(value) && value.length <= 30) {
      setCorreo(value);
    } else if (!value) {
      setCorreo("");
    }
  };

  /******************************************/
  return (
    <div>
      <Sidebar />
      {/* <!--CUERPO--> */}
      <div id="cuerpo">
        <div className="row p-4">
          <h3>Buscar Proveedor</h3>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Buscar Proveedor..."
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
            Agregar Proveedor
          </button>
        </div>

        <div className="row m-4">
          <h3 className="mb-3">Proveedores Registrados</h3>
          <table id="tabla-proveedores" className="table">
            <thead>
              <tr>
                {camposDataClientes.map(({ column }) => (
                  <th>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios.map((itemProveedor, id) => (
                <tr key={id}>
                  <td
                    className={
                      itemProveedor.estado_activo ? "activo" : "desactivo"
                    }
                  >
                    {itemProveedor.id}
                  </td>
                  <td>{itemProveedor.nombre}</td>
                  <td>{itemProveedor.rif}</td>
                  <td>{itemProveedor.telefono}</td>
                  <td>{itemProveedor.direccion}</td>
                  <td>{itemProveedor.correo}</td>

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
                  required
                  value={nombre}
                  onChange={handleInputChange}
                  minLength={3}
                />
              </div>
              <div className="col-md-6">
                <label for="cedula" className="form-label">
                  RIF:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="rif"
                  defaultValue={action === 1 ? "" : rif}
                  value={rif}
                  onChange={validarRif}
                  required
                  // maxLength={8}
                  //minLength={8}
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
                  onChange={validarTelefono}
                  required
                />
              </div>
              <div className="col-md-6">
                <label for="correo" className="form-label">
                  Correo:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="correo"
                  defaultValue={action === 1 ? "" : correo}
                  onChange={ValidarCorreo}
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
                  onChange={ValidarDireccion}
                ></textarea>
              </div>
            </div>
            {/* <!--<button type="submit" className="btn btn-primary mt-3">Agregar</button>--> */}
            {action === 1 ? (
              <button
                id="agregar"
                type="button"
                onClick={() =>
                  agregarProveedor(
                    "https://sysprop-production.up.railway.app/proveedores",
                    nombre,
                    rif,
                    telefono,
                    direccion,
                    correo
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
                    editClienteId,
                    nombre,
                    rif,
                    telefono,
                    direccion,
                    correo
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

export default Dashboard;
