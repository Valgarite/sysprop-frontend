import React, { useState } from 'react';
import { Button, Col, Row } from 'reactstrap';

function MaintenanceTab() {
  const [backupMessage, setBackupMessage] = useState('');
  const [restoreMessage, setRestoreMessage] = useState('');

  function handleBackup() {
    // Aquí iría el código para realizar el respaldo de la información
    setBackupMessage('¡Respaldado correctamente!');
  }

  function handleRestore() {
    // Aquí iría el código para realizar la restauración de la información
    setRestoreMessage('¡Restaurado correctamente!');
  }

  return (
    <div id="cuerpo" className="maintenance-tab">
      <h2>Mantenimiento</h2>
      <div id="cuadroMantenimiento">
      <Row>
        <Col>
          <Button color="success" onClick={handleBackup}>Restaurar Base de Datos</Button>
          <p>{backupMessage}</p>
        </Col>
        <Col>
          <Button color="danger" onClick={handleRestore}>Respaldar Base de Datos</Button>
          <p>{restoreMessage}</p>
        </Col>
      </Row>
      </div>
    </div>
  );
}

export default MaintenanceTab;