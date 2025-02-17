import React from "react";
import Image from "next/legacy/image";
import giveaway_art from "../public/assets/images/giveaway_img.png";
import router from "next/router";
import { useAuth } from "../context/authcontext";

export default function TemplateItem(props: any) {
  const id = props?.props?.uid;
  const { setFormValues } = useAuth();
  const prize = props?.props?.prize?.[0];

  function goToPreview() {
    router.push("/company/giveaway/" + id);
    setFormValues(props?.props);
  }

  // use the template and route to giveaway/title use new Component
  // useTemplate
  const useTemplate = () => {
    // route to giveaway/id and pass the props.props sa object
    router.push("/company/giveaway/edit/" + id);
  };

  return (
    <>
      {/* TEMPLATE BOX */}
      <div className="border-[1.37px] border-jade-100 p-6 rounded-lg md:p-4 lg:p-3.5">
        {/* IMAGE */}
        <div className="w-full h-52 rounded-3sm flex items-center justify-center mb-6 md:mb-4 lg:mb-2.5 ">
          {prize.image && (
            <>
              <Image
                className="rounded-3sm"
                src={prize?.image}
                alt="giveaway_art"
                height={192}
                width={192}
                objectFit="cover"
              />
            </>
          )}
          {!prize.image && (
            <>
              <Image
                className="rounded-3sm"
                src={giveaway_art}
                alt="giveaway_art"
                layout="intrinsic"
                objectFit="cover"
              />
            </>
          )}
        </div>

        {/* TITLE */}
        <h5 className="text-base font-Ubuntu-Medium mb-7">
          {props?.props?.title}
        </h5>

        {/* BUTTON GROUP*/}
        <div className="flex gap-x-3.5">
          {/* BUTTON */}
          <button
            onClick={goToPreview}
            className="flex-1 w-full h-[30px] text-sm leading-[22.4px] border-[0.97px] border-jade-100 rounded-sm"
          >
            <span className="opacity-60">Preview</span>
          </button>

          {/* BUTTON */}
          <button
            onClick={useTemplate}
            className="flex-1 w-full h-[30px] text-sm leading-[22.4px] border-[0.97px] border-jade-100 bg-extraLightPrimaryGreen rounded-sm"
          >
            <span className="opacity-60">Use</span>
          </button>
        </div>
      </div>
    </>
  );
}
