import { Dashboard } from "../pages/dashboard";
import Clientes from "../pages/Clientes";
import { Compras } from "../pages/compras";
import Ayuda from "../pages/Ayuda";
import Ventas from "../pages/Ventas";
import Usuarios from "../pages/Usuarios";
import Inventario from "../pages/Inventario";
import Proveedores from "../pages/Proveedores";
import Mantenimiento from "../pages/Mantenimiento";
import { Login } from "../pages/Login";
import Reportes from "../pages/Reportes";
import Plantilla from "../pages/Plantilla";


const routes = [
    {
      title: 'Login',
      path: '/login',
      component: Login,
    },
    {
      title: 'Dashboard',
      path: '/Dashboard',
      component: Dashboard,
    },
    {
      title: 'Clientes',
      path: '/Clientes',
      component: Clientes,
    },
    {
      title: 'Compras',
      path: '/Compras',
      component: Compras,
    },
    {
      title: 'Ventas',
      path: '/Ventas',
      component: Ventas,
    },
    {
      title: 'Inventario',
      path: '/Inventario',
      component: Inventario,
    },
    {
      title: 'Proveedores',
      path: '/Proveedores',
      component: Proveedores,
    },
    {
      title: 'Usuarios',
      path: '/Usuarios',
      component: Usuarios,
    },
    {
      title: 'Mantenimiento',
      path: '/Mantenimiento',
      component: Mantenimiento,
    },
    {
      title: 'Ayuda',
      path: '/Ayuda',
      component: Ayuda,
    },
    {
      title: 'Reportes',
      path: '/Reportes',
      component: Reportes,
    },
    {
      title: 'Plantilla',
      path: '/Plantilla',
      component: Plantilla,
    },
    {
      title: 'Home',
      path: '/',
      component: Login
    }
  ];
  
  export default routes;