import React from "react";
import Image from "next/image";
import { TrophyIcon } from "@heroicons/react/24/solid";

// Winners Card
export default function WinnersCard(props: any) {
  const endDate = new Date(props?.giveaway?.endDate);

  return (
    <div className="my-6 space-y-8">
      {/* Map ended events to CardPreviousEvent?? Link to event preview  */}
      <article className="flex flex-row bg-jade-900/5 rounded-lg border-[1.37px] border-w border-jade-100/40 align-center w-full p-3.5 snap-center hover:opacity-100 opacity-90 items-center cursor-pointer transition-opacity duation-200 overflow-hidden space-x-4 md:space-x-8">
        {/* image  */}
        {props.giveaway.prize[0].image ? (
          <Image
            className="rounded-md group-hover:scale-105 transition duration-300 ease-in-out max-w-[75px] md:max-w-[100px] h-auto object-cover"
            src={props.giveaway.prize[0].image}
            alt="Giveaway"
            width="75"
            height="75"
          />
        ) : (
          <Image
            className="rounded-md group-hover:scale-105 transition duration-300 ease-in-out max-w-[75px] md:max-w-[100px] h-auto object-cover"
            src="/assets/images/giveaway_img.png"
            alt="Giveaway"
            width="75"
            height="75"
          />
        )}

        {/* details  */}
        <div className="flex-1 justify-between h-full space-y-2 md:space-y-3">
          {/* title + end date  */}
          <div className="space-y-1.5">
            {/* title  */}
            <h4 className="font-medium text-white text-sm md:text-lg w-full">
              {props?.giveaway?.title}
            </h4>
            {/* end date  */}
            <div className="flex w-full space-x-1.5">
              <span className="text-white/60 text-sm">Ended:</span>
              <span className="text-white text-sm font-Ubuntu-Bold">
                {endDate.toLocaleDateString("en-US")}
              </span>
            </div>
          </div>
          {/* winners  */}
          <div className="items-center space-y-2">
            <h5 className="flex text-sm font-Ubuntu-Medium">
              <TrophyIcon className="text-fbyellow mr-2 w-4 h-4" />{" "}
              <span>
                Winners: {/* Map winners to winner.name */}
                <span className="text-white font-Ubuntu-Bold">
                  {props?.giveaway?.winners?.map((winner: any, index: any) => (
                    <span key={index}>{winner.name} </span>
                  ))}
                </span>
              </span>
            </h5>
          </div>
        </div>
      </article>
    </div>
  );
}
