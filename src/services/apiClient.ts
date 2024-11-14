import axios from "axios";
const baseURL = import.meta.env.VITE_APIURL;
if (!baseURL)
  console.error("API URL is not defined. Please check your environment variables.");

const apiClient = axios.create({
  baseURL
});

apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
