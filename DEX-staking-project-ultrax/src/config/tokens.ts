import { ethers } from "ethers";
import { getContract } from "./contracts";
import { ARBITRUM, FTM_TESTNET, U2U_TESTNET } from "./chains";
import { Token } from "domain/tokens";

export const TOKENS: { [chainId: number]: Token[] } = {
  [ARBITRUM]: [
    {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
      address: ethers.constants.AddressZero,
      isNative: true,
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
    },
    {
      name: "Wrapped Ethereum",
      symbol: "WETH",
      decimals: 18,
      address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      isWrapped: true,
      baseSymbol: "ETH",
      imageUrl: "https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1628852295",
    },
    {
      name: "Bitcoin (WBTC)",
      symbol: "BTC",
      decimals: 8,
      address: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/7598/thumb/wrapped_bitcoin_wbtc.png?1548822744",
    },
    {
      name: "Chainlink",
      symbol: "LINK",
      decimals: 18,
      address: "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4",
      isStable: false,
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/877/thumb/chainlink-new-logo.png?1547034700",
    },
    {
      name: "Uniswap",
      symbol: "UNI",
      decimals: 18,
      address: "0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0",
      isStable: false,
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/12504/thumb/uniswap-uni.png?1600306604",
    },
    {
      name: "USD Coin",
      symbol: "USDC",
      decimals: 6,
      address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
      isStable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    },
    {
      name: "Tether",
      symbol: "USDT",
      decimals: 6,
      address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      isStable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png?1598003707",
    },
    {
      name: "Dai",
      symbol: "DAI",
      decimals: 18,
      address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      isStable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/9956/thumb/4943.png?1636636734",
    },
    {
      name: "Frax",
      symbol: "FRAX",
      decimals: 18,
      address: "0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F",
      isStable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/13422/small/frax_logo.png?1608476506",
    },
    {
      name: "Magic Internet Money",
      symbol: "MIM",
      decimals: 18,
      address: "0xFEa7a6a0B346362BF88A9e4A88416B77a57D6c2A",
      isStable: true,
      isTempHidden: true,
      imageUrl: "https://assets.coingecko.com/coins/images/16786/small/mimlogopng.png",
    },
  ],

  [FTM_TESTNET]: [
    {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
      address: ethers.constants.AddressZero,
      isNative: true,
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png?1604021818",
    },
    {
      name: "Tether",
      symbol: "USDT",
      decimals: 6,
      address: "0xec4ccddf3e55bc0dbd913f6b98319a87a5e92fc2",
      isStable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png?1598003707",
    },
    {
      name: "USD Coin (USDC.e)",
      symbol: "USDC",
      address: "0xfc8eb8e48db1e598f550103c0c5279fe1fb5fad4",
      decimals: 6,
      isStable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    },
    {
      name: "BitCoin",
      symbol: "BTC",
      address: "0xd8d2904d8995679289210976e6f71a98deef6a3b",
      decimals: 8,
      isShortable: true,
      imageUrl: "https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389",
    },
    {
      name: "Wrapped Ethereum",
      symbol: "WETH",
      decimals: 18,
      address: "0x1f360e4c435aa588aa855e606be9afccf1cfba3a",
      isWrapped: true,
      baseSymbol: "ETH",
      imageUrl: "https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1628852295",
    },
  ],
  [U2U_TESTNET]: [
    {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
      address: "0xd4c84c22c2f3b7a3980225cf66eed09cd379d1d4",
      isShortable: true,
      imageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
    },
    {
      name: "Tether",
      symbol: "USDT",
      address: "0x87e1a7e1e8310e77829ac5e7e1bf85139d3ce053",
      decimals: 18,
      isStable: true,
      imageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
    },
    {
      name: "BitCoin",
      symbol: "BTC",
      address: "0x6661f8c1411d35ca1a8ff0c2c178797d0e7a4a4d",
      decimals: 18,
      isShortable: true,
      imageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
    },
    {
      name: "Binance Coin",
      symbol: "BNB",
      address: "0x914e8f634d692d3d4f5b84f46fe22bd00d0d86b6",
      decimals: 18,
      isShortable: true,
      imageUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
    },
    // {
    //   name: "Wrapped Ethereum",
    //   symbol: "WETH",
    //   decimals: 18,
    //   address: "0xD4C84c22C2F3B7A3980225cF66EeD09cD379d1D4".toLowerCase(),
    //   isWrapped: true,
    //   baseSymbol: "ETH",
    //   imageUrl: "https://assets.coingecko.com/coins/images/2518/thumb/weth.png?1628852295",
    // },
  ],
};

