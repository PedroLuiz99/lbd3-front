import React from "react";
import { Container } from "./styles";

import Logo from "../../assets/logo.png";
import { useHistory } from "react-router-dom";

const Header = ({ size = "small" }) => {
  const history = useHistory();

  const logout = () => {
    sessionStorage.clear();
    history.push("/");
  };

  const newEvent = () => {
    alert("novo evento");
  };

  return (
    <Container size={size}>
      <header>
        <img height="100px" src={Logo} />
        <nav>
          <a onClick={newEvent}>New event</a>
          <a onClick={logout}>Logout</a>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
