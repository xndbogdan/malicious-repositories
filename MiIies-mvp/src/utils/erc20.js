import { Contract } from "ethers";
import { _getProvider } from "./ethereum";
import ERC20_ABI from "./abi/erc20.abi";

const MAX_APPROVE =
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

export const approve = async (token, spender) => {
  const provider = _getProvider();
  if (!provider) throw new Error("Unable to connect to wallet");
  const signer = provider.getSigner();
  const contract = new Contract(token, ERC20_ABI, signer);
  return await contract.approve(spender, MAX_APPROVE);
};
