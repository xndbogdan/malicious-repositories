import axios from "axios";

const $api = axios.create({
  baseURL: process.env.REACT_APP_REST_API,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export const usersApi = {
  users() {
    return $api.get<any>("/users");
  },
};
