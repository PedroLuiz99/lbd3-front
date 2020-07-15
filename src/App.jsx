import React from "react";

import Routes from "./routes";

import GlobalStyle from "./styles/global";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import MomentUtils from "@date-io/moment";

const App = () => (
  <>
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <GlobalStyle />
      <Routes />
    </MuiPickersUtilsProvider>
  </>
);

export default App;
