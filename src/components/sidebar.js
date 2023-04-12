import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
	const [isExpanded, setExpendState] = useState(true);
	const menuItems = [
		{
			text: "Inicio",
			icon: "bx bx-collection",
			path: "/dashboard",
		},
		{
			text: "Compras",
			icon: "bx bx-collection",
			path: "/Compras",
		},
		{
			text: "Ventas",
			icon: "sbx bx-book-alt",
			path: "/ventas",
		},
		{
			text: "Clientes",
			icon: "bx bx-book-alt",
			path: "/clientes",
		},
		{
			text: "Proveedores",
			icon: "bx bx-line-chart",
			path: "/proveedores",
		},
		{
			text: "Inventario",
			icon: "bx bx-plug",
			path: "/inventario",
		},
		{
			text: "Usuarios",
			icon: "bx bx-compass",
			path: "/usuarios",
		},
		{
			text: "Mantenimiento",
			icon: "bx bx-history",
			path: "/mantenimiento",
		},
		{
			text: "Ayuda",
			icon: "bx bx-history",
			path: "/ayuda",
		},
	];
	return (
		<div
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
							<h2 className="nav-brand-title">SysProp Gelato</h2>
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
					{menuItems.map(({ text, icon, path }) => (
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
							src="icons/admin-avatar.svg"
							alt="Usuario"
							srcset=""
						/>
						<div className="nav-footer-info">
							<p className="nav-footer-user-name">Julio Pacheco</p>
							<p className="nav-footer-user-position">Administrador</p>
						</div>
					</div>
				)}
				<Link to = "/" className="logout-link">
					<img className="logout-icon" src="icons/logout.svg" alt="" srcset="" />
				</Link>
			</div>
		</div>
	);
};

export default SideBar;