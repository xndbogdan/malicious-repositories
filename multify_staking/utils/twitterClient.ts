import { TwitterApi } from "twitter-api-v2";

const CLIENT_SECRET = "_d7jKEsFoRIgbKpDnb3t8WXUHG2ph7OPbP0Bh-OmBVSJp5-idh";
const CLIENT_ID = "UEtSQ2JoVHlGcUpDZmgwSGs0U2U6MTpjaQ";

const twitterClient = new TwitterApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
});
export default twitterClient;