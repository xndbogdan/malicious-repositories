import { ARBITRUM, FTM_TESTNET, U2U_TESTNET } from "config/chains";
import { TOKENS_BY_SYMBOL_MAP } from "./tokens";

const oneInchTokensMap = {
  [ARBITRUM]: {
    BTC: "WBTC",
  },

  [FTM_TESTNET]: {
    BTC: "BTC.b",
    ETH: "WETH.e",
    WBTC: "WBTC.e",
  },
  [U2U_TESTNET]: {
    BTC: "BTC.b",
    ETH: "WETH.e",
    WBTC: "WBTC.e",
  },
};

export function get1InchSwapUrl(chainId: number, from?: string, to?: string) {
  const rootUrl = `https://app.1inch.io/#/${chainId}/simple/swap`;
  const chainTokensMap = TOKENS_BY_SYMBOL_MAP[chainId];
  const isInvalidInput = !from || !to || !chainTokensMap[from] || !chainTokensMap[to];
  if (isInvalidInput) {
    return rootUrl;
  }
  const fromToken = oneInchTokensMap[chainId]?.[from] || from;
  const toToken = oneInchTokensMap[chainId]?.[to] || to;
  return `${rootUrl}/${fromToken}/${toToken}`;
}

export function getLeaderboardLink(chainId) {
  if (chainId === ARBITRUM) {
    return "https://www.utx.house/arbitrum/leaderboard";
  }

  if (chainId === FTM_TESTNET) {
    return "https://www.utx.house/avalanche/leaderboard";
  }
  if (chainId === U2U_TESTNET) {
    return "https://www.utx.house/avalanche/leaderboard";
  }

  return "https://www.utx.house";
}