export const DEFAULT_TOKEN = "0xd4c84c22c2f3b7a3980225cf66eed09cd379d1d4";

export const ADDITIONAL_TOKENS: { [chainId: number]: Token[] } = {
  [ARBITRUM]: [
    {
      name: "UTX",
      symbol: "UTX",
      address: getContract(ARBITRUM, "UTX"),
      decimals: 18,
      imageUrl: "https://assets.coingecko.com/coins/images/18323/small/arbit.png?1631532468",
    },
    {
      name: "Escrowed UTX",
      symbol: "esUTX",
      address: getContract(ARBITRUM, "ES_UTX"),
      decimals: 18,
    },
    {
      name: "UTX LP",
      symbol: "ULP",
      address: getContract(ARBITRUM, "ULP"),
      decimals: 18,
      imageUrl: "https://github.com/utx-io/utx-assets/blob/main/UTX-Assets/PNG/GLP_LOGO%20ONLY.png?raw=true",
    },
  ],

  [FTM_TESTNET]: [
    {
      name: "UTX",
      symbol: "UTX",
      address: getContract(FTM_TESTNET, "UTX"),
      decimals: 18,
      imageUrl: "https://assets.coingecko.com/coins/images/18323/small/arbit.png?1631532468",
    },
    {
      name: "Escrowed UTX",
      symbol: "esUTX",
      address: getContract(FTM_TESTNET, "ES_UTX"),
      decimals: 18,
    },
    {
      name: "U2U LP",
      symbol: "ULP",
      address: getContract(FTM_TESTNET, "ULP"),
      decimals: 18,
      imageUrl: "https://github.com/utx-io/utx-assets/blob/main/UTX-Assets/PNG/GLP_LOGO%20ONLY.png?raw=true",
    },
  ],
  [U2U_TESTNET]: [
    {
      name: "UTX",
      symbol: "UTX",
      address: getContract(U2U_TESTNET, "UTX"),
      decimals: 18,
      imageUrl: "https://assets.coingecko.com/coins/images/18323/small/arbit.png?1631532468",
    },
    {
      name: "Escrowed UTX",
      symbol: "esUTX",
      address: getContract(U2U_TESTNET, "ES_UTX"),
      decimals: 18,
    },
    {
      name: "U2U LP",
      symbol: "ULP",
      address: getContract(U2U_TESTNET, "ULP"),
      decimals: 18,
      imageUrl: "https://github.com/utx-io/utx-assets/blob/main/UTX-Assets/PNG/GLP_LOGO%20ONLY.png?raw=true",
    },
  ],
};

