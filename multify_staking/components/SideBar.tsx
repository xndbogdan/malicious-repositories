import React from "react";
import Lottie from "lottie-react";
import logo from "../public/assets/anim/logo.json";
import {
  HomeIcon,
  PlusCircleIcon,
  GiftIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../context/authcontext";
import { useRouter } from "next/router";
import Link from "next/link";

import { UrlObject } from "url";
import { useTour } from "@reactour/tour";
import {
  businessTutorial,
  customerTutorialWithGiveaway,
  customerTutorialWithoutGiveaway,
} from "./Tutorials/Tutorials";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
import Image from "next/image";

// Sidebar
export default function SideBar() {
  const { logOut } = useAuth();
  const { setSteps, setIsOpen, setCurrentStep } = useTour();
  const router = useRouter();
  const currentRoute = router.pathname;
  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const launchBusinessTutorial = () => {
    setSteps?.(businessTutorial);
    setCurrentStep(0);
    setIsOpen(true);
  };

  const launchCustomerTutorial = async () => {
    const q = query(collection(db, "giveaway"));
    const querySnapshot = await getDocs(q);
    const giveaways = querySnapshot.docs.map((doc) => doc.data());

    if (giveaways.length > 0) {
      setSteps?.(customerTutorialWithGiveaway);
    } else {
      setSteps?.(customerTutorialWithoutGiveaway);
    }

    setCurrentStep(0);
    setIsOpen(true);
  };

  // Return
  return (
    <div className="sideBar">
      <div className="mx-auto w-[128px] mb-6 md:mb-[45px]">
        <Link href="/" className="block">
          <Lottie animationData={logo} loop={false} />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <ul className="w-full h-full space-y-2">
          <li className="group first-step">
            <Link href="/" className="SideNavLink">
              <HomeIcon className="UtilityIcon sidenav-home" /> 
              <span className="LinkTxt">Home</span>
            </Link>
          </li>
          <li className="group first-step">
            <Link href="/giveaways" className="SideNavLink">
              <GiftIcon className="UtilityIcon sidenav-giveaways" /> 
              <span className="LinkTxt">Giveaways</span>
            </Link>
          </li>
          <li className="group first-step">
            <Link href="#" className="SideNavLink cursor-not-allowed">
              <Image src="/assets/icons/icon-airdrops.svg" className="UtilityIcon sidenav-giveaways" alt="Airdrop icon" width={5} height={5} /> 
              <span className="LinkTxt Disabled">Airdrops</span>
            </Link>
          </li>
          <li className="group first-step">
            <Link href="#" className="SideNavLink cursor-not-allowed">
              <Image src="/assets/icons/icon-rewards.svg" className="UtilityIcon sidenav-giveaways" alt="Reward icon" width={5} height={5} /> 
              <span className="LinkTxt Disabled">Rewards</span>
            </Link>
          </li>
          <li className="group first-step">
            <Link href="#" className="SideNavLink cursor-not-allowed">
              <Image src="/assets/icons/icon-cashout.svg" className="UtilityIcon sidenav-giveaways" alt="Cashout icon" width={5} height={5} /> 
              <span className="LinkTxt Disabled">Cashout</span>
            </Link>
          </li>

          <li className="group first-step">
            <a href="https://learn.freebling.io" target="_blank" className="SideNavLink">
              <AcademicCapIcon className="UtilityIcon sidenav-giveaways" />
              <span className="LinkTxt">Knowledge Base</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}