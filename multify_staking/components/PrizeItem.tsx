import React from "react";
import Image from "next/legacy/image";
import gift_box from "../public/assets/images/giftbox.svg";
import arrow_icon from "../public/assets/images/viewAll_arrow_icon.svg";
import { storage } from "../firebase";

export default function PrizeItem(props: {
  prize: any;
  index: any;
  onEdit: any;
  onDelete: any
}) {
  return (
    <>
      <div className="border-[1.5px] border-jade-100 rounded-md p-4">
        <div className="flex gap-x-4">
          <div className="border-[1.5px] border-jade-100 rounded-2sm flex items-center justify-center p-4">
            {props.prize?.image ? (
              <Image
                src={props.prize?.image}
                alt="gift_box"
                width={54}
                height={54}
              />
            ) : (
              <Image
                width={54}
                height={54}
                src={gift_box}
                alt="gift_box"
                layout="intrinsic"
              />
            )}
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h5 className=" text-base leading-5 font-Ubuntu-Medium mb-2">
                {props.prize?.prizeName}
              </h5>
              <h6 className=" text-sm font-Ubuntu-Medium">
                ({props.prize?.value})
              </h6>
            </div>
            {/* BUTTON */}
            <button
              className="flex items-center mt-auto md:justify-center"
              onClick={props.onEdit}
            >
              <span className="text-xs uppercase mr-2.5">View prize</span>
              <Image
                src={arrow_icon}
                alt="arrow_icon"
                layout="fixed"
                width={18}
              />
            </button>
            <button
              className="flex items-center mt-auto md:justify-center"
              onClick={props.onDelete}
            >
              <span className="text-xs uppercase mr-2.5">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