export const PLATFORM_TOKENS: { [chainId: number]: { [symbol: string]: Token } } = {
  [ARBITRUM]: {
    // arbitrum
    UTX: {
      name: "UTX",
      symbol: "UTX",
      decimals: 18,
      address: getContract(ARBITRUM, "UTX"),
      imageUrl: "https://assets.coingecko.com/coins/images/18323/small/arbit.png?1631532468",
    },
    ULP: {
      name: "UTX LP",
      symbol: "ULP",
      decimals: 18,
      address: getContract(ARBITRUM, "StakedUlpTracker"), // address of fsGLP token because user only holds fsGLP
      imageUrl: "https://github.com/utx-io/utx-assets/blob/main/UTX-Assets/PNG/GLP_LOGO%20ONLY.png?raw=true",
    },
  },

  [FTM_TESTNET]: {
    // avalanche
    UTX: {
      name: "U2U",
      symbol: "U2U",
      decimals: 18,
      address: getContract(FTM_TESTNET, "UTX"),
      imageUrl: "https://assets.coingecko.com/coins/images/18323/small/arbit.png?1631532468",
    },
    ULP: {
      name: "U2U LP",
      symbol: "ULP",
      decimals: 18,
      address: getContract(FTM_TESTNET, "StakedUlpTracker"), // address of fsGLP token because user only holds fsGLP
      imageUrl: "https://github.com/utx-io/utx-assets/blob/main/UTX-Assets/PNG/GLP_LOGO%20ONLY.png?raw=true",
    },
  },
  [U2U_TESTNET]: {
    // avalanche
    UTX: {
      name: "U2U",
      symbol: "U2U",
      decimals: 18,
      address: getContract(U2U_TESTNET, "UTX"),
      imageUrl: "https://assets.coingecko.com/coins/images/18323/small/arbit.png?1631532468",
    },
    ULP: {
      name: "U2U LP",
      symbol: "ULP",
      decimals: 18,
      address: getContract(U2U_TESTNET, "StakedUlpTracker"), // address of fsGLP token because user only holds fsGLP
      imageUrl: "https://github.com/utx-io/utx-assets/blob/main/UTX-Assets/PNG/GLP_LOGO%20ONLY.png?raw=true",
    },
  },
};

