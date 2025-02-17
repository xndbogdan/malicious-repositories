import React, { useEffect, useState } from 'react';
import { ArrowLongRightIcon } from '@heroicons/react/24/solid';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import router from 'next/router';

export default function CardPreviousEvent(props : any) {
  const [company , setCompany] = useState<any>()
  useEffect(() => {
    // console.log(userData?.uid)
    if(props?.companyId)
      getCompaniesData();
    
  }, [props?.companyId]);
  const getCompaniesData = async () => {
    const qry = query(
      collection(db, "users"),
      where("uid", "==", props?.companyId)
    );
    const ref = await getDocs(qry);
    const temp = ref.docs.map((doc) => doc.data());
    setCompany(temp[0]);
  };

  const goToCompanyProfile = () => {
    router.push(`/company/profile/${props?.companyId}`);
  };
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between border-[1.5px] border-jade-100 p-2 rounded-full">
        <div className="flex w-full items-center space-x-4">
          {/* IMAGE */}
          <div className="max-w-[100px] ">
            {
              company?.imgUrl ?
              <img className="rounded-full" src={company.imgUrl} alt="Company logo" width="100" />
              :
              <img className="rounded-full" src="/assets/images/giveaway_img.png" alt="Company logo"width="100" />
            }
          </div>
          <div className="flex flex-col w-full md:flex-row md:justify-between">
            {/* previous card list */}
            <div className="">
              {/* NAME */}
              <h6 className="text-sm font-Ubuntu-Medium">{company?.company_name || company?.name}</h6>
             
            </div>
            {/* view winners cta */}
            <button 
            onClick={goToCompanyProfile}
            className="flex items-center mt-2.5 md:mt-0 space-x-2 md:pr-3">
              <span className="text-sm uppercase">View Profile</span>
              <ArrowLongRightIcon className="w-5" />
            </button>
          </div>
        </div>
        
      </div>
    </>
  )
}
