import React from "react";
import Image from "next/legacy/image";

export default function prizeTmp(props: any) {
  return (
    <div className="bg-teal-500 p-2.5 rounded-sm">
      <div className="flex gap-x-3">
        {props?.data?.image ? (
          <Image className="rounded-sm"
            src={props?.data?.image}
            alt="gift_box"
            width={100}
            height={100}
          />
          ) : (
          <Image className="rounded-sm"
            src="/assets/images/giftbox.svg"
            width={100}
            height={100}
            alt="gift_box"
            layout="intrinsic"
          />
        )}
        <div className="flex flex-1 flex-row justify-between">
          <div className="flex flex-col justify-between">
            <div>
              <h6 className="text-xs font-Ubuntu-Bold">
                {props?.data?.prizeName}
              </h6>
              <p className=" text-white/40 text-xs font-Ubuntu-Regular truncate w-full max-w-[105px] p-0 m-0">
                This items fulfills to GYRI. Fires healing energy at your allies. Can also be used to deal light damage to enemies.
              </p>
            </div>
            <div className="text-sm font-Ubuntu-Bold text-black text-center self-end bg-fbyellow rounded-sm py-1.5 w-full">
              {props?.data?.noOfWinners} winner/s
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
