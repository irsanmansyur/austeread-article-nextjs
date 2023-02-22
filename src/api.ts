import Axios from "axios";

let urls = {
  test: `http://localhost:4023/api/`,
  development: process.env.NEXT_PUBLIC_BASE_API,
  production: "https://your-production-url.com/",
};
const api = Axios.create({
  baseURL: urls[process.env.NODE_ENV || "test"],
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default api;
