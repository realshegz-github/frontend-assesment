import axios, { AxiosError, type AxiosResponse } from "axios";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "https://swapi.dev/api/";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => {
    const status = error.response?.status;
    const message =
      (error.response?.data as { detail: string })?.detail || error.message;
    console.error(`API Error [${status || "NETWORK"}]:`, message);
    // Reject the promise so the Redux thunk can catch the error
    return Promise.reject(message);
  }
);

export default api;
