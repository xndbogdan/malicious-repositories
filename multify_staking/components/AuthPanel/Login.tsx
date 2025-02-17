import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Image from "next/legacy/image";
import logo from "../../public/assets/anim/logo.json";
import google_icon from "../../public/assets/images/google_icon.svg";
import facebook_icon from "../../public/assets/images/facebook_icon.svg";
import metamask_icon from "../../public/assets/images/metamask_icon.svg";
import discord from "../../public/assets/images/discord.svg";
import { Router, useRouter } from "next/router";
import { useAuth } from "../../context/authcontext";
import Link from "next/link";
import toast from "react-hot-toast";
import { useUserData } from "../../context/userDataHook";
import Loader from "../../components/loader";
import Lottie from "lottie-react";
import { addDoc, collection, getDocs, query, getDoc, where, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAccount, useConnect, useSignMessage } from "wagmi";
import { disconnect } from '@wagmi/core';
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
interface SigninType {
  email: string;
  password: string;
  userType: string;
}

export default function Login() {
  const { connectAsync } = useConnect();
  const { isConnected } = useAccount();

  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { userData } = useUserData();
  // // redirect if userData or user updated ...
  useEffect(() => {
    if (user?.uid !== null && userData && userData.userType === "user") {
      router.push("/users/dashboard");
    } else if (
      user?.uid !== null &&
      userData &&
      userData.userType === "company"
    ) {
      router.push("/company/dashboard");
    }
  }, [userData]);

  const methods = useForm<SigninType>({ mode: "onBlur" });
  const { signInWithGoogle, signInWithFacebook, logIn, loginctlMetamask, authModal: { whichAuth, setWhichAuth } } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  // check if user is authenticated and its userType for redirection

  const onSubmit = async (data: SigninType) => {
    setLoading(true);
    try {
      const success = await logIn(data.email, data.password);
      if (success) {
        if (userData?.userType === "user") {
          setLoading(false);
          router.push("/users/dashboard");
          toast.success("Logged In successfully");
        } else if (userData?.userType === "company") {
          setLoading(false);
          router.push("/company/dashboard");
          toast.success("Logged In successfully");
        }
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  const signInGoogle = async () => {
    try {
      const success = await signInWithGoogle();
      if (success) {
        const qry = query(
          collection(db, "users"),
          where("uid", "==", success.user?.uid)
        );
        const querySnapshot = await getDocs(qry);
        if (querySnapshot.empty) {
          const doc = await addDoc(collection(db, "users"), {
            email: success.user?.email,
            name: success.user?.displayName,
            userType: "user",
            uid: success.user?.uid,
            isNew: true,
            metamask: '',
          });
          console.log("Document written with ID: ", doc.id);
          setLoading(false);
          router.push("/users/dashboard");
          toast.success("Account created successfully");
        }
        else {
          setLoading(false);
          router.push("/users/dashboard");
          toast.success("Logged In successfully");
        }
      }
    }
    catch (error: any) {
      setLoading(false);
      toast.error(error);
    }
  };

  const signInFacebook = async () => {
    try {
      const success = await signInWithFacebook();
      if (success) {
        const qry = query(
          collection(db, "users"),
          where("uid", "==", success.user?.uid)
        );
        const querySnapshot = await getDocs(qry);
        if (querySnapshot.empty) {
          const doc = await addDoc(collection(db, "users"), {
            email: success.user?.email,
            name: success.user?.displayName,
            userType: "user",
            uid: success.user?.uid,
            isNew: true,
            metamask: '',
          });
          console.log("Document written with ID: ", doc.id);
          setLoading(false);
          router.push("/users/dashboard");
          toast.success("Account created successfully");
        }
        else {
          setLoading(false);
          router.push("/users/dashboard");
          toast.success("Logged In successfully");
        }
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error);
    }
  };

  const signInMetamask = async () => {
    try {
      if (isConnected) {
        await disconnect();
      }
      const { account, chain } = await connectAsync({
        connector: new MetaMaskConnector(),
      });
      if (account) {
        const qry = query(
          collection(db, 'users'),
          where('metamask', '==', account)
        )
        const querySnapshot = await getDocs(qry);
        let user_data = {};
        let set_logininfo = {};
        if (querySnapshot.empty) {
          set_logininfo = {
            address: account,
            name: account.slice(0, 5) + '...' + account.slice(-5),
            metamask: account.slice(0, 5) + '...' + account.slice(-5),
            userType: 'user',
          }
        } else {
          try {
            querySnapshot.forEach(doc => {
              user_data = doc.data()
            })
            const docSanpshots = querySnapshot.docs;
            set_logininfo = docSanpshots[0].data();
          } catch (error: any) {
            console.log(error)
          }
        }
        let res = loginctlMetamask(set_logininfo)
        router.push("/users/dashboard")
        setLoading(false);
        toast.success(res);
      }
    } catch (error: any) {
      setLoading(false)
      toast.error(error)
    }
  }

  return (
    <>
      <div className="p-6">
        <Loader show={loading} />
        {/* FORM DETAILS */}
        <div className="w-full max-w-[450px] mx-auto">
          {/* Logo + Copy */}
          <div className="flex-col items-center text-center space-y-5 p-5">
            <h2 className="text-xl font-medium">Sign In</h2>
            {/* <p className="text-lg text-lightWhite">Hey, we’re happy to havy you here! In order to create your
                                accounts fill in fields below.</p> */}
          </div>

          {/* FORM */}
          <FormProvider {...methods}>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5 mb-5">
                <input
                  className="w-full h-[45px] bg-transparent border border-jade-100 rounded-sm px-5 py-2.5 text-white placeholder:text-lightWhite focus-visible:outline-0"
                  placeholder="Email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-400">{errors.email.message}</p>
                )}

                <input
                  className="w-full h-[45px] bg-transparent border border-jade-100 rounded-sm px-5 py-2.5 text-white placeholder:text-lightWhite focus-visible:outline-0"
                  placeholder="Password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </div>

              {/* BUTTON */}
              <button type="submit" className="buttonPrimary">
                Sign In
              </button>
              <p className="mt-2 text-center text-[12px]">
                <button className="text-fbyellow/60 hover:text-fbyellow" onClick={() => setWhichAuth('')}>
                  Forgot password?
                </button>
              </p>
              <p className="mt-5 text-center">
                Don't have an account?{" "}
                <button className="text-fbyellow" onClick={() => setWhichAuth('')}>
                  Get started.
                </button>
              </p>

              {/* OR */}
              <div className="my-7 text-base relative after:content-[''] after:absolute after:bg-teal-100 after:w-full after:h-[1px] after:opacity-20 after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:translate-y-1/2">
                <span className="block relative w-25 m-auto text-center">
                  or continue with
                </span>
              </div>

              {/* SOCIAL BUTTONS */}
              <div className="flex items-center space-x-5">
                <div className="socialSignup">
                  <Image
                    className="relative z-10"
                    src={google_icon}
                    alt="google_icon"
                    layout="intrinsic"
                    onClick={signInGoogle}
                  />
                </div>
                <div className="socialSignup">
                  <Image
                    className="relative z-10"
                    src={facebook_icon}
                    alt="facebook_icon"
                    layout="intrinsic"
                    onClick={signInFacebook}
                  />
                </div>
                <div className="socialSignup">
                  <Image
                    className="relative z-10"
                    src={metamask_icon}
                    alt="metamask_icon"
                    layout="intrinsic"
                    onClick={signInMetamask}
                  />
                </div>
                {/* //TODO: Add a discord authentication api  */}
                {/* <div className="socialSignup">
                  <Image
                    className="relative z-10"
                    src={discord}
                    alt="discord"
                    layout="intrinsic"
                  />
                </div> */}
              </div>

              {/* CONNECT BUTTON */}
              {/* <button className="w-full h-[66px] bg-teal-900 border border-transparent rounded-sm text-lg cursor-pointer transition duration-200 ease-in-out hover:bg-teal-900 hover:border-teal-100">
                                    Connect through MetaMask
                                </button> */}
            </form>
          </FormProvider>
        </div>
      </div>
      {/* <p className="my-10 text-center">
        ©2023 Free Bling Inc. - All rights reserved.
      </p> */}
    </>
  );
}
