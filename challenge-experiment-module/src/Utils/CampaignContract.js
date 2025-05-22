import { ethers } from "ethers";
import { getCampaign } from "./CampaignManager";

// get a campaign detail
export const getCampaignDetail = async (campaignContractAddress) => {
  const campaignContract = await getCampaign(campaignContractAddress);
  const details = await campaignContract.details();

  const campaignDetails = {
    contractAddress: campaignContractAddress,
    creator: details.creator,
    title: details.title,
    goal: ethers.utils.formatEther(details.goal),
    deadline: new Date(details.deadline * 1000).toLocaleString(),
    raisedAmount: ethers.utils.formatEther(details.raisedAmount),
    successful: details.successful,
    fundsWithdrawn: details.fundsWithdrawn,
  };

  return campaignDetails;
};

// contribute to the campaign
export const contribute = async (campaignContractAddress, amount) => {
  try {
    const campaignContract = await getCampaign(campaignContractAddress);

    const parsedAmount = ethers.utils.parseEther(amount.toString());

    const tx = await campaignContract.contribute({
      value: parsedAmount,
    });

    await tx.wait();
  } catch (error) {
    console.log("error", error);
  }
};

// get contributors
export const getContributors = async (campaignContractAddress) => {
  const campaignContract = await getCampaign(campaignContractAddress);
  const backers = await campaignContract.getContributors();

  const listOfBackers = await Promise.all(
    backers.map(async (item) => {
      const backer = {
        backer: item._contributor,
        amount: ethers.utils.formatEther(item._amount),
      };

      return backer;
    })
  );

  return listOfBackers;
};
