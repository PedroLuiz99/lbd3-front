import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Main from "./pages/Main";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/feed" component={Feed} />
      <Route component={Main} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
