import moment from "moment";

const LABEL_MONTHS = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

function getFullDateInfo(dateStr) {
  const dateObject = moment.utc(dateStr);

  return {
    day: parseInt(dateObject.format("D"), 10),
    month: parseInt(dateObject.format("M"), 10),
    month_label: LABEL_MONTHS[dateObject.format("M")],
    year: dateObject.format("YYYY"),
    time_string: dateObject.format("HH:mm"),
    date: dateObject.toISOString(),
  };
}

function createYearSection(obj, date) {
  obj[date.year] = obj[date.year] || {
    year: date.year,
    months: {},
  };

  return obj;
}

function createMonthSection(obj, date) {
  obj[date.year].months[date.month] = obj[date.year].months[date.month] || {
    month: date.month,
    month_label: date.month_label,
    days: {},
  };
  return obj;
}

function createDaySection(obj, date) {
  obj[date.year].months[date.month].days[date.day] = obj[date.year].months[
    date.month
  ].days[date.day] || {
    day: date.day,
    events: [],
  };
  return obj;
}

function createEventSection(event, obj, startDate, endDate) {
  obj[startDate.year].months[startDate.month].days[startDate.day].events.push({
    start_date: startDate.date,
    end_date: endDate.date,
    time_start: startDate.time_string,
    time_end: endDate.time_string,
    event_id: event.event_id,
    user_id: event.user_id,
    event_name: event.event_name,
    event_description: event.event_description,
    active: event.active,
  });

  return obj;
}

function createEvent(event, obj, startDate, endDate) {
  obj = createYearSection(obj, startDate);
  obj = createMonthSection(obj, startDate);
  obj = createDaySection(obj, startDate);
  obj = createEventSection(event, obj, startDate, endDate);

  return obj;
}

export default function parseEvents(response) {
  let events = {};

  for (const event of response) {
    if (event.active) {
      const startDate = getFullDateInfo(event.date_start);
      const endDate = getFullDateInfo(event.date_end);

      events = createEvent(event, events, startDate, endDate);
    }
  }

  console.log(events);

  return events;
}
