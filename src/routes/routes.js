import { Dashboard } from "../pages/dashboard";
import Clientes from "../pages/clientes";
import  Compras from "../pages/compras";
import Ayuda from "../pages/ayuda";
import Ventas from "../pages/ventas";
import Usuarios from "../pages/usuarios";
import Inventario from "../pages/inventario";
import Proveedores from "../pages/proveedores";
import Mantenimiento from "../pages/mantenimiento";
import { Login } from "../pages/Login";
import Reportes from "../pages/reportes";
import Plantilla from "../pages/plantilla";
import Plantillacompra from "../pages/plantillacompra";
import Reportescompras from "../pages/reportescompras";


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
      title: 'Plantilla compra',
      path: '/plantillacompra',
      component: Plantillacompra,
    },
    {
      title: 'Reportes Compras',
      path: '/reportescompras',
      component: Reportescompras
    },
    {
      title: 'Home',
      path: '/',
      component: Login,
    },
    
  ];
  
  export default routes;