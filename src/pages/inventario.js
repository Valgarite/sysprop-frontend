import React, { useState } from 'react';
import axios from 'axios'
import Modal from 'react-bootstrap/Modal';
import { DataFetching } from '../DataFetching';
import '../assets/styles.scss'

function agregarArticulo(ruta, nombre, cantidad, precio, categoria){
  console.log("1");
  axios.post(ruta, {
    "nombre": nombre,
    "cantidad": cantidad, 
    "precio": precio,
    "categoria": categoria
  }).then(res=>console.log('posting data', res)).catch(err=>console.log(err))
}

function eliminarArticulo(){

}
function editarArticulo(){

}

function Inventario() {
  const itemArticulo = DataFetching("/articulos")
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>

    {/* <!--CUERPO--> */}
    <div id="cuerpo">
      <div className="m-4 row">
        <h3>Inventario</h3>
        <div className="col-6">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar Producto..."
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
          Agregar Articulo
        </button>
      </div>

      <div className="row m-4">
        <h3 className="mb-3">Articulos</h3>
        <table id="tabla-inventario" className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Categoría</th>
            </tr>
          </thead>
          <tbody>
          {itemArticulo.map((itemArticulo, id) => (
            <tr key={id}>
              <td>{itemArticulo.id}</td>
              <td>{itemArticulo.nombre}</td>
              <td>{itemArticulo.cantidad}</td>
              <td>{itemArticulo.precio}</td>
              <td>{itemArticulo.categoria}</td>
              <td>
                <button className="btn btn-danger" onClick={eliminarArticulo(itemArticulo.id)}>Eliminar</button>
                <button className="btn btn-warning" onClick={editarArticulo(itemArticulo.id)}>Editar</button>
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
                  <label for="cantidad" className="form-label">Cantidad:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellido"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label for="precio" className="form-label">Precio:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="precio"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label for="categoria" className="form-label">Categoria:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="categoria"
                    required
                  />
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
            <button type="button" onClick= {agregarArticulo("/articulo")} className="btn btn-primary">
              Guardar cambios
            </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Inventario