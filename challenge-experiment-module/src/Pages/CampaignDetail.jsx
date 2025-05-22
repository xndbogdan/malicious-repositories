import {
  FaCalendarAlt,
  FaCoins,
  FaClock,
  FaFlagCheckered,
} from "react-icons/fa";
import BackersTable from "../Components/BackersTable";
import { useEffect, useState } from "react";
import { contribute, getCampaignDetail } from "../Utils/CampaignContract";
import { useParams } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import Loader from "../Components/Loader";
import { toast } from "react-toastify";

const CampaignDetail = () => {
  const [campaign, setCampaign] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [amount, setAmount] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const campaign = await getCampaignDetail(id);
        setCampaign(campaign);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching campaign:", error);
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [id]);

  const handleContribute = async () => {
    if (!amount || amount < 0) {
      toast.error("Please provide valid amount.");
      return;
    }
    try {
      console.log("amount", amount);
      setSubmitting(true);
      await contribute(id, amount);
      setSubmitting(false);
      window.location.reload();
    } catch (error) {
      console.log("error", error);
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 lg:py-32 py-20">
      <div className="flex absolute top-0 left-0 start-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-gradient-to-tl blur-3xl w-[55vw] h-[60vh] rounded-full origin-bottom-left -rotate-12 from-lime-900/70 via-indigo-900/70 to-blue-900/70 "></div>
      </div>
      {loading ? (
        <div className="h-96">
          <Loader />
        </div>
      ) : (
        <div className="grid lg:grid-cols-6 lg:gap-x-8 xl:gap-x-12 lg:items-start justify-center">
          <div className="lg:col-span-3 mt-10 lg:mt-0">
            <img className="w-full rounded-xl" src="/p2.jpg" alt="Hero Image" />
          </div>
          <div className="lg:col-span-3 pt-5 lg:pt-0">
            <h1 className="block text-3xl font-semibold text-gray-50 sm:text-2xl md:text-3xl lg:text-4xl">
              {campaign?.title}
            </h1>
            <p className="mt-3 text-base text-gray-300">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              voluptatibus tempora, fuga, non quis quia ipsam blanditiis sit
              obcaecati, officiis voluptatum rerum architecto adipisci
              laboriosam vero asperiores doloremque illum maxime provident! Ut,
              laudantium vero culpa molestiae deleniti cupiditate eius tenetur!
            </p>

            <div className="grid md:grid-cols-2 gap-y-5 text-gray-300 text-sm my-8">
              <div className="flex items-center gap-2">
                <FaFlagCheckered className="text-blue-500" />{" "}
                {/* Target icon */}
                <p className="font-semibold">Target:</p>
                <p> {campaign?.goal} ether</p>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-purple-500" />{" "}
                {/* Start date icon */}
                <p className="font-semibold">Start date:</p>
                <p>September 1, 2024</p>
              </div>

              <div className="flex items-center gap-2">
                <FaCoins className="text-green-500" /> {/* Raised icon */}
                <p className="font-semibold">Raised:</p>
                <p> {campaign?.raisedAmount} ether</p>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-red-500" /> {/* Due date icon */}
                <p className="font-semibold">Due date:</p>
                <p> {campaign?.deadline}</p>
              </div>
            </div>

            <div className="mt-5 lg:mt-12 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
              <div className="w-full sm:w-auto">
                <label htmlFor="hero-input" className="sr-only">
                  Contribute
                </label>
                <input
                  type="number"
                  step={"0.0001"}
                  required
                  min={0}
                  id="hero-input"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  name="hero-input"
                  className="py-3 text-white ring-0 placeholder:text-gray-300 px-4 block w-full min-w-80 bg-white/10 border border-white/20 rounded-full text-sm focus:border-lime-500 focus:ring-lime-500 disabled:opacity-50 disabled:pointer-events-none"
                  placeholder="Enter amount ..."
                />
              </div>
              <button
                onClick={handleContribute}
                disabled={submitting}
                className="w-full sm:w-auto py-3 px-8 inline-flex justify-center items-center gap-x-2 text-sm font-medium shadow-sm shadow-lime-400 rounded-full border border-transparent bg-lime-500 text-white hover:bg-lime-600 focus:outline-none focus:bg-lime-600 disabled:opacity-50 disabled:pointer-events-none"
              >
                {submitting ? "Sending..." : "Contribute"}
              </button>
            </div>
            <div className="my-10 flex items-center gap-x-3">
              <span className="inline-flex items-center justify-center size-[40px] text-sm font-semibold leading-none rounded-full bg-white/10 text-white border border-white/10">
                {campaign?.creator?.slice(0, 3)}
              </span>
              <div>
                <a
                  href={`https://sepolia.etherscan.io/address/${campaign?.creator}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-100 hover:underline flex gap-1 justify-center items-start"
                >
                  Created by {campaign?.creator?.slice(0, 10)}...
                  <GoArrowUpRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mt-10">
        <BackersTable />
      </div>
    </div>
  );
};

export default CampaignDetail;
