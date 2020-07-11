import React from "react";

import { Options, TextBold, Item, LinkTo } from "./styles";

export default function MenuOnline({ history, toggleNewPost }) {
  return (
    <Options>
      <Item>
        <LinkTo onClick={() => {}} color="warning">
          <TextBold>Comunicação</TextBold>
        </LinkTo>
      </Item>
      <Item>
        <LinkTo onClick={() => {}} color="warning">
          <TextBold>Aulas</TextBold>
        </LinkTo>
      </Item>
      <Item>
        <LinkTo onClick={() => {}} color="warning">
          <TextBold>Eventos</TextBold>
        </LinkTo>
      </Item>
      <Item>
        <LinkTo onClick={() => {}} color="warning">
          <TextBold>Matrículas</TextBold>
        </LinkTo>
      </Item>
      <Item>
        <LinkTo
          onClick={() => {
            localStorage.clear();
            history.push("/");
          }}
          color="danger"
        >
          <TextBold>Sair</TextBold>
        </LinkTo>
      </Item>
    </Options>
  );
}
