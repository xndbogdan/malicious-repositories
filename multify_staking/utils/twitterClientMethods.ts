import { toast } from "react-hot-toast";
import { AxiosResponse } from "axios";
import {
  TweetV2PostTweetResult,
  TweetV2RetweetResult,
  UserV2FollowResult,
  UserV2Result,
  UserV2TimelineResult,
} from "twitter-api-v2";
import { Storage } from "../helpers/storage";
import { twitterApi } from "./twitterAuth";

export default {
  tweet: async (status: string): Promise<TweetV2PostTweetResult> => {
    try {
      const token = await Storage.getTwitterAuthToken();
      const response: AxiosResponse<TweetV2PostTweetResult> =
        await twitterApi.post("/", {
          status,
          token: token?.accessToken,
          method: "tweet",
        });
      return response.data;
    } catch (error) {
      // Handle the error and show a toast notification
      console.error("Error in tweet:", error);
      // Show the error toast
      showToast("An error occurred while tweeting.");
      throw error; // Optional: Rethrow the error if necessary
    }
  },
  retweet: async (tweetId: string): Promise<TweetV2RetweetResult> => {
    debugger;
    try {
      const userData = await Storage.getTwitterAuthToken();
      const response: AxiosResponse<TweetV2RetweetResult> =
        await twitterApi.put("/", {
          loggedUserId: userData?.currentUser.id,
          tweetId,
          token: userData?.accessToken,
          method: "retweet",
        });
      return response.data;
    } catch (error) {
      // Handle the error and show a toast notification
      console.error("Error in retweet:", error);
      // Show the error toast
      // showToast("An error occurred while retweeting.");
      throw error; // Optional: Rethrow the error if necessary
    }
  },
  followUser: async (userId: string): Promise<UserV2FollowResult> => {
    debugger;
    const username = userId.match(/twitter\.com\/([^/]+)/i)![1];
    try {
      const userData = await Storage.getTwitterAuthToken();
      const userInfo = await twitterApi.post<UserV2Result>("/", {
        token: userData?.accessToken,
        username,
        method: "userInfo",
      });
      console.log(userInfo);

      const userId = userInfo.data.data.id;
      const isFollowingRes = await twitterApi.post<UserV2TimelineResult>("/", {
        token: userData?.accessToken,
        method: "isFollowing",
        userId,
      });
      const isFollow = isFollowingRes.data.data.some(
        (user) => user.username === userData?.currentUser.username
      );
      if (isFollow) {
        return {
          data: {
            following: true,
            pending_follow: false,
          },
        };
      }
      Storage.setTwitterFollowerData(userId);
      const response: AxiosResponse<UserV2FollowResult> =
        await twitterApi.patch("/", {
          loggedUserId: userData?.currentUser.id,
          userId,
          token: userData?.accessToken,
          method: "followUser",
        });
      return response.data;
    } catch (error) {
      // Handle the error and show a toast notification
      console.error("Error in followUser:", error);
      // Show the error toast
      // showToast("An error occurred while following the user.");
      throw error; // Optional: Rethrow the error if necessary
    }
  },
  isFollowing: async (userId: string) => {
    const userData = await Storage.getTwitterAuthToken();
    const isFollowingRes = await twitterApi.post<UserV2TimelineResult>("/", {
      token: userData?.accessToken,
      method: "isFollowing",
      userId,
    });
    console.log(isFollowingRes);
  },
};

export function showToast(message: string) {
  // Implement your toast notification logic here
  // This function is just a placeholder
  toast.error(message);
}