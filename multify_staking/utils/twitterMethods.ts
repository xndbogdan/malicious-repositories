import {
  IParsedOAuth2TokenResult,
  TweetV2PostTweetResult,
  TweetV2RetweetResult,
  TwitterApi,
  UserV2FollowResult,
  UserV2Result,
  UserV2TimelineResult,
} from "twitter-api-v2";

const initializeClient = (token: string) => {
  return new TwitterApi(token);
};
export default {
  async tweet(status: string, token: string): Promise<TweetV2PostTweetResult> {
    const twitterClient = await initializeClient(token);
    const createdTweet = await twitterClient.v2.tweet(status);
    return createdTweet;
  },
  async retweet(
    loggedUserId: string,
    tweetId: string,
    token: string
  ): Promise<TweetV2RetweetResult> {
    debugger;
    console.log(token, loggedUserId, tweetId);
    const twitterClient = await initializeClient(token);
    const reTweet = await twitterClient.v2.retweet(loggedUserId, tweetId);
    return reTweet;
  },
  async followUser(
    loggedUserId: string,
    userId: string,
    token: string
  ): Promise<UserV2FollowResult> {
    console.log(token);

    const twitterClient = await initializeClient(token);
    const followedUser = await twitterClient.v2.follow(loggedUserId, userId);
    return followedUser;
  },
  async getUserID(token: string, username: string): Promise<UserV2Result> {
    const twitterClient = await initializeClient(token);
    const userName = await twitterClient.v2.userByUsername(username);
    return userName;
  },
  async isFollowingUser(
    token: string,
    userId: string
  ): Promise<UserV2TimelineResult> {
    debugger;
    const twitterClient = await initializeClient(token);
    const followingUser = await twitterClient.v2.following(userId);
    return followingUser;
  },
  async getRefreshToken(
    refreshToken: string,
    token: string
  ): Promise<IParsedOAuth2TokenResult> {
    debugger;
    const twitterClient = await initializeClient(token);
    const refreshedClient = await twitterClient.refreshOAuth2Token(
      refreshToken
    );
    return refreshedClient;
  },
};