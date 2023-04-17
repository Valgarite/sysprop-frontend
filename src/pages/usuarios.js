import React, { useState , useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { DataFetching } from "../DataFetching";
import "../assets/styles.scss";
import Sidebar from "../components/sidebar";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

async function agregarUsuario(ruta, nombre, cedula, fechaNacimiento, correo, username, password, cargo) {
  if (!nombre || !cedula || !correo || !username || !password) {
    alert("Todos los campos son obligatorios");
    return;
  }
  if (cedula.length < 7 || cedula.length > 12) {
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
  const usernameExistente = clientes.data.filter(
    () => clientes.user === username
  );
  if (usernameExistente.length > 0) {
    alert("Esta nombre de usuario ya esta registrado.");
    return
  }
  if(!cargo){
    alert("Debe seleccionar un cargo")
    return
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
      .then(window.location.reload())
      .catch((err) => {
        console.log(err);
        alert(`Error al registrar: ${err}`);
      });
  
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
    window.location.reload();
  }
};

const editarUsuario = async (id, nombre, cedula, fechaNacimiento, correo, username, password, cargoNombre) => {
  if (!nombre || !cedula) {
    alert("Todos los campos son obligatorios");
    return;
  }
  if (cedula.length < 7 || cedula.length > 9) {
    alert("Cédula Inválida: Debe contener una longitud entre 7 y 9 dígitos");
    return;
  }
  if (nombre.length < 3 || nombre.length > 64) {
    alert("Nombre Inválido");
    return;
  }
  if ( (cargoNombre !== "Administrador") && (cargoNombre !== "Empleado") ){
    alert("No se ha seleccionado un cargo válido");
    return
  }
  try {
    await axios.put(
      `https://sysprop-production.up.railway.app/usuarios/${id}`,
      {
        id,
        nombre,
        cedula,
        fechaNacimiento,
        correo,
        username,
        password,
        cargoNombre
      }
    );
  } catch (error) {
    console.log("Error al registrar usuario:", error);
    alert(`Ocurrió un error al registrar usuario. ${error.response.data.message}`);
  }

  window.location.reload();
};


function Usuarios() {
  const itemUsuario = DataFetching(
    "https://sysprop-production.up.railway.app/usuarios"
  );

  const [show, setShow] = useState(false);

  const [idUsuario, setidUsuario] = useState();
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [fechaNacimiento, setFechanacimiento] = useState("");
  const [correo, setCorreo] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cargo, setCargo] = useState([]);
  const [idCargo, setIdCargo] = useState();

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

  function editarClick(id) {
    setidUsuario(itemUsuario[id].id);
    setNombre(itemUsuario[id].nombre);
    setCedula(itemUsuario[id].cedula);
    setFechanacimiento(itemUsuario[id].fechaNacimiento);
    setCorreo(itemUsuario[id].correo);
    setUsername(itemUsuario[id].username);
    setPassword(itemUsuario[id].password);
    setCargo(itemUsuario[id].cargo.nombre);

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

  const Redireccion = () => {
    if(!cookies.get('id')){
      window.location.href="/login"
    }
  }

  useEffect(()=>{
    Redireccion()
  },[])

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

  /*************VALIDAR TELEFONO*******************/


  return (
    <>
      <Sidebar />
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
                      {itemUsuario.cargo.id !== 3 && (
                        <button
                          className="btn btn-warning"
                          onClick={function editClick() {
                            editarClick(id);
                          }}
                          id="btnEditar"
                        >
                          Editar
                        </button>
                      )}

                      {itemUsuario.estado_activo === true &&
                      itemUsuario.cargo.id !== 3 ? (
                        <button
                          className="btn btn-danger"
                          onClick={() => eliminarUsuario(itemUsuario.id)}
                          type="submit"
                          id="btnEliminar"
                        >
                          Inhabilitar
                        </button>
                      ) : (
                        itemUsuario.cargo.id !== 3 && (
                          <button
                            className="btn btn-success"
                            onClick={() => eliminarUsuario(itemUsuario.id)}
                            type="submit"
                            id="btnEliminar"
                          >
                            Habilitar
                          </button>
                        )
                      )}
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
                    defaultValue={action === 1 ? "" : nombre}
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
                    type="email"
                    className="form-control"
                    id="correo"
                    defaultValue={action === 1 ? "" : correo}
                    onChange={(event) => setCorreo(event.target.value)}
                    required
                    // onChange={validarTelefono}
                  />
                </div>
                <div className="col-md-12">
                  <label for="fechaNacimiento" className="form-label">
                    Fecha de nacimiento:
                  </label>
                  <input
                    className="form-control"
                    id="exampleDate"
                    name="date"
                    defaultValue={action === 1 ? "" : fechaNacimiento}
                    onChange={(event) => setFechanacimiento(event.target.value)}
                    min="1941-01-01"
                    max="2004-12-31"
                    type="date"
                    placeholderText="dd/MM/yyyy"
                    required
                  />
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
                    onChange={(event) => setUsername(event.target.value)}
                  ></input>
                  <div className="col-md-12">
                    <label for="Password" className="form-label">
                      Password:
                    </label>
                    <input
                      className="form-control"
                      id="Password"
                      type="password"
                      defaultValue={action === 1 ? "" : password}
                      onChange={(event) => setPassword(event.target.value)}
                      required
                    ></input>
                  </div>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Empleado"
                    value="Empleado"
                    checked={cargo === "Empleado"}
                    onChange={(event) => {
                      setCargo(event.target.value);
                      setIdCargo(1);
                    }}
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
                    checked={cargo === "Administrador"}
                    onChange={(event) => {
                      setCargo(event.target.value);
                      setIdCargo(2);
                    }}
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
                      idCargo
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
                    editarUsuario(
                      idUsuario,
                      nombre,
                      cedula,
                      fechaNacimiento,
                      correo,
                      username,
                      password,
                      cargo
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
    </>
  );
}

export default Usuarios;
