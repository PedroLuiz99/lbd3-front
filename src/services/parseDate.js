import moment from "moment";

export function parseToJSON(dateStr) {
  const date = moment(dateStr);

  return date.toISOString();
}

export function parseToSQL(dateStr) {
  const date = moment.utc(dateStr);

  return date.format("YYYY-MM-DD HH:mm:ss");
}
