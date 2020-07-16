import React, { useState, useEffect } from "react";

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
    try {
      console.log(event);
      await api.put(
        `/event/${event.id}`,
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
    } catch (err) {
      console.error(err, err.response);
    } finally {
      refreshList();
    }
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
        title="Do you want delete this event?"
        handleClose={handleCloseModal}
        handleAgree={handleDeleteEvent}
        description="One time deleted, you have to create a new event to 'restore' it."
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
                        <th colSpan="4">Day {day.day}</th>
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
                            <a onClick={openEditModal(event)}>Edit</a>
                            <a onClick={openDeleteModal(event.event_id)}>
                              Delete
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
