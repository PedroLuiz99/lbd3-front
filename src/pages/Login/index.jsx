import React, { useState, useEffect } from "react";

import { Container, Submit, LogoArea, SubmitArea } from "./styles";

import Logo from "../../assets/logo.png";
import NewUser from "../../components/NewUser";

import api from "../../services/api";

import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import { useToasts } from "react-toast-notifications";

import {
  FormGroup,
  Label,
  CardHeader,
  Input,
  Form,
  Alert,
  ButtonGroup,
} from "reactstrap";

export default function Login({ history }) {
  const [username, changeUsername] = useState("");
  const [password, changePassword] = useState("");
  const [modal, setModal] = useState(false);
  const [wrong, toggleWrong] = useState(false);
  const [logged, toggleLogged] = useState(false);

  const { addToast } = useToasts();

  useEffect(() => {
    if (logged) {
      history.push("/agenda");
    }
  }, [logged, history]);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      history.push("/agenda");
    }
  }, [history]);

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email: username,
        password: password,
      });

      if (response.data) {
        sessionStorage.setItem("token", response.data.Authorization);
        toggleLogged(true);
        toggleWrong(false);
      }
    } catch (error) {
      addToast("The provided credentials are wrong", {
        appearance: "error",
        autoDismiss: true,
      });
      toggleWrong(true);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <Container>
      <NewUser modal={modal} toggleModal={toggleModal}></NewUser>
      <Card style={{ width: "25vw" }}>
        <CardHeader>
          <LogoArea>
            <img src={Logo} width="100px" alt="Logotipo do Instituto" />
          </LogoArea>
        </CardHeader>
        <CardContent>
          <Form>
            <FormGroup>
              <Label for="exampleLogin">Login</Label>
              <Input
                type="login"
                name="login"
                value={username}
                onChange={(e) => changeUsername(e.target.value)}
                placeholder="exemplo@exemplo.com.br"
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={(e) => changePassword(e.target.value)}
                placeholder="******************"
              />
            </FormGroup>
            <SubmitArea>
              <ButtonGroup>
                <Submit type="submit" onClick={login} color="warning">
                  Login
                </Submit>
                <Submit type="button" onClick={toggleModal} color="secondary">
                  Register
                </Submit>
              </ButtonGroup>
            </SubmitArea>
          </Form>
        </CardContent>
      </Card>
    </Container>
  );
}
