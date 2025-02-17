import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useUserData } from "../context/userDataHook";
import { ExpiredNotice } from "./CampaignsList";
import router from "next/router";
import { useAuth } from "../context/authcontext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { CheckBadgeIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Countdown from "react-countdown";

const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
  if (completed) {
    // Render a complete state
    return <ExpiredNotice msg="GIVEAWAY ENDED" />;
  } else {
    // Render a countdown
    return (
      <p className="text-sm text-lightWhite font-Ubuntu-Medium">
        <span className="block text-xs mb-2 text-white/50 font-Ubuntu-Regular">Ending in:</span>
        <span className="flex text-md md:text-[28px] justify-center font-Ubuntu-Bold">{" "}
          <span className="text-white font-familySemibold flex flex-col text-center mr-3 space-y-2">
            <span>{String(days).padStart(2, '0')}</span>
            <span className="text-sm font-Ubuntu-Regular">days</span>
          </span>
          <span className="text-white font-familySemibold flex flex-col text-center space-y-2">
            <span>{hours}:</span>
            <span className="text-sm font-Ubuntu-Regular">h<span className="invisible md:visible">rs</span></span>
          </span>
          <span className="text-white font-familySemibold flex flex-col space-y-2">
            <span>{minutes}:</span>
            <span className="text-sm font-Ubuntu-Regular">m<span className="invisible md:visible">ins</span></span>
          </span>
          <span className="text-white font-familySemibold flex flex-col space-y-2">
            <span>{seconds}</span>
            <span className="text-sm font-Ubuntu-Regular">s<span className="invisible md:visible">ecs</span></span>
          </span>
        </span>
      </p>
    );
  }
};

