import axios from "axios";

const $api = axios.create({
  baseURL: process.env.REACT_APP_REST_API,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export const feedbackApi = {
  suggest(data: any) {
    const { message, email } = data;
    return $api.post<any>("/suggest", { message, email });
  },
  problem(data: any) {
    const { message, email } = data;
    return $api.post<any>("/problem", { message, email });
  },
};
