import React from "react";
import { projectImgURL, userURL } from "../Utils/constants";
import { GoArrowUpRight } from "react-icons/go";

const Campaigns = () => {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="max-w-3xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-2xl font-semibold md:text-4xl md:leading-tight text-gray-100">
          Explore Live Campaigns
        </h2>
        <p className="mt-1 text-gray-300 font-light text-sm md:text-base">
          Find and Back Campaigns That Need Your Help Now—Explore a wide range
          of live projects where your contribution can make a real difference.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <a
            key={i}
            className="group flex flex-col h-full border border-white/5 hover:border-transparent hover:shadow-lg focus:outline-none focus:border-transparent focus:shadow-lg transition duration-300 rounded-xl p-5 backdrop-blur-md  bg-white/5"
            href={`/campaign/${i}`}
          >
            <div className="aspect-w-16 aspect-h-11">
              <img
                className="w-full object-cover rounded-xl"
                src={projectImgURL}
                alt="Blog Image"
              />
            </div>
            <div className="my-6">
              <h3 className="text-xl font-semibold text-gray-200">
                Announcing a free plan for small teams
              </h3>
              <p className="mt-5 text-gray-400 text-sm">
                At Wake, our mission has always been focused on bringing
                openness.
              </p>
            </div>
            <div className="mt-auto flex items-center gap-x-3">
              <img className="size-8 rounded-full" src={userURL} alt="Avatar" />
              <div>
                <h5 className="text-sm text-gray-100">By Lauren Waller</h5>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          className="group inline-flex items-center bg-white/10 hover:bg-white/10 z-50 border border-white/10 p-1 ps-4 rounded-full shadow-md focus:outline-none focus:bg-white/10"
          href="#"
        >
          <p className="me-2 text-white text-sm">Explore more live Campaigns</p>
          <span className="group-hover:bg-white/10 py-1.5 px-2.5 flex justify-center items-center gap-x-2 rounded-full bg-white/10 font-semibold text-white text-sm">
            <GoArrowUpRight className="shrink-0 size-4" />
          </span>
        </a>
      </div>
    </div>
  );
};

export default Campaigns;
