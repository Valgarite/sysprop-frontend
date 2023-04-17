import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from 'axios'
import image from '../assets/images/logo-gelato.png'
import Cookies from 'universal-cookie'

const baseUrl = "https://sysprop-production.up.railway.app/usuarios"
const cookies = new Cookies();

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [blocked, setBlocked] = useState("");
  const [attempts, setAttempts] = useState(3);
  const [usuarios, setUsuarios] = useState([])
  const [alerta, setAlerta] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertColor, setAlertColor] = useState("")

  const [correo, setCorreo] = useState("")

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal)
    setUsername("")
    setAlerta(false)
    setAlertMessage("")
  };

  const handleChangeUser = async e => {
    setUsername(e.target.value)
  }
  const handleChangePassword = async e => {
    setPassword(e.target.value)
  }

  const verificarUsuario = () => {
    if(username === "" && password === ""){
      alert("No se han ingresado los datos correspondientes")
    } else if(username === "") {
      alert("Ingrese el nombre de usuario")
    } else if(password === "") {
      alert("Ingrese la contraseña")
    } else {
      (usuarios.filter((user) => user.username===username).map((usuario) => {
        if(!(username === blocked)){
          if(usuario.username === username && usuario.password===password){
            if(usuario.estado_activo){
              cookies.set('id', usuario.id, {path: "/"})
              cookies.set('username', usuario.username, {path: "/"})
              cookies.set('nombre', usuario.nombre, {path: "/"})
              cookies.set('cedula', usuario.cedula, {path: "/"})
              cookies.set('fechaNacimiento', usuario.fechaNacimiento, {path: "/"})
              cookies.set('correo', usuario.correo, {path: "/"})
              cookies.set('password', usuario.password, {path: "/"})
              cookies.set('estadoActivo', usuario.estado_activo, {path: "/"})
              cookies.set('cargo', usuario.cargo, {path: "/"})
              window.location.href="/dashboard"
            } else {
              alert("Usuario se encuentra inhabilitado")
            }
          } else if(usuario.username === username){
            alert(`Contraseña incorrecta. Intentos restantes: ${attempts-1}`)
            setAttempts(attempts-1);
            if (attempts === 1) {
              alert("Su usuario ha sido bloqueado por exceder los intentos permitidos (3)")
              const unlockTime = Date.now() + 3 * 60 * 60 * 60; // 20? in milliseconds
              localStorage.setItem('unlockTime', unlockTime);
              setBlocked(username);
            }
          } else {
            alert("No se ha encontrado el usuario")
          }
        } else {
          // alert(`Usuario bloqueado: ${localStorage.getItem('unlockTime')}`)
          alert("El usuario se encuentra bloqueado")
        }
        return 0
      })).length > 0 || alert("No se encontró usuario registrado")
    }
  }

  const verificarRecuperacion = async () => {
    let continuar = false
    setAlerta(false)

    if(username==="" || correo===""){
      setAlerta(true)
      setAlertMessage("Se deben llenar todos los campos")
      setAlertColor("warning")
    } else {
      const Filtro = usuarios.find((usuario => username===usuario.username))
      if(Filtro){
        if(Filtro.correo === correo){ 
          continuar=true 
        } else { 
          setAlertMessage("No coincide correo")
          setAlertColor("warning")
          setAlerta(true) 
        }
      } else {
        setAlertMessage("No se encontró usuario registrado")
        setAlertColor("warning")
        setAlerta(true) 
      }
    }

    if(continuar){
      axios.post("https://sysprop-production.up.railway.app/recuperar", {
        to: correo
      })
      .then(correoChanged())
      .catch((error) => console.log(error))
    }
  }

  const correoChanged = () => {
    alert("Contraseña cambiada con exito. Revisa tu correo electrónico para obtener la nueva contraseña.")
    window.location.reload()
  }

  useEffect(() => {
    Redireccion()
    iniciarSesion()
  }, []);

  async function iniciarSesion() {
    await axios
      .get(baseUrl)
      .then((response) => {
        setUsuarios(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  } 

  const Redireccion = () => {
    if(cookies.get('id')){
      window.location.href="/dashboard";
    }
  }

  return (
    <>
      <div className="login-container">
        <div className="form-body">
          <img src={image} alt="user-login" />
          <p className="text">Bienvenido a SysProp</p>

          <form className="login-form">
            <input
              name="username"
              type="text"
              placeholder="Nombre de usuario"
              required
              onChange={handleChangeUser}
            />
            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              required
              onChange={handleChangePassword}
            />
            <button formMethod="post" type="button" onClick={verificarUsuario}>
              Iniciar Sesión
            </button>
            <button type="button" onClick={toggle}>
              Recuperar Contraseña
            </button>
          </form>
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Recuperar Contraseña</ModalHeader>
        <ModalBody>
          { alerta && (
            <div class={`alert alert-${alertColor}`} role="alert" display={alerta}>
              {alertMessage}
            </div>
          )} 

          <div className="d-flex flex-column mt-2 px-3">
            <label htmlFor="username">Nombre de Usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="d-flex flex-column my-2 px-3">
            <label htmlFor="correo">Correo electrónico:</label>
            <input
              type="email"
              id="correo"
              name="correo"
              required
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={verificarRecuperacion}>
            Recuperar
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export { Login }