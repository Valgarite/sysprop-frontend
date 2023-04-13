import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import routes from './routes/routes';
import Cookies from 'universal-cookie/cjs/Cookies';

//Obtener data de APIs:
import DataFetching from "./DataFetching"

// authState = () => {
//   cookies.get('id') ? alert("AUTENTICADO") : alert("NEGATIVO") 
// }
var isOpen = true;

function App() {
  
  return (
    <React.Fragment>
        <Router>
        <Switch>
          {routes.map((route) => (<Route key={route.path} path={route.path} component={route.component}/>)
          )}
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;