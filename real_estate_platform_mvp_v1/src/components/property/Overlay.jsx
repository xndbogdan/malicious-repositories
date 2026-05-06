import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";
import { scenes } from "./Experience";
import { FaWallet } from "react-icons/fa";
import { Link } from "react-router-dom";

export const slideAtom = atom(0);

export const Overlay = () => {
  const [slide, setSlide] = useAtom(slideAtom);
  const [displaySlide, setDisplaySlide] = useState(slide);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 1000);
  }, []);

  useEffect(() => {
    setVisible(false);
    setTimeout(() => {
      setDisplaySlide(slide);
      setVisible(true);
    }, 2600);
  }, [slide, setSlide]);

  return (
    <>
      <div
        className={`fixed z-10 top-0 left-0 bottom-0 right-0 flex flex-col justify-between pointer-events-none text-black ${
          visible ? "" : "opacity-0"
        } transition-opacity duration-1000`}
      >
        <Link to='/' className="flex items-center justify-center mx-auto mt-8">
          <svg width="30" height="35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="20" r="10" stroke="#0682ff"/>
              <circle cx="15" cy="20" r="6" stroke="#0682ff" strokeWidth="3"/>
          </svg>    
          <span className="text-2xl text-primary-700 font-bold mt-1.5">RoyalCity</span>             
        </Link>
        <div className="bg-gradient-to-t from-white/90 pt-20 pb-10 p-4 flex items-center flex-col text-center">
          <h1 className="text-2xl lg:text-5xl font-extrabold">
            {scenes[displaySlide].name}
          </h1>
          <p className="text-xs lg:text-sm text-opacity-60 italic">
            {scenes[displaySlide].description}
          </p>
          <div className="flex items-center gap-12 mt-4">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm lg:text-2xl">
                  {scenes[displaySlide].targetProfitability} %
                </p>
              </div>
              <p className="text-xs opacity-80">Total Return</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm lg:text-2xl">
                  {scenes[displaySlide].roi} %
                </p>
              </div>
              <p className="text-xs opacity-80">ROI</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex gap-2 items-center">
                <p className="font-semibold text-sm lg:text-2xl">
                  {scenes[displaySlide].valuation.toLocaleString()}
                </p>
              </div>
              <p className="text-xs opacity-80">Valuation</p>
            </div>
          </div>
          <button className="btn w-full lg:w-1/2 mt-6 flex items-center justify-center text-xl">
            <FaWallet className="mr-2" />
            Invest
          </button>
        </div> 
      </div>
    </>
  );
};
