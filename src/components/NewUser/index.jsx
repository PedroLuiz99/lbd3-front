import React, { useState, useEffect } from "react";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Jumbotron,
  ButtonGroup,
} from "reactstrap";

import { Modal, FormOpenned } from "./styles";
import api from "../../services/api";

export default function NewUser({ modal: form, toggleModal: toggleForm }) {
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [invalid, setInvalid] = useState({
    mail: false,
    name: false,
    password: false,
  });

  const reset = () => {
    setMail("");
    setName("");
    setPassword("");
  };

  useEffect(() => {
    reset();
  }, [form]);

  const createUser = (e) => {
    e.preventDefault();

    const errors = { ...invalid };

    errors.mail = !mail;
    errors.name = !name;
    errors.password = !password;

    console.log(errors);

    if (errors.mail || errors.name || errors.password) {
      return setInvalid(errors);
    }

    try {
      const response = api.post("/user", {
        email: mail,
        full_name: name,
        password,
      });

      console.log(response.data);

      if (response.statusCode === 201) {
        toggleForm(false);
      }
    } catch (error) {
      console.log(error, error.response);
    }
  };

  return (
    <Modal isOpen={form} backdrop="static">
      <Jumbotron>
        <h2>Novo usuário</h2>
      </Jumbotron>
      <FormOpenned>
        <Form>
          <FormGroup>
            <Label>E-mail *</Label>
            <Input
              type="email"
              required
              invalid={invalid.mail}
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              placeholder="xxx@xxx.xxx"
            />
          </FormGroup>
          <FormGroup>
            <Label>Nome *</Label>
            <Input
              type="text"
              required
              invalid={invalid.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="XXXXXX XX XXXXXXXXX"
            />
          </FormGroup>
          <FormGroup>
            <Label>Senha *</Label>
            <Input
              type="password"
              required
              invalid={invalid.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*********"
            />
          </FormGroup>
          <ButtonGroup>
            <Button onClick={createUser} color="warning" type="button">
              Cadastrar
            </Button>
            <Button onClick={() => toggleForm(false)} color="danger">
              Cancelar
            </Button>
          </ButtonGroup>
        </Form>
      </FormOpenned>
    </Modal>
  );
}
