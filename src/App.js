import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import Sidebar from './components/sidebar';
import routes from './routes/routes';

//Obtener data de APIs:
import DataFetching from "./DataFetching"

function App() {
  return (
    <React.Fragment>
        <Router>
        <Sidebar/>
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} component={route.component}/>
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;