export const ICONLINKS = {
  [ARBITRUM]: {
    UTX: {
      coingecko: "https://www.coingecko.com/en/coins/utx",
      arbitrum: "https://arbiscan.io/address/0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a",
    },
    ULP: {
      arbitrum: "https://arbiscan.io/token/0x1aDDD80E6039594eE970E5872D247bf0414C8903",
      reserves: "https://portfolio.nansen.ai/dashboard/utx?chain=ARBITRUM",
    },
    ETH: {
      coingecko: "https://www.coingecko.com/en/coins/ethereum",
    },
    BTC: {
      coingecko: "https://www.coingecko.com/en/coins/wrapped-bitcoin",
      arbitrum: "https://arbiscan.io/address/0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
    },
    LINK: {
      coingecko: "https://www.coingecko.com/en/coins/chainlink",
      arbitrum: "https://arbiscan.io/address/0xf97f4df75117a78c1a5a0dbb814af92458539fb4",
    },
    UNI: {
      coingecko: "https://www.coingecko.com/en/coins/uniswap",
      arbitrum: "https://arbiscan.io/address/0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0",
    },
    USDC: {
      coingecko: "https://www.coingecko.com/en/coins/usd-coin",
      arbitrum: "https://arbiscan.io/address/0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
    },
    USDT: {
      coingecko: "https://www.coingecko.com/en/coins/tether",
      arbitrum: "https://arbiscan.io/address/0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
    },
    DAI: {
      coingecko: "https://www.coingecko.com/en/coins/dai",
      arbitrum: "https://arbiscan.io/address/0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
    },
    MIM: {
      coingecko: "https://www.coingecko.com/en/coins/magic-internet-money",
      arbitrum: "https://arbiscan.io/address/0xfea7a6a0b346362bf88a9e4a88416b77a57d6c2a",
    },
    FRAX: {
      coingecko: "https://www.coingecko.com/en/coins/frax",
      arbitrum: "https://arbiscan.io/address/0x17fc002b466eec40dae837fc4be5c67993ddbd6f",
    },
  },

  [FTM_TESTNET]: {
    UTX: {
      coingecko: "https://www.coingecko.com/en/coins/utx",
      avalanche: "https://snowtrace.io/address/0x62edc0692bd897d2295872a9ffcac5425011c661",
    },
    ULP: {
      avalanche: "https://snowtrace.io/address/0x9e295B5B976a184B14aD8cd72413aD846C299660",
      reserves: "https://portfolio.nansen.ai/dashboard/utx?chain=AVAX",
    },
    AVAX: {
      coingecko: "https://www.coingecko.com/en/coins/avalanche",
    },
    ETH: {
      coingecko: "https://www.coingecko.com/en/coins/weth",
      avalanche: "https://snowtrace.io/address/0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab",
    },
    WBTC: {
      coingecko: "https://www.coingecko.com/en/coins/wrapped-bitcoin",
      avalanche: "https://snowtrace.io/address/0x50b7545627a5162f82a992c33b87adc75187b218",
    },
    BTC: {
      coingecko: "https://www.coingecko.com/en/coins/bitcoin-avalanche-bridged-btc-b",
      avalanche: "https://snowtrace.io/address/0x152b9d0FdC40C096757F570A51E494bd4b943E50",
    },
    MIM: {
      coingecko: "https://www.coingecko.com/en/coins/magic-internet-money",
      avalanche: "https://snowtrace.io/address/0x130966628846bfd36ff31a822705796e8cb8c18d",
    },
    USDC: {
      coingecko: "https://www.coingecko.com/en/coins/usd-coin",
      avalanche: "https://snowtrace.io/address/0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e",
    },
    "USDC.e": {
      coingecko: "https://www.coingecko.com/en/coins/usd-coin-avalanche-bridged-usdc-e",
      avalanche: "https://snowtrace.io/address/0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664",
    },
  },
  [U2U_TESTNET]: {
    UTX: {
      coingecko: "https://www.coingecko.com/en/coins/utx",
      avalanche: "https://snowtrace.io/address/0x62edc0692bd897d2295872a9ffcac5425011c661",
    },
    ULP: {
      avalanche: "https://snowtrace.io/address/0x9e295B5B976a184B14aD8cd72413aD846C299660",
      reserves: "https://portfolio.nansen.ai/dashboard/utx?chain=AVAX",
    },
    AVAX: {
      coingecko: "https://www.coingecko.com/en/coins/avalanche",
    },
    ETH: {
      coingecko: "https://www.coingecko.com/en/coins/weth",
      avalanche: "https://snowtrace.io/address/0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab",
    },
    WBTC: {
      coingecko: "https://www.coingecko.com/en/coins/wrapped-bitcoin",
      avalanche: "https://snowtrace.io/address/0x50b7545627a5162f82a992c33b87adc75187b218",
    },
    BTC: {
      coingecko: "https://www.coingecko.com/en/coins/bitcoin-avalanche-bridged-btc-b",
      avalanche: "https://snowtrace.io/address/0x152b9d0FdC40C096757F570A51E494bd4b943E50",
    },
    MIM: {
      coingecko: "https://www.coingecko.com/en/coins/magic-internet-money",
      avalanche: "https://snowtrace.io/address/0x130966628846bfd36ff31a822705796e8cb8c18d",
    },
    USDC: {
      coingecko: "https://www.coingecko.com/en/coins/usd-coin",
      avalanche: "https://snowtrace.io/address/0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e",
    },
    "USDC.e": {
      coingecko: "https://www.coingecko.com/en/coins/usd-coin-avalanche-bridged-usdc-e",
      avalanche: "https://snowtrace.io/address/0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664",
    },
  },
};

export const ULP_POOL_COLORS = {
  ETH: "#6062a6",
  BTC: "#F7931A",
  WBTC: "#F7931A",
  USDC: "#2775CA",
  "USDC.e": "#2A5ADA",
  USDT: "#67B18A",
  MIM: "#9695F8",
  FRAX: "#000",
  DAI: "#FAC044",
  UNI: "#E9167C",
  AVAX: "#E84142",
  LINK: "#3256D6",
};

