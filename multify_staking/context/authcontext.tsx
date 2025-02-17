import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  FacebookAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase";

interface UserType {
  email: string | null;
  uid: string | null;
}

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

const AuthContext = createContext<any>({});

export const useAuth = () => useContext<any>(AuthContext);

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState({});
  const [whichAuth, setWhichAuth] = useState("sign-in");
  const [notification, setNotification] = useState<
    {
      title: string;
      body: string;
    }[]
  >([]);
  const [isNotificationEnabled, setIsNotificationEnable] = useState(false);
  const [isEmailEnabled, setIsEmailEnabled] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user?.uid,
        });
      } else {
        setUser({ email: null, uid: null });
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    setUser({ email: null, uid: null });
    await signOut(auth);
    localStorage.clear();
    sessionStorage.clear();
  };

  //sign in using google
  const signInWithGoogle = () =>
    signInWithPopup(auth, new GoogleAuthProvider());

  //sign in using facebook
  const signInWithFacebook = () =>
    signInWithPopup(auth, new FacebookAuthProvider());

  // creating a custom hook for maintaining states of campaign multi step form
  const setFormValues = (values: any) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
    if (values == "submitted") {
      setData({});
    }
  };

  const loginctlMetamask = (data: any) => {
    console.log(data)
    localStorage.setItem("user", JSON.stringify(data as SignupType));
    return 'Logged In successfully';
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        logIn,
        logOut,
        loginctlMetamask,
        signInWithFacebook,
        signInWithGoogle,
        data,
        setFormValues,
        notification,
        setNotification,
        authModal: { whichAuth, setWhichAuth },
        isNotificationEnabled,
        setIsNotificationEnable,
        isEmailEnabled,
        setIsEmailEnabled,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};