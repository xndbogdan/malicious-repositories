import { GoArrowUpRight, GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-gray-950 flex justify-center items-center pt-10 md:pt-24">
      <div className="flex absolute top-0 left-0 start-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-gradient-to-tl blur-3xl w-[55vw] h-[60vh] rounded-full origin-top-right -rotate-12 from-lime-900/70 via-indigo-900/70 to-blue-900/70 "></div>
      </div>

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
        <div className="flex justify-center z-50">
          <Link
            className="group inline-flex items-center bg-white/10 hover:bg-white/10 z-50 border border-white/10 p-1 ps-4 rounded-full shadow-md focus:outline-none focus:bg-white/10"
            to={"/campaigns"}
          >
            <p className="me-2 text-white text-sm">Explore Live Campaigns</p>
            <span className="group-hover:bg-white/10 py-1.5 px-2.5 flex justify-center items-center gap-x-2 rounded-full bg-white/10 font-semibold text-white text-sm">
              <GoArrowUpRight className="shrink-0 size-4" />
            </span>
          </Link>
        </div>

        <div className="max-w-3xl text-center mx-auto">
          <h1 className="block font-medium text-gray-200 text-4xl sm:text-5xl md:text-6xl lg:text-6xl">
            Join Hands, Share the Load, Create Change
          </h1>
        </div>

        <div className="max-w-4xl text-center mx-auto">
          <p className="text-sm md:text-base text-gray-300 font-light">
            Lomi empowers collective success, harness the power of community to
            fund your vision, contribute to others, and track progress
            transparently on the blockchain.
          </p>
        </div>

        <div className="text-center">
          <Link
            className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-lime-600 to-lime-600 shadow-lg shadow-transparent hover:shadow-lime-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:shadow-lime-700/50 py-3 px-6"
            to={"/create-campaign"}
          >
            Start Your Campaign
            <GoArrowRight className="shrink-0 size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
