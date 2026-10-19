import { providers, utils } from "ethers";
import { useEffect, useState } from "react";

export const _isMetaMaskInstalled = () => {
  if (typeof window === "undefined") return;
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};

export const _getProvider = () => {
  if (!_isMetaMaskInstalled()) return null;
  return new providers.Web3Provider(window.ethereum);
};

export const _getChain = async () => {
  const provider = _getProvider();
  if (!provider) return -1;
  return `${(await provider.getNetwork()).chainId}`;
};

const _onAccountsChanged = (callback) => {
  if (!_isMetaMaskInstalled()) return;
  window.ethereum.on("accountsChanged", callback);
};

const _onChainChanged = (callback) => {
  if (!_isMetaMaskInstalled()) return;
  window.ethereum.on("chainChanged", callback);
};

export const _getAddress = async () => {
  const provider = _getProvider();
  if (!provider) return null;
  try {
    const accounts = await provider.listAccounts();
    return accounts.length > 0 ? accounts[0] : null;
  } catch (e) {
    return null;
  }
};

export const WalletHook = () => {
  const [wallet, setWallet] = useState(null);
  const [chain, setChain] = useState(-1);

  useEffect(() => {
    const load = async () => {
      try {
        setWallet((await _getAddress())?.toLowerCase());
        setChain(await _getChain());
      } catch (error) {
        return error;
      }
    };

    _onAccountsChanged((_address) => {
      if (!_address[0]) return;
      setWallet(_address[0].toLowerCase());
    });
    _onChainChanged((_chain) => {
      if (!_chain) return;
      setChain(`${parseInt(_chain)}`);
    });
    load();
  }, []);

  return {
    wallet,
    chain,
  };
};

export const connectMetamask = async () => {
  if (!_isMetaMaskInstalled()) return false;
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const switchToMainnet = async () => {
  if (!_isMetaMaskInstalled()) return false;
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: `0x${parseInt(process.env.REACT_APP_CHAIN).toString(16)}`,
        },
      ],
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const watchTransaction = (txHash, callback) => {
  const provider = _getProvider();
  if (!provider) return;
  provider.once(txHash, (transaction) => {
    callback(transaction, transaction.status === 1);
  });
};

// export const parseBigNumber = (bn, decimals = 2) => {
//   if (!bn) return 0;
//   try {
//     return numberWithCommas(
//       parseFloat(utils.formatUnits(bn)).toFixed(decimals)
//     );
//   } catch (e) {
//     return bn;
//   }
// };

export const parseBigNumber = (bn, decimals = 2) => {
  if (!bn) return 0;
  try {
    return numberWithCommas(
      parseFloat(utils.formatUnits(bn, "gwei")).toFixed(decimals)
    );
  } catch (e) {
    return bn;
  }
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
