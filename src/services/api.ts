import { signOut } from "@/utils/sign-out";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333/",
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response?.data.message == "Unauthorized."
    ) {
      signOut();
    }

    return Promise.reject(error);
  }
);
