import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "../context/authcontext";

// UserDetails Type
interface UserDetailsType {
  reqFullName: boolean;
  reqCrypto: boolean;
  reqAge: boolean;
  reqEmail: boolean;
  reqCountry: boolean;
  reqAddress: boolean;
  optFullName: boolean;
  optCrypto: boolean;
  optAge: boolean;
  optEmail: boolean;
  optCountry: boolean;
  optAddress: boolean;
  requiredFields: string[];
  optionalFields: string[];
}

export default function UserDeatils({
  formStep,
  nextFormStep,
  prevFormStep,
}: any) {
  const { data, setFormValues } = useAuth();
  const methods = useForm<UserDetailsType>({ mode: "onBlur" });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = methods;
  const [reqFullName, setReqFullName] = useState(data?.reqFullName || false);
  const [reqCrypto, setReqCrypto] = useState(data?.reqCrypto || false);
  const [reqAge, setReqAge] = useState(data?.reqAge || false);
  const [reqEmail, setReqEmail] = useState(data?.reqEmail || false);
  const [reqCountry, setReqCountry] = useState(data?.reqCountry || false);
  const [reqAddress, setReqAddress] = useState(data?.reqAddress || false);
  const [optFullName, setOptFullName] = useState(data?.optFullName || false);
  const [optCrypto, setOptCrypto] = useState(data?.optCrypto || false);
  const [optAge, setOptAge] = useState(data?.optAge || false);
  const [optEmail, setOptEmail] = useState(data?.email || false);
  const [optCountry, setOptCountry] = useState(data?.optCountry || false);
  const [optAddress, setOptAddress] = useState(data?.optAddress || false);
  const formValues = watch();

  // console.log(data);
  useEffect(() => {
    setTimeout(() => {
      if (data?.reqFullName === undefined) {
        setValue("reqFullName", false);
      } else {
        setValue("reqFullName", data?.reqFullName);
        setReqFullName(data?.reqFullName);
      }
      // set reqCrypto false if its undefined
      if (data?.reqCrypto === undefined) {
        setValue("reqCrypto", false);
      } else {
        setValue("reqCrypto", data?.reqCrypto);
        setReqCrypto(data?.reqCrypto);
      }
      // set reqAge false if its undefined
      if (data?.reqAge === undefined) {
        setValue("reqAge", false);
      } else {
        setValue("reqAge", data?.reqAge);
        setReqAge(data?.reqAge);
      }
      // set reqEmail false if its undefined
      if (data?.reqEmail === undefined) {
        setValue("reqEmail", false);
      } else {
        setValue("reqEmail", data?.reqEmail);
        setReqEmail(data?.reqEmail);
      }
      // set reqCountry false if its undefined
      if (data?.reqCountry === undefined) {
        setValue("reqCountry", false);
      } else {
        setValue("reqCountry", data?.reqCountry);
        setReqCountry(data?.reqCountry);
      }
      // set reqAddress false if its undefined
      if (data?.reqAddress === undefined) {
        setValue("reqAddress", false);
      } else {
        setValue("reqAddress", data?.reqAddress);
        setReqAddress(data?.reqAddress);
      }
      // set optFullName false if its undefined
      if (data?.optFullName === undefined) {
        setValue("optFullName", false);
      } else {
        setValue("optFullName", data?.optFullName);
        setOptFullName(data?.optFullName);
      }
      // set optCrypto false if its undefined
      if (data?.optCrypto === undefined) {
        setValue("optCrypto", false);
      } else {
        setValue("optCrypto", data?.optCrypto);
        setOptCrypto(data?.optCrypto);
      }
      // set optAge false if its undefined
      if (data?.optAge === undefined) {
        setValue("optAge", false);
      } else {
        setValue("optAge", data?.optAge);
        setOptAge(data?.optAge);
      }
      // set optEmail false if its undefined
      if (data?.optEmail === undefined) {
        setValue("optEmail", false);
      } else {
        setValue("optEmail", data?.optEmail);
        setOptEmail(data?.optEmail);
      }
      // set optCountry false if its undefined
      if (data?.optCountry === undefined) {
        setValue("optCountry", false);
      } else {
        setValue("optCountry", data?.optCountry);
        setOptCountry(data?.optCountry);
      }
      // set optAddress false if its undefined
      if (data?.optAddress === undefined) {
        setValue("optAddress", false);
      } else {
        setValue("optAddress", data?.optAddress);
        setOptAddress(data?.optAddress);
      }
    }, 10);
  }, [setValue]);

  const handleNext = (data: any) => {
    //setFormValues(data);

    nextFormStep();
    // previousFormStep();
  };
  const handlePrev = (data: any) => {
    //setFormValues(data);
    prevFormStep();
  };

  useEffect(() => {
    //  console.log(formValues)
    // setFormValues(formValues)
    setTimeout(() => {
      setFormValues(formValues);
    }, 300);
  }, [formValues]);
  const doNothing = () => {
 
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(doNothing)}>
          <div className="flex flex-col gap-y-6 md:gap-y-8 lg:gap-x-10 lg:flex-row">
            <div className="w-full flex flex-col space-y-5">

              {/* REQUIRED FIELDS */}
              {/* BOX */}
              <div className="border-[1.5px] border-jade-100 rounded-md">
                <div className="p-6 md:py-[21px] lg:py-[18px] lg:px-8">
                  {/* HEADING */}
                  <h2 className="text-[20px] leading-6 font-Ubuntu-Medium mb-[18px] lg:text-xl lg:mb-6">
                    Select required fields
                  </h2>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* FULL NAME */}
                    <button
                      disabled={optFullName}
                      className={
                        !reqFullName
                          ? "inputField"
                          : "inputField inputFieldSelected"
                      }
                      // on click update the form value reqFullName
                      onClick={() => {
                        setReqFullName(!reqFullName);
                        setValue("reqFullName", !reqFullName);
                      }}
                    >
                      Full name
                    </button>

                    {/* CRYPTO WALLET ADDRESS */}
                    <button
                      disabled={optCrypto}
                      className={
                        !reqCrypto
                          ? "inputField"
                          : "inputField inputFieldSelected"
                      }
                      onClick={() => {
                        setReqCrypto(!reqCrypto);
                        setValue("reqCrypto", !reqCrypto);
                      }}
                    >
                      Crypto Wallet address
                    </button>

                    {/* AGE */}
                    <button
                      disabled={optAge}
                      className={
                        !reqAge ? "inputField" : "inputField inputFieldSelected"
                      }
                      onClick={() => {
                        setReqAge(!reqAge);
                        setValue("reqAge", !reqAge);
                      }}
                    >
                      Age
                    </button>

                    {/* EMAIL */}
                    <button
                      disabled={optEmail}
                      className={
                        !reqEmail
                          ? "inputField"
                          : "inputField inputFieldSelected"
                      }
                      onClick={() => {
                        setReqEmail(!reqEmail);
                        setValue("reqEmail", !reqEmail);
                      }}
                    >
                      Email
                    </button>

                    {/* COUNTRY */}
                    <button
                      disabled={optCountry}
                      className={
                        !reqCountry
                          ? "inputField"
                          : "inputField inputFieldSelected"
                      }
                      onClick={() => {
                        setReqCountry(!reqCountry);
                        setValue("reqCountry", !reqCountry);
                      }}
                    >
                      Country
                    </button>

                    {/* ADDRESS */}
                    <button
                      disabled={optAddress}
                      className={
                        !reqAddress
                          ? "inputField"
                          : "inputField inputFieldSelected"
                      }
                      onClick={() => {
                        setReqAddress(!reqAddress);
                        setValue("reqAddress", !reqAddress);
                      }}
                    >
                      Address
                    </button>
                  </div>
                </div>
              </div>

              {/* OPTIONAL FIELDS */}
              {/* BOX */}
              <div className="border-[1.5px] border-jade-100 rounded-md">
                <div className="p-6 md:py-[21px] lg:py-[18px] lg:px-8">
                  {/* HEADING */}
                  <h2 className="text-[20px] leading-6 font-Ubuntu-Medium mb-[18px] lg:text-xl lg:mb-6">
                    Select optional fields
                  </h2>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* FULL NAME // make it disable if reqFullName is true*/}
                    <button
                      disabled={reqFullName}
                      className={
                        !optFullName
                          ? "inputField"
                          : "inputField inputFieldSelected"
                      }
                      onClick={() => {
                        setOptFullName(!optFullName);
                        setValue("optFullName", !optFullName);
                      }}
                    >
                      Full name
                    </button>

                    {/* CRYPTO WALLET ADDRESS */}
                    <button
                      disabled={reqCrypto}
                      className={
                        !optCrypto
                          ? "inputField"
                          : "inputField inputFieldSelected"
                      }
                      onClick={() => {
                        setOptCrypto(!optCrypto);
                        setValue("optCrypto", !optCrypto);
                      }}
                    >
                      Crypto Wallet address
                    </button>

                    {/* AGE */}
                    <button
                      disabled={reqAge}
                      className={
                        !optAge ? "inputField" : "inputField inputFieldSelected"
                      }
                      onClick={() => {
                        setOptAge(!optAge);
                        setValue("optAge", !optAge);
                      }}
                    >
                      Age
                    </button>

                    {/* EMAIL */}
                    <button
                      disabled={reqEmail}
                      className={
                        !optEmail
                          ? "inputField"
                          : "inputField inputFieldSelected"
                      }
                      onClick={() => {
                        setOptEmail(!optEmail);
                        setValue("optEmail", !optEmail);
                      }}
                    >
                      Email
                    </button>

                    {/* COUNTRY */}
                    <button
                      disabled={reqCountry}
                      className={
                        !optCountry
                          ? "inputField"
                          : "inputField inputFieldSelected"
                      }
                      onClick={() => {
                        setOptCountry(!optCountry);
                        setValue("optCountry", !optCountry);
                      }}
                    >
                      Country
                    </button>

                    {/* ADDRESS */}
                    <button
                      disabled={reqAddress}
                      className={
                        !optAddress
                          ? "inputField"
                          : "inputField inputFieldSelected"
                      }
                      onClick={() => {
                        setOptAddress(!optAddress);
                        setValue("optAddress", !optAddress);
                      }}
                    >
                      Address
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 md:mt-[60px] lg:mt-auto lg:ml-auto py-12 ">
            <div className="flex flex-col-reverse gap-y-6 md:gap-y-0 md:gap-x-[34px] md:flex-row lg:gap-x-8 lg:justify-end">
              {formStep > 0 && (
                <button onClick={handlePrev} className="buttonPrimary">
                  Previous
                </button>
              )}
              {formStep < 4 && (
                <button onClick={handleNext} className="buttonPrimary">
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
