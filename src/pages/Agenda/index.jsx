import React, { useState, useEffect, useMemo, useCallback } from "react";

import api from "../../services/api";

import Header from "../../components/Header";

import { Container, Title } from "./styles";
import { useHistory } from "react-router-dom";

import parseEvents from "../../services/parseEvents";
import Events from "../../components/Events";

const Agenda = () => {
  const [responseData, setResponseData] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
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

  const events = useMemo(
    () => (responseData.length && parseEvents(responseData)) || {},
    [responseData]
  );

  const loadEvents = useCallback(async () => {
    try {
      const response = await api.get("/event", {
        headers: {
          Authorization: token,
        },
      });

      // console.log(response);

      setResponseData(response.data.data);
    } catch (err) {
      console.error(err, err.response);
      setResponseData([]);
    }
  }, [token]);

  useEffect(() => {
    if (token && lastUpdate) {
      loadEvents();
    }
  }, [lastUpdate, token, loadEvents]);

  return (
    <>
      <Header token={token} setLastUpdate={setLastUpdate} />
      <Container>
        {responseData.length ? (
          <Events events={events} token={token} refreshList={loadEvents} />
        ) : (
          <>
            <Title>Sorry, we have no events to you :(</Title>
            <br></br>
            <Title>
              But, you can create one by clicking on top menu button called by
              `new event`!
            </Title>
          </>
        )}
      </Container>
    </>
  );
};

export default Agenda;
