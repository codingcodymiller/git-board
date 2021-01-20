import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Login from './login';
import Home from './home';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home/:token">
          <Home />
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}
