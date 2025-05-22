import { GoArrowRight, GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getUserCampaigns } from "../Utils/CampaignManager";
import { MainContext } from "../Context/MainContext";
import CardLoader from "../Components/CardLoader";
import Placeholder from "../Components/Placeholder";

const MyCampaigns = () => {
  const [campaignList, setCampaignList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { account } = useContext(MainContext);

  useEffect(() => {
    const fetchCampaigns = async () => {
      if (account) {
        try {
          setLoading(true);
          const campaigns = await getUserCampaigns(account);
          setCampaignList(campaigns);
          console.log("campaigns", campaigns);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching campaigns:", error);
          setLoading(false);
        }
      }
    };

    fetchCampaigns();
  }, [account]);

  return (
    <div className="max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32 mx-auto">
      <div className="max-w-5xl mb-10 lg:mb-14 md:flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight text-white">
            My Campaigns
          </h2>
          <p className="mt-1 text-gray-300">
            Here you can manage and track your campaigns.
          </p>
        </div>
        <div className="py-5 md:py-0 z-50">
          <Link
            to={"/create-campaign"}
            className="inline-flex md:justify-center md:items-center gap-x-3 text-center bg-gradient-to-tl from-lime-600 to-lime-600 shadow-lg shadow-transparent hover:shadow-lime-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:shadow-lime-700/50 py-3 px-4"
          >
            Create new campaign
            <GoArrowRight className="shrink-0 size-4" />
          </Link>
        </div>
      </div>
      <div>
        <>
          {!loading && campaignList.length === 0 && (
            <Placeholder
              title={"No Campaigns Available"}
              desc={
                "You haven't created any campaigns yet. Start by creating your first campaign to see it listed here!"
              }
            />
          )}
        </>
      </div>
      <div className="grid lg:grid-cols-2 lg:gap-y-16 gap-10">
        {loading ? (
          Array.from({ length: 2 }).map((_, index) => (
            <CardLoader key={index} />
          ))
        ) : (
          <>
            <>
              {campaignList.map((campaign) => (
                <Link
                  key={campaign?.contractAddress}
                  className="group block rounded-xl overflow-hidden focus:outline-none"
                  to={`/campaign/${campaign?.contractAddress}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                    <div className="shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44">
                      <img
                        className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out size-full absolute top-0 start-0 object-cover rounded-xl"
                        src={"/p2.jpg"}
                        alt="Campaign Image"
                      />
                    </div>

                    <div className="grow">
                      <h3 className="text-xl font-semibold   text-gray-300 group-hover:text-white">
                        {campaign?.title}
                      </h3>
                      <p className="mt-3  text-gray-300">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Optio itaque expedita modi facilis...
                      </p>
                      <p className="mt-4 inline-flex items-center gap-x-1 text-sm  decoration-2 group-hover:underline group-focus:underline font-medium text-lime-500">
                        Detail
                        <GoArrowUpRight />
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          </>
        )}
      </div>
    </div>
  );
};

export default MyCampaigns;
