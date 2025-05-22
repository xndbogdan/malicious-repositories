import { ARBITRUM, FTM_TESTNET, U2U_TESTNET } from "config/chains";
import arbitrum from "img/ic_arbitrum_24.svg";
import avalanche from "img/ic_avalanche_24.svg";

import utxIcon from "img/ic_gmx_40.svg";
import ulpIcon from "img/ic_glp_40.svg";
import utxArbitrum from "img/ic_gmx_arbitrum.svg";
import utxAvax from "img/ic_gmx_avax.svg";
import ulpArbitrum from "img/ic_glp_arbitrum.svg";
import ulpAvax from "img/logo-ultra-small.svg";

const ICONS = {
  [ARBITRUM]: {
    network: arbitrum,
    utx: utxArbitrum,
    ulp: ulpArbitrum,
  },

  [FTM_TESTNET]: {
    network: "https://s2.coinmarketcap.com/static/img/coins/64x64/3513.png",
    utx: utxAvax,
    ulp: ulpAvax,
  },
  [U2U_TESTNET]: {
    network:
      "https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F3372525568-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252Fy7dgL6mKTd9R6EZlhJfK%252Ficon%252FBaH4aM2HnkxcqDRU2PwA%252F318541.jpg%3Falt%3Dmedia%26token%3Dfa55ecee-ffbf-4230-afab-c8bf68eff238",
    utx: ulpAvax,
    ulp: ulpAvax,
  },

  common: {
    utx: utxIcon,
    ulp: ulpIcon,
  },
};

export function getIcon(chainId: number | "common", label: string) {
  if (chainId in ICONS) {
    if (label in ICONS[chainId]) {
      return ICONS[chainId][label];
    }
  }
}
export function getIcons(chainId: number | "common") {
  if (!chainId) return;
  if (chainId in ICONS) {
    return ICONS[chainId];
  }
}
