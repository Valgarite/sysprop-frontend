import { useEffect } from 'react';
import Sidebar from "../components/sidebar";
import Cookies from "universal-cookie";
import icon2 from "../assets/images/user-icon-2.png"
import icon1 from "../assets/images/user-icon-1.png"
import icon3 from "../assets/images/user-icon-gt.png"
import iconDef from "../assets/images/user-default.png"
import logoEmpresa from '../assets/images/logo-gelato.png'

const cookies = new Cookies()

const Dashboard = () => {
  
  const userData = {
    nombre: cookies.get('nombre'),
    cedula: cookies.get('cedula'), 
    cargo: cookies.get('cargo').nombre, 
    icon: (cookies.get('cargo').id === 1) ? ( icon1 ) : ( (cookies.get('cargo').id===2) ? ( icon2) : (cookies.get('cargo').id===3 ? icon3 : iconDef)  )
  }

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
      <Sidebar />
      <div id="dashboard">
        <div className="dashboard-header d-flex align-items-center">
          <div className="left-component">
            <h1 className="header-title fw-bold">SysProp Gelato</h1>
            <h4>Heladería GelatoEfrutta</h4>
          </div>

          <div className='right-component'>
            <img src={logoEmpresa} alt='SysProp Logo' className='dashboard-logo'/>
          </div>
        </div>

        <div className="dashboard-content">
          <span className="card-title fs-4 fw-semibold">Resumen</span>

          <div className="db-cards-container d-flex flex-wrap justify-content-center">
            <div className="db-card card-ventas card">
              <div className="card-title-container">
                <h5 className="card-title border-bottom px-3 py-2 mb-0">
                  Ventas
                </h5>
              </div>
              <div className="card-body d-flex flex-column p-3">
                <span>Ventas por día: num</span>
                <span>Total ingresos por día: num</span>
              </div>
            </div>

            <div className="db-card card-inventario card">
              <div className="card-title-container">
                <h5 className="card-title border-bottom px-3 py-2 mb-0">
                  Inventario
                </h5>
              </div>
              <div className="card-body d-flex flex-column p-3">
                <span>Artículos disponibles: num</span>
              </div>
            </div>

            <div className="db-card card-clientes card">
              <div className="card-title-container">
                <h5 className="card-title border-bottom px-3 py-2 mb-0">
                  Clientes
                </h5>
              </div>
              <div className="card-body d-flex flex-column p-3">
                <span>Clientes registrados hoy: num</span>
                <span>Total clientes registrados: num</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-footer mt-2">
          <div className="usuario-container">
            <span className="card-title fs-4 fw-semibold ms-2">
              Usuario actual
            </span>

            <div className="usuario-card rounded-3 mt-3">
              <div className="card-top d-flex">
                <img src={userData.icon} className="user-icon" alt='user-icon'/>
                <div className="info-group d-flex flex-column">
                  <span className="info-group-title">NOMBRE</span>
                  <span className="info-group-text">{userData.nombre}</span>
                </div>
                <div className="info-group d-flex flex-column">
                  <span className="info-group-title">CÉDULA</span>
                  <span className="info-group-text">{userData.cedula}</span>
                </div>
              </div>
              <div className="card-bottom">
                <div className="info-group d-flex flex-column">
                  <span className="info-group-title">CARGO</span>
                  <span className="info-group-text">{userData.cargo}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Dashboard };