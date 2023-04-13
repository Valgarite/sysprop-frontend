import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { DataFetching } from "../DataFetching";
import "../assets/styles.scss";
import Sidebar from "../components/sidebar";
import Cookies from "universal-cookie";

const cookies = new Cookies()

async function agregarArticulo(ruta, nombre, cantidad, precio, categoria) {
  if (!nombre || !cantidad || !precio || !categoria) {
    alert("Todos los campos son obligatorios");
    return;
  } 
  await axios
    .post(ruta, {
      nombre: nombre,
      cantidad: cantidad,
      precio: precio,
      categoria: categoria,
    })
    .then((res) => console.log("posting data", res))
    .catch((err) => console.log(err));

  window.location.reload();
}

const eliminarCliente = async (id) => {
  if (window.confirm("¿Está seguro de que desea eliminar este usuario?")) {
    try {
      await axios.delete(
        `https://sysprop-production.up.railway.app/articulos/${id}`
      );
    } catch (error) {
      console.log(error);
    }
  }

  window.location.reload();
};



var editClienteId = -1;

function Inventario() {
  const itemArticulo = DataFetching(
    "https://sysprop-production.up.railway.app/articulos"
  );
  const [show, setShow] = useState(false);

  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(Number);
  const [precio, setPrecio] = useState(Number);
  const [categoria, setCategoria] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Redireccion = () => {
    if(!cookies.get('id')){
      window.location.href="/login"
    }
  }


  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsuarios = itemArticulo.filter((user) => {
    const fullName = `${user.nombre}${user.cedula}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  var clienteIndex; // Variable para almacenar el ID del cliente que se modificará

  function editarClick(id) {
    editClienteId = itemArticulo[id].id;
    clienteIndex = id;

    setNombre(itemArticulo[clienteIndex].nombre);
    setCantidad(itemArticulo[clienteIndex].cantidad);
    setPrecio(itemArticulo[clienteIndex].precio);
    setCategoria(itemArticulo[clienteIndex].categoria.nombre);

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
      column: "Cantidad",
    },
    {
      column: "Precio",
    },
    {
      column: "Categoria",
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


  /*************VALIDAR NROS**********/
  
  const ValidarCategoria = (event) => {
    const { value } = event.target;
    if (value <= 4 && value >= 1 ) {
      setCategoria(value);
    } else if (!value) {
      setCategoria("");
    }
  };

  const ValidarPrecio = (event) => {
    const { value } = event.target;
    if (value >= 1 && value <=100000) {
      setPrecio(value);
    } else if (!value) {
      setPrecio("");
    }
  };

  const ValidarCantidad = (event) => {
    const { value } = event.target;
    if (value >= 1 && value <=500) {
      setCantidad(value);
    } else if (!value) {
      setCantidad("");
    }
  };
  

  
  /******************************************/

  return (
    <div>
    <Sidebar/>
    
      {/* <!--CUERPO--> */}
      <div id="cuerpo">
        <div className="row p-4">
          <h3>Buscar Articulo</h3>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Buscar Articulo..."
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
          <h3 className="mb-3">Articulos Registrados</h3>
          <table id="tabla-clientes" className="table">
            <thead>
              <tr>
                {camposDataClientes.map(({ column }) => (
                  <th>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios.map((itemArticulo, id) => (
                <tr key={id}>
                  <td
                    className={
                      itemArticulo.estado_activo ? "activo" : "desactivo"
                    }
                  >
                    {itemArticulo.id}
                  </td>
                  <td>{itemArticulo.nombre}</td>
                  <td>{itemArticulo.cantidad}</td>
                  <td>{itemArticulo.precio}</td>
                  <td>{itemArticulo.categoria.nombre}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => eliminarCliente(itemArticulo.id)}
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
                <label for="cantidad" className="form-label">
                  Cantidad:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="cantidad"
                  defaultValue={action === 1 ? null : cantidad}
                  value={cantidad}
                  onChange={ValidarCantidad}
                  required
                />
              </div>
              <div className="col-md-6">
                <label for="precio" className="form-label">
                  Precio:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="precio"
                  defaultValue={action === 1 ? null : precio}
                  value={precio}
                  onChange={ValidarPrecio}
                  required
                />
              </div>
              <div className="col-md-6">
                <label for="categoria" className="form-label">
                  Categoria:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="categoria"
                  defaultValue={action === 1 ? null : categoria}
                  value={categoria}
                  onChange={ValidarCategoria}
                  required
                />
              </div>
            </div>
            {/* <!--<button type="submit" className="btn btn-primary mt-3">Agregar</button>--> */}
            
              <button
                id="agregar"
                type="button"
                onClick={() =>
                  agregarArticulo(
                    "https://sysprop-production.up.railway.app/articulos/comprar",
                    nombre,
                    cantidad,
                    precio,
                    categoria
                  )
                }
                className="btn btn-primary"
              >
                Agregar
              </button>
            
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
export default Inventario;
