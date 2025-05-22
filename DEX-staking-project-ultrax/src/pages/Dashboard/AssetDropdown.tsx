import { Menu } from "@headlessui/react";
import IoInformationCircleOutline from "img/information-circle.svg";
import "./AssetDropdown.css";
import metamaskIcon from "img/ic_metamask_16.svg";
import nansenPortfolioIcon from "img/nansen_portfolio.svg";
import { useWeb3React } from "@web3-react/core";

import { t, Trans } from "@lingui/macro";
import ExternalLink from "components/ExternalLink/ExternalLink";
import { ICONLINKS, PLATFORM_TOKENS } from "config/tokens";
import { addTokenToMetamask } from "lib/wallets";
import { useChainId } from "lib/chains";
import { Token } from "domain/tokens";
import { FTM_TESTNET } from "config/chains";
import { getIcon, getIcons } from "config/icons";
import { getExplorerUrl } from "config/chains";

type Props = {
  assetSymbol: string;
  assetInfo?: Token;
  marginLeft?: string;
};

function AssetDropdown({ assetSymbol, assetInfo, marginLeft }: Props) {
  const { active } = useWeb3React();
  const { chainId } = useChainId();
  const currentIcons = getIcons(chainId);
  const currentExplorer = getExplorerUrl(chainId);
  let { reserves } = ICONLINKS[chainId][assetSymbol] || {};
  const unavailableTokenSymbols =
    {
      4002: ["FTM"],
      296: ["HBAR"],
    }[chainId] || [];

  return (
    <div className="asset-dropdown-container">
      <Menu>
        <Menu.Button as="div" className="dropdown-arrow center-both">
          <img
            src={IoInformationCircleOutline}
            style={{
              width: "20px",
              height: "20px",
              marginLeft: marginLeft || "",
            }}
            alt={t`icon information`}
          />
        </Menu.Button>
        <Menu.Items as="div" className="asset-menu-items">
          <Menu.Item>
            <>
              {reserves && assetSymbol === "ULP" && (
                <ExternalLink href={reserves} className="asset-item">
                  <img className="asset-item-icon" src={nansenPortfolioIcon} alt="Proof of Reserves" />
                  <p>
                    <Trans>Proof of Reserves</Trans>
                  </p>
                </ExternalLink>
              )}
            </>
          </Menu.Item>
          <Menu.Item>
            <ExternalLink href={currentExplorer} className="asset-item">
              <img className="asset-item-icon" src={currentIcons.network} alt="Open in explorer" />
              <p>
                <Trans>Open in Explorer</Trans>
              </p>
            </ExternalLink>
          </Menu.Item>
          <Menu.Item>
            <>
              {active && unavailableTokenSymbols.indexOf(assetSymbol) < 0 && (
                <div
                  onClick={() => {
                    let token = assetInfo
                      ? { ...assetInfo, image: assetInfo.imageUrl }
                      : PLATFORM_TOKENS[chainId][assetSymbol];
                    addTokenToMetamask(token);
                  }}
                  className="asset-item"
                >
                  <img className="asset-item-icon" src={metamaskIcon} alt={t`Add to Metamask`} />
                  <p>
                    <Trans>Add to Metamask</Trans>
                  </p>
                </div>
              )}
            </>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
}

export default AssetDropdown;
