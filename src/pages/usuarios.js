import React, { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { DataFetching } from "../DataFetching";
import "../assets/styles.scss";
import Sidebar from "../components/sidebar";

async function agregarUsuario(ruta, nombre, cedula, fechaNacimiento, correo, username, password, cargo) {
  if (!nombre || !cedula || !correo || !username || !password) {
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
 
  if (username.length < 6 || username.length >= 12) {
    alert("Username Invalido");
    return;
  }
  if (password.length < 8 || password.length >= 17) {
    alert("Password Invalido");
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
  const user = await axios.get(ruta);
  const usernameExistente = clientes.data.filter(
    (user) => clientes.user === username
  );
  if (usernameExistente.length > 0) {
    alert("Esta nombre de usuario ya esta registrado.");
    return;
  }
  await axios
    .post(ruta, {
      nombre,
      cedula,
      fechaNacimiento,
      correo,
      username,
      password,
      cargo,
    })
    .then((res) => console.log("posting data", res))
    .catch((err) => console.log(err));

  window.location.reload();
}

const eliminarUsuario = async (id) => {
  if (window.confirm("¿Está seguro de que desea eliminar este usuario?")) {
    try {
      await axios.delete(
        `https://sysprop-production.up.railway.app/usuarios/${id}`
      );
    } catch (error) {
      console.log(error);
    }
  }

  window.location.reload();
};

const editarUsuario = async (id, nombre, cedula, fechaNacimiento, correo, username, password, cargo) => {
  if (!nombre || !cedula) {
    alert("Todos los campos son obligatorios");
    return;
  }
  if (cedula.length < 8 || cedula.length > 12) {
    alert("Cédula Inválida");
    return;
  }
  if (nombre.length < 3 || nombre.length > 64) {
    alert("Nombre Inválido");
    return;
  }
  try {
    await axios.put(
      `https://sysprop-production.up.railway.app/usuarios/${id}`,
      {
        nombre: nombre,
        cedula: cedula,
        fechaNacimiento: fechaNacimiento,
        correo: correo,
        username: username,
        password: password,
        cargo: cargo,
      }
    );
  } catch (error) {
    console.log(error);
  }

  window.location.reload();
};

var editUsuarioId;

function Usuarios() {
  const itemUsuario = DataFetching(
    "https://sysprop-production.up.railway.app/usuarios"
  );

  const [show, setShow] = useState(false);

  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [fechaNacimiento, setFechanacimiento] = useState("");
  const [correo, setCorreo] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cargo, setCargo] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsuarios = itemUsuario.filter((user) => {
    const fullName = `${user.nombre}${user.cedula}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  var userIndex; // Variable para almacenar el ID del Usuario que se modificará

  function editarClick(id) {
    editUsuarioId = itemUsuario[id].id;
    userIndex = id;

      setNombre(itemUsuario[userIndex].nombre);
      setCedula(itemUsuario[userIndex].cedula);
      setFechanacimiento(itemUsuario[userIndex].fechaNacimiento);
      setCorreo(itemUsuario[userIndex].correo);
      setUsername(itemUsuario[userIndex].username);
      setPassword(itemUsuario[userIndex].password);
      setCargo(itemUsuario[userIndex].cargo.nombre);
    
    handleEditar();
    handleShow();
  }

  function agregarClick() {
    handleAgregar();
    handleShow();
  }

  const [action, setAction] = useState(1); // El estado 1 define que el Modal será utilizado para Agregar un cliente
  const handleAgregar = () => setAction(1);
  const handleEditar = () => setAction(2); // El estado 2 define que el Modal será utilizado para Modificar un cliente existente

  const camposDataUsuarios = [
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
      column: "Correo",
    },
    {
      column: "Fecha Nacimiento",
    },
    {
      column: "Username",
    },
    {
      column: "Cargo",
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


  return (
    <>
    <Sidebar/>
    <div>
      {/* <!--CUERPO--> */}
      <div id="cuerpo">
        <div className="row p-4">
          <h3>Buscar Usuario</h3>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Buscar Usuario..."
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
            Agregar Usuario
          </button>
        </div>

        <div className="row m-4">
          <h3 className="mb-3">Usuarios</h3>
          <table id="tabla-clientes" className="table">
            <thead>
              <tr>
                {camposDataUsuarios.map(({ column }) => (
                  <th>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios.map((itemUsuario, id) => (
                <tr key={id}>
                  <td
                    className={
                      itemUsuario.estado_activo ? "activo" : "desactivo"
                    }
                  >
                    {itemUsuario.id}
                  </td>
                  <td>{itemUsuario.nombre}</td>
                  <td>{itemUsuario.cedula}</td>
                  <td>{itemUsuario.correo}</td>
                  <td>{itemUsuario.fechaNacimiento}</td>
                  <td>{itemUsuario.username}</td>
                  <td>{itemUsuario.cargo.nombre}</td>
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
                      onClick={() => eliminarUsuario(itemUsuario.id)}
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
            {action === 1 ? "Agregar  Usuario" : "Modificar Usuario"}
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
                  defaultValue={action === 1 ? null : nombre}
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
                  // maxLength={8}
                  minLength={8}
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
                  value={correo}
                onChange={(event) => setCorreo(event.target.value)}
                // onChange={validarTelefono}
                
                />
              </div>
              <div className="col-md-12">
                <label for="fechaNacimiento" className="form-label">
                  Fecha de nacimiento:
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="fechaNacimiento"
                  defaultValue={action === 1 ? "" : fechaNacimiento}
                  value={fechaNacimiento}
                  onChange={(event) => setFechanacimiento(event.target.value)}
                // onChange={ValidarDireccion}
                // required
                ></input>
              </div>
              <div className="col-md-12">
                <label for="Username" className="form-label">
                  Usuario:
                </label>
                <input
                type="text"
                  className="form-control"
                  id="username"
                  defaultValue={action === 1 ? "" : username}
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                // onChange={ValidarDireccion}
                // required
                ></input>
                <div className="col-md-12">
                  <label for="Password" className="form-label">
                    Password:
                  </label>
                  <input
                    className="form-control"
                    id="Password"
                    defaultValue={action === 1 ? "" : password}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  //onChange={ValidarDireccion}
                    required
                  ></input>
                </div>
              </div>
              <div>
                <input
                  type="radio"
                  id="Empleado"
                  value="Empleado"
                  checked={cargo === 'Empleado'}
                  onChange={event => setCargo(event.target.value)}
                  name="btnEmpleado"
                />
                <label>Empleado</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="Admin"
                  name="btnAdministrador"
                  value="Administrador"
                  checked={cargo === 'Administrador'}
                  onChange={event => setCargo(event.target.value)}
                ></input>
                <label>Admin</label>
              </div> 
              </div>
          {/* Operación Ternaria para definir el botón de Acción del Modal (Agregar o Modificar) */}
          {action === 1 ? (
            <button
              id="agregar"
              type="button"
              onClick={() =>
                agregarUsuario(
                  "https://sysprop-production.up.railway.app/usuarios",
                  nombre,
                  cedula,
                  fechaNacimiento,
                  correo,
                  username,
                  password,
                  cargo.nombre
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
                editarUsuario
              (
                  editUsuarioId,
                  nombre,
                  cedula,
                  fechaNacimiento,
                  correo,
                  username,
                  password,
                  cargo.nombre,
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
    </div >
    </>
  );
}

export default Usuarios;
