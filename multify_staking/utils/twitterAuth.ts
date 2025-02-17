import axios, { AxiosResponse } from "axios";
import {
  IOAuth2RequestTokenResult,
  IParsedOAuth2TokenResult,
  UserV2,
} from "twitter-api-v2";
import { Storage } from "../helpers/storage";

export const twitterAuth = {
  login: async () => {
    const result = await axios.get<IOAuth2RequestTokenResult>("/api/authorize");
    console.log(result);
    Storage.setTwitterAuth_1(result.data);
    if (result.data.url) {
      window.open(result.data.url, "_self");
    }
  },
  getTwitterToken: async (code: string, state: string) => {
    const twitterData = Storage.getTwitterAuth_1();
    if (twitterData) {
      try {
        const { codeVerifier, state: sessionState } = twitterData;
        const payload = { codeVerifier, state, code, sessionState };
        const data = await axios.post<authRes>("/api/authorize", payload);
        Storage.setTwitterAuthToken(data.data);
        console.log(data.data);
        return {
          hasError: false,
          status: "success",
        };
      } catch (error) {
        return {
          hasError: true,
          status: "error" + error,
        };
      }
    }
  },
};

export const twitterApi = axios.create({
  baseURL: "/api/twitter-v2",
  headers: {
    "Content-Type": "application/json",
  },
});
twitterApi.interceptors.response.use(
  (response: AxiosResponse<any, any>) => response,
  async (error: any) => {
    debugger;
    const request = error.config;
    const { code: status } = error.response.data.error;
    const isRetry = Storage.getIsRetry();
    if (status == 403 && !isRetry) {
      Storage.setIsRetry(true);
      const isSuccess = await refreshToken();
      if (isSuccess) return axios(request);
    }
    if (status == 401 && !isRetry) {
      Storage.setIsRetry(true);
      twitterAuth.login();
    }

    return Promise.reject(error.response);
  }
);

export type authRes = IParsedOAuth2TokenResult & { currentUser: UserV2 };

const refreshToken = async () => {
  const userData = await Storage.getTwitterAuthToken();
  const payload = {
    refreshToken: userData?.refreshToken,
    token: userData?.accessToken,
    method: "refreshToken",
  };
  try {
    const response = await axios.post(`/twitter-v2`, payload);
    const { data } = response;
    return true;
  } catch (e) {
    return false;
  }
};