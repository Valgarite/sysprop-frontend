import React, { useEffect, useState , Link , Component } from 'react'
import axios from 'axios'
import image from '../assets/images/logo-gelato.png'
import Cookies from 'universal-cookie'

const baseUrl = "https://sysprop-production.up.railway.app/usuarios"
const cookies = new Cookies();

let isAuth = false

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleChangeUser = async e => {
    setUsername(e.target.value)
  }
  const handleChangePassword = async e => {
    setPassword(e.target.value)
  }

  useEffect(() => {
    Redireccion()
  }, []);

  async function iniciarSesion() {
    await axios
      .get(baseUrl, {
        params: {
          username: username,
          password: password,
        },
      })
      .then((response) => {
        console.log(response.data);
        response.data.map((usuario, id) => {
          if(usuario.username === username && usuario.password===password){
            isAuth = true
            cookies.set('id', usuario.id, {path: "/"})
            cookies.set('username', usuario.username, {path: "/"})
            cookies.set('nombre', usuario.nombre, {path: "/"})
            cookies.set('cedula', usuario.cedula, {path: "/"})
            cookies.set('fechaNacimiento', usuario.fechaNacimiento, {path: "/"})
            cookies.set('correo', usuario.correo, {path: "/"})
            cookies.set('estadoActivo', usuario.estado_activo, {path: "/"})
            cookies.set('cargo', usuario.cargo, {path: "/"})
            window.location.href="/dashboard"
          }
        })
      })
      .catch((error) => {
        console.log(error);
      });

    !(isAuth) && window.alert("Datos incorrectos")
  } 

  const Redireccion = () => {
    if(cookies.get('id')){
      window.location.href="/dashboard";
    }
  }

  return (
    <div className="login-container">
      <div class="form-body">
        <img src={image} alt="user-login" />
        <p class="text">Bienvenido a SysProp</p>

        <form class="login-form">
          <input name="username" type="text" placeholder="Nombre de usuario" onChange={handleChangeUser}/>
          <input name="password" type="password" placeholder="Contraseña" onChange={handleChangePassword}/>
          <button formMethod='post' type="button" onClick={iniciarSesion}>
              Iniciar Sesión
          </button>
          <button type="button">Recuperar Contraseña</button>
        </form>
      </div>
    </div>
  );
}

export { Login }