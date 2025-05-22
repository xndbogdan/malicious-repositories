import { ethers } from "ethers";
import { sample } from "lodash";
import { NetworkMetadata } from "lib/wallets";
import { isLocal } from "./env";

const { parseEther } = ethers.utils;

export const ARBITRUM = 42161;
export const FTM_TESTNET = 4002;
export const U2U_TESTNET = 2484;
export const FEES_HIGH_BPS = 50;

// TODO take it from web3
export const DEFAULT_CHAIN_ID = U2U_TESTNET;
export const CHAIN_ID = DEFAULT_CHAIN_ID;

export const SUPPORTED_CHAIN_IDS = [U2U_TESTNET];

export const IS_NETWORK_DISABLED = {
  [ARBITRUM]: false,
  [FTM_TESTNET]: false,
  [U2U_TESTNET]: false,
};

export const CHAIN_NAMES_MAP = {
  [ARBITRUM]: "Arbitrum",
  [FTM_TESTNET]: "Fantom Testnet",
  [U2U_TESTNET]: "U2U Nebulas Testnet",
};

export const GAS_PRICE_ADJUSTMENT_MAP = {
  [ARBITRUM]: "0",
  [FTM_TESTNET]: "3000000000", // 3 gwei
  [U2U_TESTNET]: "3000000000", // 3 gwei
};

export const MAX_GAS_PRICE_MAP = {
  [FTM_TESTNET]: "200000000000", // 200 gwei
};

export const HIGH_EXECUTION_FEES_MAP = {
  [ARBITRUM]: 3, // 3 USD
  [FTM_TESTNET]: 3,
  [U2U_TESTNET]: 3,
};

const constants = {
  [FTM_TESTNET]: {
    nativeTokenSymbol: "FTM",
    wrappedTokenSymbol: "WFTM",
    defaultCollateralSymbol: "USDC",
    defaultFlagOrdersEnabled: false,
    positionReaderPropsLength: 9,
    v2: false,

    SWAP_ORDER_EXECUTION_GAS_FEE: parseEther("0.0003"),
    INCREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.0003"),
    // contract requires that execution fee be strictly greater than instead of gte
    DECREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.000300001"),
  },
  [U2U_TESTNET]: {
    nativeTokenSymbol: "U2U",
    wrappedTokenSymbol: "WU2U",
    defaultCollateralSymbol: "USDT",
    defaultFlagOrdersEnabled: false,
    positionReaderPropsLength: 9,
    v2: false,

    SWAP_ORDER_EXECUTION_GAS_FEE: parseEther("0.0003"),
    INCREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.0003"),
    // contract requires that execution fee be strictly greater than instead of gte
    DECREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.000300001"),
  },

  [ARBITRUM]: {
    nativeTokenSymbol: "ETH",
    wrappedTokenSymbol: "WETH",
    defaultCollateralSymbol: "USDC",
    defaultFlagOrdersEnabled: false,
    positionReaderPropsLength: 9,
    v2: true,

    SWAP_ORDER_EXECUTION_GAS_FEE: parseEther("0.0003"),
    INCREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.0003"),
    // contract requires that execution fee be strictly greater than instead of gte
    DECREASE_ORDER_EXECUTION_GAS_FEE: parseEther("0.000300001"),
  },
};

const ALCHEMY_WHITELISTED_DOMAINS = ["utx.io", "app.utx.io"];

export const RPC_PROVIDERS = {
  [ARBITRUM]: [getDefaultArbitrumRpcUrl()],
  [FTM_TESTNET]: ["https://fantom-testnet.public.blastapi.io", "https://rpc.testnet.fantom.network"],
  [U2U_TESTNET]: ["https://rpc-nebulas-testnet.uniultra.xyz/"],
};

export const FALLBACK_PROVIDERS = {
  [ARBITRUM]: [getAlchemyHttpUrl()],
};

export const NETWORK_METADATA: { [chainId: number]: NetworkMetadata } = {
  [ARBITRUM]: {
    chainId: "0x" + ARBITRUM.toString(16),
    chainName: "Arbitrum",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: RPC_PROVIDERS[ARBITRUM],
    blockExplorerUrls: [getExplorerUrl(ARBITRUM)],
  },
  [FTM_TESTNET]: {
    chainId: "0x" + FTM_TESTNET.toString(16),
    chainName: "Fantom Testnet",
    nativeCurrency: {
      name: "FTM",
      symbol: "FTM",
      decimals: 18,
    },
    rpcUrls: RPC_PROVIDERS[FTM_TESTNET],
    blockExplorerUrls: [getExplorerUrl(FTM_TESTNET)],
  },
  [U2U_TESTNET]: {
    chainId: "0x" + U2U_TESTNET.toString(16),
    chainName: "U2U Nebulas Testnet",
    nativeCurrency: {
      name: "U2U",
      symbol: "U2U",
      decimals: 18,
    },
    rpcUrls: RPC_PROVIDERS[U2U_TESTNET],
    blockExplorerUrls: [getExplorerUrl(U2U_TESTNET)],
  },
};

export const getConstant = (chainId: number, key: string) => {
  if (!constants[chainId]) {
    throw new Error(`Unsupported chainId ${chainId}`);
  }

  if (!(key in constants[chainId])) {
    throw new Error(`Key ${key} does not exist for chainId ${chainId}`);
  }

  return constants[chainId][key];
};

export function getChainName(chainId: number) {
  return CHAIN_NAMES_MAP[chainId];
}

export function getDefaultArbitrumRpcUrl() {
  return "https://arb1.arbitrum.io/rpc";
}

export function getRpcUrl(chainId: number): string | undefined {
  return sample(RPC_PROVIDERS[chainId]);
}

export function getFallbackRpcUrl(chainId: number): string | undefined {
  return sample(FALLBACK_PROVIDERS[chainId]);
}

export function getAlchemyHttpUrl() {
  if (ALCHEMY_WHITELISTED_DOMAINS.includes(window.location.host)) {
    return "https://arb-mainnet.g.alchemy.com/v2/ha7CFsr1bx5ZItuR6VZBbhKozcKDY4LZ";
  }
  return "https://arb-mainnet.g.alchemy.com/v2/EmVYwUw0N2tXOuG0SZfe5Z04rzBsCbr2";
}

export function getAlchemyWsUrl() {
  if (ALCHEMY_WHITELISTED_DOMAINS.includes(window.location.host)) {
    return "wss://arb-mainnet.g.alchemy.com/v2/ha7CFsr1bx5ZItuR6VZBbhKozcKDY4LZ";
  }
  return "wss://arb-mainnet.g.alchemy.com/v2/EmVYwUw0N2tXOuG0SZfe5Z04rzBsCbr2";
}

export function getExplorerUrl(chainId): string {
  if (chainId === 3) {
    return "https://ropsten.etherscan.io/";
  }
  if (chainId === 42) {
    return "https://kovan.etherscan.io/";
  }

  if (chainId === ARBITRUM) {
    return "https://arbiscan.io/";
  }

  if (chainId === FTM_TESTNET) {
    return "https://testnet.ftmscan.com/";
  }
  if (chainId === U2U_TESTNET) {
    return "https://testnet.u2uscan.xyz/";
  }
  return "https://etherscan.io/";
}

export function getHighExecutionFee(chainId) {
  return HIGH_EXECUTION_FEES_MAP[chainId] || 3;
}

export function isSupportedChain(chainId) {
  return SUPPORTED_CHAIN_IDS.includes(chainId);
}
