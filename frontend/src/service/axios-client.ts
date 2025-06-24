import axios from "axios";

const client = axios.create({
  baseURL: "https://todo-backend-jtsm.onrender.com/api",
  headers: {
    "Content-Type": "application/json"
  },
});

export default client;
