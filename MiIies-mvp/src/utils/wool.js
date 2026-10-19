import { BigNumber, Contract } from "ethers";
import { _getProvider } from "./ethereum";
import WOOL_ABI from "./abi/wool.abi";

export const woolBalance = async (address) => {
  const provider = _getProvider();
  if (!provider) return BigNumber.from("0");
  try {
    const signer = provider.getSigner();
    const contract = new Contract(process.env.REACT_APP_WOOL, WOOL_ABI, signer);
    return await contract.balanceOf(address);
  } catch (e) {
    console.log(e);
    return BigNumber.from("0");
  }
};
