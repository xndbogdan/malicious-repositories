import { useState } from "react";
import { createCampaign } from "../Utils/CampaignManager";
import { toast } from "react-toastify";

const CreateCampaignCard = () => {
  const [loading, setLoading] = useState(false);

  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Campaign title is required";
    if (!amount) newErrors.amount = "Funding goal is required";
    else if (isNaN(amount) || Number(amount) <= 0)
      newErrors.amount = "Funding goal must be a positive number";
    if (!deadline) newErrors.deadline = "Campaign duration is required";
    else if (isNaN(deadline) || Number(deadline) <= 0)
      newErrors.deadline = "Campaign duration must be a positive number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createCampaigns = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log("amount", amount);
    console.log("title", title);
    console.log("deadline", deadline);
    setLoading(false);

    try {
      setLoading(true);
      const campaigns = await createCampaign(title, amount, deadline);
      setLoading(false);
      console.log("campaigns", campaigns);
      toast.success("Your campaign has been successfully created.");
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      setLoading(false);
      toast.error("Failed to create campaign.");
    }
  };

  return (
    <div className="flex flex-col border rounded-xl p-4 sm:p-6 lg:p-10 border-gray-700 bg-white/5">
      <form onSubmit={createCampaigns}>
        <div className="grid gap-4 lg:gap-6">
          {/* Campaign Title */}
          <div>
            <label
              htmlFor="campaign-title"
              className="block mb-2 text-sm font-medium text-white"
            >
              Campaign Title
            </label>
            <input
              type="text"
              name="campaign-title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="py-3 px-4 block w-full rounded-lg text-sm bg-white/5 border border-white/20 text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-gray-600"
              placeholder="Enter campaign title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Campaign Description */}
          <div>
            <label
              htmlFor="campaign-description"
              className="block mb-2 text-sm font-medium text-white"
            >
              Description
            </label>
            <textarea
              id="campaign-description"
              name="campaign-description"
              rows="6"
              className="py-3 px-4 block w-full rounded-lg text-sm bg-white/5 border border-white/20 text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-gray-600"
              placeholder="Describe your campaign..."
            ></textarea>
          </div>

          {/* Funding Goal */}
          <div>
            <label
              htmlFor="campaign-goal"
              className="block mb-2 text-sm font-medium text-white"
            >
              Funding Goal (in Ether)
            </label>
            <input
              type="number"
              step="0.1"
              name="campaign-goal"
              id="campaign-goal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="py-3 px-4 block w-full rounded-lg text-sm bg-white/5 border border-white/20 text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-gray-600"
              placeholder="Enter the funding goal"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
          </div>

          {/* Campaign Duration */}
          <div>
            <label
              htmlFor="campaign-duration"
              className="block mb-2 text-sm font-medium text-white"
            >
              Campaign Duration (in sec 😶)
            </label>
            <input
              type="number"
              name="campaign-duration"
              id="campaign-duration"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="py-3 px-4 block w-full rounded-lg text-sm bg-white/5 border border-white/20 text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-gray-600"
              placeholder="Enter duration in sec (1 day = 86400 sec)"
            />
            {errors.deadline && (
              <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 grid">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-transparent bg-lime-500 text-white hover:bg-lime-700 focus:outline-none focus:bg-lime-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-lime-500"
          >
            {loading ? "Creating..." : "Create Campaign"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaignCard;
