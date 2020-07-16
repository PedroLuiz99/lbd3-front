import React, { useState } from "react";
import { Container } from "./styles";

import Logo from "../../assets/logo.png";
import { useHistory } from "react-router-dom";
import CreateEventDialog from "../CreateEventDialog";
import api from "../../services/api";
import { useToasts } from "react-toast-notifications";

const Header = ({ size = "small", token, setLastUpdate }) => {
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const { addToast } = useToasts();

  const logout = () => {
    sessionStorage.clear();
    history.push("/");
  };

  const newEvent = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const hnadleCreateModal = async (_, event) => {
    try {
      await api.post(
        `/event`,
        {
          event_name: event.event_name,
          event_description: event.event_description,
          date_start: event.start_date,
          date_end: event.end_date,
          active: true,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      addToast("Awesome! Your event has been created!", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (err) {
      console.error(err, err.response);
      const message = "Your event is overlaping other event";

      addToast(message, {
        appearance: "error",
        autoDismiss: true,
      });
      throw err;
    } finally {
      setLastUpdate(Date.now());
    }
  };

  return (
    <Container size={size}>
      <CreateEventDialog
        open={modal}
        handleClose={handleCloseModal}
        handleAgree={hnadleCreateModal}
      />
      <header>
        <img height="100px" src={Logo} alt="foda-se" />
        <nav>
          <a href="#_" onClick={newEvent}>
            New event
          </a>
          <a href="#_" onClick={logout}>
            Logout
          </a>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
