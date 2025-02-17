import { IOAuth2RequestTokenResult } from "twitter-api-v2";
import { authRes } from "../utils/twitterAuth";

export const keyName: string = "discord-props";

type InviteCode = string;

type UserData = {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  locale: string;
};
function parseJSON(item: any) {
  let parsedItem;

  try {
    if(item)
    parsedItem = JSON.parse(item);
  } catch (error) {
    // Parsing error occurred, item is not a valid stringified JSON
    parsedItem = item;
  }

  return parsedItem;
}

const getItem = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    const parsedItem = parseJSON(item);
    return parsedItem;
  } catch (error) {
    console.error(
      `Error retrieving item from localStorage for key "${key}":`,
      error
    );
    return null;
  }
};

export const Storage = {
  setInviteCode: (inviteCode: InviteCode) => {
    if(inviteCode)
    localStorage.setItem(keyName, inviteCode);
  },
  getInviteCode: (): InviteCode | null => {
    return getItem<InviteCode>(keyName);
  },
  setDiscordAccessToken: (accessToken: string) => {
    localStorage.setItem(`${keyName}-TOKEN`, JSON.stringify(accessToken));
  },
  setDiscordRefreshToken: (refreshToken: string) => {
    localStorage.setItem(
      `${keyName}-REFRESH-TOKEN`,
      JSON.stringify(refreshToken)
    );
  },
  getDiscordAccessToken: (): string | null => {
    return getItem<string>(`${keyName}-TOKEN`);
  },
  getDiscordRefreshToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return getItem<string>(`${keyName}-REFRESH-TOKEN`);
    } else {
      return "";
    }
  },
  setUserData: (userData: string) => {
    localStorage.setItem(`${keyName}-USER`, userData);
  },
  getUserData: (): UserData | null => {
    return getItem<UserData>(`${keyName}-USER`);
  },
  setGiveawayId: (giveawayId: string) => {
    localStorage.setItem("url", giveawayId);
  },
  getGiveawayId: (): string | null => {
    return getItem<string>("url");
  },
  clearAll: () => {
    localStorage.removeItem(keyName);
    localStorage.removeItem(`${keyName}-TOKEN`);
    localStorage.removeItem(`${keyName}-USER`);
  },
  setTwitterAuth_1: (data: IOAuth2RequestTokenResult) => {
    localStorage.setItem("twitter-auth-1", JSON.stringify(data));
  },
  getTwitterAuth_1: () => getItem<IOAuth2RequestTokenResult>("twitter-auth-1"),
  setTwitterAuthToken: (data: authRes) =>
    localStorage.setItem("twitter-auth-token", JSON.stringify(data)),
  getTwitterAuthToken: () => getItem<authRes>("twitter-auth-token"),
  setTweetData: (data: {
    status: "tweet" | "retweet" | "followUser";
    tweetData: string;
  }) => localStorage.setItem("tweet-data", JSON.stringify(data)),
  getTweetData: () =>
    getItem<{ status: "tweet" | "retweet" | "followUser"; tweetData: string }>(
      "tweet-data"
    ),
  clearTwitterData: () => {
    localStorage.removeItem("tweet-data");
    localStorage.removeItem("twitter-auth-1");
  },
  setTwitterFollowerData: (userId: string) =>
    localStorage.setItem("follow-data", JSON.stringify(userId)),
  getFollowerData: () => getItem<string>("follow-data"),
  setIsRetry: (statue: boolean) =>
    localStorage.setItem("isRetry", JSON.stringify(statue.toString())),
  getIsRetry: () => getItem<boolean>("isRetry"),
};