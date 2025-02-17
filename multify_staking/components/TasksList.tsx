import React, { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  increment,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useUserData } from "../context/userDataHook";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Storage } from "../helpers/storage";
import { twitterAuth } from "../utils/twitterAuth";
import {
  TweetV2PostTweetResult,
  TweetV2RetweetResult,
  UserV2FollowResult,
} from "twitter-api-v2";
import twitterClientMethods, { showToast } from "../utils/twitterClientMethods";
import {
  authenticateUser,
  getDiscordUserInfo,
  getUsersGuilds,
  joinDiscordServerGuild,
} from "../utils/discordUtils";

declare const window: any;
const redirectUri = "https://app.freebling.io/redirect";
const clientId = "1058769840468410439";

export default function TasksList(props: any) {
  const backgroundColor = '#0B0B0B'
  const [bg, setBg] = useState<any>();
  const [source, setSource] = useState<any>();
  const appId = "906996760301312";
  const [done, setDone] = useState(false);
  const { userData, updateUserData } = useUserData();
  const router = useRouter();
  const { id, status, tweeterStatus: tStatus, data: Tdata } = router.query;
  const [referralId, setReferralId] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const url = id as string;
  const userStatus = status as "success" | "error";
  const tweeterStatus = tStatus as
    | "twitter-error"
    | "tweet"
    | "retweet"
    | "followUser";
  const twitterData = Tdata as any;
  let uid = "";
  const userParse = localStorage.getItem("user") || "";
  let user: any
  if (userParse) {
    user = JSON.parse(userParse);
    uid = user?.uid || "";
  }

  const handleDiscordUpdate = async (status: "success" | "error") => {
    if (status === "success") {
      router.replace({
        query: { id: url },
      });
      Storage.clearAll();
      updateEntries();
    }
    if (status === "error") {
      router.replace({
        query: { id: url },
      });
      Storage.clearAll();
      console.log("No Need of an entry");
    }
  };

  const setBgAndIcons = () => {
    if (props?.data?.title.includes("Facebook")) {
      const src = '/assets/images/task-icons/facebook.svg'
      const background = '#3b5998'
      setBg(background)
      setSource(src)
    } else if (props?.data?.title.includes("Twitter")) {
      const src = '/assets/images/task-icons/twitter.svg'
      const background = '#1DA1F2'
      setBg(background)
      setSource(src)
    } else if (props?.data?.title.includes("Discord")) {
      const src = '/assets/images/discord.svg'
      const background = '#7289d9'
      setBg(background)
      setSource(src)
    } else if (props?.data?.title.includes("Telegram")) {
      const src = '/assets/images/task-icons/telegram.svg'
      const background = '#0088cc'
      setBg(background)
      setSource(src)
    } else if (props?.data?.title.includes("YouTube")) {
      const src = '/assets/images/task-icons/youtube.svg'
      const background = '#FF0000'
      setBg(background)
      setSource(src)
    } else if (props?.data?.title.includes("Spider Tanks")) {
      const src = '/assets/images/task-icons/game-spidertanks.svg'
      const background = '#000000'
      setBg(background)
      setSource(src)
    }else if (props?.data?.title.includes("Website")) {
      const src = '/assets/images/task-icons/world.svg'
      const background = '#F6B519'
      setBg(background)
      setSource(src)
    }
  }

  useEffect(() => {
    if (props?.data?.title === "Join Discord") handleDiscordUpdate(userStatus);
  }, [userStatus]);

  // titter update entries
  const handleTwitterStatus = async () => {
    const updateEntry = async () => {
      await updateEntries();
      router.replace({
        query: { id: url },
      });
      return;
    };
    if (tweeterStatus === "twitter-error") {
      router.replace({
        query: { id: url },
      });
      console.log("No Need of an entry");
      return;
    }
    if (tweeterStatus === "retweet") {
      const data = JSON.parse(twitterData) as TweetV2RetweetResult["data"];
      if (data.retweeted) {
        if (props?.data?.title === "Retweet this Twitter post") {
          // Storage.clearTwitterData();
          await updateEntry();
        }
      }
    }
    if (tweeterStatus === "tweet") {
      const data = JSON.parse(twitterData) as TweetV2PostTweetResult["data"];
      if (data.id) {
        if (props?.data?.title === "Post on Twitter") {
          // Storage.clearTwitterData();
          await updateEntry();
        }
      }
    }
    if (tweeterStatus === "followUser") {
      const data = JSON.parse(twitterData) as UserV2FollowResult["data"];
      if (data.following) {
        if (props?.data?.title === "Follow us on Twitter") {
          // Storage.clearTwitterData();
          await updateEntry();
        }
      }
    }
  };
  useEffect(() => {
    handleTwitterStatus();
  }, [tweeterStatus]);

  useEffect(() => {
    // Load the Facebook SDK script
    if (!done && props?.data?.title === "Share on Facebook") {
      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s) as HTMLScriptElement;
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        if (fjs.parentNode) fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");

      // Initialize the Facebook SDK with your App ID
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: appId,
          xfbml: true,
          version: "v12.0",
        });
      };
    }
    localStorage.setItem("url", url);
  }, []);

  // setDOne to true if its in props?.tasksDone?.title == props?.data?.title
  // if its not in props.tasksDone then setDone to false
  useEffect(() => {
    if (props?.tasksDone?.length > 0) {
      const temp = props?.tasksDone?.filter(
        (task: any) => task?.taskTitle === props?.data?.title
      );
      if (temp?.length > 0) {
        setDone(true);
      } else {
        setDone(false);
      }
    }
    setBgAndIcons();
  }, [props?.tasksDone]);

  async function shareOnFacebook(url: string) {
    console.log("share on facebook", url);
    window.FB.ui(
      {
        method: "share",
        href: url,
      },
      function (response: any) {
        if (response && !response.error_message) {
          updateEntries();
          toast.success("Task completed successfully");
          // add a giveaway id and task title to the users collection in firestore
          // make a reference of userData
        } else {
          console.log("Error sharing post.");
          toast.error("Error sharing post.");
        }
      }
    );
  }

  const handleToggleModal = () => {
    setOpenModal((open) => !open);
  };

  const generateTelegramUId = () => {
    return Math.random().toString(36).substring(2, 7);
  };

  const joinTelegramChat = async () => {
    window.open(props?.data?.link, "_blank");

    const qry = query(
      collection(db, "users"),
      where("uid", "==", userData?.uid)
    );
    const querySnapshot = await getDocs(qry);
    const temp = querySnapshot.docs.map((doc) => doc.ref.id);
    const userRef = doc(db, "users", temp[0]);
    const newTelegramId = generateTelegramUId();

    const ref2 = doc(db, "giveaway", props?.giveawayId);

    await setDoc(
      userRef,
      { referralIds: { [newTelegramId]: false } },
      { merge: true }
    );
    await setDoc(
      ref2,
      { referralIds: { [newTelegramId]: false } },
      { merge: true }
    );
    setDone(true);
    updateUserData();
    setReferralId(newTelegramId);
    handleToggleModal();
  };

  function performTask() {
    if (props?.data?.title === "Share on Facebook") {
      shareOnFacebook(props?.data?.link);
    } else if (props?.data?.title === "Retweet this Twitter post") {
      rt(props?.data?.link);
    } else if (props?.data?.title === "Post on Twitter") {
      postTweet(props?.data?.description + " " + props.data?.link);
    } else if (props?.data?.title === "Follow us on Twitter") {
      followTwitterAccount(props?.data?.link);
    } else if (props?.data?.title === "Join Discord") {
      joinDiscordServer(props?.data?.link);
    } else if (props?.data?.title === "Follow on Telegram") {
      joinTelegramChat();
    } else if (props?.data?.title === "Visiting The Website") {
      openWebsite(props?.data?.link);
    }
  }

  async function updateEntries() {
    const qry = query(
      collection(db, "users"),
      where("uid", "==", uid || userData?.uid)
    );
    const querySnapshot = await getDocs(qry);
    const temp = querySnapshot.docs.map((doc) => {
      // console.log doc ref.id
      return doc.ref.id;
    });
    // get the ref of the doc where is equal to userData.uid
    const ref1 = doc(db, "users", temp[0]);

    //add a giveaway id and task title to the users collection in firestore
    await updateDoc(ref1, {
      participatedGiveaways: arrayUnion({
        taskTitle: props?.data?.title,
        noOfEntries: props?.data?.noOfEntries,
        giveawayId: props?.giveawayId,
      }),
    });

    // get giveaway and update total entries by adding props.noOfEntries and add participated user to it
    const ref2 = doc(db, "giveaway", props?.giveawayId);
    await updateDoc(ref2, {
      totalEntries: increment(props?.data?.noOfEntries),
      participatedUsers: arrayUnion({
        userId: userData?.uid || user.uid,
        name: userData?.name || user.name,
        email: userData?.email || user.email,
        userEntries : props?.entries + props?.data?.noOfEntries || 0 + props?.data?.noOfEntries
      }),
    });
    setDone(true);
    props?.updateLocalData();
    console.log("data updated");
  }

  function getTweetIdFromLink(link: string): string | undefined {
    const match = link.match(/\/status\/(\d+)/);
    if (match) {
      return match[1];
    } else {
      return undefined;
    }
  }

  async function rt(URL: string) {
    const tweetId = getTweetIdFromLink(URL);
    if (tweetId) {
      Storage.setGiveawayId(url);
      Storage.setTweetData({
        status: "retweet",
        tweetData: tweetId,
      });
      const token = Storage.getTwitterAuthToken();

      if (token) {
        try {
          const data = await twitterClientMethods.retweet(tweetId);
          console.log(data);
          if (data.data.retweeted) {
            Storage.clearTwitterData();
            await updateEntries();
          }
        } catch (error: any) {
          debugger;
          console.log(error);
          showToast(
            error?.data?.error?.error?.errors?.[0]?.message ??
            "An error occurred while retweeting."
          );
        }
      } else {
        twitterAuth.login();
      }
    }
  }

  async function postTweet(data: string) {
    if (data) {
      Storage.setGiveawayId(url);
      Storage.setTweetData({
        status: "tweet",
        tweetData: data,
      });
      const token = Storage.getTwitterAuthToken();
      if (token) {
        try {
          const Tdata = await twitterClientMethods.tweet(data);
          console.log(Tdata);
          if (Tdata.data.id) {
            Storage.clearTwitterData();
            await updateEntries();
          }
        } catch (error) {
          console.log(error);
          showToast("An error occurred while tweeting.");
        }
      } else {
        twitterAuth.login();
      }
    }
  }

  async function followTwitterAccount(screenName: string) {
    if (screenName) {
      Storage.setGiveawayId(url);
      Storage.setTweetData({
        status: "followUser",
        tweetData: screenName,
      });
      const token = Storage.getTwitterAuthToken();
      if (token) {
        try {
          const Tdata = await twitterClientMethods.followUser(screenName);
          console.log(Tdata);
          if (Tdata.data.following) {
            Storage.clearTwitterData();
            await updateEntries();
          }
        } catch (error) {
          console.log(error);
          showToast("An error occurred while following the user.");
        }
      } else {
        twitterAuth.login();
      }
    }
  }
  // write a function to join a discord server through server invite code and get a call if user joins it
  async function joinDiscordServer(serverId: string) {
    // get the invite code from the link
    // store the invite code in local storage
    // redirect the user to discord for authentication
    Storage.setInviteCode(JSON.stringify(serverId));

    const discordToken = await Storage.getDiscordAccessToken();
    if (discordToken) {
      const userServers = await getUsersGuilds(discordToken);
      if (userServers?.data && userServers?.data.length > 0) {
        const idSet = new Set(userServers?.data.map((obj) => obj.id));
        const hasTargetId = idSet.has(serverId);
        if (hasTargetId) {
          updateEntries();
          return;
        }
      }

      const userResponse = await getDiscordUserInfo(discordToken);
      const userData = userResponse?.data;
      if (!userData) {
        toast.error("User data not found in response");
        return;
      }
      Storage.setUserData(JSON.stringify(userData));
      const res = await joinDiscordServerGuild(
        userData.id,
        discordToken,
        serverId
      );
      console.log(res);

      if (!res.hasError) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } else {
      // Redirect the user to Discord for authentication
      authenticateUser(clientId, redirectUri);
    }
  }

  // TODO: Make a refer link and track sign ups through it
  function openWebsite(url: string) {
    console.log(url);
    if (url) window.open(url, "_blank");
    updateEntries();
  }

  return (
    <>
      <Head>
        <script
          async
          defer
          crossOrigin="anonymous"
          src={`https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0&appId=${appId}&autoLogAppEvents=1`}
          nonce="krUv25gK"
        />
      </Head>

      <div className="group">
        <div className="flex items-center w-full">
          {/* task done  */}
          <button
            onClick={performTask}
            disabled={props?.disabled || done}
            className="flex items-center justify-between w-full space-x-3 text-left"
          >
            {/* <h3 className="flex flex-col text-sm font-medium">
              {props?.data?.title}{" "}
            </h3> */}
            {
              source && (
                <>
                  <span
                    style={
                      { background: bg }
                    }
                    className="flex justify-center  w-10 h-10">
                    <Image
                      src={source}
                      width={17}
                      height={17}
                      alt="Task Icon"
                    />
                  </span>
                </>
              )
            }

            <p className="flex-1 text-lg text-white font-Ubuntu-Regular p-0 m-0">
              {props?.data?.description}{" "}
            </p>
          </button>
          {/* if tasks is not done show entries amount */}
          {!done && (
            <span className="font-Ubuntu-Bold text-lg rounded-[3px] flex-none bg-teal-300 min-w-[42px] max-w-16 h-[30px] text-center">
              + {props?.data?.noOfEntries}
            </span>
          )}
          {/* if task complete show amount with checkmark */}
          {done && (
            <span className="borderFB2 px-2 py-1 text-lg rounded-[2px] flex-none min-w-[55px] text-center">
              {/* + {props?.data?.noOfEntries}  */}
              <CheckCircleIcon className="mx-auto text-teal-400 w-7 h-7" />
            </span>
          )}
        </div>
        {openModal && (
          <div className="fixed inset-0 z-[99] bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center flex-col">
            <div className="bg-teal-500 p-[20px] rounded-md w-1/2">
              <div className="flex justify-between mb-[20px]">
                <div className="font-bold text-white text-[24px]">
                  Telegram Referral ID
                </div>
                <XMarkIcon
                  className="cursor-pointer"
                  width="30px"
                  onClick={handleToggleModal}
                />
              </div>

              <div>
                <div>
                  Your referral ID:{" "}
                  <span className="text-lg font-Ubuntu-Bold">{referralId}</span>
                  <br />
                  Please enter this when asked in Telegram to verify completion
                  of this task.
                  <br />
                  If you have already joined the group, please add{" "}
                  <strong>/join/{referralId}</strong> to the text box to
                  complete the task
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}