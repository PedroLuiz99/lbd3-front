import React from "react";

import { TableContainer } from "./styles";

const Events = ({ events }) => {
  if (!events || !Object.keys(events).length) {
    return null;
  }

  console.log("refresh");

  console.log(events);

  return (
    <>
      {Object.entries(events).map(([, year], i) => (
        <TableContainer key={i}>
          <h3>{year.year}</h3>
          {Object.entries(year.months).map(([, month], j) => (
            <div key={j}>
              <h4>{month.month_label}</h4>
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
