import CreateCampaignCard from "../Components/CreateCampaignCard";
import { BsCheck2Circle } from "react-icons/bs";

const CreateCampaign = () => {
  return (
    <div className="max-w-[85rem] px-4 py-20 sm:px-6 lg:px-8 lg:py-32 mx-auto">
      <div className="flex absolute top-0 left-0 start-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-gradient-to-tl blur-3xl w-[55vw] h-[60vh] rounded-full origin-bottom-left -rotate-12 from-lime-900/70 via-indigo-900/70 to-blue-900/70 "></div>
      </div>
      <div className="grid md:grid-cols-2 items-start gap-12">
        <div>
          <h1 className="text-3xl font-bold  sm:text-4xl lg:text-5xl lg:leading-tight text-white">
            Start Your Campaign
          </h1>
          <p className="mt-1 md:text-lg  text-gray-200">
            Launch your fundraising campaign and connect with supporters around
            the world.
          </p>

          <div className="mt-8">
            <h2 className="text-lg font-semibold  text-gray-200">
              What to Expect:
            </h2>

            <ul className="mt-2 space-y-2">
              <li className="flex justify-start items-center gap-x-3">
                <BsCheck2Circle className="text-lime-400 size-5" />
                <span className=" text-gray-300">
                  Easy setup and management
                </span>
              </li>
              <li className="flex gap-x-3 justify-start items-center">
                <BsCheck2Circle className="text-lime-400 size-5" />
                <span className=" text-gray-300">
                  Transparent funding and contributions
                </span>
              </li>
              <li className="flex gap-x-3 justify-start items-center">
                <BsCheck2Circle className="text-lime-400 size-5" />
                <span className=" text-gray-300">
                  Real-time tracking and analytics
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold  text-gray-200">
              Join Our Community of Creators:
            </h2>
            <p className=" text-gray-300 mt-2">
              Whether you&apos;re raising funds for a cause, project, or
              business, we are here to help you every step of the way.
            </p>
          </div>
        </div>

        <div className="relative">
          <CreateCampaignCard />
        </div>
      </div>
    </div>
  );
};

export default CreateCampaign;
