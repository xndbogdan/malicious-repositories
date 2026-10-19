import { Contract, utils, BigNumber } from "ethers";
import { _getProvider } from "./ethereum";
import BARN_ABI from "./abi/barn.abi";

export const stake = async (account, tokenIds) => {
  const provider = _getProvider();
  if (!provider) throw new Error("Unable to connect to wallet");
  const signer = provider.getSigner();
  const contract = new Contract(process.env.REACT_APP_BARN, BARN_ABI, signer);
  const gasEstimate = await contract.estimateGas.addManyToBarnAndPack(
    account,
    tokenIds
  );
  return await contract.addManyToBarnAndPack(account, tokenIds, {
    gasLimit: gasEstimate.mul(BigNumber.from(12)).div(BigNumber.from(10)),
  });
};

export const claim = async (tokenIds, unstake) => {
  const provider = _getProvider();
  if (!provider) throw new Error("Unable to connect to wallet");
  const signer = provider.getSigner();
  const contract = new Contract(process.env.REACT_APP_BARN, BARN_ABI, signer);
  const gasEstimate = await contract.estimateGas.claimManyFromBarnAndPack(
    tokenIds,
    unstake
  );
  return await contract.claimManyFromBarnAndPack(tokenIds, unstake, {
    gasLimit: gasEstimate.mul(BigNumber.from(12)).div(BigNumber.from(10)),
  });
};

export const parseClaims = (receipt) => {
  const barn = new utils.Interface(BARN_ABI);
  const claims = [];
  receipt.logs.forEach((log) => {
    try {
      const args = barn.parseLog(log).args;
      if (args.tokenId) claims.push(args);
    } catch (error) {}
  });
  return claims;
};
