import { ethers } from "ethers";
import { connectMetamask } from "./connectMetamask";
import { campaignAbi, campaignManagerAbi, contractAddress } from "./constants";

export const getCampaignManagerContract = async () => {
  const { signer } = await connectMetamask();
  const campaignManagerContract = new ethers.Contract(
    contractAddress,
    campaignManagerAbi,
    signer
  );

  return { campaignManagerContract: campaignManagerContract, signer: signer };
};

// Create campaign
export const createCampaign = async (title, amount, deadline) => {
  const { campaignManagerContract } = await getCampaignManagerContract();

  const amountString = amount.toString();

  const tx = await campaignManagerContract.createCampaign(
    title,
    ethers.utils.parseEther(amountString),
    deadline
  );

  await tx.wait();
};

// get a campaign contract instance
export const getCampaign = async (campaignContractAddress) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  return new ethers.Contract(campaignContractAddress, campaignAbi, signer);
};

// get a list of camapaigns
export const getCampaignsDetail = async () => {
  const { campaignManagerContract } = await getCampaignManagerContract();

  const campaignContractAddresses =
    await campaignManagerContract.getCampaigns();

  const campaignsDetail = await Promise.all(
    campaignContractAddresses.map(async (contractAddress) => {
      const campaignContract = await getCampaign(contractAddress);
      const details = await campaignContract.details();

      const campaignDetails = {
        contractAddress: contractAddress,
        creator: details.creator,
        title: details.title,
        goal: ethers.utils.formatEther(details.goal),
        deadline: new Date(details.deadline * 1000).toLocaleString(),
        raisedAmount: ethers.utils.formatEther(details.raisedAmount),
        successful: details.successful,
        fundsWithdrawn: details.fundsWithdrawn,
      };

      return campaignDetails;
    })
  );

  return campaignsDetail;
};

// get a list of user's campaign
export const getUserCampaigns = async (userAddress) => {
  const { campaignManagerContract } = await getCampaignManagerContract();
  const userCampaignContractAddresses =
    await campaignManagerContract.getUserCampaigns(userAddress);

  const userCampaignsDetail = await Promise.all(
    userCampaignContractAddresses.map(async (contractAddress) => {
      const campaignContract = await getCampaign(contractAddress);
      const details = await campaignContract.details();

      const userCampaignDetails = {
        contractAddress: contractAddress,
        creator: details.creator,
        title: details.title,
        goal: ethers.utils.formatEther(details.goal),
        deadline: new Date(details.deadline * 1000).toLocaleString(),
        raisedAmount: ethers.utils.formatEther(details.raisedAmount),
        successful: details.successful,
        fundsWithdrawn: details.fundsWithdrawn,
      };

      return userCampaignDetails;
    })
  );

  return userCampaignsDetail;
};
