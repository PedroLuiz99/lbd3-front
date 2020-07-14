import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Agenda from "./pages/Agenda";
import Login from "./pages/Login";
import Main from "./pages/Main";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/agenda" component={Agenda} />
      <Route component={Main} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
