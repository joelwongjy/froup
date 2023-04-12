import axios from "axios";

const api = axios.create({
  baseURL: "https://api.nusmods.com/v2",
  headers: { "Content-Type": "application/json" },
});

export { api };
