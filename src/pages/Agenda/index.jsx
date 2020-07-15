import React, { useState, useEffect, useMemo } from "react";

import api from "../../services/api";

import Header from "../../components/Header";

import { Container, CardContainer, Card } from "./styles";
import { useHistory } from "react-router-dom";

import fakeData from "./fake_data.json";
import parseEvents from "../../services/api/parseEvents";
import Events from "../../components/Events";

const Agenda = () => {
  const [responseData, setResponseData] = useState([]);
  const [token, setToken] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const sessionToken = token || sessionStorage.getItem("token");

    if (!sessionToken) {
      return history.push("/");
    }

    if (!token) {
      return setToken(sessionToken);
    }
  }, [token, history]);

  useEffect(() => {
    if (token) {
      loadEvents();
    }
  }, [token]);

  const events = useMemo(
    () => (responseData.length && parseEvents(responseData)) || {},
    [responseData]
  );

  const loadEvents = async () => {
    const response = await api.get("/event", {
      headers: {
        Authorization: token,
      },
    });

    console.log(response);

    setResponseData(fakeData);
  };

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
            </header>
            <h1 data-testid="balance-income">R$ 5.000,00</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
            </header>
            <h1 data-testid="balance-outcome">R$ 1.000,00</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
            </header>
            <h1 data-testid="balance-total">R$ 4000,00</h1>
          </Card>
        </CardContainer>
        <Events events={events} />
      </Container>
    </>
  );
};

export default Agenda;
