import React, { useState, useEffect } from "react";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Jumbotron,
  ButtonGroup
} from "reactstrap";

import { Container, Modal, FormClosed, FormOpenned } from "./styles";

export default function NewPost({ onPostCreated }) {
  const [form, toggleForm] = useState(false);
  const [author, changeAuthor] = useState(``);
  const [title, changeTitle] = useState(``);
  const [subTitle, changeSubTitle] = useState(``);
  const [message, changeMessage] = useState(``);
  const [avatar, changeAvatar] = useState(``);

  const [invalid, setInvalid] = useState({
    postUrl: false,
    author: false,
    title: false,
    createdAt: false,
    subTitle: false,
    message: false
  });

  useEffect(() => {
    reset();
  }, [form]);

  const reset = () => {
    changeAuthor(``);
    changeTitle(``);
    changeSubTitle(``);
    changeMessage(``);
    changeAvatar(``);
  };

  const createPost = e => {
    let error = false;

    const newInvalids = { ...invalid };

    if (!title) {
      newInvalids.title = true;
      error = true;
    } else {
      newInvalids.title = false;
    }

    if (!subTitle) {
      newInvalids.subTitle = true;
      error = true;
    } else {
      newInvalids.subTitle = false;
    }
    if (!author) {
      newInvalids.author = true;
      error = true;
    } else {
      newInvalids.author = false;
    }
    if (!message) {
      newInvalids.message = true;
      error = true;
    } else {
      newInvalids.message = false;
    }

    if (error) {
      setInvalid(newInvalids);
      return false;
    }

    const id = Math.random() * 1000;

    onPostCreated({
      _id: id,
      postUrl: "./post/" + id,
      author,
      avatar,
      title,
      createdAt: Date.now(),
      subTitle,
      message
    });

    toggleForm(false);
  };

  return (
    <Container>
      {form ? (
        <Modal isOpen={form} backdrop={"static"}>
          <Jumbotron>
            <h2>Cadastrar uma nova postagem</h2>
          </Jumbotron>
          <FormOpenned>
            <Form>
              <FormGroup>
                <Label>Título *</Label>
                <Input
                  type="text"
                  required={true}
                  invalid={invalid.title}
                  value={title}
                  onChange={e => changeTitle(e.target.value)}
                  placeholder="..."
                />
              </FormGroup>
              <FormGroup>
                <Label>Sub-título *</Label>
                <Input
                  type="text"
                  placeholder="..."
                  invalid={invalid.subTitle}
                  required={true}
                  value={subTitle}
                  onChange={e => changeSubTitle(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Conteúdo *</Label>
                <Input
                  type="textarea"
                  required={true}
                  invalid={invalid.message}
                  value={message}
                  onChange={e => changeMessage(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>Autor *</Label>
                <Input
                  type="text"
                  placeholder="..."
                  invalid={invalid.author}
                  required={true}
                  value={author}
                  onChange={e => changeAuthor(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>URL do avatar do autor</Label>
                <Input
                  type="text"
                  placeholder="..."
                  invalid={invalid.avatar}
                  value={avatar}
                  onChange={e => changeAvatar(e.target.value)}
                />
              </FormGroup>
              <ButtonGroup>
                <Button onClick={createPost} color="warning" type="submit">
                  Cadastrar
                </Button>
                <Button onClick={() => toggleForm(false)} color="danger">
                  Cancelar
                </Button>
              </ButtonGroup>
            </Form>
          </FormOpenned>
        </Modal>
      ) : (
        <FormClosed>
          <Button onClick={() => toggleForm(true)} color="info">
            Criar nova publicação
          </Button>
        </FormClosed>
      )}
    </Container>
  );
}
