import { ARBITRUM, FTM_TESTNET, U2U_TESTNET } from "config/chains";
import { BigNumber } from "ethers";

export type VolumeInfo = {
  totalVolume: BigNumber;
  [ARBITRUM]: { totalVolume: BigNumber };
  [FTM_TESTNET]: { totalVolume: BigNumber };
  [U2U_TESTNET]: { totalVolume: BigNumber };
};

export type VolumeStat = {
  swap: string;
  margin: string;
  liquidation: string;
  mint: string;
  burn: string;
};
