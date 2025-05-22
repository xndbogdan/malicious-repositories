import { FTM_TESTNET, U2U_TESTNET } from "config/chains";

type Exchange = {
  name: string;
  icon: string;
  links: { [key: number]: string };
};

export const EXTERNAL_LINKS = {
  [FTM_TESTNET]: {
    networkWebsite: "",
    buyGmx: {
      uniswap: ``,
    },
  },
  [U2U_TESTNET]: {
    networkWebsite: "",
    buyGmx: {
      uniswap: ``,
    },
  },
};

export const FIAT_GATEWAYS: Exchange[] = [
  {
    name: "Binance Connect",
    icon: "ic_binance.svg",
    links: {
      [FTM_TESTNET]: "",
      [U2U_TESTNET]: "",
    },
  },
  {
    name: "Banxa",
    icon: "ic_banxa.svg",
    links: {
      [FTM_TESTNET]: "",
      [U2U_TESTNET]: "",
    },
  },
  {
    name: "Transak",
    icon: "ic_tansak.svg",
    links: {
      [FTM_TESTNET]: "",
      [U2U_TESTNET]: "",
    },
  },
];

export const GMX_FROM_ANY_NETWORKS: Exchange[] = [
  {
    name: "Bungee",
    icon: "ic_bungee.png",
    links: {
      [FTM_TESTNET]: "",
      [U2U_TESTNET]: "",
    },
  },
  {
    name: "O3",
    icon: "ic_o3.png",
    links: {
      [FTM_TESTNET]: "",
      [U2U_TESTNET]: "",
    },
  },
];

export const BUY_NATIVE_TOKENS: Exchange[] = [
  {
    name: "Bungee",
    icon: "ic_bungee.png",
    links: {
      [FTM_TESTNET]: "",
      [U2U_TESTNET]: "",
    },
  },
  {
    name: "O3",
    icon: "ic_o3.png",
    links: {
      [FTM_TESTNET]: "",
      [U2U_TESTNET]: "",
    },
  },
  {
    name: "Banxa",
    icon: "ic_banxa.svg",
    links: {
      [FTM_TESTNET]: "",
      [U2U_TESTNET]: "",
    },
  },
  {
    name: "Transak",
    icon: "ic_tansak.svg",
    links: {
      [FTM_TESTNET]: "",
      [U2U_TESTNET]: "",
    },
  },
];

export const CENTRALISED_EXCHANGES: Exchange[] = [
  {
    name: "Binance",
    icon: "ic_binance.svg",
    links: {
      [FTM_TESTNET]: "",
      [U2U_TESTNET]: "",
    },
  },
  {
    name: "Bybit",
    icon: "ic_bybit.svg",
    links: {
      [FTM_TESTNET]: "",
      [U2U_TESTNET]: "",
    },
  },
  {
    name: "Kucoin",
    icon: "ic_kucoin.svg",
    links: {
      [FTM_TESTNET]: "",
      [U2U_TESTNET]: "",
    },
  },
];

export const DECENTRALISED_AGGRIGATORS: Exchange[] = [
  {
    name: "1inch",
    icon: "ic_1inch.svg",
    links: {
      [FTM_TESTNET]: "",
      [U2U_TESTNET]: "",
    },
  },
  {
    name: "Matcha",
    icon: "ic_matcha.png",
    links: {
      [FTM_TESTNET]: ``,
    },
  },
  {
    name: "Paraswap",
    icon: "ic_paraswap.svg",
    links: {
      [FTM_TESTNET]: ``,
    },
  },
  {
    name: "KyberSwap",
    icon: "ic_kyberswap.svg",
    links: {
      [FTM_TESTNET]: "",
      [U2U_TESTNET]: "",
    },
  },
  {
    name: "OpenOcean",
    icon: "ic_openocean.svg",
    links: {
      [FTM_TESTNET]: "",
      [U2U_TESTNET]: "",
    },
  },
  {
    name: "DODO",
    icon: "ic_dodo.svg",
    links: {
      [FTM_TESTNET]: ``,
    },
  },

  {
    name: "Firebird",
    icon: "ic_firebird.png",
    links: {
      [FTM_TESTNET]: "",
      [U2U_TESTNET]: "",
    },
  },
  {
    name: "Odos",
    icon: "ic_odos.png",
    links: {
      [FTM_TESTNET]: "",
      [U2U_TESTNET]: "",
    },
  },
];
