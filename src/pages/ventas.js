import React from "react";
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

function ventas() {
  return (
    <div>
      <div id="cuerpo">
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
                    <Row>
                      <Col sm={6}>
                        <FormGroup>
                          <Label>Nro Documento</Label>
                          <Input
                            bsSize="sm"
                            //value={documentoCliente}
                            //onChange={(e) => setDocumentoCliente(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm={6}>
                        <FormGroup>
                          <Label>Nombre</Label>
                          <Input
                            bsSize="sm"
                            //value={nombreCliente}
                            //onChange={(e) => setNombreCliente(e.target.value)}
                          />
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
                          <Input placeholder="Busque su producto aqui..."
                            bsSize="sm"
                            //value={documentoCliente}
                            //onChange={(e) => setDocumentoCliente(e.target.value)}
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
                          <tbody></tbody>
                        </Table>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>

          <Col sm={4}>
            <Row className="mb-2 mt-5 mx-2">
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
                          <Input
                            type="select"
                            //value={tipoDocumento}
                            //onChange={(e) => setTipoDocumento(e.target.value)}
                          >
                            <option value="Boleta">Boleta</option>
                            <option value="Factura">Factura</option>
                          </Input>
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col sm={12}>
                        <InputGroup size="sm">
                          <InputGroupText>Sub Total:</InputGroupText>
                          <Input disabled />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row className="mb-2">
                      <Col sm={12}>
                        <InputGroup size="sm">
                          <InputGroupText>IGV (18%):</InputGroupText>
                          <Input disabled />
                        </InputGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12}>
                        <InputGroup size="sm">
                          <InputGroupText>Total:</InputGroupText>
                          <Input disabled />
                        </InputGroup>
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
                    <Button color="success" block>
                      <i className="fas fa-money-check"></i> Terminar Venta
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ventas;
