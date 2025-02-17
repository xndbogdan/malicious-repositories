import { doc, setDoc, updateDoc } from "firebase/firestore";
import router from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Loader from "./loader";
import PostEntry from "./PostEntry";
import Prizes from "./Prizes";
import ProtectedRoute from "./ProtectedRoute";
import Tasks from "./Tasks";
import UserDeatils from "./UserDeatils";
import { useAuth } from "../context/authcontext";
import { useUserData } from "../context/userDataHook";
import { db } from "../firebase";
import MainLayout from "./Layouts/MainLayout";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { handleNotification, sendEmail } from "../utils/campaignEvents";
import Setup from "./setup";
export default function New({ giveaway }: any) {
  const { userData } = useUserData();
  const {
    isNotificationEnabled,
    isEmailEnabled,
    setIsEmailEnabled,
    setIsNotificationEnable,
  } = useAuth();
  const [loading, setLoading] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const { data, setFormValues, user } = useAuth();
  const [inProgress, setInProgress] = useState(false);

  const id = router.query.id;
  const [editMode, setEditMode] = useState(false);
  // if id is not null or undefined and has a value then editmode is true
  useEffect(() => {
    if (id !== null && id !== undefined && id !== "") {
      setEditMode(true);
    }
  }, [id]);

  useEffect(() => {
    setLoading(!loading);
    if (userData?.userType === "user") {
      toast.error("Access denied. Redirecting to your dashboard");
      window.location.href = "/users/dashboard";
    }
  }, [userData]);

  function nextTab() {
    setTabIndex(tabIndex + 1);
  }

  function prevTab() {
    setTabIndex(tabIndex - 1);
  }

  // Generate UID
  function generateUID() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
  // change here
  async function submitCampaign() {
    setInProgress(true);
    const tempData = {
      ...data,
      user_uid: userData?.uid,
      uid: generateUID(),
      template:
        data.template === true ||
        data.template === undefined ||
        data.template === null
          ? false
          : data.template,
      draft: false,
      isNotificationEnabled : true,
      isEmailEnabled 
    };
    setLoading(true);
    try {
      const ref = doc(db, "giveaway", tempData.uid);
      await setDoc(ref, tempData);
      if (userData?.isNotificationEnabled || tempData?.isNotificationEnabled) {
        await handleNotification(userData,tempData, user);
      }
      // if (userData?.isEmailEnabled || isEmailEnabled) {
      //   await sendEmail(userData, tempData, user);
      // }
      reSetNotifications();
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

  async function submitCampaignAsDraft() {
    setInProgress(true);
    const tempData = {
      ...data,
      user_uid: userData?.uid,
      uid: generateUID(),
      draft: true
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
  function reSetNotifications() {
    setIsEmailEnabled(false);
    setIsNotificationEnable(false);
  }

  // update here
  async function updateCampaign() {
    setLoading(true)
    setInProgress(true);
    if (id !== null && id !== undefined && id !== "") {
      const ref = doc(db, "giveaway", id.toString());
      const tempData = {
        ...data,
        isNotificationEnabled : true,
        isEmailEnabled : true,
      };
      // update ref
      try {
        await updateDoc(ref, tempData);
        if (tempData.isNotificationEnabled) {
          await handleNotification(userData, tempData, user, "updated");
        }
        // if (tempData?.isEmailEnabled) {
        //   await sendEmail(userData,tempData, user, "updated");
        // }
        reSetNotifications();
        router.push("/company/giveaway");
        toast.success("GiveAway Updated");
        setLoading(false);
        setFormValues("submitted");
      } catch (e: any) {
        setLoading(false);
        toast.error(e);
      }
    }
  }

  function Cancel() {
    router.push("/company/giveaway");
    setFormValues("submitted");
  }

  return (
    <MainLayout>
      <ProtectedRoute>
        <Loader show={loading}></Loader>
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row w-full justify-between items-center">
            <h2 className="flex space-x-3 items-center text-xl font-Ubuntu-Medium">
              <PlusCircleIcon className="w-6 h-6 text-teal-600" />
              <span>Create a Giveaway</span>
            </h2>
          </div>
          <div className="mt-8 md:mt-22">
            <Tabs
              className="flex flex-col grid_template_area"
              focusTabOnClick={false}
              selectedIndex={tabIndex}
              onSelect={
                  ()=>{}
              }
            >
              <div className="flex flex-col lg:flex-row w-full justify-between items-center">
                {/* TABS LIST*/}
                <TabList className="fbTabList grid_giveaway_tabs ">
                  <Tab
                    className="fbTab"
                    selectedClassName="bg-extraLightPrimaryGreen rounded-[7px]"
                  >
                    Setup
                  </Tab>
                  <Tab
                    // disabled={true}
                    className="fbTab"
                    selectedClassName="bg-extraLightPrimaryGreen rounded-[7px]"
                  >
                    User details
                  </Tab>
                  <Tab
                    // disabled={true}
                    className="fbTab"
                    selectedClassName="bg-extraLightPrimaryGreen rounded-[7px]"
                  >
                    Tasks
                  </Tab>
                  <Tab
                    className="fbTab"
                    selectedClassName="bg-extraLightPrimaryGreen rounded-[7px]"
                  >
                    Prizes
                  </Tab>
                  <Tab
                    className="fbTab"
                    selectedClassName="bg-extraLightPrimaryGreen rounded-[7px]"
                  >
                    Post entry
                  </Tab>
                </TabList>
                <div className="grid_giveaway_buttons mt-20 md:mt-[60px] lg:mt-0">
                  <div className="flex flex-col-reverse gap-y-6 md:gap-y-0 md:gap-x-[34px] md:flex-row lg:gap-x-8 lg:justify-end px-1">
                    <button onClick={Cancel} className="buttonPrimary">
                      Discard
                    </button>

                    {tabIndex < 4 && !editMode && (
                      <button
                        onClick={submitCampaignAsDraft}
                        className="buttonPrimary py-2"
                        disabled={inProgress}
                      >
                        Save As Draft
                      </button>
                    )}
                    {tabIndex === 4 && !editMode && (
                      <button
                        onClick={submitCampaign}
                        className="buttonPrimary py-2"
                        disabled={inProgress}
                      >
                        Publish
                      </button>
                    )}
                    {editMode && (
                      <button
                        onClick={updateCampaign}
                        className="buttonPrimary"
                        disabled={inProgress}
                      >
                        Update
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid_giveaway_content mt-8 lg:mt-10 ">
                <TabPanel>
                  <Setup formStep={tabIndex} nextFormStep={nextTab} />
                </TabPanel>
                <TabPanel>
                  <UserDeatils
                    formStep={tabIndex}
                    nextFormStep={nextTab}
                    prevFormStep={prevTab}
                  />
                </TabPanel>
                <TabPanel>
                  <Tasks
                    formStep={tabIndex}
                    nextFormStep={nextTab}
                    prevFormStep={prevTab}
                  />
                </TabPanel>
                <TabPanel>
                  <Prizes
                    formStep={tabIndex}
                    nextFormStep={nextTab}
                    prevFormStep={prevTab}
                  />
                </TabPanel>
                <TabPanel>
                  <PostEntry
                    formStep={tabIndex}
                    nextFormStep={nextTab}
                    prevFormStep={prevTab}
                  />
                </TabPanel>
              </div>
            </Tabs>
          </div>
        </div>
      </ProtectedRoute>
    </MainLayout>
  );
}