import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { useAuth } from "./authcontext";
import { collection, getDocs, query, where } from "firebase/firestore";

export interface SignupType {
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  userType: string;
  uid: string | undefined;
  company_name: string | undefined;
  website: string | undefined;
  followers: [];
  imgUrl: string;
  state: string;
  city: string;
  country: string;
  sol: string;
  bnb: string;
  erc20: string;
  phoneNo: string;
  dateOfBirth: string;
  securityQuestion1: string;
  securityQuestion2: string;
  answerQuestion1: string;
  answerQuestion2: string;
  twoFa: boolean;
  notifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  following: [];
  participatedGiveaways: [];
  isNew: boolean;
  isNotificationEnabled: boolean;
  isEmailEnabled: boolean;
  metamask: string;
}

export function useUserData() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<SignupType | null>(null);
  const userParse = localStorage.getItem("user") || "";
  let users: any
  if(userParse) 
  {
    users = JSON?.parse(userParse)
  }

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;
    const fetchUserData = async () => {
      if (user?.uid !== null) {
        const qry = query(
          collection(db, "users"),
          where("uid", "==", user?.uid)
        );
        const ref = await getDocs(qry);
        unsubscribe = ref.forEach((doc) => {
          const data = doc.data();
          setUserData(data as SignupType);
        });
      } else {
        setUserData(null);
      }
    };
    fetchUserData();
    if(users) {
      setUserData(users as SignupType)
    }
    return unsubscribe;
  }, [user || users]);

  // get the updated data when needed or this method can be called from other classes
  // to get the updated data
  const updateUserData = async () => {
    if (user?.uid !== null) {
      const qry = query(collection(db, "users"), where("uid", "==", user?.uid));
      const ref = await getDocs(qry);
      const unsubscribe = ref.forEach((doc) => {
        const data = doc.data();
        setUserData(data as SignupType);
        localStorage.setItem("user", JSON.stringify(data as SignupType));
      });
    } else {
      setUserData(null);
    }
  };

  const metamaskUserData = async () => {
    setUserData(users as SignupType)
  }

  return {
    user,
    userData,
    metamaskUserData,
    updateUserData,
  } as const;
}