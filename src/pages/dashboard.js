import {useEffect} from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Sidebar from "../components/sidebar";
import Cookies from "universal-cookie";
import { Link  } from 'react-router-dom';

const cookies = new Cookies()

const styles = {
  title: {
    textAlign: 'center',
    margin: '50px 0',
    fontSize: '66px',
    fontWeight: 'bold',
  },
  LinkContainer: {
    margin: '50px 0',
  },
};

const HomeScreen = () => {

  const Redireccion = () => {
    if(!cookies.get('id')){
      window.location.href="/login"
    }
  }

  useEffect(()=>{
    Redireccion()
  },[])

  return (
    <div>
      <Sidebar/>
      <div id='cuerpo'>
    <Container>
      <div style={styles.title}>SysProp</div>
      <div style={styles.LinkContainer}>
        <Row>
          <Col>
            <Link className="buttone" to="/compras"color="primary" style={styles.Button} block>Compras</Link >
          </Col>
          <Col>
            <Link className="buttone" to="/ventas"color="primary" style={styles.Button} block>Ventas</Link >
          </Col>
          <Col>
            <Link className="buttone" to="/clientes"color="primary" style={styles.Button} block>Clientes</Link >
          </Col>
        </Row>
        <Row>
          <Col>
            <Link className="buttone" to="/proveedores"color="primary" style={styles.Button} block>Proveedores</Link >
          </Col>
          <Col>
            <Link className="buttone" to="/inventario"color="primary" style={styles.Button} block>Inventario</Link >
          </Col>
          <Col>
            <Link className="buttone" to="/usuarios"color="primary" style={styles.Button} block>Usuarios</Link >
          </Col>
        </Row>
        <Row>
          <Col>
            <Link className="buttone" to="/mantenimiento"color="primary" style={styles.Button} block>Mantenimiento</Link >
          </Col>
          <Col>
            <Link className="buttone" to="/ayuda"color="primary" style={styles.Button} block>Ayuda</Link >
          </Col>
        </Row>
      </div>
    </Container>
    </div>
    </div>
  );
};

export default HomeScreen;