export const TOKENS_MAP: { [chainId: number]: { [address: string]: Token } } = {};
export const TOKENS_BY_SYMBOL_MAP: { [chainId: number]: { [symbol: string]: Token } } = {};
export const WRAPPED_TOKENS_MAP: { [chainId: number]: Token } = {};
export const NATIVE_TOKENS_MAP: { [chainId: number]: Token } = {};

const CHAIN_IDS = [ARBITRUM, FTM_TESTNET, U2U_TESTNET];

for (let j = 0; j < CHAIN_IDS.length; j++) {
  const chainId = CHAIN_IDS[j];
  TOKENS_MAP[chainId] = {};
  TOKENS_BY_SYMBOL_MAP[chainId] = {};
  let tokens = TOKENS[chainId];
  if (ADDITIONAL_TOKENS[chainId]) {
    tokens = tokens.concat(ADDITIONAL_TOKENS[chainId]);
  }

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    TOKENS_MAP[chainId][token.address.toLowerCase()] = token;
    TOKENS_BY_SYMBOL_MAP[chainId][token.symbol] = token;
  }
}

for (const chainId of CHAIN_IDS) {
  for (const token of TOKENS[chainId]) {
    if (token.isWrapped) {
      WRAPPED_TOKENS_MAP[chainId] = token;
    } else if (token.isNative) {
      NATIVE_TOKENS_MAP[chainId] = token;
    }
  }
}

export function getWrappedToken(chainId: number) {
  return WRAPPED_TOKENS_MAP[chainId];
}

export function getNativeToken(chainId: number) {
  return NATIVE_TOKENS_MAP[chainId];
}

export function getTokens(chainId: number) {
  return TOKENS[chainId];
}

export function isValidToken(chainId: number, address: string) {
  if (!TOKENS_MAP[chainId]) {
    throw new Error(`Incorrect chainId ${chainId} in isValidToken function`);
  }
  return address in TOKENS_MAP[chainId];
}

export function getToken(chainId: number, address: string) {
  if (!TOKENS_MAP[chainId]) {
    throw new Error(`Incorrect chainId ${chainId}`);
  }

  if (!TOKENS_MAP[chainId][address?.toLowerCase()]) {
    throw new Error(`Incorrect address "${address}" for chainId ${chainId}`);
  }
  return TOKENS_MAP[chainId][address?.toLowerCase()];
}

export function getTokenBySymbol(chainId: number, symbol: string) {
  const token = TOKENS_BY_SYMBOL_MAP[chainId][symbol];
  if (!token) {
    throw new Error(`Incorrect symbol "${symbol}" for chainId ${chainId}`);
  }
  return token;
}

export function getWhitelistedTokens(chainId: number) {
  return TOKENS[chainId].filter((token) => token.symbol !== "USDG");
}

export function getVisibleTokens(chainId: number) {
  return getWhitelistedTokens(chainId).filter((token) => !token.isWrapped && !token.isTempHidden);
}

export function getNormalizedTokenSymbol(tokenSymbol) {
  if (["WBTC", "WETH", "WAVAX"].includes(tokenSymbol)) {
    return tokenSymbol.substr(1);
  } else if (tokenSymbol === "BTC.b") {
    return "BTC";
  }
  return tokenSymbol;
}

const AVAILABLE_CHART_TOKENS = {
  [ARBITRUM]: ["ETH", "BTC", "LINK", "UNI"],
  [FTM_TESTNET]: ["AVAX", "ETH", "BTC"],
  [U2U_TESTNET]: ["AVAX", "ETH", "BTC"],
};

export function isChartAvailabeForToken(chainId: number, tokenSymbol: string) {
  const token = getTokenBySymbol(chainId, tokenSymbol);
  if (!token) return false;
  return (token.isStable || AVAILABLE_CHART_TOKENS[chainId]?.includes(getNormalizedTokenSymbol(tokenSymbol))) ?? false;
}
