import { useState } from "react";
import Lottie from "lottie-react";
import logo from "../../public/assets/anim/logo.json";
import HeaderBizUtility from "../HeaderBizUtility";
import {
  Bars3Icon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

export default function MobileNav() {
  const [navbar, setNavbar] = useState(false);

  return (
    <nav className="w-full sticky top-0 z-50 md:px-6 md:py-3 bg-gradient-to-r from-fbblack-200 to-fbblack-100">
      <div className="flex justify-center md:hidden">
        <button
          className="text-gray-700 rounded-md"
          onClick={() => setNavbar(!navbar)}
        >
          {navbar ? (
            <ChevronUpIcon className="w-8 h-9 text-red-400 animate-pulse duration-300 ease-in-out" />
          ) : (
            <ChevronDownIcon className="w-8 h-9 text-teal-100 animate-pulse duration-300 ease-in-out" />
          )}
        </button>
        {/* <Link href="#" onClick={() => setNavbar(!navbar)}>
              <Image className="p-2 text-gray-700 rounded-md w-full h-auto" src="/assets/images/navSlide.svg" alt="Open top menu" width="100" height="100" />
            </Link> */}
      </div>

      <div
        className={`w-full flex flex-col p-5 md:p-0 md:flex-row md:flex md:items-center md:justify-between md:space-x-5 duration-300 ease-in-out ${
          navbar ? "block" : "hidden"
        }`}
      >          
        <HeaderBizUtility />
      </div>
    </nav>
  );
}
