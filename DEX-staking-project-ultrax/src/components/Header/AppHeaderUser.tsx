import { useWeb3React } from "@web3-react/core";
import AddressDropdown from "../AddressDropdown/AddressDropdown";
import ConnectWalletButton from "../Common/ConnectWalletButton";
import React, { useCallback, useEffect } from "react";
// import { HeaderLink } from "./HeaderLink";
// import connectWalletImg from "img/ic_wallet_24.svg";

import "./Header.css";
import { isHomeSite, getAccountUrl } from "lib/legacy";
import cx from "classnames";
import { Trans } from "@lingui/macro";
import NetworkDropdown from "../NetworkDropdown/NetworkDropdown";
import LanguagePopupHome from "../NetworkDropdown/LanguagePopupHome";
import { ARBITRUM, FTM_TESTNET, U2U_TESTNET, getChainName } from "config/chains";
import { switchNetwork } from "lib/wallets";
import { useChainId } from "lib/chains";
// import { isDevelopment } from "config/env";
import { getIcon } from "config/icons";

type Props = {
  openSettings: () => void;
  small?: boolean;
  setWalletModalVisible: (visible: boolean) => void;
  disconnectAccountAndCloseSettings: () => void;
  redirectPopupTimestamp: number;
  showRedirectModal: (to: string) => void;
};

const NETWORK_OPTIONS = [
  // {
  //   label: getChainName(FTM_TESTNET),
  //   value: FTM_TESTNET,
  //   icon: getIcon(FTM_TESTNET, "network"),
  //   color: "#E841424D",
  // },
  {
    label: getChainName(U2U_TESTNET),
    value: U2U_TESTNET,
    icon: getIcon(U2U_TESTNET, "network"),
    color: "#E841424D",
  },
];

export function AppHeaderUser({
  openSettings,
  small,
  setWalletModalVisible,
  disconnectAccountAndCloseSettings,
  redirectPopupTimestamp,
  showRedirectModal,
}: Props) {
  const { chainId } = useChainId();
  const { active, account } = useWeb3React();
  const showConnectionOptions = !isHomeSite();

  useEffect(() => {
    if (active) {
      setWalletModalVisible(false);
    }
  }, [active, setWalletModalVisible]);

  const onNetworkSelect = useCallback(
    (option) => {
      if (option.value === chainId) {
        return;
      }
      return switchNetwork(option.value, active);
    },
    [chainId, active]
  );

  const selectorLabel = getChainName(chainId);

  if (!active || !account) {
    return (
      <div className="App-header-user style-button-connect">
        <NetworkDropdown
          small={small}
          networkOptions={NETWORK_OPTIONS}
          selectorLabel={selectorLabel}
          onNetworkSelect={onNetworkSelect}
          openSettings={openSettings}
        />
        <ConnectWalletButton onClick={() => setWalletModalVisible(true)}>
          {small ? <Trans>Connect</Trans> : <Trans>Connect Wallet</Trans>}
        </ConnectWalletButton>
      </div>
    );
  }

  const accountUrl = getAccountUrl(chainId, account);

  return (
    <div className="App-header-user style-button-connect">
      {showConnectionOptions ? (
        <>
          <NetworkDropdown
            small={small}
            networkOptions={NETWORK_OPTIONS}
            selectorLabel={selectorLabel}
            onNetworkSelect={onNetworkSelect}
            openSettings={openSettings}
          />
          <div className="App-header-user-address">
            <AddressDropdown
              account={account}
              accountUrl={accountUrl}
              disconnectAccountAndCloseSettings={disconnectAccountAndCloseSettings}
            />
          </div>
        </>
      ) : (
        <LanguagePopupHome />
      )}
    </div>
  );
}
