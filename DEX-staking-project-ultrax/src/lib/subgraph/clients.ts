import { createClient } from "./utils";
import { ARBITRUM, FTM_TESTNET, U2U_TESTNET } from "config/chains";

export const arbitrumGraphClient = createClient(ARBITRUM, "stats");
export const arbitrumReferralsGraphClient = createClient(ARBITRUM, "referrals");
export const nissohGraphClient = createClient(ARBITRUM, "nissohVault");

export const ftmGraphClient = createClient(FTM_TESTNET, "stats");

export function getUtxGraphClient(chainId: number) {
  if (chainId === ARBITRUM) {
    return arbitrumGraphClient;
  }
  if (chainId === FTM_TESTNET || chainId === U2U_TESTNET) {
    return ftmGraphClient;
  }

  throw new Error(`Unsupported chain ${chainId}`);
}
