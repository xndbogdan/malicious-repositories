import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { Trans } from "@lingui/macro";
import { isHomeSite } from "lib/legacy";
import { useWeb3React } from "@web3-react/core";
import Button from "components/Button/Button";
import { HeaderLink } from "../Header/HeaderLink";
import { U2U_TESTNET } from "config/chains";
import { switchNetwork } from "lib/wallets";
import { useChainId } from "lib/chains";
import utxLogo from "img/utx-logo.svg";
import externalLink from "img/external-link.svg";
import binanceLogo from "img/ic_binance_logo.svg";
import okxLogo from "img/okx-pogo.svg";
import APRLabel from "../APRLabel/APRLabel";
import useSWR from "swr";
import { getContract } from "config/contracts";
import UlpManager from "abis/UlpManager.json";
import { ULP_DECIMALS, USD_DECIMALS, PLACEHOLDER_ACCOUNT } from "lib/legacy";
import { contractFetcher } from "lib/contracts";
import ReaderV2 from "abis/ReaderV2.json";
import { bigNumberify, expandDecimals, formatAmount, formatAmountFree, formatKeyAmount, parseValue } from "lib/numbers";
import { usePriceUTX } from "lib/useGetPriceToken";

export default function TokenCard({ showRedirectModal, redirectPopupTimestamp }) {
  const isHome = isHomeSite();
  const { chainId } = useChainId();
  const { active, library, account } = useWeb3React();
  const readerAddress = getContract(chainId, "Reader");
  const stakedUlpTrackerAddress = getContract(chainId, "StakedUlpTracker");
  const usdgAddress = getContract(chainId, "USDG");
  const ulpManagerAddress = getContract(chainId, "UlpManager");
  const utxPrice = usePriceUTX();

  const tokensForBalanceAndSupplyQuery = [stakedUlpTrackerAddress, usdgAddress];

  const { data: balancesAndSupplies } = useSWR(
    [
      `UlpSwap:getTokenBalancesWithSupplies:${active}`,
      chainId,
      readerAddress,
      "getTokenBalancesWithSupplies",
      account || PLACEHOLDER_ACCOUNT,
    ],
    {
      fetcher: contractFetcher(library, ReaderV2, [tokensForBalanceAndSupplyQuery]),
    }
  );
  const ulpSupply = balancesAndSupplies ? balancesAndSupplies[1] : bigNumberify(0);
  const { data: aums } = useSWR([`UlpSwap:getAums:${active}`, chainId, ulpManagerAddress, "getAums"], {
    fetcher: contractFetcher(library, UlpManager),
  });
  let aum;
  if (aums && aums.length > 0) {
    aum = aums[0];
  }
  const ulpPrice =
    aum && aum.gt(0) && ulpSupply.gt(0)
      ? aum.mul(expandDecimals(1, ULP_DECIMALS)).div(ulpSupply)
      : expandDecimals(1, USD_DECIMALS);

  const changeNetwork = useCallback(
    (network) => {
      if (network === chainId) {
        return;
      }
      if (!active) {
        setTimeout(() => {
          return switchNetwork(network, active);
        }, 500);
      } else {
        return switchNetwork(network, active);
      }
    },
    [chainId, active]
  );

  const BuyLink = ({ className, to, children, network }) => {
    if (isHome && showRedirectModal) {
      return (
        <HeaderLink
          to={to}
          className={className}
          redirectPopupTimestamp={redirectPopupTimestamp}
          showRedirectModal={showRedirectModal}
        >
          {children}
        </HeaderLink>
      );
    }

    return (
      <Link to={to} className={className} onClick={() => changeNetwork(network)}>
        {children}
      </Link>
    );
  };

  return (
    <div className="Home-token-card-options">
      <div
        className="Home-token-card-option"
        style={{
          borderRadius: "6px",
          boxShadow: "4px 4px 0px 0px #090D13",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <img src={utxLogo} alt="logo utx" />

            <div
              style={{
                marginLeft: "1.6rem",
              }}
              className="fz-base fw-400 text-primary"
            >
              <div className="fz-md fw-600 text-primary">UTX</div>
              Price: ${formatAmount(utxPrice, USD_DECIMALS, 2, true)}
            </div>
          </div>
          <div
            style={{
              border: "1px solid var(--bg-tertiary)",
              borderRadius: "4px",
              padding: "8px 12px",
              alignItems: "center",
              cursor: "pointer",
              height: "fit-content",
            }}
            className="fz-sm fw-500 text-primary"
          >
            Learn More
            <img style={{ marginBottom: "-3px", marginLeft: "4px" }} src={externalLink} alt="learn more" />
          </div>
        </div>
        <div
          className="divider"
          style={{
            margin: "16px 0",
          }}
        ></div>
        <div className="Home-token-card-option-info">
          <div
            className="BuyUTXULP-description fz-base  fw-400"
            style={{
              color: "var(--text-read)",
            }}
          >
            <Trans>UTX is the utility and governance token. Accrues 30% of the platform's generated fees.</Trans>
          </div>

          <div
            style={{
              border: "1px solid var(--bg-divider)",
              padding: "4px 12px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              margin: "16px 0",
            }}
          >
            <div>
              <span className="fz-sm fw-400 text-secondary">U2U Chain APR:</span>{" "}
              <span className="fz-sm fw-400 text-warning">
                <APRLabel chainId={U2U_TESTNET} label="gmxAprTotal" />
              </span>
            </div>
            <div
              style={{
                height: "18px",
                width: "1px",
                margin: "0px 24px",
                backgroundColor: "var(--bg-divider)",
              }}
            />
            {/* <div>
              <span className="fz-sm fw-400 text-secondary">OKX Chain APR:</span>{" "}
              <span className="fz-sm fw-400 text-warning">4.69%</span>
            </div> */}
          </div>
          <div className="Home-token-card-option-action">
            <div className="buy">
              <BuyLink to="/buy-utx" className="fz-base text-primary fw-400" network={U2U_TESTNET}>
                <Button
                  className="fz-base text-primary fw-400"
                  variant="secondary"
                  textAlign="left"
                  imgInfo={{ src: utxLogo, alt: "u2u chain" }}
                  newTab
                >
                  BUY on U2U Chain
                </Button>
              </BuyLink>
            </div>
            {/* <ExternalLink href="https://utxio.gitbook.io/utx/tokenomics" className="default-btn read-more">
              <Trans>Read more</Trans>
            </ExternalLink> */}
          </div>
        </div>
      </div>
      <div
        className="Home-token-card-option"
        style={{
          borderRadius: "6px",
          boxShadow: "4px 4px 0px 0px #090D13",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <img src={utxLogo} alt="logo utx" />

            <div
              style={{
                marginLeft: "1.6rem",
              }}
              className="fz-base fw-400 text-primary"
            >
              <div className="fz-md fw-600 text-primary">ULP</div>
              Price: ${formatAmount(ulpPrice, USD_DECIMALS, 3, true)}
            </div>
          </div>
          <div
            style={{
              border: "1px solid var(--bg-tertiary)",
              borderRadius: "4px",
              padding: "8px 12px",
              alignItems: "center",
              cursor: "pointer",
              height: "fit-content",
            }}
            className="fz-sm fw-500 text-primary"
          >
            Learn More
            <img style={{ marginBottom: "-3px", marginLeft: "4px" }} src={externalLink} alt="learn more" />
          </div>
        </div>
        <div
          className="divider"
          style={{
            margin: "16px 0",
          }}
        ></div>
        <div className="Home-token-card-option-info">
          <div
            className="BuyUTXULP-description fz-base  fw-400"
            style={{
              color: "var(--text-read)",
            }}
          >
            <Trans>ULP is the liquidity provider token. Accrues 70% of the platform's generated fees.</Trans>
          </div>

          <div
            style={{
              border: "1px solid var(--bg-divider)",
              padding: "4px 12px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              margin: "16px 0",
            }}
          >
            <div>
              <span className="fz-sm fw-400 text-secondary">U2U Chain APR:</span>{" "}
              <span className="fz-sm fw-400 text-warning">
                <APRLabel chainId={U2U_TESTNET} label="glpAprTotal" key="ARBITRUM" />
              </span>
            </div>
            {/* <div
              style={{
                height: "18px",
                width: "1px",
                margin: "0px 24px",
                backgroundColor: "var(--bg-divider)",
              }}
            /> */}
          </div>
          <div className="Home-token-card-option-action">
            <div className="buy">
              <BuyLink to="/buy-ulp" className="fz-base text-primary fw-400" network={U2U_TESTNET}>
                <Button
                  className="fz-base text-primary fw-400"
                  variant="secondary"
                  textAlign="left"
                  imgInfo={{ src: utxLogo, alt: "u2u chain" }}
                  newTab
                >
                  BUY on U2U Chain
                </Button>
              </BuyLink>
              {/* <BuyLink to="/buy-utx" network={FTM_TESTNET}>
                <Button
                  className="fz-base text-primary fw-400"
                  variant="secondary"
                  textAlign="left"
                  imgInfo={{ src: okxLogo, alt: "okx chain" }}
                  newTab
                >
                  BUY on OKX Chain
                </Button>
              </BuyLink> */}
            </div>
            {/* <ExternalLink href="https://utxio.gitbook.io/utx/tokenomics" className="default-btn read-more">
              <Trans>Read more</Trans>
            </ExternalLink> */}
          </div>
        </div>
      </div>
      {/* <div className="Home-token-card-option">
        <div className="Home-token-card-option-icon">
          <img src={glpIcon} width="40" alt="GLP Icon" /> GLP
        </div>
        <div className="Home-token-card-option-info">
          <div className="Home-token-card-option-title">
            <Trans>GLP is the liquidity provider token. Accrues 70% of the platform's generated fees.</Trans>
          </div>
          <div className="Home-token-card-option-apr">
            <Trans>Arbitrum APR:</Trans> <APRLabel chainId={ARBITRUM} label="glpAprTotal" key="ARBITRUM" />,{" "}
            <Trans>Avalanche APR:</Trans> <APRLabel chainId={AVALANCHE} label="glpAprTotal" key="AVALANCHE" />
          </div>
          <div className="Home-token-card-option-action">
            <div className="buy">
              <BuyLink to="/buy-ulp" className="default-btn" network={ARBITRUM}>
                <Trans>Buy on Arbitrum</Trans>
              </BuyLink>
              <BuyLink to="/buy-ulp" className="default-btn" network={AVALANCHE}>
                <Trans>Buy on Avalanche</Trans>
              </BuyLink>
            </div>
            <a
              href="https://utxio.gitbook.io/utx/ulp"
              target="_blank"
              rel="noreferrer"
              className="default-btn read-more"
            >
              <Trans>Read more</Trans>
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
}
