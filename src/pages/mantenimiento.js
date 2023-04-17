import React, { useState } from "react";
import {
  Button,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Input,
} from "reactstrap";
import Sidebar from "../components/sidebar";
import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function MaintenanceTab() {
  const [restoreMessage, setRestoreMessage] = useState("");

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const toggle = () => setModal(!modal);
  const toggle2 = () => setModal2(!modal2);

  function handleRestore() {
    // Aquí iría el código para realizar la restauración de la información
    setRestoreMessage("¡Restaurado correctamente!");
  }

  const editarUsuario = async (id, password, newPass, confirmPass) => {

    if(password === "" || newPass === "" || confirmPass === ""){
      alert("Se deben rellenar todos los campos")
    } else if ((idUsuario !== 0) && (password !== await cookies.get('password'))) {
      alert("Contraseña incorrecta")
    } else if (password === newPass){
      alert("No se puede establecer la misma contraseña, debe ingresar una distinta")
    }
    else if(newPass !== confirmPass){
      alert("La confirmación de contraseña no coincide con la nueva contraseña")
    } else {
      if(idUsuario !== 0) {
        alert("Su contraseña será cambiada")
        try {
          await axios.put(
            `https://sysprop-production.up.railway.app/usuarios/${idUsuario}`,
            {
              password: newPass
            }
          );
        } catch (error) {
          console.log("Error al Modificar contraseña:", error);
          alert(
            `Ocurrió un error al modificar la contraseña. ${error.response.data.message}`
          );
        }
        toggle();
        window.location.reload();
      }
    }
  };

  const idUsuario = (cookies.get('id')) ? cookies.get('id') : 0
  const idCargo = (cookies.get('id')) ? cookies.get('cargo').id : 0

  return (
    <>
      <Sidebar />
      <div id="cuerpo" className="maintenance-tab">
        <h2 className="my-3">Mantenimiento</h2>
        <div id="cuadroMantenimiento">
          <Row>
            <Col>
              <Button className="mx-2" color="primary" onClick={toggle}>
                Cambiar Contraseña
              </Button>
            </Col>

            {idCargo === 3 && (
              <Col>
                <a href="./17-04-2023.sql" download={""}>
                  <Button
                    className="mx-2"
                    color="success"
                    onClick={handleRestore}
                  >
                    Respaldar Base De Datos
                  </Button>
                </a>
                <p>{restoreMessage}</p>
              </Col>
            )}

            {idCargo === 3 && (
              <Col>
                <Button className="mx-2" color="danger" onClick={toggle2}>
                  Restaurar Base de Datos
                </Button>
              </Col>
            )}
          </Row>
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Cambiar Contraseña</ModalHeader>
        <ModalBody>
          <div className="d-flex flex-column mt-2 px-3">
            <label htmlFor="password">Contraseña Actual:</label>
            <input
              type="password"
              id="password-actual"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-flex flex-column my-2 px-3">
            <label htmlFor="password">Cambiar Contraseña:</label>
            <input
              type="password"
              id="password-nueva"
              name="password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="d-flex flex-column my-2 px-3">
            <label htmlFor="password">Confirmar Contraseña:</label>
            <input
              type="password"
              id="password-nueva-repetir"
              name="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() =>
              editarUsuario(idUsuario, password, newPassword, confirmPassword)
            }
          >
            Guardar
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      {/*MODAL PARA IMPORTAR BASE DE DATOS */}
      <Modal centered isOpen={modal2} toggle={toggle2}>
        <ModalHeader toggle={toggle2}>Restaurar Base de Datos</ModalHeader>
        <ModalBody>
          <label className="text-center my-2" for="import">
            Selecione el Archivo (.sql)
          </label>
          <Input accept=".sql" type="file" id="file" name="import" />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle2}>
            Guardar
          </Button>{" "}
          <Button color="secondary" onClick={toggle2}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default MaintenanceTab;