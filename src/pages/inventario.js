import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/styles.scss";
import Sidebar from "../components/sidebar";
import {
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function Inventario() {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(Number);
  const [precio, setPrecio] = useState(Number);
  const [categoria, setCategoria] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const [usuarios, setUsuarios] = useState([]);
  const [modal, setModal] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => {
    setIsEdit(true)
  }

  const toggle = () => {
    setModal(!modal);
    if (modal === false) {
      setNombre("");
      setCategoria("");
      setPrecio("");
      setCantidad("");
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsuarios = usuarios.filter((user) => {
    const fullName = `${user.nombre}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const Redireccion = () => {
    if(!cookies.get('id')){
      window.location.href="/login"
    }
  }

  useEffect(() => {
    Redireccion()
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://sysprop-production.up.railway.app/articulos"
      );
      setUsuarios(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const editarClick = (user) => {
    setIsEdit()
    setSelectedUser(user);
    toggle();

    setNombre(user.nombre);
    setCantidad(user.cantidad);
    setPrecio(user.precio);
    setCategoria(user.categoria);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!nombre || !cantidad || !precio|| !categoria) {
        alert("Campos Invalidos o No Selecionados");
        return;
      }
      if (selectedUser) {
        await axios.put(
          `https://sysprop-production.up.railway.app/articulos/${selectedUser.id}`,
          {
            nombre,
            cantidad,
            precio,
            categoria,
          }
        );
        setSelectedUser(null);
      } else {
        await axios.post(
          "https://sysprop-production.up.railway.app/articulos/comprar",
          {
            nombre,
            cantidad,
            precio,
            categoria,
          }
        );
      }

      setNombre("");
      setCantidad("");
      setPrecio("");
      setCategoria("");
      fetchData();
      toggle();
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarCliente = async (id) => {
    try {
      await axios.delete(
        `https://sysprop-production.up.railway.app/articulos/${id}`
      );
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }; // El estado 2 define que el Modal será utilizado para Modificar un cliente existente

  /******************************************/

  return (
    <div>
      <Sidebar />

      {/* <!--CUERPO--> */}
      <div id="cuerpo">
        <div className="row p-4">
          <h3>Buscar Artículo</h3>
          <div className="col-6">
            <input
              type="text"
              className="form-control"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Buscar Artículo..."
            />
          </div>
          <div className="col-3"></div>
          {/* <!-- Botón para abrir la ventana pop-up --> */}
          <button
            type="button"
            className="btn btn-primary col-2"
            data-bs-toggle="modal"
            data-bs-target="#mi-modal"
            onClick={toggle}
          >
            Agregar Articulo
          </button>
        </div>

        <div className="row m-4 userTable">
          <Table bordered responsive className="userTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Categoria</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios.map((user, id) => (
                <tr key={id}>
                  <td>{user.id}</td>
                  <td>{user.nombre}</td>
                  <td>{user.precio}</td>
                  <td>{user.cantidad}</td>
                  <td>{user.categoria}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => eliminarCliente(user.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => editarClick(user)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal className="mt-5" isOpen={modal} size="xl" centered toggle={toggle}>
        <ModalHeader toggle={toggle}>
           {isEdit ? "Agregar Nuevo Artículo" : "Editar Artículo"} 
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Nombre:</label>
              <Input
                type="text"
                value={nombre}
                onChange={(event) => {
                  const value = event.target.value;
                  const regex = /^[a-zñA-ZÑ\s]*$/;
                  event.preventDefault()
                  if (regex.test(value) && value.length <= 64) {
                    setNombre(value);
                  } else if (!value) {
                    alert("Ingrese un nombre valido")
                    
                  }
                  
                }}
                className="form-control"
                id="nombre"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Cantidad:</label>
              <Input
                type="number"
                className="form-control"
                value={cantidad}
                onChange={(event) => {
                  const value = event.target.value;
                  if (value >= 0 && value.length <= 4) {
                    setCantidad(value);
                  }
                }}
                id="cantidad"
                required
                
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Precio:</label>
              <Input
                type="number"
                className="form-control"
                value={precio}
                onChange={(event) => {
                  const value = event.target.value;
                  if (value >= 1 && value.length <= 3) {
                    setPrecio(value);
                  }
                }}
                id="precio"
                required
                
              />
            </div>
            {/* <div className="col-md-6">
              <label className="form-label">Categoria:</label>
              <Input
                type="text"
                className="form-control"
                defaultValue={categoria}
                onChange={(event) => setCategoria(event.target.value)}
                id="categoria"
                required
              />
            </div> */}
            <div className="col-md-3">
              <label className="form-label">Categoria:</label>
              <div>
                <Input
                  type="radio"
                  id="Categoria"
                  value="Tinas"
                  checked={categoria === "Tinas"}
                  onChange={(event) => setCategoria(event.target.value)}
                  name="Tinas"
                />
                <label>Tinas</label>
              </div>
              <div>
                <Input
                  type="radio"
                  id="Categoria"
                  name="Categoria"
                  value="Bebidas"
                  checked={categoria === "Bebidas"}
                  onChange={(event) => setCategoria(event.target.value)}
                />
                <label>Bebidas</label>
              </div>
            </div>
            <div className="col-md-3">
              <label className="form-label"></label>
              <div>
                <Input
                  type="radio"
                  id="Categoria"
                  value="Helados"
                  checked={categoria === "Helados"}
                  onChange={(event) => setCategoria(event.target.value)}
                />
                <label>Helados</label>
              </div>
              <div>
                <Input
                  type="radio"
                  id="Categoria"
                  name="Categoria"
                  value="Utensilios"
                  checked={categoria === "Utensilios"}
                  onChange={(event) => setCategoria(event.target.value)}
                />
                <label>Utensilios</label>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Guardar
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default Inventario;
