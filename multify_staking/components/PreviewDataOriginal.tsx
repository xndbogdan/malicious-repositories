import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PrizeTemp from "./PrizeTemp";
import TasksList from "./TasksList";
import { useUserData } from "../context/userDataHook";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";
import { useAuth } from "../context/authcontext";
import router from "next/router";
import { ExpiredNotice } from "./CampaignsList";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Countdown from "react-countdown";
import Loader from "./loader";

const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
  if (completed) {
    // Render a complete state
    return <ExpiredNotice msg="ENDED" />;
  } else {
    // Render a countdown
    return (
      <p className="text-sm text-lightWhite font-Ubuntu-Medium">
        <span className="ml-0.5 text-white font-Ubuntu-Bold">{days}d:</span>
        <span className="ml-0.5 text-white font-Ubuntu-Bold">{hours}h:</span>
        <span className="ml-0.5 text-white font-Ubuntu-Bold">{minutes}m:</span>
        <span className="ml-0.5 text-white font-Ubuntu-Bold">{seconds}s</span>
      </p>
    );
  }
};

export default function PreviewData(props: any) {
  const { data, setFormValues } = useAuth();
  let id = router.query.id;
  const [localData, setLocalData] = useState<any>();
  const endDate = localData?.endDate;
  const endDateTime = new Date(endDate).getTime(); // convert end date to milliseconds
  const nowDateTime = Date.now(); // get current date time in milliseconds
  let diffTime = endDateTime - nowDateTime;
  const { userData, updateUserData } = useUserData();
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [image, setImage] = useState<any | null | undefined>();
  const firstPrize = data?.prize?.[0];
  const [percentage, setPercent] = useState("0%");
  const [userEntries, setUserEntries] = useState(0);
  const [doneTasks, setDoneTasks] = useState<any>();
  const [open, setOpen] = useState(false);
  const userParse = localStorage.getItem("user") || "";
  let user: any;
  if (userParse) {
    user = JSON.parse(userParse);
  }
  const [disabled, setDisabled] = useState(true);
  const onOpenModal = () => {
    setOpen(true);
  };
  const onCloseModal = () => setOpen(false);
  const [companyData, setCompanyData] = useState<any>();
  // update viewMode if id is not null , undefined or empty string using useEffect
  useEffect(() => {
    setLoading(true);
    if (router.query.id) {
      id = router.query.id;
      setViewMode(true);
    }
  }, [id, router.query.id]);
  // getData if data is null or undefined from db in view mode
  useEffect(() => {
    if (viewMode) {
      setLoading(true);
      const getData = async () => {
        const q = query(collection(db, "giveaway"), where("uid", "==", id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc: any) => {
          const data = doc.data();
          const endDate = data?.endDate;
          const endDateTime = new Date(endDate).getTime(); // convert end date to milliseconds
          const nowDateTime = Date.now();
          diffTime = (endDateTime - nowDateTime);
          setLocalData(data);
          setFormValues(data);
        });
      };
      if (id && !localData?.uid) getData();
    }
    if ((user && userData?.userType === "user") || user?.userType === "user") {
      const usertemp = userData || user;
      // calculate noOfEntries of this user from participatedGiveaways where giveawayId == id
      const tasksDoneByUser = usertemp?.participatedGiveaways?.filter(
        (tasks: any) => tasks.giveawayId === id
      );
      let sum = 0;
      setDoneTasks(tasksDoneByUser);
      tasksDoneByUser?.forEach((giveaway: any) => {
        sum += Number(giveaway.noOfEntries);
      });
      setUserEntries(sum);
      const percentage =
        (tasksDoneByUser?.length / localData?.tasks?.length) * 100;
      console.log(percentage);
      setPercent(percentage + "%");
    } else setLoading(false);
  }, [userData?.uid, viewMode]);

  // update image if firstPrize.image is not null or undefined
  useEffect(() => {
    if (firstPrize?.image) {
      setImage(firstPrize?.image);
      console.log(diffTime)
    } else {
      setImage(undefined);
    }
  }, [firstPrize?.image]);
  useEffect(() => {
    if (localData?.user_uid && viewMode) {
      const getUserData = async () => {
        const qry = query(
          collection(db, "users"),
          where("uid", "==", localData?.user_uid)
        );
        const ref = await getDocs(qry);
        ref.forEach((doc) => {
          const data = doc.data();
          setCompanyData(data);
        });
      };
      getUserData();
      setLoading(false);
    } else {
      setCompanyData(userData);
      setLoading(false);
    }
  }, [localData]);

  useEffect(() => {
    // check if user have the data required by the giveaway
    if (user) {
      if (
        localData?.reqFullName ||
        localData?.reqEmail ||
        localData?.reqCrypto ||
        localData?.reqCountry
      ) {
        if (
          // !user?.name ||
          !user?.firstName ||
          !user?.lastName ||
          !user?.email ||
          !user?.erc20 ||
          !user.bnb ||
          !user?.country
        ) {
          if (
            (user?.uid && user?.userType === "user") ||
            userData?.userType === "user"
          )
            toast.error(
              "You need to finish your profile to participate"
            );
        } else setDisabled(false);

      }
    }
  }, [
    user?.name,
    user?.firstName,
    user?.lastName,
    user?.email,
    user?.erc20,
    user?.bnb,
    user?.country,
    localData?.reqFullName,
    localData?.reqEmail,
    localData?.reqCrypto,
    localData?.reqAddress,
  ]);

  function generateUID() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
  // to save as draft
  async function saveAsTemp() {
    // add a property to data name draft
    const tempData = {
      ...data,
      user_uid: userData?.uid,
      uid: generateUID(),
      template: true,
      draft: false,
    };

    try {
      const ref = doc(db, "giveaway", tempData.uid);
      await setDoc(ref, tempData);
      toast.success("GiveAway Saved as Template");
    } catch (e: any) {
      toast.error(e);
    }
    setFormValues("submitted");
    router.push("/company/giveaway");
  }

  async function submitCampaign() {
    const tempData = {
      ...data,
      user_uid: userData?.uid,
      uid: generateUID(),
      template: false,
      draft: false,
    };

    setLoading(true);
    try {
      const ref = doc(db, "giveaway", tempData.uid);
      await setDoc(ref, tempData);
      setLoading(false);
      router.push("/company/giveaway");
      toast.success("GiveAway Created");
    } catch (e: any) {
      setLoading(false);
      toast.error(e);
    }
    setLoading(false);
    setFormValues("submitted");
  }

  async function updateLocalData() {
    const q = query(collection(db, "giveaway"), where("uid", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: any) => {
      const data = doc.data();
      setLocalData(data);
      setFormValues(data);
      setLoading(false);
    });
    updateUserData();
    if (userData?.userType === "user" || user.userType === "user") {
      const usertemp = userData || user;

      // calculate noOfEntries of this user from participatedGiveaways where giveawayId == id
      const tasksDoneByUser = usertemp?.participatedGiveaways?.filter(
        (tasks: any) => tasks.giveawayId === id
      );
      let sum = 0;
      setDoneTasks(tasksDoneByUser);
      tasksDoneByUser?.forEach((giveaway: any) => {
        sum += Number(giveaway.noOfEntries);
      });
      setUserEntries(sum);
      // calculate percentage of tasks done by user and total tasks in the giveaway
      const percentage =
        (tasksDoneByUser?.length / localData?.tasks?.length) * 100;
      console.log(percentage);
      setPercent(percentage + "%");
    }
  }
  return (
    <>
      {loading && <Loader show={loading}></Loader>}
      {!loading && (
        <>
          <div className="px-5 max-w-[1280px] mx-auto flex flex-col items-start md:flex-row md:space-x-10">
            {/* left content */}
            <div className="flex-1 w-full md:w-2/3">
              <h3 className="text-xl font-Ubuntu-Medium w-full md:text-2xl lg:w-auto my-3">
                {localData?.title}
              </h3>
              <div className="flex items-center cursor-pointer mb-2 md:mb-0">
                {companyData && companyData?.imgUrl ? (
                  <>
                    <Image
                      src={companyData?.imgUrl}
                      className="w-10 h-10 mr-3 rounded-full"
                      width={25}
                      height={25}
                      alt="Company Logo"
                    />
                    by{" "}
                    <span className="text-teal-300 ml-1">
                      {companyData?.company_name || companyData?.name}
                    </span>
                  </>
                ) : (
                  <>
                    <Image
                      src="/assets/images/user_profile.png"
                      className="w-10 h-10 mr-3 rounded-full"
                      width={25}
                      height={25}
                      alt="Company Logo"
                    />
                    by <span className="text-teal-300 ml-1"></span>
                  </>
                )}
              </div>
              <div className="flex flex-col-reverse md:flex md:flex-row md:space-x-5">
                {image ? (
                  <Image
                    src={image}
                    className="w-full md:max-w-[192px] py-5 rounded-sm"
                    width={192}
                    height={192}
                    alt="Giveaeway featured image"
                  />
                ) : (
                  <Image
                    src="/assets/images/giveaway_img.png"
                    className="w-full md:max-w-[192px] py-5 rounded-sm"
                    width={192}
                    height={192}
                    alt="Giveaeway featured image"
                  />
                )}

                <div className="flex flex-col justify-between md:justify-center">
                  <div className="flex font-Ubuntu-Medium items-center text-sm">
                    <span className="text-white/60 mr-1">Time Left:</span> {""}
                    {
                      diffTime && (
                        <Countdown
                          date={Date.now() + diffTime}
                          renderer={renderer}
                        />
                      )
                    }

                  </div>
                  <div className="flex flex-row md:flex-col w-full justify-between">
                    {userData && userData?.userType !== "company" && (
                      <p className="py-0 md:py-2 text-white/60 font-Ubuntu-Medium text-sm md:text-xl">
                        Your entries:{" "}
                        <span className="text-white text-base md:text-xl">
                          {userEntries}
                        </span>
                      </p>
                    )}
                    <p className="py-0 md:py-2 text-white/60 font-Ubuntu-Medium text-sm md:text-xl">
                      Total entries:{" "}
                      <span className="text-white text-base md:text-xl">
                        {localData?.totalEntries || 0}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* prizes */}
              <div className="flex justify-between">
                <h3 className="flex text-xl font-medium items-center space-x-4 mt-10 mb-4">
                  <Image
                    src="/assets/images/gift_icon_white.svg"
                    width={24}
                    height={24}
                    alt="Giveaeway featured image"
                  />{" "}
                  <span>Prizes</span>
                </h3>
              </div>
              <div className="grid grid-cols-1 items-center gap-y-6 md:gap-x-6 md:gap-y-7 md:grid-cols-2 lg:grid-cols-3">
                {localData?.prize?.map((prize: any, index: any) => {
                  return <PrizeTemp key={index} data={prize} />;
                })}
              </div>

              {/* details */}
              <div className="group">
                <h3 className="flex text-xl font-medium items-center space-x-4 mt-10 mb-4">
                  <Image
                    src="/assets/images/bell_icon.svg"
                    className=""
                    width={24}
                    height={24}
                    alt="Giveaeway featured image"
                  />{" "}
                  <span>About giveaway</span>
                </h3>
                <p className="text-white/40 group-hover:text-white ease-linear duration-300">
                  {localData?.description}
                </p>
              </div>

              {/* how to */}
              <div className="group">
                <h3 className="flex text-xl font-medium items-center space-x-4 mt-10 mb-4">
                  <Image
                    src="/assets/images/list_icon.svg"
                    className=""
                    width={24}
                    height={24}
                    alt="Giveaeway featured image"
                  />{" "}
                  <span>How to participate</span>
                </h3>
                <p className="text-white/40 group-hover:text-white ease-linear duration-300">
                  Complete the tasks in Task list to participate
                </p>
              </div>

              {/* terms */}
              <div className="">
                <h4 className="flex text-base font-medium items-center space-x-4 mt-10 mb-4">
                  <Image
                    src="/assets/images/info_icon.svg"
                    className=""
                    width={24}
                    height={24}
                    alt="Giveaeway featured image"
                  />{" "}
                  <button className="underline" onClick={onOpenModal}>
                    Terms and Conditions
                  </button>
                </h4>
              </div>
            </div>

            {/* right content */}
            {
              user && (
                <>
                  <div className="w-full h-auto md:w-1/3 rounded-sm p-5 mt-10 md:mt-0 bg-teal-500">
                    {/* <h3 className="flex text-[20px] font-medium items-center">
                Giveaway tasks
              </h3> */}
                    {
                      user?.userType === "user" && (
                        localData?.tasks?.map((task: any, index: any) => {
                          return (
                            <TasksList
                              key={index}
                              data={task}
                              giveawayId={id}
                              tasksDone={doneTasks}
                              disabled={disabled}
                              updateLocalData={updateLocalData}
                            />
                          );
                        }))
                    }

                    {viewMode && userData?.userType === "user" && (
                      <div className="flex flex-1 flex-col mt-5">
                        <h3 className="flex flex-row text-base font-Ubuntu-Regular justify-between">
                          Tasks Completed{" "}
                          <span className="text-teal-100 text-[20px]">
                            {doneTasks?.length}/{localData?.tasks?.length || 0}
                          </span>
                        </h3>
                        <div className="border-[2px] border-teal-900/20 relative h-[20px] w-full rounded-full p-1 mt-1">
                          <div
                            style={{ width: percentage }}
                            className="rounded-full absolute top-0 left-0 flex h-full items-center justify-center text-xs font-Ubuntu-Regular text-white bg-gradient-to-r from-[#139BAD]/40 to-[#139BAD]"
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* BUTTONS */}
                    {!viewMode && (
                      <div className="mt-10 md:mt-[60px] lg:mt-auto lg:ml-auto px-1 py-3">
                        <div className="flex flex-col-reverse gap-y-6 md:gap-y-0 md:gap-x-[34px] md:flex-row lg:gap-x-8 lg:justify-end">
                          <button onClick={saveAsTemp} className="buttonPrimary">
                            Save as Template
                          </button>
                          <button onClick={submitCampaign} className="buttonPrimary">
                            Save
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )
            }
            {
              !user && (
                <>
                  <div className="w-full h-auto md:w-1/3 rounded-sm p-5 mt-10 md:mt-0 bg-teal-500">
                    <div className="flex flex-1 flex-col mt-5">
                      <h3 className="flex flex-row text-base font-Ubuntu-Regular justify-center">
                       Sign In To Participate
                      </h3>
                    </div>
                  </div>
                </>
              )
            }

          </div>
          {/* POPUP */}
          <Modal
            open={open}
            onClose={onCloseModal}
            center
            classNames={{
              overlay: "popupTasksOverlay",
              modal: "!w-full !p-6 !m-0 md:!max-w-[844px] !bg-transparent",
            }}
          >
            <div className="bg-[#101B1B] border-[1.5px] border-jade-100 rounded-md p-6 md:p-10">
              <div className="w-full">
                <h2>Terms and Conditions</h2>
                <p>
                  {localData?.toc || ""}
                </p>
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
}
