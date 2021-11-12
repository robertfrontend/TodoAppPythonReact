import axios from "axios";

export const baseURL = "https://todopythonrobertfronted.herokuapp.com";
// export const baseURL = "http://127.0.0.1:8000";

export const API = axios.create({
  baseURL: baseURL,
});
