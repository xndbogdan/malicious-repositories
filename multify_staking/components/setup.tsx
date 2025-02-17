import React, { useEffect, useState } from "react";
import Image from "next/legacy/image";
import info_icon from "../public/assets/images/info_icon.svg";
import arrow_icon from "../public/assets/images/viewAll_arrow_icon.svg";
import CountryItem from "./CountryItem";
import { useAuth } from "../context/authcontext";
import { FormProvider, useForm } from "react-hook-form";
import CountrySearch from "./CountrySearch";
import toast from "react-hot-toast";

interface SetupType {
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  restrictedCountries: [];
  terms: string;
  toc: string;
}



export default function Setup({ formStep, nextFormStep }: any) {
  const toc = {
    "title": "Terms and Conditions",
    "version": "2.0",
    "content": "Welcome to our website. By accessing or using our website, you agree to be bound by the following terms and conditions:\n\nIntellectual Property: All content, including but not limited to text, graphics, images, and logos, on this website is the property of our company or our licensors and is protected by intellectual property laws. You may not use, reproduce, or distribute any content without our prior written consent.\n\nUser Conduct: You agree to use our website only for lawful purposes and in a way that does not infringe the rights of others or restrict or inhibit anyone else's use and enjoyment of the website.\n\nDisclaimer: We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the website or the information, products, services, or related graphics contained on the website for any purpose. You use the website at your own risk.\n\nLimitation of Liability: We will not be liable for any loss or damage, whether direct or indirect, arising from your use of the website or reliance on any information, products, or services provided on the website.\n\nChanges to Terms and Conditions: We reserve the right to update or modify these terms and conditions at any time without prior notice. By continuing to use the website, you agree to be bound by the updated or modified terms and conditions. By using our website, you agree to these terms and conditions in full. If you do not agree with any part of these terms and conditions, please do not use our website.",
    "date": "2023-05-22"
  }
  const { data, setFormValues } = useAuth();
  const [terms, setTerms] = useState();
  const methods = useForm<SetupType>({ mode: "onBlur" });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = methods;

  useEffect(() => {
    setTimeout(() => {
      setValue("title", data?.title || "");
      setValue("endDate", data?.endDate || "");
      setValue("startDate", data?.startDate || "");
      setValue("description", data?.description || "");
      setValue("toc", data?.toc || toc?.content)
    }, 1);
  }, [setValue]);
  const formValues = watch();

  const handleNext = (data: any) => {
    //setFormValues(data);
    if (errors.title || errors.description || errors.endDate || errors.startDate || formValues.title === "" || formValues.description === "") {
      console.log(errors)
      toast.error("You need to fill the required fields")
      return;
    }

    nextFormStep();
  };
  // if formvalues changes then updated setFormValue
  useEffect(() => {
    setTimeout(() => {
      setFormValues(formValues);
    }, 300);
  }, [formValues]);

  // map country Names from data.restrictedCountries
  const countryNames = data?.restrictedCountries?.map((country: any) => {
    return { name: country.name, code: country.code };
  });

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleNext)}>
          <div className="w-full space-y-8 md:space-y-10">
            {/* DATE & TIME & Title*/}
            <div className="flex w-full justify-between md:space-x-20 items-center gap-y-8 flex-col lg:flex-row lg:gap-y-0">
              {/* TITLE */}
              <div className="w-full">
                <h2 className="text-lg leading-[22px] font-Ubuntu-Medium mb-2">
                  Giveaway title
                </h2>
                <input
                  placeholder="Set Your Giveaway a Title"
                  {...register("title", { required: "Title is required" })}
                  className="inputField"
                />
                {errors.title && (
                  <span className="text-red">{errors.title.message}</span>
                )}
              </div>

              <div className="flex flex-col w-full justify-between gap-y-8 md:gap-x-8 md:gap-y-0 md:flex-row lg:justify-end">
                {/* START DATE */}
                <div className="">
                  <h2 className="text-lg leading-[22px] font-Ubuntu-Medium mb-2">
                    Start Date
                  </h2>
                  <input
                    // value={data?.startDate}
                    {...register("startDate", {
                      required: "Starting Date is required",
                    })}
                    className="inputField"
                    type="datetime-local"
                  />
                  {errors.startDate && (
                    <span className="text-red">{errors.startDate.message}</span>
                  )}
                </div>

                {/* END DATE */}
                <div className="">
                  <h2 className="text-lg leading-[22px] font-Ubuntu-Medium mb-2">
                    End Date
                  </h2>
                  <input
                    // value={data?.endDate}
                    {...register("endDate", {
                      required: "End Date is required",
                    })}
                    className="inputField"
                    type="datetime-local"
                  />
                  {errors.endDate && (
                    <span className="text-red">{errors.endDate.message}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="border rounded-md">
              <div className="p-6 md:py-[18px] md:px-8">
                {/* HEADING */}
                <h2 className="text-[20px] leading-[24.6px] font-Ubuntu-Medium flex items-center mb-6 md:text-xl">
                  <span className="flex items-center justify-center mr-[10px] md:mr-[18px]">
                    <Image src={info_icon} alt="info_icon" layout="intrinsic" />
                  </span>
                  About Giveaway
                </h2>

                {/* DESCRIPTION Input Area*/}
                <div className="w-full">

                  <textarea
                    placeholder="Write a description about your giveaway"
                    {...register("description", {
                      required: "Description is required",
                    })}
                    className="inputArea"
                    style={{
                      height: "120px",

                    }}
                  />
                  {errors.description && (
                    <span className="text-red">
                      {errors.description.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* TERMS & CONDITION */}
            <div className="border rounded-md">
              <div className="p-6 md:py-[18px] md:px-8">
                {/* HEADING */}
                <h2 className="text-[20px] leading-[24.6px] font-Ubuntu-Medium flex items-center mb-6 md:text-xl">
                  <span className="flex items-center justify-center mr-[10px] md:mr-[18px]">
                    <Image src={info_icon} alt="info_icon" layout="intrinsic" />
                  </span>
                  Terms and conditions
                </h2>

                {/* DESCRIPTION */}
                {/* DESCRIPTION Input Area*/}
                <div className="w-full">

                  <textarea
                    placeholder="Write a description about your giveaway"
                    {...register("toc", {
                      required: "Terms and conditions are required or use Default",
                    })}
                    className="inputArea"
                    style={{
                      height: "450px",
                      // no scroll bar
                      overflow: "hidden"
                    }}
                  />
                  {errors.toc && (
                    <span className="text-red">
                      {errors.toc.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* RESTRICTION */}
            <div className="border rounded-md">
              <div className="p-6 md:pt-[18px] md:pb-7 md:pl-8 md:pr-4">
                {/* HEADING WITH SEARCH BAR */}
                <div className="flex flex-col items-center justify-between mb-6 md:mb-[18px] md:flex-row  ">
                  {/* HEADING */}
                  <h2 className="w-full text-[20px] leading-[24.6px] font-Ubuntu-Medium flex items-center mb-6 md:w-1/2 md:text-xl">
                    <span className="flex items-center justify-center mr-[10px] md:mr-[18px]">
                      <Image
                        src={info_icon}
                        alt="info_icon"
                        layout="intrinsic"
                      />
                    </span>
                    Restriction on countries
                  </h2>
                  <div className="w-full md:w-1/2">
                    <div id="dropdownSearch">
                      <div className="p-3">
                        <div className="flex w-full ml-auto relative lg:w-[360px]">
                          <CountrySearch />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* COUNTRY LIST */}
                <div className="flex flex-wrap gap-y-6 md:gap-y-0 md:flex-row">
                  <div className="w-full border-r-[1.5px] border-jade-100 ">
                    <div className="grid grid-cols-2 md:gap-4">
                      {countryNames?.map((countryName: any, index: any) => (
                        <CountryItem key={index} title={countryName.name} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 md:mt-[60px] lg:mt-auto lg:ml-auto py-12 ">
            <div className="flex flex-col-reverse gap-y-6 md:gap-y-0 md:gap-x-[34px] md:flex-row lg:gap-x-8 lg:justify-end">
              {formStep < 4 && (
                <button
                  onClick={handleNext}
                  className="buttonPrimary"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
