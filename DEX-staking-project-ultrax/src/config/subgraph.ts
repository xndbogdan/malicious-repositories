import { ARBITRUM, FTM_TESTNET, U2U_TESTNET } from "./chains";
import { isDevelopment } from "./env";
import { getSubgraphUrlKey } from "./localStorage";

const SUBGRAPH_URLS = {
  [ARBITRUM]: {
    stats: "https://subgraph.satsuma-prod.com/3b2ced13c8d9/utx/utx-stats/api",
    referrals: "https://subgraph.satsuma-prod.com/3b2ced13c8d9/utx/utx-arbitrum-referrals/api",
    nissohVault: "https://api.thegraph.com/subgraphs/name/nissoh/utx-vault",
  },
  [FTM_TESTNET]: {
    stats: "https://subgraph.satsuma-prod.com/3b2ced13c8d9/utx/utx-stats/api",
    referrals: "https://subgraph.satsuma-prod.com/3b2ced13c8d9/utx/utx-arbitrum-referrals/api",
    nissohVault: "https://api.thegraph.com/subgraphs/name/nissoh/utx-vault",
  },
  [U2U_TESTNET]: {
    stats: "https://subgraph.satsuma-prod.com/3b2ced13c8d9/utx/utx-stats/api",
    referrals: "https://subgraph.satsuma-prod.com/3b2ced13c8d9/utx/utx-arbitrum-referrals/api",
    nissohVault: "https://api.thegraph.com/subgraphs/name/nissoh/utx-vault",
  },
};

export function getSubgraphUrl(chainId: number, subgraph: string) {
  if (isDevelopment()) {
    const localStorageKey = getSubgraphUrlKey(chainId, subgraph);
    const url = localStorage.getItem(localStorageKey);
    if (url) {
      // eslint-disable-next-line no-console
      console.warn("%s subgraph on chain %s url is overriden: %s", subgraph, chainId, url);
      return url;
    }
  }

  return SUBGRAPH_URLS?.[chainId]?.[subgraph];
}
