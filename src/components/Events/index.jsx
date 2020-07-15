import React, { useState } from "react";

import { TableContainer } from "./styles";
import AlertDialog from "../AlertDialog";

import api from "../../services/api";
import EditEventDialog from "../EditEventDialog";

const Events = ({ events, token, refreshList }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [deleteEventSelected, setDeleteEventSelected] = useState(null);
  const [editEventSelected, setEditEventSelected] = useState(null);

  if (!events || !Object.keys(events).length) {
    return null;
  }

  const handleCloseModal = () => {
    setDeleteEventSelected(null);
    setEditEventSelected(null);
    setDeleteModal(false);
    setEditModal(false);
  };

  const handleDeleteEvent = async (_, event) => {
    try {
      await api.delete(`/event/${event.id}`, {
        headers: {
          Authorization: token,
        },
      });
    } catch (err) {
      console.error(err, err.response);
    } finally {
      refreshList();
    }
  };

  const handleEditEvent = async (_, event) => {
    console.log(event);
  };

  const openEditModal = (event) => () => {
    setEditEventSelected(event);
    setEditModal(true);
  };

  const openDeleteModal = (id) => () => {
    setDeleteEventSelected(id);
    setDeleteModal(true);
  };

  console.log("refresh");

  return (
    <>
      <AlertDialog
        open={deleteModal}
        customValues={{ id: deleteEventSelected }}
        title="Deseja excluir o evento?"
        handleClose={handleCloseModal}
        handleAgree={handleDeleteEvent}
        description="Uma vez excluído, será necessário criar um outro evento idêntico."
      />
      <EditEventDialog
        open={editModal}
        event={editEventSelected}
        handleClose={handleCloseModal}
        handleAgree={handleEditEvent}
      />
      {Object.entries(events).map(([, year], i) => (
        <TableContainer key={i}>
          {Object.entries(year.months).map(([, month], j) => (
            <div className="month" key={j}>
              <hr></hr>
              <h4>
                {year.year} - {month.month_label}
              </h4>
              {Object.entries(month.days).map(([, day], k) => (
                <div key={k}>
                  <table>
                    <thead>
                      <tr>
                        <th colSpan="4">Dia {day.day}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(day.events).map(([, event], m) => (
                        <tr key={m}>
                          <td className="time">
                            {event.time_start} - {event.time_end}
                          </td>
                          <td className="title">{event.event_name}</td>
                          <td align="right">
                            <a onClick={openEditModal(event)}>Editar</a>
                            <a onClick={openDeleteModal(event.event_id)}>
                              Excluir
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ))}
        </TableContainer>
      ))}
    </>
  );
};

export default Events;
