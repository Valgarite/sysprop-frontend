import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/styles.scss";
import Sidebar from "../components/sidebar";
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';


function Inventario(){
  
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(Number);
  const [precio, setPrecio] = useState(Number);
  const [categoria, setCategoria] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [usuarios, setUsuarios] = useState([]);
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal)
    if (modal === false) {
      setNombre('');
      setCategoria('');
      setPrecio('');
      setCantidad(''); 
    }
  };
  
  
  const [searchQuery, setSearchQuery] = useState('');

   const filteredUsuarios = usuarios.filter(user => {
     const fullName = `${user.nombre}`.toLowerCase();
     return fullName.includes(searchQuery.toLowerCase());
   });

  const handleSearch = event => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://sysprop-production.up.railway.app/articulos');
      setUsuarios(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const editarClick = user => {
    setSelectedUser(user);
    toggle();

    setNombre(user.nombre);
    setCantidad(user.cantidad);
    setPrecio(user.precio);
    setCategoria(user.categoria);
    
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      if (selectedUser) {
        await axios.put(
          `https://sysprop-production.up.railway.app/articulos/${selectedUser.id}`,
          {
            nombre,
            cantidad,
            precio,
            categoria
          });
        setSelectedUser(null);
        
        

      } else {
        await axios.post(
          'https://sysprop-production.up.railway.app/articulos/comprar',
          {
            nombre,
            cantidad,
            precio,
            categoria
          });
      }

      setNombre('');
      setCantidad('');
      setPrecio('');
      setCategoria('');
      fetchData();
      toggle();
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarCliente = async id => {
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
            onClick={toggle}
          >
            Agregar Articulo
          </button>
        </div>

        <div className="row m-4 userTable">
          <Table bordered responsive className='userTable'>
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
                  <td>{user.categoria.nombre}</td>
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

      <Modal className='mt-5' isOpen={modal} size='xl' centered toggle={toggle}>
        <ModalHeader toggle={toggle}>Agregar Nuevo Usuario</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">
                Nombre:
              </label>
              <Input
                type="text"
                defaultValue={nombre}
                onChange={event => setNombre(event.target.value)}
                className="form-control"
                id="nombre"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                Cantidad:
              </label>
              <Input
                type="number"
                className="form-control"
                defaultValue={cantidad}
                onChange={event => setCantidad(event.target.value)}
                id="cantidad"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                Precio:
              </label>
              <Input
                type="number"
                className="form-control"
                defaultValue={precio}
                onChange={event => setPrecio(event.target.value)}
                id="precio"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">
                Categoria:
              </label>
              <Input
                type="number"
                className="form-control"
                defaultValue={categoria}
                onChange={event => setCategoria(event.target.value)}
                id="categoria"
                required
              />
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
