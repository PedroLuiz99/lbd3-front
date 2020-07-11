import React from "react";

import { Options, TextBold, Item, LinkTo } from "./styles";

export default function MenuOnline({ history }) {
  return (
    <Options>
      <Item>
        <LinkTo
          onClick={() => {
            history.push("/login");
          }}
          color="warning"
        >
          <TextBold>Área Interna</TextBold>
        </LinkTo>
      </Item>
    </Options>
  );
}
