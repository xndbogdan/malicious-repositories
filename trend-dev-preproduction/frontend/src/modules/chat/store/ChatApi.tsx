import axios from "axios";

const $api = axios.create({
  baseURL: process.env.REACT_APP_REST_API,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export const chatApi = {
  chat(data) {
    return $api.post<any>("/chat", { message: data });
  },
  chats() {
    return $api.get<any>("/chats");
  },
};
