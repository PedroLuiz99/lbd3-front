import React, { useState, useEffect } from "react";

import { Container, Card, Submit, LogoArea, SubmitArea } from "./styles";

import Logo from "../../assets/logo.png";
import NewUser from "../../components/NewUser";

import api from "../../services/api";

import {
  CardBody,
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
        console.log(response.data);
        sessionStorage.setItem("token", response.data.Authorization);
        toggleLogged(true);
        toggleWrong(false);
      }
    } catch (error) {
      toggleWrong(true);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <NewUser modal={modal} toggleModal={toggleModal}></NewUser>
      <Container>
        <Card>
          <CardHeader>
            <LogoArea>
              <img src={Logo} width="100px" alt="Logotipo do Instituto" />
            </LogoArea>
          </CardHeader>
          <CardBody>
            <Form>
              {wrong && (
                <Alert color="danger">Usuário ou senha inválidos.</Alert>
              )}
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
                <Label for="examplePassword">Senha</Label>
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
                    Entrar
                  </Submit>
                  <Submit type="button" onClick={toggleModal} color="secondary">
                    Cadastrar
                  </Submit>
                </ButtonGroup>
              </SubmitArea>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}
