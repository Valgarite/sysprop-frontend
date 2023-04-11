import dashboard from "../pages/dashboard";
import clientes from "../pages/clientes";
import compras from "../pages/compras";
import ayuda from "../pages/ayuda";
import ventas from "../pages/ventas";
import usuarios from "../pages/usuarios";
import inventario from "../pages/inventario";
import proveedores from "../pages/proveedores";
import mantenimiento from "../pages/mantenimiento";

const routes = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      component: dashboard,
    },
    {
      title: 'Clientes',
      path: '/clientes',
      component: clientes,
    },
    {
      title: 'Compras',
      path: '/Compras',
      component: compras,
    },
    {
      title: 'Ventas',
      path: '/ventas',
      component: ventas,
    },
    {
      title: 'Inventario',
      path: '/inventario',
      component: inventario,
    },
    {
      title: 'Proveedores',
      path: '/proveedores',
      component: proveedores,
    },
    {
      title: 'Usuarios',
      path: '/usuarios',
      component: usuarios,
    },
    {
      title: 'Mantenimiento',
      path: '/mantenimiento',
      component: mantenimiento,
    },
    {
      title: 'Ayuda',
      path: '/ayuda',
      component: ayuda,
    },

  ];
  
  export default routes;