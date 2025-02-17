import React from "react";
import {
  UserGroupIcon,
  HomeIcon,
  PlusCircleIcon,
  GiftIcon,
  ChartPieIcon,
  StarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Link from "next/link";

// Navbar Mobile
export default function NavbarMobile(props: { UserType: string }) {
  const router = useRouter();
  return (
    <>
      {props.UserType === "company" ? (
        <div className="fixed bottom-0 right-0 left-0 lg:hidden">
          <div className="w-full h-[88px] bg-fbblack-100">
            <ul className="flex items-center justify-between h-full px-5">
              <li className="content-center">
                <Link
                  className=""
                  href={
                    props.UserType === "company"
                      ? "/company/dashboard"
                      : "/users/dashboard"
                  }
                >
                  <HomeIcon className="NavIcon" />
                </Link>
              </li>

              <li className="text-center">
                <Link href="/company/live-events">
                  <GiftIcon className="NavIcon" />
                </Link>
              </li>

              <li className="text-center">
                <Link href="/company/giveaway">
                  <PlusCircleIcon className="NavIcon" />
                </Link>
              </li>

              <li className="text-center">
                <Link href="/company/followers">
                  <UserGroupIcon className="NavIcon" />
                </Link>
              </li>

              <li className="text-center">
                <Link href="/company/stats">
                  <ChartPieIcon className="NavIcon" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="fixed bottom-0 right-0 left-0 lg:hidden">
          <div className="w-full h-[88px] bg-fbblack-100">
            <ul className="flex items-center justify-between h-full px-5">
              <li className="content-center">
                <Link
                  className=""
                  href={
                    props.UserType === "user"
                      ? "/users/dashboard"
                      : "/users/dashboard"
                  }
                >
                  <HomeIcon className="NavIcon" />
                </Link>
              </li>

              <li className="text-center">
                <Link href="/users/my-entries">
                  <GiftIcon className="NavIcon" />
                </Link>
              </li>

              <li className="text-center">
                <Link href="/users/favorites">
                  <StarIcon className="NavIcon" />
                </Link>
              </li>

              <li className="text-center">
                <Link href="/users/profile">
                  <UserIcon className="NavIcon" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
