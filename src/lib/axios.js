import axios from "axios";

export default axios.create({
  baseURL: "https://61601920faa03600179fb8d2.mockapi.io",
  headers: {
    "Content-type": "application/json",
  },
});
