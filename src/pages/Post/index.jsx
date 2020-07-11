import React from "react";

import {
  Container,
  CardFooterEdited,
  SubTitle,
  CardColumn,
  CreatedAt,
  TitleArea,
  DefaultHeader,
  Image,
  Title,
  Author
} from "./styles";

import {
  Card,
  CardHeader,
  CardText,
  CardBody,
  CardFooter,
  Button
} from "reactstrap";

const DEFAULT_IMAGE =
  "http://bioritmefestival.org/wp-content/uploads/2017/11/img-test.png";

export default function Post({ item }) {
  const preview = {
    ...item,
    subTitle:
      item.subTitle && item.subTitle.length > 30
        ? item.subTitle.substr(0, 30) + `...`
        : item.subTitle,
    message:
      item.message && item.message.length > 400
        ? item.message.substr(0, 400) + `...`
        : item.message
  };

  return (
    <Container>
      <Card>
        <CardHeader>
          <TitleArea>
            <DefaultHeader flex={"flex-start"}>
              <Title data-href={preview.postUrl}>{preview.title}</Title>
            </DefaultHeader>
            <DefaultHeader flex={"flex-end"}>
              <Author>{preview.author || "Administração"}</Author>
              <Image src={preview.avatar || DEFAULT_IMAGE} />
            </DefaultHeader>
          </TitleArea>
          <SubTitle>{preview.subTitle}</SubTitle>
        </CardHeader>
        <CardBody>
          <CardText>{preview.message}</CardText>
        </CardBody>
        <CardFooter>
          <CardFooterEdited>
            <CardColumn>
              <CreatedAt>
                Criado em: {new Date(preview.createdAt).toLocaleString()}
              </CreatedAt>
            </CardColumn>
            <CardColumn>
              <Button color="link">
                <CardText>Leia mais</CardText>
              </Button>
            </CardColumn>
          </CardFooterEdited>
        </CardFooter>
      </Card>
    </Container>
  );
}
