import Dashboard from "../pages/Dashboard";
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
      path: '/dashboard',
      component: Dashboard,
    },
    {
      title: 'Clientes',
      path: '/clientes',
      component: Clientes,
    },
    {
      title: 'Compras',
      path: '/compras',
      component: Compras,
    },
    {
      title: 'Ventas',
      path: '/ventas',
      component: Ventas,
    },
    {
      title: 'Inventario',
      path: '/inventario',
      component: Inventario,
    },
    {
      title: 'Proveedores',
      path: '/proveedores',
      component: Proveedores,
    },
    {
      title: 'Usuarios',
      path: '/usuarios',
      component: Usuarios,
    },
    {
      title: 'Mantenimiento',
      path: '/mantenimiento',
      component: Mantenimiento,
    },
    {
      title: 'Ayuda',
      path: '/ayuda',
      component: Ayuda,
    },
    {
      title: 'Reportes',
      path: '/reportes',
      component: Reportes,
    },
    {
      title: 'Plantilla',
      path: '/plantilla',
      component: Plantilla,
    },
    {
      title: 'Home',
      path: '/',
      component: Login
    }
  ];
  
  export default routes;