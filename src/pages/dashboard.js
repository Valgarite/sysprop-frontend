import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "../components/sidebar";
import Cookies from "universal-cookie";
import icon2 from "../assets/images/user-icon-2.png"
import icon1 from "../assets/images/user-icon-1.png"
import icon3 from "../assets/images/user-icon-gt.png"
import iconDef from "../assets/images/user-default.png"
import logoEmpresa from '../assets/images/logo-gelato.png'

const cookies = new Cookies()

const Dashboard = () => {
  const isAuth = (cookies.get('id')) ? true : false

  const [ventasDia, setVentasDia] = useState(0)
  const [ingresosDia, setIngresosDia] = useState(0)
  const [articulosDisponibles, setArticulosDisponibles] = useState(0)
  const [totalClientes, setTotalClientes] = useState(0)

  const userData = {
		nombre: isAuth ? cookies.get('nombre') : "Nombre del Usuario",
    cedula: isAuth ? cookies.get('cedula') : "Cedula", 
		cargo: isAuth ? cookies.get('cargo').nombre : "Cargo",
    icon: isAuth ? ((cookies.get('cargo').id === 1) ? ( icon1 )
     : ( (cookies.get('cargo').id===2) ? ( icon2)
     : (cookies.get('cargo').id===3 ? icon3
     : iconDef)))
     : iconDef
  }

  const Redireccion = () => {
    if(!cookies.get('id')){
      window.location.href="/login"
    }
  }

  const loadInfo = async () => {
    await axios.get("https://sysprop-production.up.railway.app/ventas/resumen")
    .then((response) => { 
      console.log(response)
      setVentasDia(response.data.contador)
      setIngresosDia(response.data.suma)
    })
    .catch((error) => console.log(error))

    await axios.get("https://sysprop-production.up.railway.app/clientes/resumen")
    .then((response) => { 
      setTotalClientes(response.data.contador)
    })
    .catch((error) => console.log(error))

    await axios.get("https://sysprop-production.up.railway.app/articulos/resumen")
    .then((response) => { 
      setArticulosDisponibles(response.data.contador)
    })
    .catch((error) => console.log(error))
  }

  useEffect(()=>{
    loadInfo()
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
                <span>Ventas por día: {ventasDia}</span>
                <span>{`Total ingresos por día:  Bs. ${ingresosDia}`}</span>
              </div>
            </div>

            <div className="db-card card-inventario card">
              <div className="card-title-container">
                <h5 className="card-title border-bottom px-3 py-2 mb-0">
                  Inventario
                </h5>
              </div>
              <div className="card-body d-flex flex-column p-3">
                <span>Artículos disponibles: {articulosDisponibles}</span>
              </div>
            </div>

            <div className="db-card card-clientes card">
              <div className="card-title-container">
                <h5 className="card-title border-bottom px-3 py-2 mb-0">
                  Clientes
                </h5>
              </div>
              <div className="card-body d-flex flex-column p-3">
                <span>Total clientes registrados: {totalClientes} </span>
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