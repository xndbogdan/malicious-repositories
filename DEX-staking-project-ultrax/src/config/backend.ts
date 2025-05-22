import { FTM_TESTNET, U2U_TESTNET } from "./chains";

export const UTX_STATS_API_URL = process.env.REACT_APP_UTX_STATS_API_URL;

export const BACKEND_URLS = {
  default: process.env.REACT_APP_BACKEND_URLS_DEFAULT,
  [FTM_TESTNET]: process.env.REACT_APP_BACKEND_URLS_FTM,
  [U2U_TESTNET]: process.env.REACT_APP_BACKEND_URLS_U2U,
};

export function getServerBaseUrl(chainId: number) {
  if (!chainId) {
    throw new Error("chainId is not provided");
  }

  if (document.location.hostname.includes("deploy-preview")) {
    const fromLocalStorage = localStorage.getItem("SERVER_BASE_URL");
    if (fromLocalStorage) {
      return fromLocalStorage;
    }
  }

  return BACKEND_URLS[chainId] || BACKEND_URLS.default;
}

export function getServerUrl(chainId: number, path: string) {
  return `${getServerBaseUrl(chainId)}${path}`;
}
