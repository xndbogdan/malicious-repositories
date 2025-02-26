import axios from "axios";

const $api = axios.create({
  baseURL: process.env.REACT_APP_REST_API,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export const userApi = {
  user() {
    return $api.get<any>("/user");
  },
  exp({ money, sword, fire, water, earth, air, healing }) {
    return $api.post<any>("/exp", {
      money,
      sword,
      fire,
      water,
      earth,
      air,
      healing,
    });
  },
  quest() {
    return $api.post<any>("/quest");
  },
  lang({ lang }) {
    return $api.post<any>("/lang", {
      lang,
    });
  },
};