function CardGiveaway(props: any) {
  const status = props?.status
  const id = props?.giveaway?.uid;
  const { userData } = useUserData();
  const { setFormValues } = useAuth();
  const endDate = props?.giveaway?.endDate;
  const endDateTime = new Date(endDate).getTime(); // convert end date to milliseconds
  const nowDateTime = Date.now(); // get current date time in milliseconds
  const diffTime = endDateTime - nowDateTime

  const prizes = props?.giveaway?.prize;
  // get PrizeValue by adding all prizes.[index].value
  let giftPrize = 0;
  const prizeValue = prizes?.forEach((item: any) => {
    giftPrize += parseInt(item.value);
  });
  const firstPrize = prizes?.[0];
  const [image, setImage] = useState<any | null | undefined>();
  const [company, setCompany] = useState<any>();

  useEffect(() => {
    if (firstPrize?.image) {
      setImage(firstPrize?.image);
    } else {
      setImage(undefined);
    }
  }, [firstPrize?.image]);

  function goToPreview() {
    router.push("/company/giveaway/" + props?.giveaway?.uid);
    setFormValues(props?.giveaway);
  }

  useEffect(() => {
    if (props?.giveaway?.user_uid && !userData?.company_name) {
      const fetchUserData = async () => {
        const qry = query(
          collection(db, "users"),
          where("uid", "==", props?.giveaway?.user_uid)
        );
        const ref = await getDocs(qry);
        ref.forEach((doc) => {
          const data = doc.data();
          setCompany(data);
        });
      };
      fetchUserData();
    }
  }, [props?.giveaway?.user_uid]);

  const editGiveaway = () => {
    // route to giveaway/id and pass the props.props sa object
    router.push("/company/giveaway/edit/" + id);
  };

  // go to company profile
  const goToCompanyProfile = () => {
    router.push(`/company/profile/${props?.giveaway?.user_uid}`);
  };

  return (
    <article
      className={`flex flex-col rounded-lg items-center flex-shrink-0  align-center w-full md:max-w-[234px] mx-auto snap-center hover:opacity-100 opacity-90 transition-opacity duation-200 overflow-hidden md:space-x-0 ${props.index === 0 && "customer-step5"
        }`}
    >
      {image ? (
        <Image
          onClick={() => {
            goToPreview();
          }}
          className="group-hover:scale-105 transition duration-300 ease-in-out w-full h-auto object-cover cursor-pointer"
          src={image}
          alt="Giveaway image"
          height={206}
          width={206}
        />
      ) : (
        <Image
          onClick={() => {
            goToPreview();
          }}
          className="group-hover:scale-105 transition duration-300 ease-in-out w-full max-w-[100px] md:max-w-[206px] h-auto object-cover cursor-pointer"
          src="/assets/images/giveaway_img.png"
          alt="Giveaway image"
          width="206"
          height="206"
        />
      )}

      <div className="w-full bg-[#1E2223] rounded-b-lg">
        <div className="w-full px-[10px] py-[12px] flex items-center">
          {company?.imgUrl ? (
            <a>
              <Image
                onClick={goToCompanyProfile}
                className="group-hover:scale-105 transition duration-300 ease-in-out rounded-full cursor-pointer"
                src={company?.imgUrl}
                alt="Company logo"
                width="45"
                height="45"
              />
            </a>
          ) : (
            <Image
              onClick={goToCompanyProfile}
              className="group-hover:scale-105 transition duration-300 ease-in-out rounded-full cursor-pointer"
              src="/assets/images/user_profile.png"
              alt="Company logo"
              width="45"
              height="45"
            />
          )}

          <div className="flex flex-col space-y-2 min-w-[60px] w-full">
            {
              status === "Live" && (
                <div className="flex flex-row items-center justify-between w-full">
                  {/* company name  */}
                  <span onClick={goToCompanyProfile} className="flex flex-row items-center text-xs text-white rounded-sm border-jade-100/40 truncate cursor-pointer hover:text-teal-300 ml-2">
                    <CheckBadgeIcon className="w-5 h-5 mr-1 text-teal-300"/> {company?.name || company?.company_name || "Company"}
                  </span>
                  {/* status pulse  */}
                  {[status].map((label, index) => (
                    <div key={index} className="flex items-center px-2 py-1 bg-teal-700 text-live text-xs font-bold rounded-full max-w-[60px]">
                      <div className="w-1.5 h-1.5 bg-live rounded-full animate-pulse mr-2 font-Ubuntu-Regular text-xs"></div>
                      {label}
                    </div>
                  ))}
                </div>)
            }
            {
              status === "Ended" && (
                <div className="flex flex-row items-center justify-between w-full">
                  {/* company name  */}
                  <span onClick={goToCompanyProfile} className="flex flex-row items-center text-xs text-white rounded-sm border-jade-100/40 truncate cursor-pointer hover:text-teal-300 ml-2">
                    <CheckBadgeIcon className="w-5 h-5 mr-1 text-teal-300"/> {company?.name || company?.company_name || "Company"}
                  </span>
                  {/* status pulse  */}
                  {[status].map((label, index) => (
                    <div key={index} className="flex items-center px-2 py-1 bg-teal-700 text-[red] text-xs font-bold rounded-full max-w-[60px]">
                      <div className="w-1.5 h-1.5 bg-[red] rounded-full animate-pulse mr-1 font-Ubuntu-Regular text-xs"></div>
                      {label}
                    </div>
                  ))}
                </div>)
            }
            {
              status === "Upcoming" && (
                <div className="flex flex-row items-center justify-between w-full">
                  {/* company name  */}
                  <span onClick={goToCompanyProfile} className="flex flex-row items-center text-xs text-white rounded-sm border-jade-100/40 truncate cursor-pointer hover:text-teal-300 ml-2">
                    <CheckBadgeIcon className="w-5 h-5 mr-1 text-teal-300"/> {company?.name || company?.company_name || "Company"}
                  </span>
                  {/* status pulse  */}
                  {[status].map((label, index) => (
                    <div key={index} className="flex items-center px-2 py-2 bg-teal-700 text-[yellow] text-xs font-bold rounded-full max-w-[75px]">
                      <div className="w-1.5 h-1.5 bg-[yellow] rounded-full animate-pulse mr-1 font-Ubuntu-Regular text-xs"></div>
                      {label}
                    </div>
                  ))}
                </div>)
            }
          </div>

        </div>
        <div className="w-full px-[10px] pb-[15px]">
          {/* <span onClick={goToCompanyProfile} className="flex flex-row items-center mb-2 text-xs text-white rounded-sm border-jade-100/40 truncate cursor-pointer hover:text-teal-300">
            <CheckBadgeIcon className="w-5 h-5 mr-1 text-teal-300"/> {company?.name || company?.company_name || "Company"}
          </span> */}

          <h4 onClick={() => {
            goToPreview();
          }} className="w-full text-sm font-Ubuntu-Medium text-white md:mb-[10px] truncate cursor-pointer hover:text-teal-300">
            {props?.giveaway?.title}
          </h4>
          <span className="py-2 text-xs text-white">
            <Countdown date={Date.now() + diffTime} renderer={renderer} />

          </span>
        </div>
        <div className="flex justify-between w-full">
          <span className="flex-1 text-sm text-center font-Ubuntu-Bold text-white bg-teal-800 p-[10px] rounded-bl-lg">
            ${giftPrize}
          </span>
          <span onClick={() => { goToPreview(); }} className="flex items-center text-xs text-white uppercase transition duration-300 ease-in-out group-hover:text-yellow py-[10px] px-[20px] bg-teal-600 rounded-br-lg cursor-pointer">
            <span className="text-xs font-Ubuntu-Regular uppercase">Details</span>{" "}
            <ChevronRightIcon className="text-white" width="12" height="12" />
          </span>

        </div>
      </div>
      {/* admin creator edit cta  */}
      {userData?.userType === "company" && props?.giveaway?.user_uid === userData?.uid && (
        <button onClick={editGiveaway} className="rounded-sm border border-fbyellow flex items-center text-xs text-white transition duration-300 ease-in-out hover:bg-fbyellow hover:text-black px-3 py-1 mt-5">Edit Event</button>
      )}
    </article>
  );
}

export default CardGiveaway;