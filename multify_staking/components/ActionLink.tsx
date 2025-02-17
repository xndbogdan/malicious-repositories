

type ActionLinkProps = {
  href: string;
  label: string;
  target?: string;
};

const ActionLink = ({ href, label, target = "_blank" }: ActionLinkProps) => {
  return (
    <a href={href} target={target} rel="noopener noreferrer">
      {label}
    </a>
  );
};

// Tweet

type Tweet = {
  id: string;
  text: string;
};

// ReTweet

type Retweet = {
  tweetId: string;
  retweeted: boolean;
};

type Follow = {
  followedUserId: string;
};

export const TweetLink = ({ tweet }: { tweet: Tweet }) => {
  const tweetLink = `https://twitter.com/twitter/status/${tweet.id}`;

  return (
    <>
      You Tweeted this tweet. check it out{" "}
      <strong>
        <ActionLink href={tweetLink} label="View Tweet" />
      </strong>
    </>
  );
};

export const RetweetLink = ({ retweet }: { retweet: Retweet }) => {
  const retweetLink = `https://twitter.com/twitter/status/${retweet.tweetId}`;

  return (
    <>
      You Retweet this tweet. check it out{" "}
      <strong>
        <ActionLink href={retweetLink} label="View Retweet" />
      </strong>
    </>
  );
};

export const FollowLink = ({ follow }: { follow: Follow }) => {
  return (
    <>
      You Followed this user. check it out{" "}
      <strong>
        <ActionLink href={follow.followedUserId} label="View User" />
      </strong>
    </>
  );
};