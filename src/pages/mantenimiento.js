import React, { useState } from 'react';
import { Button, Col, Modal, ModalHeader, ModalBody, ModalFooter, Row } from 'reactstrap';
import Sidebar from '../components/sidebar';
import axios from "axios";

function MaintenanceTab() {
  const [backupMessage, setBackupMessage] = useState('');
  const [restoreMessage, setRestoreMessage] = useState('');
  const [password, setPassword] = useState('');
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  function handleBackup() {
    // Aquí iría el código para realizar el respaldo de la información
    setBackupMessage('¡Respaldado correctamente!');
  }

  function handleRestore() {
    // Aquí iría el código para realizar la restauración de la información
    setRestoreMessage('¡Restaurado correctamente!');
  }

  const editarUsuario = async (id, password, ) => {
    

    try {
      await axios.put(
        `https://sysprop-production.up.railway.app/usuarios/${id}`,
        {
          password,
        }
      );
    } catch (error) {
      console.log("Error al Modificar contraseña:", error);
      alert(`Ocurrió un error al modificar la contraseña. ${error.response.data.message}`);
    }
  
    toggle();
    window.location.reload();
  };
  
  var editUsuarioId;

  return (
    <>
      <Sidebar/>
      <div id="cuerpo" className="maintenance-tab">
        <h2>Mantenimiento</h2>
        <div id="cuadroMantenimiento">
          <Row>
            <Col>
              <Button color="success" onClick={handleBackup}>Restaurar Base de Datos</Button>
              <p>{backupMessage}</p>
            </Col>
            <Col>
              <Button color="primary" onClick={toggle}>Cambiar Contraseña</Button>
              <p>{backupMessage}</p>
            </Col>
            <Col>
              <Button color="danger" onClick={handleRestore}>Respaldar Base de Datos</Button>
              <p>{restoreMessage}</p>
            </Col>
          </Row>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Cambiar Contraseña</ModalHeader>
        <ModalBody>
          <label htmlFor="password">Contraseña Actual:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <label htmlFor="password">Cambiar Contraseña:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label htmlFor="password">Confirmar Contraseña:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => editarUsuario(editUsuarioId, password)}>Guardar</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancelar</Button>
        </ModalFooter>
      </Modal>

      
    </>
  );
}

export default MaintenanceTab;
