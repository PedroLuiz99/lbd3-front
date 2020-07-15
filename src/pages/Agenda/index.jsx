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
    try {
      const response = await api.get("/event", {
        headers: {
          Authorization: token,
        },
      });

      console.log(response);

      setResponseData(fakeData);
    } catch (err) {
      console.error(err, err.response);
      setResponseData([]);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Events events={events} token={token} refreshList={loadEvents} />
      </Container>
    </>
  );
};

export default Agenda;
