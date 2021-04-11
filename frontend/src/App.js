import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import LoginPage from './pages/login';
import EmpresasPage from './pages/empresas';

export default function App() {
  return (
    <Router>
      <Switch basename={`/`}>
        <Route exact path="/">
          <EmpresasPage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/empresas">
          <EmpresasPage />
        </Route>
      </Switch>
    </Router>
  );
}