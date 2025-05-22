import { ethers } from "ethers";
import { toast } from "react-toastify";

export const connectMetamask = async () => {

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return { signer: signer, provider: provider };
  } catch (error) {
    console.log("error", error);
  }
};

export const checkIfWalletIsConnect = async (setAccount) => {
  try {

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length) {
      setAccount(accounts[0]);
    } else {
      console.log("No accounts found");
    }
  } catch (error) {
    console.log(error);
  }
};
