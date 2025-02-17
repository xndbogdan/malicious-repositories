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
import {
  BellAlertIcon,
  GiftIcon,
  InformationCircleIcon,
  ListBulletIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
  if (completed) {
    // Render a complete state
    return <ExpiredNotice msg="ENDED" />;
  } else {
    // Render a countdown
    return (
      <div className="flex flex-col justify-center items-center text-white space-x-2">
        <span className="font-Ubuntu-Bold text-2xl">
          {days} {hours.toString().padStart(2, "0")}:
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </span>
        <span className="font-Ubuntu-Regular text-xs space-x-4">
          <span>Days</span>
          <span>Hours</span>
          <span>Minutes</span>
          <span>Seconds</span>
        </span>
      </div>
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
  const sortedArray = localData?.participatedUsers
    ?.slice()
    .sort((a: any, b: any) => (b.userEntries || 1) - (a.userEntries || 1));
  const userRank = sortedArray?.findIndex(
    (user: any) => user.name === userData?.name
  );

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
          diffTime = endDateTime - nowDateTime;
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
      setDisabled(false)
    } else setLoading(false);
  }, [userData?.uid, viewMode]);

  // update image if firstPrize.image is not null or undefined
  useEffect(() => {
    if (firstPrize?.image) {
      setImage(firstPrize?.image);
      console.log(diffTime);
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
            toast.error("You need to finish your profile to participate");
            setDisabled(true)
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
      console.log(sum);
      setUserEntries(sum);
      // calculate percentage of tasks done by user and total tasks in the giveaway
      const percentage =
        (tasksDoneByUser?.length / localData?.tasks?.length) * 100;
      console.log(percentage);
      setPercent(percentage + "%");
    }
  }
  return (
    <div className="w-full mx-auto flex flex-col space-y-4">
      {loading && <Loader show={loading}></Loader>}
      {!loading && (
        <>
          {/* new detail row v2 */}
          <div className="flex flex-col bg-teal-400 px-3 py-6 md:px-5 md:py-8 rounded-sm w-full">
            <div className="flex flex-col md:flex-row spaxe-x-0 md:space-x-5 space-y-4 md:space-y-0 items-start">
              {/* left detail  */}
              <div className="w-full md:w-1/2">
                {/* entry stats */}
                <div className="flex flex-row justify-center items-center mb-3.5 w-full">
                  {userData && userData?.userType !== "company" && (
                    <div className="flex flex-col text-white text-center pr-6">
                      <span className="font-Ubuntu-Bold text-xl md:text-2xl">
                        {userEntries}
                      </span>
                      <span className="font-Ubuntu-Regular text-xs">
                        Your Entries
                      </span>
                    </div>
                  )}
                  {/* countdown  */}
                  <div className="flex flex-col justify-center items-center md:border md:border-y-0 md:px-6 border-x-teal-300/20">
                    {diffTime && (
                      <Countdown
                        className="font-Ubuntu-Bold text-xl md:text-2xl"
                        date={Date.now() + diffTime}
                        renderer={renderer}
                      />
                    )}
                  </div>
                  <div className="flex flex-col text-white text-center pl-6">
                    <span className="font-Ubuntu-Bold text-xl md:text-2xl">
                      {localData?.totalEntries || 0}
                    </span>
                    <span className="font-Ubuntu-Regular text-xs">
                      Total entries
                    </span>
                  </div>
                </div>

                {/* ft image  */}
                {image ? (
                  <Image
                    src={image}
                    className="w-full"
                    width={529}
                    height={225}
                    alt="Giveaeway featured image"
                  />
                ) : (
                  <Image
                    src="/assets/images/ft-image-placeholder-st.jpg"
                    className="w-full"
                    width={529}
                    height={225}
                    alt="Giveaeway featured image"
                  />
                )}

                {/* title and company  */}
                <h3 className="text-xl font-Ubuntu-Medium w-full md:text-2xl lg:w-auto my-3.5">
                  {localData?.title}
                </h3>
                <div
                  onClick={() => {
                    router.push(`/company/profile/${companyData?.uid}`);
                  }}
                  className="flex font-Ubuntu-Bold items-center cursor-pointer mb-2 md:mb-0"
                >
                  {companyData && companyData?.imgUrl ? (
                    <>
                      <Image
                        src={companyData?.imgUrl}
                        className="w-10 h-10 mr-3 rounded-full"
                        width={25}
                        height={25}
                        alt="Company Logo"
                      />{" "}
                      <span className="text-white hover:text-teal-300 text-lg">
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
                      <span className="text-white hover:text-teal-300 text-lg"></span>
                    </>
                  )}
                </div>
              </div>

              {/* right tasks */}
              <div className="bg-teal-500 py-2 px-3 rounded-sm w-full md:w-1/2">
                
                  <div className="w-full h-auto rounded-sm bg-teal-500 space-y-px">
                    {
                      localData?.tasks?.map((task: any, index: any) => {
                        return (
                          <TasksList
                            key={index}
                            data={task}
                            giveawayId={id}
                            entries={userEntries}
                            tasksDone={doneTasks}
                            disabled={disabled}
                            updateLocalData={updateLocalData}
                          />
                        );
                      })}

                    {viewMode && userData?.userType === "user" && (
                      <div className="hidden mt-5">
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
                          <button
                            onClick={saveAsTemp}
                            className="buttonPrimary"
                          >
                            Save as Template
                          </button>
                          <button
                            onClick={submitCampaign}
                            className="buttonPrimary"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                
                {/* {!user && (
                  <>
                    <div className="w-full h-auto md:w-1/3 rounded-sm p-5 mt-10 md:mt-0 bg-teal-500">
                      <div className="flex flex-1 flex-col mt-5">
                        <h3 className="flex flex-row text-base font-Ubuntu-Regular justify-center">
                          Sign In To Participate
                        </h3>
                      </div>
                    </div>
                  </>
                )} */}
              </div>
            </div>

            {/* details */}
            <div className="group">
              <h3 className="flex text-lg font-Ubuntu-Bold items-center space-x-1.5 mt-10">
                <BellAlertIcon className="w-5 h-5 text-white" />
                <span>About Event</span>
              </h3>
              <p className="text-white/40 font-Ubuntu-Regular text-sm group-hover:text-white ease-linear duration-300">
                {localData?.description}
              </p>
            </div>
            {/* how to */}
            <div className="group">
              <h3 className="flex text-lg font-Ubuntu-Bold items-center space-x-1.5 mt-7">
                <ListBulletIcon className="w-5 h-5 text-white" />
                <span>How to Participate</span>
              </h3>
              <p className="text-white/40 group-hover:text-white ease-linear duration-300">
                Complete the tasks in Task list to participate
              </p>
            </div>

            {/* terms */}
            <div className="">
              <h3 className="flex text-lg font-Ubuntu-Bold items-center space-x-1.5 mt-7">
                <InformationCircleIcon className="w-5 h-5 text-white" />
                <span
                  className="hover:cursor-pointer hover:text-teal-300"
                  onClick={onOpenModal}
                >
                  Terms and Conditions
                </span>
              </h3>
            </div>
          </div>

          {/* new prize row v2 */}
          <div className="flex flex-col bg-teal-400 px-3 py-6 md:px-16 md:py-8 rounded-sm w-full">
            <div className="flex justify-between">
              <h3 className="flex text-lg font-Ubuntu-Bold items-center space-x-1.5 mb-4">
                <GiftIcon className="w-5 h-5 text-white" />
                <span>Prizes</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 items-center gap-y-2.5 md:gap-x-2.5 md:gap-y-7 md:grid-cols-2 lg:grid-cols-4">
              {localData?.prize?.map((prize: any, index: any) => {
                return <PrizeTemp key={index} data={prize} />;
              })}
            </div>
          </div>

          {/* leaderboard row v2 */}
          <div className="flex flex-col bg-teal-400 px-3 py-6 md:px-16 md:py-8 rounded-sm w-full">
            <div className="flex justify-between">
              <h3 className="flex text-lg font-Ubuntu-Bold items-center space-x-1.5 mb-4">
                <TrophyIcon className="w-5 h-5 text-white" />
                <span>Leaderboard</span>
              </h3>
            </div>
            <div className="flex flex-col rounded-sm w-full">
  {/* Header Row */}
  <div className="flex bg-teal-700 mb-3 rounded-sm">
    <div className="p-2 font-bold text-center w-16 rounded-sm">
      Count
    </div>
    <div className="flex-grow p-2 font-bold text-center rounded-sm">Username</div>
    <div className="p-2 font-bold text-center w-16 rounded-sm">Entries</div>
  </div>

  {/* Data Rows */}
  <div className="flex flex-col">
    {/* map localData.participatedUsers here */}
    {sortedArray?.slice(0, 10).map((user: any, index: any) => {
      let backgroundColor = "";
      if (index === 0) {
        backgroundColor = "rgba(233, 115, 24, 1)";
      }
      if (index === 1) {
        backgroundColor = "rgba(233, 115, 24, 0.75)";
      } else if (index === 2) {
        backgroundColor = "rgba(233, 115, 24, 0.5)";
      }
      return (
        <div
          style={
            user.name === userData?.name
              ? { backgroundColor: "#10C8DC" }
              : { backgroundColor }
          }
          className="flex rounded-sm"
          key={index}
        >
          <div className="p-2 text-center w-16 rounded-sm">
            #{index + 1}
          </div>
          <div className="flex-grow p-2 text-center rounded-sm">{user.name}</div>
          <div className="p-2 text-center w-16 rounded-sm">
            {user.userEntries || 1}
          </div>
        </div>
      );
    })}
    {userRank > 9 && (
      <div className="flex bg-teal-300 rounded-sm">
        <div className="p-2 text-center w-16 rounded-sm">
          #{userRank + 1}
        </div>
        <div className="flex-grow p-2 text-center rounded-sm">
          userData?.name (You)
        </div>
        <div className="p-2 text-center w-16 rounded-sm">-</div>
      </div>
    )}
  </div>
</div>


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
                <p>{localData?.toc || ""}</p>
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
}
