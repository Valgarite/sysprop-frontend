import React, { useState } from 'react';
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import { DataFetching } from '../DataFetching';
import '../assets/styles.scss'

function agregarCliente(ruta, nombre, apellido, cedula, telefono, direccion){
  console.log("1");
  axios.post(ruta, {
    "nombre": nombre,
    "apellido": apellido, 
    "cedula": cedula,
    "telefono": telefono, 
    "direccion": direccion
  }).then(res=>console.log('posting data', res)).catch(err=>console.log(err))
}

function eliminarCliente(){

}
function editarCliente(){

}

function Dashboard() {
  const itemCliente = DataFetching("/clientes")
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>

    {/* <!--CUERPO--> */}
    <div id="cuerpo">
      <div className="m-4 row">
        <h3>Buscar Proveedor</h3>
        <div className="col-6">
          <input
            type="text"
            className="form-control"
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
          onClick={handleShow}
        >
          Agregar Proveedor
        </button>
      </div>

      <div className="row m-4">
        <h3 className="mb-3">Clientes Registrados</h3>
        <table id="tabla-clientes" className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Cédula</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
          {itemCliente.map((itemCliente, id) => (
            <tr key={id}>
              <td>{itemCliente.id}</td>
              <td>{itemCliente.nombre}</td>
              <td>{itemCliente.apellido}</td>
              <td>{itemCliente.cedula}</td>
              <td>{itemCliente.telefono}</td>
              <td>{itemCliente.direccion}</td>
              <td>
                <button className="btn btn-danger" onClick={eliminarCliente(itemCliente.id)}>Eliminar</button>
                <button className="btn btn-warning" onClick={editarCliente(itemCliente.id)}>Editar</button>
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
        <Modal.Body><form>
              <div className="row g-3">
                <div className="col-md-6">
                  <label for="nombre" className="form-label">Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label for="apellido" className="form-label">Apellido:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellido"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label for="cedula" className="form-label">Cédula:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cedula"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label for="telefono" className="form-label">Teléfono:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="telefono"
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label for="direccion" className="form-label">Dirección:</label>
                  <textarea
                    className="form-control"
                    id="direccion"
                    required
                  ></textarea>
                </div>
              </div>
              {/* <!--<button type="submit" className="btn btn-primary mt-3">Agregar</button>--> */}
            </form></Modal.Body>
        <Modal.Footer>
        <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button type="button" onClick= {agregarCliente("/clientes")} className="btn btn-primary">
              Guardar cambios
            </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Dashboard