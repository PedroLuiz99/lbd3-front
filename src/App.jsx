import React from "react";

import Routes from "./routes";

import GlobalStyle from "./styles/global";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import MomentUtils from "@date-io/moment";

import { ToastProvider } from "react-toast-notifications";

const App = () => (
  <>
    <ToastProvider autoDismiss>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <GlobalStyle />
        <Routes />
      </MuiPickersUtilsProvider>
    </ToastProvider>
  </>
);

export default App;
