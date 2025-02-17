import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";
import giveaway_art from "../public/assets/images/giveaway_img.png";
import arrow_icon from "../public/assets/images/viewAll_arrow_icon.svg";
import router from "next/router";
import { useAuth } from "../context/authcontext";
import Countdown from "react-countdown";

// Expire Notice
export const ExpiredNotice = (props: any) => {
  return (
    <>
      <div className=" text-lightWhite font-Ubuntu-Medium">
        <span className="block text-xs mb-2"></span>
      </div>
      <p className="text-sm ml-0.5 text-white font-Ubuntu-Bold">
        {props?.msg}
      </p>
    </>

  );
};

const renderer = ({days, hours, minutes, seconds, completed }: any) => {
  if (completed) {
    // Render a complete state
    return <ExpiredNotice />;
  } else {
    // Render a countdown
    return (
      <p className="text-sm text-lightWhite font-Ubuntu-Medium">
        Ending in:{" "}
        <span className="ml-0.5 text-white font-Ubuntu-Bold">
          {days}d:
        </span>
        <span className="ml-0.5 text-white font-Ubuntu-Bold">
          {hours}h:
        </span>
        <span className="ml-0.5 text-white font-Ubuntu-Bold">
          {minutes}m:
        </span>
        <span className="ml-0.5 text-white font-Ubuntu-Bold">
          {seconds}s
        </span>
      </p>
    );
  }
};

export default function CampaignsList(props: any) {
  const id = props?.data?.uid;
  const { setFormValues } = useAuth();
  const data = props?.data;
  const prize = data?.prize;
  const firstPrize = prize?.[0];
  const endDate = data?.endDate;
  const endDateTime = new Date(endDate).getTime(); // convert end date to milliseconds
  const nowDateTime = Date.now(); // get current date time in milliseconds
  const diffTime =       endDateTime - nowDateTime
  const [image, setImage] = useState<any | null | undefined>();
  function goToPreview() {
    router.push("/company/giveaway/" + data?.uid);
    setFormValues(data);
  }

  // update prize image if any
  // add a loader until it gets the userData
  useEffect(() => {
    if (firstPrize?.image) {
      setImage(firstPrize?.image);
    } else {
      setImage(undefined);
    }
  }, [firstPrize?.image]);

  const editGiveaway = () => {
    // route to giveaway/id and pass the props.props sa object
    router.push("/company/giveaway/edit/" + id);
  };

  return (
    <>
      <div className="border-[1.37px] border-jade-100 rounded-lg">
        <div className="py-4 px-4 md:py-6 md:pl-6 md:pr-8">
          <div className="flex flex-row items-stretch gap-x-8">
            <div className="block">
              {/* IMAGE */}
              <div className="rounded-3sm w-32 h-32 md:w-48 md:h-48">
                {image ? (
                  <Image
                    className="rounded-3sm"
                    src={image}
                    alt="giveaway_art"
                    height={192}
                    width={192}
                  />
                ) : (
                  <Image
                    className="rounded-3sm"
                    src={giveaway_art}
                    alt="giveaway_art"
                    height={192}
                    width={192}
                  />
                )}
              </div>
            </div>

            <div className="w-full">
              <div className="flex flex-col h-full">
                <div>
                  {/* TITLE */}
                  <h3 className="text-sm font-Ubuntu-Medium mb-2 md:text-xl">
                    {data?.title}
                  </h3>
                  <Countdown date={Date.now() + diffTime} renderer={renderer} />
                </div>

                <div className="mt-auto">
                  <div className="flex flex-col justify-between md:flex-row">
                    {/* ENTRIES */}
                    <div>
                      <span className="text-sm text-lightWhite font-Ubuntu-Medium">
                        Total entries
                      </span>
                      <br />
                      <span className="text-[20px] leading-[25px] text-teal-100 font-Ubuntu-Bold md:text-3xl">
                        {data?.totalEntries || 0}
                      </span>
                    </div>
                    {/* BUTTON */}
                    <button
                      onClick={editGiveaway}
                      className="flex items-center mt-auto md:justify-center"
                    >
                      <span className="text-xs uppercase mr-2.5">
                        Edit details
                      </span>
                    </button>
                    <button
                      onClick={goToPreview}
                      className="flex items-center mt-auto md:justify-center"
                    >
                      <span className="text-xs uppercase mr-2.5">
                        View details
                      </span>
                      <Image
                        src={arrow_icon}
                        alt="arrow_icon"
                        layout="fixed"
                        width={18}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
