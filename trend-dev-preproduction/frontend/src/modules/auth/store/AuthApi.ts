import axios from "axios";
const $api = axios.create({
  baseURL: process.env.REACT_APP_REST_API,
});

export const authApi = {
  login(data: any) {
    const { username, password } = data;
    return $api.post<any>("/login", { username, password });
  },
  registration(data: any) {
    const { username, password, lang } = data;
    return $api.post<any>("/registration", { username, password, lang });
  },
};
