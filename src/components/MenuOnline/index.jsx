import React from "react";

import { Options, TextBold, Item, LinkTo } from "./styles";

export default function MenuOnline({ history, toggleNewPost }) {
  return (
    <Options>
      <Item>
        <LinkTo
          onClick={() => {
            sessionStorage.clear();
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
