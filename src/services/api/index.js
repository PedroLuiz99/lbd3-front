import axios from "axios";

const baseURL = "http://0.0.0.0:5000";

const api = axios.create({ baseURL });

export default api;
