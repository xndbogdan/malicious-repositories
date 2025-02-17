import axios from "axios";
import { query, collection, where, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../firebase";

export const handleNotification = async (
  userData: any,
  data: any,
  user: any,
  giveAwayStatus = "created" as "created" | "updated"
) => {
  const { text } = getGiveAwayText(giveAwayStatus, userData?.company_name);
  const notificationPayload = {
    title: data?.title,
    body: text,
    icon: "logo-here.png",
    click_action: "https://freebling.io/company/giveaway/" + data?.uid,
  };
  try {
    const followers: Array<{ uid: string; token: string }> =
      await getFollowersData(false, userData); 
    const url = new URL("/api/sendNotifications", window.location.href);
    const finalRes = [];
    const excludeCurrentUser = followers.filter(
      (elem) => elem.uid !== user.uid
    );
    for (const follower of excludeCurrentUser) {
      if (follower.token) {
        const payload = {
          to: follower.token,
          notificationPayload,
        };
        const response = await axios.post(url.toString(), payload);
        finalRes.push(response.data);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const sendEmail = async (
  userData: any,
  data: any,
  user: any,
  giveAwayStatus = "created" as "created" | "updated"
) => {
  const followers: Array<string> = await getFollowersData(true, userData);
  const excludeCurrentUser = followers.filter((elem) => elem !== user?.uid);
  for (const email of excludeCurrentUser) {
    if (email) {
      const { title, text } = getGiveAwayText(
        giveAwayStatus,
        userData?.company_name
      );
      const payload = {
        to: email,
        from: user.email,
        subject: title,
        text,
        html: `"<a href={https://freebling.io/company/giveaway/${
          data?.uid
        }}>Checkout ${
          giveAwayStatus === "created" ? "new" : "updated"
        } Giveaway</a>"`,
      };
      try {
        const response = await axios.post<{
          message: string;
          status: "success" | "error";
        }>("/api/email", payload);
        if (response.data.status === "success") {
          toast.success("Email sent");
          return;
        }
      } catch (error: any) {
        const errMsg =
          error?.response?.data?.message +
          "\n\n" +
          error?.response?.data?.error;
        toast.error(errMsg ?? "Email failed");
      }
    }
  }
};

const getFollowersData = async (isEmail = false, userData: any) => {
  const followers = userData?.followers ?? [];
  const users: any = [];
  for (const userID of followers) {
    const qry = query(collection(db, "users"), where("uid", "==", userID));
    const querySnapshot = await getDocs(qry);
    querySnapshot.docs.forEach((doc) => {
      const userData: any = doc.data();
      if (isEmail) {
        if (userData["emailNotifications"]) {
          users.push(userData.email);
        }
      } else {
        if (userData.notifications || userData.notification) {
          users.push({
            uid: userData.uid,
            token: userData.notificationToken,
          });
        }
      }
    });
  }
  return users;
};

function getGiveAwayText(
  giveAwayStatus: "created" | "updated",
  company_name: string
) {
  const giveAwayText = {
    created: {
      title: "New GiveAway Created",
      text: `New Giveaway Has Been Created by ${company_name}`,
    },
    updated: {
      title: "GiveAway Updated",
      text: `A Giveaway Has Been Updated by ${company_name}`,
    },
  };
  return giveAwayText[giveAwayStatus];
}