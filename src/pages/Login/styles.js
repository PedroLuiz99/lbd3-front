import styled from "styled-components";
import { Button } from "reactstrap";

export const Container = styled.div`
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const LogoArea = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;
export const SubmitArea = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const Submit = styled(Button)`
  display: flex;
  width: 100px;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;
