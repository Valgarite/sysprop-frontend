import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import routes from './routes/routes';
import Dashboard from './pages/dashboard';

function App() {
  
  return (
    <React.Fragment>
        <Router>
        <Switch>
          {routes.map((route) => (<Route key={route.path} path={route.path} component={route.component}/>)
          )}
          <Route path="/" component={Dashboard}/>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;