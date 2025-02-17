import React, { useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { getMessaging, onMessage } from "firebase/messaging";
import Image from "next/legacy/image";
import Link from "next/link";
import { useUserData } from "../context/userDataHook";
import Loader from "./loader";
import router from "next/router";
import { useAuth } from "../context/authcontext";
import AuthModal from "./AuthPanel/AuthModal";
import {
  ArrowRightOnRectangleIcon,
  BellAlertIcon,
  ChartPieIcon,
  ChevronDownIcon,
  FireIcon,
  PlusCircleIcon,
  RectangleGroupIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

import Lottie from "lottie-react";

import logo from "../public/assets/anim/logo.json";


type Notification = {
  title: string;
  body: string;
  link: string;
}[];

export default function HeaderBizUtility(props: any) {
  // get userTYpe from userData
  const { userData } = useUserData();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<boolean>(false);
  const {
    user,
    notification,
    setNotification,
    logOut,
    authModal: { whichAuth, setWhichAuth },
  } = useAuth();
  const [count, setCount] = useState<number | null>(null);
  const userParse = localStorage.getItem("user") || "";
  let users: any
  if (userParse) {
    users = JSON.parse(userParse)
  }

  // set loading to true if there is no userData
  useEffect(() => {
    setLoading(userData === null);
  }, [userData || users]);

  useEffect(() => {
    const onMessageListener = () => {
      const messaging = getMessaging();
      return new Promise((resolve) => {
        return onMessage(messaging, (payload) => {
          resolve(payload);
        });
      });
    };
    onMessageListener()
      .then((payload: any) => {
        console.log(payload);
        setNotification((prev: Notification) => [
          ...prev,
          {
            title: payload.notification.title,
            body: payload.notification.body,
            link: payload.fcmOptions.link,
          },
        ]);
        setCount((prev) => (prev ? prev + 1 : 1));
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleAuth = (value: string) => {
    setOpen(true);
    setWhichAuth(value);
  };
  // go to profile
  const goToCompanyProfile = () => {
    userData && userData.userType === "company"
      ? router.push(`/company/profile/`)
      : router.push(`/users/profile`);
  };

  // go to dashboard
  const goToDashboard = () => {
    userData && userData.userType === "company"
      ? router.push("/company/dashboard")
      : router.push("/users/dashboard");
  };

  const handleLogout = () => {
    logOut();
    router.push("/");
  };

  return (
    <>
      <div className="flex justify-end items-center w-full sticky top-0 z-50 px-5 md:px-6 py-3 bg-gradient-to-r from-fbblack-200 to-fbblack-100">
        <div className="text-left mx-auto w-[100px] lg:hidden ml-2">
          <Link href="/" className="block">
            <Lottie animationData={logo} loop={false} />
          </Link>
        </div>
        {userData || users ? (
          <>
            <div className="relative">
              <NotificationPanel
                setCount={setCount}
                notification={notification}
              />

              {count ? (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                  {count}
                </span>
              ) : null}
            </div>
            {/* USER PROFILE */}
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`
                    ${open ? "" : "text-opacity-90"}
                    flex relative items-center space-x-3 max-w whitespace-nowrap px-3 py-2 rounded-full bg-teal-700/40 hover:bg-teal-700/80 focus:outline-none focus-visible:ring-white`}
                  >
                    {/* profile pic  */}
                    {userData?.imgUrl || users?.imgUrl ? (
                      <span className="w-[45px] h-[45px]">
                        <Image
                          onClick={goToCompanyProfile}
                          className="group-hover:scale-105 transition duration-300 ease-in-out rounded-full"
                          src={userData?.imgUrl || users?.imgUrl}
                          alt="Company logo"
                          width="45"
                          height="45"
                        />
                      </span>
                    ) : userData?.imgUrl || users?.imgUrl ? (
                      <Image
                        className="group-hover:scale-105 transition duration-300 ease-in-out rounded-full"
                        src={userData?.imgUrl || users?.imgUrl}
                        alt="User image"
                        width="45"
                        height="45"
                      />
                    ) : (
                      <Image
                        onClick={goToCompanyProfile}
                        className="group-hover:scale-105 transition duration-300 ease-in-out rounded-full"
                        src="/assets/images/user_profile.png"
                        alt="Company logo"
                        width="45"
                        height="45"
                      />
                    )}
                    <span className="text-white truncate">
                      {userData?.name || userData?.name || users.name}
                    </span>
                    <ChevronDownIcon className="w-3 h-3" />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="bg-teal-700/90 backdrop-blur-sm rounded-sm absolute right-[0%] z-10 mt-3 w-fit sm:px-0 min-w-[222px]">
                      <div className="px-2 py-5 space-y-3">
                        {/* Add your popover content here */}
                        {userData && userData.userType === "company" && (
                          <Link
                            href="/company/giveaway/"
                            className="popoverLink"
                          >
                            <PlusCircleIcon className="w-4 h-4 business-create" />
                            <span className="">Create Campaign</span>
                          </Link>
                        )}
                        <button
                          className="popoverLink w-full"
                          onClick={goToDashboard}
                        >
                          <RectangleGroupIcon className="w-4 h-4 business-create" />
                          <span className="">Dashboard</span>
                        </button>
                        <button
                          className="popoverLink w-full"
                          onClick={goToCompanyProfile}
                        >
                          <UserIcon className="w-4 h-4" />
                          <span className="">Your Profile</span>
                        </button>
                        {userData && userData.userType !== "company" && (
                          <Link href="/users/dashboard" className="popoverLink">
                            <FireIcon className="w-4 h-4" />
                            <span className="">Favorites</span>
                          </Link>
                        )}
                        {/* {userData && userData.userType !== "company" && (
                          <button
                            className="popoverLink w-full"
                            disabled
                            title="Coming Soon"
                          >
                            <UserGroupIcon className="w-4 h-4" />
                            <span className="">Affiliates</span>
                          </button>
                        )} */}
                        {userData && userData.userType === "company" && (
                          <Link href="/company/analytics" className="popoverLink">
                            <ChartPieIcon className="w-4 h-4" />
                            <span className="">Analytics</span>
                          </Link>
                        )}
                        {userData && userData.userType === "company" && (
                          <Link
                            href="/company/followers "
                            className="popoverLink"
                          >
                            <ChartPieIcon className="w-4 h-4" />
                            <span className="">Followers</span>
                          </Link>
                        )}
                        <button
                          className="popoverLink w-full"
                          onClick={handleLogout}
                        >
                          <ArrowRightOnRectangleIcon className="w-4 h-4" />
                          <span className="">Sign Out</span>
                        </button>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </>
        ) : (
          <div className="md:inline-flex items-center space-x-5 px-2 py-2 md:px-0 md:py-0">
            <button
              className="buttonTertiary my-0 hover:text-yellow"
              onClick={() => handleAuth("sign-in")}
            >
              Sign In
            </button>
            <button
              className="buttonTertiary my-0 hover:text-yellow"
              onClick={() => handleAuth("")}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
      <AuthModal setOpen={setOpen} open={open} />
    </>
  );
}

function NotificationPanel({
  notification,
  setCount,
}: {
  notification: Array<{ title: string; body: string; link: string }>;
  setCount: React.Dispatch<React.SetStateAction<null | number>>;
}) {
  return (
    <div
      onClick={() => {
        setCount(null);
      }}
      className="max-w-sm px-4"
    >
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                group inline-flex items-center rounded-md px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <BellAlertIcon className="UtilityIcon" />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-1/2 z-10 mt-3 w-[250px] -translate-x-1/2 transform sm:px-0">
                <div className="overflow-hidden rounded-sm shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative group flex flex-col bg-teal-600/60 backdrop-blur-sm py-3 group text-white">
                    {notification.length > 0 ? (
                      notification.map((item, index) => (
                        <a
                          key={index}
                          href={item.link}
                          className="-m-3 flex p-6 items-center rounded-lg  transition duration-150 ease-in-out group-hover:text-white hover:bg-[#162126]  focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                        >
                          <div className="ml-4">
                            <p className="text-sm font-medium">{item.title}</p>
                            <p className="text-sm">{item.body}</p>
                          </div>
                        </a>
                      ))
                    ) : (
                      <div className="-m-3 flex p-6 items-center rounded-sm transition duration-150 ease-in-out">
                        No notifications
                      </div>
                    )}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}