import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  checkIfWalletIsConnect,
  connectMetamask,
} from "../Utils/connectMetamask";
import {
  createCampaign,
  getCampaignsDetail,
  getUserCampaigns,
} from "../Utils/CampaignManager";
import { getCampaignDetail } from "../Utils/CampaignContract";

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [account, setAccount] = useState("");

  // connect to metamask
  const connectMetamaskWithAccount = async () => {
    const { provider } = await connectMetamask();
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
    window.location.reload();
  };

  // check if wallet is connect
  useEffect(() => {
    checkIfWalletIsConnect(setAccount);
  }, [setAccount]);

  return (
    <MainContext.Provider
      value={{
        account,
        connectMetamaskWithAccount,
        createCampaign,
        getCampaignsDetail,
        getCampaignDetail,
        getUserCampaigns,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

MainProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
