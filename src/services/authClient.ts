import axios from "axios";
const baseAuthURL = import.meta.env.VITE_AUTH_APIURL;
if (!baseAuthURL)
  console.error("Auth API URL is not defined. Please check your environment variables.");

const apiAuthClient = axios.create({
  baseURL: baseAuthURL
});

export default apiAuthClient;
