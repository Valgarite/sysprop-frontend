import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie/cjs/Cookies";
import icon1 from "../assets/images/user-icon-1.png"
import icon2 from "../assets/images/user-icon-2.png"
import icon3 from "../assets/images/user-icon-gt.png"
import iconDef from "../assets/images/user-default.png"

const cookies = new Cookies()

const Sidebar = () => {
	const [isExpanded, setExpendState] = useState(false);
	const isUserAuthenticated = true

	const menuItems = [
		{
			text: "Inicio",
			icon: "bx bx-home",
			path: "/dashboard",
			minUserLevel: 1,
		},
		{
			text: "Compras",
			icon: "bx bx-shopping-bag",
			path: "/Compras",
			minUserLevel: 2
		},
		{
			text: "Ventas",
			icon: "bx bx-store",
			path: "/ventas",
			minUserLevel: 1
		},
		{
			text: "Clientes",
			icon: "bx bx-book-alt",
			path: "/clientes",
			minUserLevel: 1
		},
		{
			text: "Proveedores",
			icon: "bx bx-line-chart",
			path: "/proveedores",
			minUserLevel: 2
		},
		{
			text: "Inventario",
			icon: "bx bx-book-content",
			path: "/inventario",
			minUserLevel: 2
		},
		{
			text: "Usuarios",
			icon: "bx bxs-user-detail",
			path: "/usuarios",
			minUserLevel: 3
		},
		{
			text: "Mantenimiento",
			icon: "bx bx-key",
			path: "/mantenimiento",
			minUserLevel: 1
		},
		{
			text: "Ayuda",
			icon: "bx bx-help-circle",
			path: "/ayuda",
			minUserLevel: 1
		},
	];

	const isAuth = (cookies.get('id')) ? true : false

	const userData = {
    username: isAuth ? cookies.get("username") : "noCurrentUser",
    nombre: isAuth ? cookies.get("nombre") : "Nombre del Usuario",
    idCargo: isAuth ? cookies.get("cargo").id : 0,
    cargo: isAuth ? cookies.get("cargo").nombre : "Cargo",
    icon: isAuth
      ? cookies.get("cargo").id === 1
        ? icon1
        : cookies.get("cargo").id === 2
        ? icon2
        : cookies.get("cargo").id === 3
        ? icon3
        : iconDef
      : iconDef
  };

	const [activeTab, setActiveTab] = useState("");

	const cerrarSesion = () => {
		cookies.remove('id', { path: "/" })
		cookies.remove('nombre', { path: "/" })
		cookies.remove('username', { path: "/" })
		cookies.remove('cedula', { path: "/" })
		cookies.remove('fechaNacimiento', { path: "/" })
		cookies.remove('correo', { path: "/" })
		cookies.remove('estadoActivo', { path: "/" })
		cookies.remove('cargo', { path: "/" })
		window.location.href = "/login"
	}

	return (
		<div
			id="sidebar"
			className={
				isExpanded
					? "side-nav-container"
					: "side-nav-container side-nav-container-NX"
			}
		>
			<div className="nav-upper">
				<div className="nav-heading">
					{isExpanded && (
						<div className="nav-brand">
							<img src="icons/Logo.svg" alt="Logo" srcset="" />
							<h2 className="nav-brand-title">
								<Link className="nav-title-link" to="/dashboard">SysProp Gelato</Link>
							</h2>
						</div>
					)}
					<button
						className={
							isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
						}
						onClick={() => setExpendState(!isExpanded)}
					>
						<span></span>
						<span></span>
						<span></span>
					</button>
				</div>
				<div className="nav-menu">
					{menuItems.map(({ text, icon, path, minUserLevel }) => (
						(userData.idCargo >= minUserLevel) &&
						<div className="menu-item-container">
							<Link
								className={isExpanded ? "menu-item fw-semibold" : "menu-item menu-item-NX"}
								to={path}
								onMouseEnter={() => {
									if (!isExpanded) {
										setActiveTab(text);
									}
								}}
								onMouseLeave={() => {
									if (!isExpanded) {
										setActiveTab("");
									}
								}}
							>
								<i className={icon} />
								{isExpanded && <p> {text}</p>}
							</Link>
							{!isExpanded && activeTab === text && (
								<div id="menu-item-name" className="hover-text">{text}</div>
							)}
						</div>
					))}
				</div>
			</div>
			<div className="nav-footer">
				{isExpanded && (
					<div className="nav-details">
						<img
							className="nav-footer-avatar"
							src={userData.icon}
							alt="Usuario"
						/>
						<div className="nav-footer-info">
							<p className="nav-footer-user-name">
								{isUserAuthenticated ? userData.nombre : "Usuario Actual"}
							</p>
							<p className="nav-footer-user-position">
								{isUserAuthenticated ? userData.cargo : "Cargo"}
							</p>
						</div>
					</div>
				)}
				<Link to="/login" className="logout-link" onClick={cerrarSesion}>
					<img className="logout-icon" src="icons/logout.svg" alt="" srcset="" />
				</Link>
			</div>

		</div>
	);
};

export default Sidebar;