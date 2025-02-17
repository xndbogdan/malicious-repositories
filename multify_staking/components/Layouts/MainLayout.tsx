// Main Layout
import {
   collection,
   DocumentData,
   getDocs,
   query,
   where,
 } from "firebase/firestore";
 import React, { ReactNode, useEffect, useState } from "react";
 import toast from "react-hot-toast";
 import CardGiveaway from "../CardGiveaway";
 import Loader from "../loader";
 import MobileNav from "./HeaderMobile";
 import SideBar from "../SideBar";
 import TopCompanies from "../TopCompanies";
 import { useUserData } from "../../context/userDataHook";
 import { db } from "../../firebase";
 import { useTour } from "@reactour/tour";
 import {
   customerTutorialWithGiveaway,
   customerTutorialWithoutGiveaway,
 } from "../Tutorials/Tutorials";
import NavbarMobile from "../NavbarMobile";
import HeaderBizUtility from "../HeaderBizUtility";
import Footer from "../Marketing/Layouts/Footer";

interface MainLayoutProps {
  children: ReactNode;
}
 
export default function MainLayout({ children }: MainLayoutProps) {
  const { userData } = useUserData();
  const { setSteps, setIsOpen } = useTour();
  const [loading, setLoading] = useState(false);
  const [giveaways, setGiveaways] = useState<DocumentData[]>([]);
  const [featuredCompanies, setFeaturesCompanies] = useState<DocumentData[]>(
    []
  );
 
   // add a loader until it gets the userData
   useEffect(() => {
     setLoading(false);
   }, [userData]);
 
   useEffect(() => {
    userData && setLoading(true);
     userData && getGiveaways();
     userData && getCompaniesData();
   }, []);
 
 
   const launchTutorial = () => {
     if (userData && userData?.isNew === true) {
       if (giveaways && giveaways.length > 0) {
         setSteps?.(customerTutorialWithGiveaway);
       } else {
         setSteps?.(customerTutorialWithoutGiveaway);
       }
 
       setIsOpen(true);
     }
   };
 
   useEffect(() => {
    userData && launchTutorial();
   }, [userData]);
 
   const getGiveaways = async () => {
     const q = query(collection(db, "giveaway"));
     const querySnapshot = await getDocs(q);
     const temp = querySnapshot.docs.map((doc) => doc.data());
     const liveEvents = temp.filter((item: any) => {
       const endDate = item?.endDate;
       const startDate = item?.startDate;
       const today = new Date();
       const date = new Date(endDate);
       const date2 = new Date(startDate);
       const diff = date.getTime() - today.getTime();
       const diff2 = today.getTime() - date2.getTime();
       return item && diff > 0 && diff2 > 0;
     });
     // filter out the ones that not drafts , where drafts == false
     const notDrafts = liveEvents.filter((item: any) => {
       return item.draft == false;
     });
     setLoading(false);
     setGiveaways(notDrafts);
   };
 
  const getCompaniesData = async () => {
     const qry = query(
       collection(db, "users"),
       where("userType", "==", "company")
     );
     const ref = await getDocs(qry);
     const temp = ref.docs.map((doc) => doc.data());
     setFeaturesCompanies(temp);
     setLoading(false);
  };

  return (
   <div className="dashboardContainerWrapper background_lightBlack">
      {
         loading && (
         <Loader show={loading}></Loader>
         ) 
      }   
      { 
          !loading && (
          <>
              <SideBar />
              <div className="dashboardContainer">
                <HeaderBizUtility />
                <div className="mainContainer">
                  <main className="mainContent">{children}</main>
                  <Footer />
                </div>
                <NavbarMobile UserType={"company"} />
              </div>

          </>
        )
      }
    </div>
  );
}