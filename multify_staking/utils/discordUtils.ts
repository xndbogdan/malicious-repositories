import axios from "axios";
import { GuildJoinResponse } from "../pages/api/joinServer";
import { discordApi } from "./discordAxios";
interface userServers {
  id: string;
  name: string;
  icon: any;
  owner: boolean;
  permissions: number;
  features: any[];
  permissions_new: string;
}

export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  locale: string;
}
export async function getUsersGuilds(auth_token: string) {
  const discord_api_url = "/users/@me/guilds";
  const headers = {
    Authorization: `Bearer ${auth_token}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
    const response = await discordApi.get<Array<userServers>>(discord_api_url, {
      headers,
    });
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
}
export async function joinDiscordServerGuild(
  userId: string,
  token: string,
  serverId: string
) {
  const url = new URL("/api/joinServer", window.location.href);
  let res = {
    hasError: false,
    message: "",
  };
  try {
    const response = await axios.post<GuildJoinResponse>(url.toString(), {
      userId,
      token,
      serverId,
    });
    console.log(response);

    const { data, message } = response.data || {};
    if (!data) {
      //   redirectOnError(message);
      res = {
        hasError: true,
        message,
      };
    }
    if (data && Object.keys(data).length) {
      const userServers = await getUsersGuilds(token);
      console.log(userServers);
      const idSet = new Set(userServers?.data.map((obj) => obj.id));
      const hasTargetId = idSet.has(serverId);
      if (hasTargetId) {
        res = {
          hasError: false,
          message,
        };
      } else {
        res = {
          hasError: true,
          message,
        };
      }
    }
  } catch (error: any) {
    console.log(error);
    // redirectOnError("Something went wrong.try agin later");
    res = {
      ...(error.response.data || {
        hasError: true,
        message:
          error?.response?.data.message ||
          "Something went wrong.try agin later",
      }),
    };
  }
  return res;
}

export async function getDiscordUserInfo(accessToken: string) {
  let res = null;
  try {
    const userResponse = await discordApi.get<DiscordUser>("/users/@me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    res = userResponse;
  } catch (error) {
    console.log(error);
    res = null;
  }
  return res;
}

export const authenticateUser = (clientId: string, redirectUri: string) => {
  window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=identify%20guilds.join%20guilds`;
};