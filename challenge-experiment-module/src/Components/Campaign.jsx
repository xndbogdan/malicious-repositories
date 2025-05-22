import { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { getCampaignsDetail } from "../Utils/CampaignManager";
import { Link } from "react-router-dom";
import SkeletonCard from "./SkeletonCard";
import { useContext } from "react";
import { MainContext } from "../Context/MainContext";

const Campaign = () => {
  const { account } = useContext(MainContext);

  const [campaignList, setCampaignList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!account) return;
      try {
        setLoading(true);
        const campaigns = await getCampaignsDetail();
        setCampaignList(campaigns);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [account]);

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
        {loading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : (
          <>
            {campaignList.toReversed().map((campaign) => (
              <Link
                key={campaign.contractAddress}
                className="group flex flex-col h-full border hover:bg-white/10 border-white/5 0 rounded-xl p-5 backdrop-blur-md  bg-white/5"
                to={`/campaign/${campaign?.contractAddress}`}
              >
                <div className="aspect-w-16 aspect-h-11">
                  <img
                    className="w-full object-cover rounded-xl"
                    src={"/p2.jpg"}
                    alt="Campaign Image"
                  />
                </div>
                <div className="my-6">
                  <h3
                    className="relative inline-block font-semibold text-xl before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-0.5 before:bg-lime-400 before:transition before:origin-left before:scale-x-0 group-hover:before:scale-x-50 text-white ease-in-out duration-300
              "
                  >
                    {campaign?.title}
                  </h3>
                  <p className="mt-5 text-gray-400 text-sm">
                    At Wake, our mission has always been focused on bringing
                    openness.
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-x-3">
                  <span className="inline-flex items-center justify-center size-[40px] text-sm font-semibold leading-none rounded-full bg-white/10 text-white border border-white/10">
                    {campaign?.creator?.slice(0, 3)}
                  </span>
                  <div>
                    <p
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-100 flex gap-1 justify-center items-start"
                    >
                      Created by {campaign?.creator.slice(0, 10)}...
                      <GoArrowUpRight />
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </>
        )}
      </div>

      <div className="mt-12 text-center">
        <Link
          className="group inline-flex items-center bg-white/10 hover:bg-white/10 z-50 border border-white/10 p-1 ps-4 rounded-full shadow-md focus:outline-none focus:bg-white/10"
          to={"/campaigns"}
        >
          <p className="me-2 text-white text-sm">Explore more live Campaigns</p>
          <span className="group-hover:bg-white/10 py-1.5 px-2.5 flex justify-center items-center gap-x-2 rounded-full bg-white/10 font-semibold text-white text-sm">
            <GoArrowUpRight className="shrink-0 size-4" />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Campaign;
