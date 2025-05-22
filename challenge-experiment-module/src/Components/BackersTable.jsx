import { useEffect, useState } from "react";
import { getContributors } from "../Utils/CampaignContract";
import { Link, useParams } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import SkeletonRow from "./SkeletonRow";
import Placeholder from "./Placeholder";

const BackersTable = () => {
  const [backers, setBackers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const getBackers = async () => {
      try {
        setLoading(true);
        const contributors = await getContributors(id);
        setBackers(contributors);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error", error);
      }
    };
    getBackers();
  }, [id]);

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-neutral-700">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium uppercase text-neutral-400"
                  >
                    Backer
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium uppercase text-neutral-400"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium uppercase text-neutral-400"
                  >
                    Contribution Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium uppercase text-neutral-400"
                  >
                    Detail
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-700">
                {loading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <SkeletonRow key={index} />
                  ))
                ) : (
                  <>
                    <>
                      {backers.map((backer, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-white/10 ease-in-out duration-200"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-200">
                            {backer?.backer?.slice(0, 20)}...
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-200">
                            {backer?.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm  text-neutral-200">
                            September 14, 2024
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm  text-neutral-200">
                            <Link
                              to={`https://sepolia.etherscan.io/address/${backer?.backer}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 flex items-center gap-1 hover:underline"
                            >
                              See detail
                              <GoArrowUpRight />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </>
                  </>
                )}
              </tbody>
            </table>
            <div className="w-full text-auto">
              {!loading && backers.length === 0 && (
                <Placeholder
                  title={"No Backer Available"}
                  desc={
                    "No contributions have been made to this campaign yet. Be the first to support and make a difference."
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackersTable;
