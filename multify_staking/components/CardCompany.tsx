import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import React from "react";

// Card Company
export default function CardCompany(props: any) {
  // go to company profile
  const goToCompanyProfile = () => {
    router.push(`/company/profile/${props?.company?.uid}`);
  };
  return (
    <div className="flex flex-row bg-jade-900/5 rounded-full items-center space-x-5 border-[1.37px] border-w border-jade-100/40 align-center max-w-[200px] p-3 mx-1 md:mx-0 snap-center hover:opacity-100 opacity-80 transition-opacity duation-200 overflow-hidden cursor-pointer">
      {props?.company?.imgUrl ? (
        <a>
          <Image
            onClick={goToCompanyProfile}
            className="rounded-full group-hover:scale-105 transition duration-300 ease-in-out"
            src={props?.company?.imgUrl}
            alt="Company logo"
            width="50"
            height="50"
          />
        </a>
      ) : (
        <Image
          onClick={goToCompanyProfile}
          className="rounded-full group-hover:scale-105 transition duration-300 ease-in-out"
          src="/assets/images/user_profile.png"
          alt="Company logo"
          width="50"
          height="50"
        />
      )}

      <div className="flex flex-col">
        <span
          onClick={goToCompanyProfile}
          className="text-md font-semibold text-white w-full truncate">
          {props?.company?.company_name || props?.company?.name}
        </span>
        {/* <span className="text-[24px] font-medium text-white my-1">
          <span className="text-teal-900 mr-1">$</span>287,298
        </span> */}
      </div>
    </div>
  );
}
