import React, { useState, useEffect } from "react";

import { Form, FormGroup, Label, Input } from "reactstrap";

import { Modal, FormOpenned } from "./styles";
import api from "../../services/api";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

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

  const createUser = async (e) => {
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
      const response = await api.post("/user", {
        email: mail,
        full_name: name,
        password,
      });

      console.log(response.data);

      toggleForm(false);
    } catch (error) {
      console.log(error, error.response);
    }
  };

  return (
    <Dialog
      open={form}
      onClose={() => {}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      keepMounted={false}
    >
      <DialogTitle id="alert-dialog-title">New user</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please, to register a new user, just fill up all requireds fields
          below and click on the "save" button
        </DialogContentText>
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
            <Label>Name *</Label>
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
            <Label>Password *</Label>
            <Input
              type="password"
              required
              invalid={invalid.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="*********"
            />
          </FormGroup>
        </Form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => toggleForm(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={createUser} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
