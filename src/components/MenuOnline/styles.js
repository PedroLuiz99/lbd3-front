import styled from "styled-components";

import { Button } from "reactstrap";

export const Options = styled.div`
  display: flex;
  flex: 1;
  background: #c4c4c4;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
`;

export const Item = styled.div`
  margin: 5px;
`;

export const TextBold = styled.span`
  font-weight: bold;
`;

export const LinkTo = styled(Button)`
  width: 100px;
`;
