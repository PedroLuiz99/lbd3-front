import React from "react";
import { Container } from "./styles";

import Logo from "../../assets/logo.png";
import { useHistory } from "react-router-dom";

const Header = ({ size = "large" }) => {
  const history = useHistory();

  const logout = () => {
    sessionStorage.clear();
    history.push("/");
  };

  return (
    <Container size={size}>
      <header>
        <img height="100px" src={Logo} />
        <nav>
          <a onClick={logout}>Sair</a>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
