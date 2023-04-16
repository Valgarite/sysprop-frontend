import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
  Button,
} from "reactstrap";
import Sidebar from "../components/sidebar";
import Cookies from "universal-cookie";
import { Link } from 'react-router-dom';

const cookies = new Cookies()

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
  window.location.reload()
}

async function agregarVenta(idUsuario, idCliente, listaArticulos, listaCantidades) {
  try {
    await axios.post("https://sysprop-production.up.railway.app/ventas/registrar", {
      idusuario: idUsuario,
      idcliente: idCliente,
      articulos: listaArticulos,
      cantidades: listaCantidades,
    });
    console.log("Venta registrada correctamente");
    window.location.reload();
  } catch (error) {
    console.log("Error al registrar la venta:", error);
    alert(`Ocurrió un error al registrar la venta. ${error.response.data.message}`);
  }
}



var actualCliente = {
  nombre: "Nombre de cliente",
  cedula: "",
  id: 0,
}

var articulosSeleccionados = []
var articulosCantidades = []

const usuarioActual = cookies.get("id")

function Ventas() {
  const [show, setShow] = useState(false);
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [confirmarVenta, setConfirmarVenta] = useState(false)

  const handleSelectChange = (selectedOption) => {
    document.getElementById('cedula').value = selectedOption.value;
    actualCliente = clientes.find(function (cliente) {
      return cliente.cedula === selectedOption.value
    })
  };

  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  const [detalleProductos, setDetalleProductos] = useState([]);
  const [clientes, setClientes] = useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleConfirm = () => setConfirmarVenta(true);
  const handleConfirmClose = () => setConfirmarVenta(false);

  useEffect(() => {
    axios
      .get("https://sysprop-production.up.railway.app/Articulos")
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Peticion GET a Clientes
    fetch("https://sysprop-production.up.railway.app/clientes")
      .then((response) => response.json())
      .then((data) => {
        setClientes(data);
      })
  }, []);



  const [action, setAction] = useState(1); // El estado 1 define que el Modal será utilizado para Agregar un cliente
  const handleAgregar = () => setAction(1);

  useEffect(() => {
    const selectedProductObjects = productos.filter((producto) =>
      selectedProducts.includes(producto.id)
    );
    const total = selectedProductObjects.reduce(
      (acc, producto) => acc + producto.cantidad * producto.precio,
      0
    );
    setTotal(total);
  }, [selectedProducts, productos]);

  function returnCantidades(idProducto, productoPrecio) {
    const checkedProducto =
      detalleProductos.find((articulo) =>
        idProducto === articulo.id
      );
    if (checkedProducto) {
      return checkedProducto.cantidad * productoPrecio + " Bs.";
    } else {
      return "0 Bs.";
    }
  }

  const handleCheck = (productId, checked) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (checked) {
        // Checkbox is checked, add product to selected products
        const productoSeleccionado = productos.find((p) => p.id === productId);
        const newDetalleProductos = [
          ...detalleProductos,
          { ...productoSeleccionado, cantidad: productoSeleccionado.cantidad },
        ];
        setDetalleProductos(newDetalleProductos);

        const nuevosDetalles = [...detalleProductos];
        const detalleIndex = nuevosDetalles.findIndex((p) => p.id === productoSeleccionado.id);
        if (detalleIndex !== -1) {
          nuevosDetalles[detalleIndex].cantidad = productoSeleccionado.cantidad;
        } else {
          nuevosDetalles.push({ ...productoSeleccionado, cantidad: productoSeleccionado.cantidad });
        }
        setDetalleProductos(nuevosDetalles);
        return [...prevSelectedProducts, productId];
      } else {
        // Checkbox is unchecked, remove product from selected products
        const newDetalleProductos = detalleProductos.filter((p) => p.id !== productId);
        setDetalleProductos(newDetalleProductos);
        return prevSelectedProducts.filter((id) => id !== productId);
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

  const preConfirmar = async () => {
    if ((actualCliente.id > 0) && (detalleProductos.length > 0)) {

      detalleProductos.forEach(producto => {
        articulosSeleccionados.push(producto.nombre);
        articulosCantidades.push(parseInt(producto.cantidad));
      });

      handleConfirm() // Redirecciona al Modal de Confirmación
    } else if (actualCliente.id === 0) {
      alert("Se debe seleccionar un cliente")
    } else if (detalleProductos.length === 0) {
      alert("No se han seleccionado articulos ")
    }

  }

  return (
    <>
      <Sidebar />
      <div>
        <div id="cuerpo">
          <div className="m-4 row">
            <h3>Registro de venta</h3>
            <div className="hijueputabton">
              <Link to="/reportes"><Button color="primary">Visualizar Ventas</Button></Link>
            </div>
          </div>
          <Row>
            <Col sm={8}>
              <Row className="mb-2 mt-5">
                <Col sm={12}>
                  <Card className="cliente-card">
                    <CardHeader
                      style={{ backgroundColor: "#4e73df", color: "white" }}
                    >
                      Cliente
                    </CardHeader>
                    <CardBody>
                      <Row className="mt-2">
                        <Col>
                          <Button color="success" onClick={agregarClick}>
                            Agregar Cliente
                          </Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={6}>
                          <FormGroup>
                            <Label>Nombre</Label>
                            <Select
                              className="me-3"
                              filterOption={(option, searchText) =>
                                option.label
                                  .toLowerCase()
                                  .includes(searchText.toLowerCase())
                              }
                              options={clientes.map((cliente) => ({
                                value: cliente.cedula,
                                label: cliente.nombre,
                              }))}
                              placeholder="Seleccione un cliente"
                              onChange={handleSelectChange} // Agregamos el manejador de eventos
                            />
                          </FormGroup>
                        </Col>
                        <Col sm={6}>
                          <FormGroup>
                            <Label>Cédula</Label>
                            <Input bsSize="sm" id="cedula" disabled="true" />
                          </FormGroup>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <Card className="productos-card">
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
                                <th>Precio c/u</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {productosFiltrados.filter(uten => uten.categoria !== "Utensilios").map((producto) => (
                                <tr key={producto.id}>
                                  <td>
                                    <Input
                                      type="checkbox"
                                      bsSize="md"
                                      checked={selectedProducts.includes(producto.id)}
                                      onChange={(e) => handleCheck(producto.id, e.target.checked)}
                                    />
                                  </td>
                                  <td>{producto.nombre}</td>
                                  <td>
                                    <FormGroup>
                                      <Input
                                        className="inputProductos"
                                        maxLength={2}
                                        disabled={!selectedProducts.includes(producto.id)}
                                        type="number"
                                        defaultValue={0}
                                        onChange={(e) => {
                                          const newValue = e.target.value;

                                          if (
                                            selectedProducts.includes(producto.id) &&
                                            (newValue === "" || newValue >= 1)
                                          ) {
                                            handleCheck(producto.id, true)
                                            const nuevosProductos = [...productos];
                                            const index = nuevosProductos.indexOf(producto);
                                            nuevosProductos[index] = {
                                              ...producto,
                                              cantidad: newValue || 1,
                                            };
                                            setProductos(nuevosProductos);

                                            const nuevosDetalles = [...detalleProductos];
                                            const detalleIndex = nuevosDetalles.findIndex(
                                              (p) => p.id === producto.id
                                            );
                                            if (detalleIndex !== -1) {
                                              nuevosDetalles[detalleIndex].cantidad = newValue;
                                            } else {
                                              nuevosDetalles.push({
                                                ...producto,
                                                cantidad: newValue,
                                              });
                                            }
                                            setDetalleProductos(nuevosDetalles);
                                          } else {
                                            // Si el valor ingresado no es una cadena vacía o mayor a 1, se asigna el valor 1 al input
                                            handleCheck(producto.id, false)
                                            e.target.value = 1;
                                          }
                                        }}
                                        onKeyDown={(e) => {
                                          // Se valida que no se escriba el símbolo "-"
                                          if ((e.key === "-") || (e.key === "")) {
                                            e.preventDefault();
                                          }
                                          // Expresión regular para validar si el valor ingresado cumple con la condición de permitir el número 0 solo si está seguido por otro número
                                          const regex = /[1-9]\d*/;
                                          if (!regex.test(e.target.value + e.key)) {
                                            e.preventDefault();
                                          }
                                        }}

                                      />

                                    </FormGroup>
                                  </td>
                                  <td>
                                    <span>{producto.precio + " Bs."}</span>
                                  </td>
                                  <td>
                                    {   //Funcion para buscar los articulos seleccionados y mostrar el Total correspondiente a cada uno.
                                      // Nombre provisional de 'articulo' para no confundir con el 'producto' del mapeo principal
                                      returnCantidades(producto.id, producto.precio)
                                    }
                                  </td>
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

            <Col sm={4} className="detalle-venta-col">
              <div className="sticky-top">
                <Row className="mb-2 mx-2">
                  <Col sm={12}>
                    <Card className="detalle-venta">
                      <CardHeader
                        style={{ backgroundColor: "#4e73df", color: "white" }}
                      >
                        Detalle
                      </CardHeader>
                      <CardBody>
                        <Row>
                          <Col sm={12}>
                            <Table size="sm">
                              <tbody>
                                <tr>
                                  <td className="fw-semibold">Artí­culo</td>
                                  <td className="fw-semibold">Cantidad</td>
                                  <td className="fw-semibold">Precio Unit.</td>
                                  <td className="fw-semibold">Precio total</td>
                                </tr>
                                {detalleProductos.map((producto) => (
                                  <tr key={producto.id}>
                                    <td>{producto.nombre}</td>
                                    <td className="columna-numerica">{producto.cantidad || 1}</td>
                                    <td className="columna-numerica">{producto.precio}</td>
                                    <td className="columna-numerica">{(producto.cantidad || 1) * producto.precio}</td>
                                  </tr>
                                ))}
                                <tr>
                                  <td className="fw-semibold">Total:</td>
                                  <td className></td>
                                  <td className></td>
                                  <td className="fw-semibold">{"Bs. " + total}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                        <Row className="mx-2">
                          <Col sm={12}>
                            <Card>
                              <CardBody>
                                <Button
                                  color="success"
                                  block
                                  onClick={preConfirmar}
                                >
                                  <i className="fas fa-money-check"></i>{" "}
                                  Registrar Venta
                                </Button>
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>

        {/* MODAL DE CONFIRMAR VENTA */}
        <Modal
          className="Modal-SeleccionarCliente"
          show={confirmarVenta}
          onHide={handleConfirmClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmación de Venta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column">
              <span>{`Cliente: ${actualCliente.nombre}`}</span>
              <span>{`Cédula: ${actualCliente.cedula}`}</span>
            </div>
            <Card className="detalle-venta">
              <CardHeader
                style={{ backgroundColor: "#4e73df", color: "white" }}
              >
                Detalles
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm={12}>
                    <Table size="sm">
                      <tbody>
                        <tr>
                          <td className="fw-semibold">Artí­culo</td>
                          <td className="fw-semibold">Cantidad</td>
                          <td className="fw-semibold">Precio</td>
                        </tr>
                        {detalleProductos.map((producto) => (
                          <tr key={producto.id}>
                            <td>{producto.nombre}</td>
                            <td>{producto.cantidad || 1}</td>
                            <td>{producto.precio}</td>
                          </tr>
                        ))}
                        <tr>
                          <td className="fw-semibold">Total:</td>
                          <td></td>
                          <td className="fw-semibold">{total}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <button
              id="registrarVenta"
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              onClick={
                () => agregarVenta(usuarioActual, actualCliente.id, articulosSeleccionados, articulosCantidades)
              }
            >
              Registrar venta
            </button>
            <button
              id="cerrar"
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={function cancelarVenta() {
                articulosSeleccionados = []
                articulosCantidades = []
                handleConfirmClose()
              }}
            >
              Cancelar
            </button>
          </Modal.Body>
        </Modal>

        {/* MODAL DE AGREGAR NUEVO USUARIO */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar cliente</Modal.Title>
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

export default Ventas