import { doc, setDoc } from "firebase/firestore";
import router from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/authcontext";
import { useUserData } from "../context/userDataHook";
import { db } from "../firebase";
import { handleNotification, sendEmail } from "../utils/campaignEvents";

export default function PostEntry({
  formStep,
  nextFormStep,
  prevFormStep,
}: any) {
  const {
    data,
    setFormValues,
    user,
    isNotificationEnabled,
    setIsNotificationEnable,
    isEmailEnabled,
    setIsEmailEnabled,
  } = useAuth();
  const { userData } = useUserData();
  const [loading, setLoading] = useState(false);
  // const [isNotificationEnabled, setIsNotificationEnable] = useState(false);
  // const [isEmailEnabled, setIsEmailEnabled] = useState(false);
  function generateUID() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
  function reSetNotifications() {
    setIsEmailEnabled(false);
    setIsNotificationEnable(false);
  }
  // to save as draft
  const onSubmitAsTemplate = async () => {
    // add a property to data name draft
    const tempData = {
      ...data,
      user_uid: userData?.uid,
      uid: generateUID(),
      template: true,
      draft: false,
      participatedUsers: [],
      winners: [],
      status :"open",
      totalEntries: 0,
      isNotificationEnabled : true,
      isEmailEnabled : true,
      closedAt : {}
    };

    try {
      const ref = doc(db, "giveaway", tempData.uid);
      await setDoc(ref, tempData);
      if (userData?.isNotificationEnabled || tempData?.isNotificationEnabled) {
        await handleNotification(userData, tempData, user);
      }
      // if (userData?.isEmailEnabled || tempData?.isEmailEnabled) {
      //   await sendEmail(userData, tempData, user);
      // }
      reSetNotifications();
      toast.success("GiveAway Saved as Template");
    } catch (e: any) {
      toast.error(e);
    }
    setFormValues("submitted");
    console.log(data);
    router.push("/company/giveaway");
  };

  const goToPreview = () => {
    router.push("/company/giveaway/preview");
  };

  async function submitCampaign() {
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
      participatedUsers: [],
      winners: [],
      status :"open",
      totalEntries: 0,
      isNotificationEnabled : true,
      isEmailEnabled : true,
      closedAt : {}
    };
    console.log("this is data",tempData)
    setLoading(true);
    try {
      const ref = doc(db, "giveaway", tempData.uid);
      await setDoc(ref, tempData);
      if (userData?.isNotificationEnabled || tempData?.isNotificationEnabled) {
        await handleNotification(userData, tempData, user, "updated");
      }
      // if (userData?.isEmailEnabled || tempData?.isEmailEnabled) {
      //   await sendEmail(userData, tempData, user, "updated");
      // }
      setLoading(false);
      reSetNotifications();
      router.push("/company/giveaway");
      toast.success("GiveAway Created");
    } catch (e: any) {
      setLoading(false);
      toast.error(e);
    }
    setLoading(false);
    setFormValues("submitted");
  }
  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:max-w-[594px]">
          <div className="space-y-6 md:space-y-10">
            {/* BOX */}
            <div className="border-[1.5px] border-jade-100 rounded-md">
              <div className="p-6 md:py-[30px] md:px-8">
                {/* HEADING */}
                <h4 className="text-[20px] leading-6 font-familyMedium mb-6 md:mb-8 lg:text-xl">
                  Email This Giveaway to your Followers
                </h4>
                {/* Checkbox */}
                <div >
                  <input
                    id="email"
                    type="checkbox"
                    className="inputCheckbox"
                  />
                </div>
              </div>
              <div className="p-6 md:py-[30px] md:px-8">
                {/* HEADING */}
                <h4 className="text-[20px] leading-6 font-familyMedium mb-6 md:mb-8 lg:text-xl">
                  Send out Notification about this giveaway
                </h4>
                {/* Checkbox */}
                <div >
                  <input
                    id="notis"
                    type="checkbox"
                    className="inputCheckbox"
                  />
                </div>
              </div>
            </div>

          
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-10 md:mt-[60px] lg:mt-auto lg:ml-auto px-1">
          <div className="flex flex-col-reverse gap-y-6 md:gap-y-0 md:gap-x-[34px] md:flex-row lg:gap-x-8 lg:justify-end">
            <button onClick={onSubmitAsTemplate} className="buttonPrimary">
              Save as a New Template
            </button>
            {!data?.template && (
              <button onClick={goToPreview} className="buttonPrimary">
                Preview
              </button>
            )}
            {data?.template && (
              <button onClick={submitCampaign} className="buttonPrimary">
                Publish
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}