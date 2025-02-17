import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Image from "next/legacy/image";
import google_icon from "../../public/assets/images/google_icon.svg";
import facebook_icon from "../../public/assets/images/facebook_icon.svg";
import discord from "../../public/assets/images/discord.svg";

import { useRouter } from "next/router";
import { useAuth } from "../../context/authcontext";
import { updateProfile } from "firebase/auth";
import { db } from "../../firebase";
import { collection, addDoc, getDoc } from "firebase/firestore";
import { useUserData } from "../../context/userDataHook";
import { toast } from "react-hot-toast";
import Loader from "../../components/loader";

interface SignupType {
  email: string;
  password: string;
  name: string;
  firstName: string;
  lastName: string;
  companyName: string;
  userType: string;
  isNew: boolean;
  metamask: string;
}

export default function SingUp() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signUp } = useAuth();
  const {
    user,
    authModal: { whichAuth, setWhichAuth },
  } = useAuth();
  const { userData } = useUserData();
  const methods = useForm<SignupType>({ mode: "onBlur" });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = methods;

  // redirect if userData or user updated
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

  React.useEffect(() => {
    const subscription = watch((value, { name, type }) => console.log());
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    setTimeout(() => {
      setValue("userType", "user");
    }, 1);
  }, [setValue]);

  const { signInWithGoogle, signInWithFacebook } = useAuth();

  const onSubmit = async (data: SignupType) => {
    setLoading(true);
    try {
      const success = await signUp(data.email, data.password);
      console.log(success.user);
      updateProfile(success.user, {
        displayName: data.companyName || data.name,
      })
        .then(() => {
          console.log("Profile updated");
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error);
        });
      // add this user to firestore db collection name as user
      try {
        const docRef = await addDoc(collection(db, "users"), {
          email: data.email,
          name: data.companyName || data.name,
          firstName: data.firstName,
          lastName: data.lastName,
          userType: data.userType,
          uid: success.user?.uid,
          isNew: true,
          metamask: ''
        });
      } catch (e: any) {
        setLoading(false);
        toast.error(e);
      }
      setLoading(false);
      if (data.userType === "company") router.push("/company/dashboard");
      else router.push("/users/dashboard");
      toast.success("Account created successfully");
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  const signInGoogle = async () => {
    setLoading(true);
    try {
      const success = await signInWithGoogle();
      if (success) {
        try {
          const docRef = await addDoc(collection(db, "users"), {
            email: success.user?.email,
            name: success.user?.displayName,
            userType: "user",
            uid: success.user?.uid,
            isNew: true,
          });
        } catch (e: any) {
          setLoading(false);
          toast.error(e);
        }
        router.push("/users/dashboard");
        toast.success("Account created successfully");
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      toast.error(error);
    }
  };

  const signInFacebook = async () => {
    setLoading(true);
    try {
      const success = await signInWithFacebook();
      if (success) {
        try {
          const docRef = await addDoc(collection(db, "users"), {
            email: success.user?.email,
            name: success.user?.displayName,
            userType: "user",
            uid: success.user?.uid,
            isNew: true,
          });
        } catch (e: any) {
          setLoading(false);
          toast.error(e);
        }
        router.push("/users/dashboard");
        toast.success("Account created successfully");
      }
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      toast.error(error);
    }
  };

  return (
    <>
      <div className="p-5">
        <Loader show={loading} />
        {/* FORM DETAILS */}
        <div className="w-full max-w-[450px] mx-auto">
          {/* Logo + Copy */}
          <div className="flex-col items-center text-center space-y-5 p-5">
            <h2 className="text-xl font-medium">Get Started</h2>

            {/* <p className="text-base text-lightWhite">
                            Hey, we’re happy to have you here! In order to create your
                            accounts fill in fields below.
                        </p> */}
          </div>

          {/* FORM */}
          <FormProvider {...methods}>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-3 mb-4">
                {/*set default user type as customer */}
                <select
                  className="w-full h-[45px] bg-[#257d860d] border border-[#139bad33] rounded-sm px-5 py-2.5 text-white placeholder:text-lightWhite focus-visible:outline-0"
                  placeholder="User Type"
                  {...register("userType", {
                    required: "User Type is Required",
                  })}
                >
                  <option className="text-black " value="user">
                    Customer
                  </option>
                  <option className="text-black " value="company">
                    Business
                  </option>
                </select>
                {errors.userType && (
                  <p className="text-red">{errors.userType.message}</p>
                )}

                {/* ? if user type is business then show company name input */}
                {watch("userType") === "company" && (
                  <input
                    className="w-full h-[45px] bg-[#257d860d] border border-[#139bad33] rounded-sm px-5 py-2.5 text-white placeholder:text-lightWhite focus-visible:outline-0"
                    placeholder="Company User Name"
                    type="text"
                    {...register("companyName", {
                      required: "Company User Name is required",
                    })}
                  />
                )}
                {watch("userType") === "company" && errors.companyName && (
                  <p className="text-red">{errors.companyName.message}</p>
                )}

                {/* ? if user type is customer then show name input */}
                {watch("userType") === "user" && (
                  <input
                    className="w-full h-[45px] bg-[#257d860d] border border-[#139bad33] rounded-sm px-5 py-2.5 text-white placeholder:text-lightWhite focus-visible:outline-0"
                    placeholder="Username"
                    type="text"
                    {...register("name", { required: "Username is required" })}
                  />
                )}
                {watch("userType") === "user" && errors.name && (
                  <p className="text-red">{errors.name.message}</p>
                )}
                <input
                  className="w-full h-[45px] bg-[#257d860d] border border-[#139bad33] rounded-sm px-5 py-2.5 text-white placeholder:text-lightWhite focus-visible:outline-0"
                  placeholder="First Name"
                  type="text"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                />
                {errors.firstName && (
                  <p className="text-red">{errors.firstName.message}</p>
                )}
                <input
                  className="w-full h-[45px] bg-[#257d860d] border border-[#139bad33] rounded-sm px-5 py-2.5 text-white placeholder:text-lightWhite focus-visible:outline-0"
                  placeholder="Last Name"
                  type="text"
                  {...register("lastName", {
                    required: "First Name is required",
                  })}
                />
                {errors.lastName && (
                  <p className="text-red">{errors.lastName.message}</p>
                )}
                <input
                  className="w-full h-[45px] bg-[#257d860d] border border-[#139bad33] rounded-sm px-5 py-2.5 text-white placeholder:text-lightWhite focus-visible:outline-0"
                  placeholder="Email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red">{errors.email.message}</p>
                )}

                <input
                  className="w-full h-[45px] bg-[#257d860d] border border-[#139bad33] rounded-sm px-5 py-2.5 text-white placeholder:text-lightWhite focus-visible:outline-0"
                  placeholder="Create password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red">{errors.password.message}</p>
                )}
              </div>

              {/* BUTTON */}
              <button className="buttonPrimary font-semibold">
                Create Account
              </button>
            </form>
            <p className="mt-5 text-center">
              Already have an account?{" "}
              <button
                className="text-[#F6B519]"
                onClick={() => setWhichAuth("sign-in")}
              >
                Sign in instead
              </button>
            </p>

            {/* OR */}
            <div className="my-7 text-base relative after:content-[''] after:absolute after:bg-teal-100 after:w-full after:h-[1px] after:opacity-20 after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:translate-y-1/2">
              <span className="block m-auto text-center">or continue with</span>
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
            {/* <button className="w-full h-[66px] bg-lightGreen rounded-sm text-lg">
                                Connect through MetaMask
                            </button> */}
          </FormProvider>
        </div>
      </div>
      {/* <p className="my-10 text-center">©2023 Free Bling Inc. - All rights reserved.</p> */}
    </>
  );
}
