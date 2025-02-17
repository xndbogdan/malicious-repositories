import axios, { AxiosResponse } from "axios";
import { Storage } from "../helpers/storage";
import { authenticateUser } from "./discordUtils";
const clientId = "1058769840468410439";
const redirectUri = "https://app.freebling.io/redirect";

export const discordApi = axios.create({
  baseURL: "https://discord.com/api",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

const payload = {
  client_id: "1058769840468410439",
  client_secret: "lzP1T-XPtklLQ6s1wBjDW7xjEJtCdHGE",
  grant_type: "refresh_token",
  refresh_token: Storage.getDiscordRefreshToken(),
};
discordApi.interceptors.response.use(
  (response: AxiosResponse<any, any>) => response,
  async (error: any) => {
    debugger;
    const request = error.config;
    const { status } = error.response;

    if (status == 401 && !request.retry) {
      request.retry = true;
      const isSuccess = await getDiscordRefreshToken();
      if (isSuccess) return discordApi(request);
      return authenticateUser(clientId, redirectUri);
    }

    return Promise.reject(error.response);
  }
);

async function getDiscordRefreshToken() {
  try {
    const refreshTokenRes = await discordApi.post<{
      access_token: string;
      expires_in: number;
      refresh_token: string;
      scope: string;
      token_type: string;
    }>("/oauth2/token", payload);
    if(refreshTokenRes){
        Storage.setDiscordAccessToken(refreshTokenRes.data.access_token);
        Storage.setDiscordRefreshToken(refreshTokenRes.data.refresh_token);
    }
    return true;
  } catch (e) {
    return false;
  }
}