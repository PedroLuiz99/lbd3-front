import styled from "styled-components";

import { Modal as ModalOriginal } from "reactstrap";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 10px;
`;

export const FormOpenned = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  margin: 10px;
`;

export const FormClosed = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: flex-end;
`;

export const Modal = styled(ModalOriginal)`
  width: 1000px;
`;
