import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
  Table,
  Button,
} from "reactstrap";
import Sidebar from "../components/sidebar";
//articulos/vender


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

async function agregarVenta(ruta, nombre, cantidad, precio) {
  await axios
    .post(ruta, {
      nombre: nombre,
      cantidad: cantidad,
      precio: precio,
    })
    .then((res) => console.log("posting data", res))
    .catch((err) => console.log(err));
  window.location.reload();
}

function Ventas() {
  const [show, setShow] = useState(false);
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [igv, setIgv] = useState(0);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(0)
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  
  const handleModalSeleccionar = () => setShowModal(1);
  const handleModalAgregar = () => setShowModal(2);
  const closeModal = () => setShowModal(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get("https://sysprop-production.up.railway.app/Articulos")
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [action, setAction] = useState(1); // El estado 1 define que el Modal será utilizado para Agregar un cliente
  const handleAgregar = () => setAction(1);

  useEffect(() => {
    const selectedProductObjects = productos.filter((producto) =>
      selectedProducts.includes(producto.id)
    );
    const subtotal = selectedProductObjects.reduce(
      (acc, producto) => acc + producto.cantidad * producto.precio,
      0
    );
    const igv = subtotal * 0.18;
    const total = subtotal + igv;
    setSubtotal(subtotal);
    setIgv(igv);
    setTotal(total);
  }, [selectedProducts, productos]);

  const handleCheck = (productId) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(productId)) {
        return prevSelectedProducts.filter((id) => id !== productId);
      } else {
        return [...prevSelectedProducts, productId];
      }
    });
  };

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleInputChange = (event) => {
    const { value } = event.target;
    const regex = /^[a-zñA-ZÑ\s]*$/;
    if (regex.test(value) && value.length <= 64) {
      setNombre(value);
    } else if (!value) {
      setNombre("");
    }
  };
  
  function agregarClick() {
    handleAgregar();
    handleShow();
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
  
  var editClienteId = -1;

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
    <>
      <Sidebar />
      <div>
        <div id="cuerpo">
        <div className="m-4 row">
          <h3>Registro de venta</h3>
          <div className="col-6">
            <Button
              color="primary">Visualizar Ventas
              </Button>
            
          </div>
          </div>
          <Row>
            <Col sm={8}>
              <Row className="mb-2 mt-5">
                <Col sm={12}>
                  <Card>
                    <CardHeader
                      style={{ backgroundColor: "#4e73df", color: "white" }}
                    >
                      Cliente
                    </CardHeader>
                    <CardBody>
                    <Row className="mt-2">
                        <Col sm={12}>
                          <Button
                            color="primary"
                            flex
                            onClick={handleModalSeleccionar}
                          >
                            Seleccionar Cliente
                          </Button>
                        </Col>
                        <Col >
                          <Button
                            color="danger"
                
                            onClick={agregarClick}
                          >
                            Agregar Cliente
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={6}>
                          <FormGroup>
                            <Label>Nro Documento</Label>
                            <Input bsSize="sm" />
                          </FormGroup>
                        </Col>
                        <Col sm={6}>
                          <FormGroup>
                            <Label>Nombre</Label>
                            <Input bsSize="sm" />
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Card>
                    <CardHeader
                      style={{ backgroundColor: "#4e73df", color: "white" }}
                    >
                      Productos
                    </CardHeader>
                    <CardBody>
                      <Row className="mb-2 ">
                        <Col sm={12}>
                          <FormGroup>
                            <Input
                              placeholder="Busque su producto aqui..."
                              bsSize="sm"
                              value={busqueda}
                              onChange={(e) => setBusqueda(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={12}>
                          <Table striped size="sm">
                            <thead>
                              <tr>
                                <th></th>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {productosFiltrados.map((producto) => (
                                <tr key={producto.id}>
                                  <td>
                                    <Input
                                      type="checkbox"
                                      bsSize="sm"
                                      checked={selectedProducts.includes(producto.id)}
                                      onChange={() => handleCheck(producto.id)}

                                    />
                                  </td>
                                  <td>{producto.nombre}</td>
                                  <td>

                                    <FormGroup>
                                      <Input
                                        type="number"
                                        value={producto.cantidad}
                                        onChange={(e) => {
                                          const nuevosProductos = [...productos];
                                          nuevosProductos[
                                            nuevosProductos.indexOf(producto)
                                          ].cantidad = e.target.value;
                                          setProductos(nuevosProductos);
                                        }}
                                      />
                                    </FormGroup>
                                  </td>
                                  <td>
                                    <span>{producto.precio}</span>
                                  </td>
                                  <td>{producto.cantidad * producto.precio}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>

            

            <Col sm={4}>
              <Row className="mb-2 mx-2">
                <Col sm={12}>
                  <Card>
                    <CardHeader
                      style={{ backgroundColor: "#4e73df", color: "white" }}
                    >
                      Detalle
                    </CardHeader>
                    <CardBody>
                      <Row className="mb-2">
                        <Col sm={12}>
                          <InputGroup size="sm">
                            <InputGroupText>Tipo:</InputGroupText>
                            <Input type="select">
                              <option value="Boleta">Boleta</option>
                            </Input>
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={12}>
                          <Table size="sm">
                            <tbody>
                              <tr>
                                <td>Subtotal:</td>
                                <td>{subtotal}</td>
                              </tr>
                              <tr>
                                <td>IGV (18%):</td>
                                <td>{igv}</td>
                              </tr>
                              <tr>
                                <td>Total:</td>
                                <td>{total}</td>
                              </tr>
                            </tbody>
                          </Table>
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col sm={12}>
                          <Button
                            color="success"
                            size="sm"
                            block
                            onClick={() =>
                              selectedProducts.forEach((id) => {
                                const producto = productos.find((producto) => producto.id === id);
                                agregarVenta("/articulos/vender", producto.nombre, producto.cantidad, producto.precio);
                              })
                            }
                          >
                            Vender
                          </Button>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>

              <Row className="mx-2">
                <Col sm={12}>
                  <Card>
                    <CardBody>
                      <Button
                        color="success"
                        block
                        onClick={() => {
                          agregarVenta(
                            "https://sysprop-production.up.railway.app/Ventas",
                            "Cliente1",
                            JSON.stringify(productos),
                            subTotal(productos) * 1.18
                          );
                        }}
                      >
                        <i className="fas fa-money-check"></i> Terminar Venta
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>

          
        </div>
        <Modal show={(showModal===1) && true} onHide={(showModal!==1) && true} className="Modal-SeleccionarCliente" >
        <Modal.Header closeButton>
          <Modal.Title>
            Lista de Clientes
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
                    editClienteId,
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


        {/* MODAL DE AGREGAR NUEVO USUARIO MAMAWEBO DIGO GLULGU */}
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
                    editClienteId,
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
    </>
  );
}

//id cliente
//total

function subTotal(productos) {
  let suma = 0;
  for (let producto of productos) {
    suma += producto.cantidad * producto.precio;
  }
  return suma;
}

export default Ventas;