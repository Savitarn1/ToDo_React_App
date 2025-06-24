import axios from "axios";

const client = axios.create({
  baseURL: "https://to-do-react-app-fawn.vercel.app/api",
  headers: {
    "Content-Type": "application/json"
  },
});

export default client;
