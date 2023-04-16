import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie/cjs/Cookies";
import icon2 from "../assets/images/user-icon-2.png"

const cookies = new Cookies()

const Sidebar = () => {
	const [isExpanded, setExpendState] = useState(false);
	const isUserAuthenticated = true

	const menuItems = [
		{
			text: "Inicio",
			icon: "bx bx-collection",
			path: "/dashboard",
			minUserLevel: 1,
		},
		{
			text: "Compras",
			icon: "bx bx-collection",
			path: "/Compras",
			minUserLevel: 2
		},
		{
			text: "Ventas",
			icon: "sbx bx-book-alt",
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
			icon: "bx bx-plug",
			path: "/inventario",
			minUserLevel: 2
		},
		{
			text: "Usuarios",
			icon: "bx bx-compass",
			path: "/usuarios",
			minUserLevel: 3
		},
		{
			text: "Mantenimiento",
			icon: "bx bx-history",
			path: "/mantenimiento",
			minUserLevel: 3
		},
		{
			text: "Ayuda",
			icon: "bx bx-history",
			path: "/ayuda",
			minUserLevel: 1
		},
	];

	const userData = {
		username: cookies.get('username'),
		nombre: cookies.get('nombre'),
		idCargo: cookies.get('cargo').id,
		cargo: cookies.get('cargo').nombre,
		icon: icon2
	};



	const cerrarSesion = () => {
		cookies.remove('id', {path: "/"})
		window.location.href="/dashboard"
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
				<div className= "nav-heading">
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
						<Link
							className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
							to={path}
						>
							<i className={icon}/>
							{isExpanded && <p> {text}</p>}
						</Link>
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
								{ isUserAuthenticated ? userData.nombre : "Usuario Actual" }
							</p>
							<p className="nav-footer-user-position">
								{ isUserAuthenticated ? userData.cargo : "Cargo" }
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