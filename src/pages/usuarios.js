import React, { useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { DataFetching } from "../DataFetching";
import "../assets/styles.scss";


function agregarUsuario(ruta, nombre, cantidad, precio, correo) {
  console.log("1");
  axios
    .post(ruta, {
      nombre: nombre,
      cantidad: cantidad,
      precio: precio,
      correo: correo,
    })
    .then((res) => console.log("posting data", res))
    .catch((err) => console.log(err));
}

function eliminarUsuario() {}
function editarUsuario() {}

function Usuarios() {
  
  const itemUsuario = DataFetching("/Usuarios");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      {/* <!--CUERPO--> */}
      <div id="cuerpo">
        <div className="m-4 row">
          <h3>Usuarios</h3>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
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
            onClick={handleShow}
          >
            Agregar Usuario
          </button>
        </div>

        <div className="row m-4">
          <h3 className="mb-3">Usuarios</h3>
          <table id="tabla-inventario" className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Cedula</th>
                <th>Fecha de Nacimiento</th>
                <th>Correo</th>
                <th>Username</th>
                <th>Contraseña</th>
                <th>Cargo</th>
              </tr>
            </thead>
            <tbody>
              {itemUsuario.map((itemUsuario, id) => (
                <tr key={id}>
                  <td>{itemUsuario.id}</td>
                  <td>{itemUsuario.nombre}</td>
                  <td>{itemUsuario.cedula}</td>
                  <td>{itemUsuario.fdn}</td>
                  <td>{itemUsuario.correo}</td>
                  <td>{itemUsuario.username}</td>
                  <td>{itemUsuario.contraseña}</td>
                  <td>{itemUsuario.cargo}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={eliminarUsuario(itemUsuario.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={editarUsuario(itemUsuario.id)}
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
          <Modal.Title>Modal heading</Modal.Title>
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
                  required
                />
              </div>
              <div className="col-md-6">
                <label for="cantidad" className="form-label">
                  Cedula:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="apellido"
                  required
                />
              </div>
              <div className="col-md-6">
                <label for="fdn" className="form-label">
                  Fecha de Nacimiento:
                </label>
                <input type="text" className="form-control" id="fdn" required />
              </div>
              <div className="col-md-6">
                <label for="correo" className="form-label">
                  Correo:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="correo"
                  required
                />
              </div>
              <div className="col-md-6">
                <label for="username" className="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  required
                />
              </div>
              <div className="col-md-6">
                <label for="contraseña" className="form-label">
                  Contraseña:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="contraseña"
                  required
                />
              </div>
              <div className="col-md-6">
                <label for="cargo" className="form-label">
                  Cargo:
                </label>
                <div>
                  <input
                    type="radio"
                    id="empleado"
                    name="drone"
                    value="empleado"
                    checked
                  ></input>
                  <label for="empleado">Empleado</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="gerente"
                    name="drone"
                    value="gerente"
                    checked
                  ></input>
                  <label for="gerente">Gerente</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="administrador"
                    name="drone"
                    value="admnistrador"
                    checked
                  ></input>
                  <label for="gerente">Administrador</label>
                </div>
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
          >
            Cerrar
          </button>
          <button
            type="button"
            onClick={agregarUsuario("/Usuario")}
            className="btn btn-primary"
          >
            Guardar cambios
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Usuarios;
