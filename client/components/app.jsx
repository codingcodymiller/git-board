import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Login from './login';
import Home from './home';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/home/:token">
            <Home />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    );
  }
}
