import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { Trans, t } from "@lingui/macro";
import useSWR from "swr";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import TooltipComponent from "components/Tooltip/Tooltip";
import dashboard_clock from "img/dashboard_clock.svg";
import dashboard_tivi from "img/dashboard_tivi.svg";
import dashboard_up from "img/dashboard_up.svg";
import dashboard_down from "img/dashboard_down.svg";
import dashboard_utx_icon from "img/dashboard_utx_icon.svg";
import dashboard_ulp_icon from "img/dashboard_ulp_icon.svg";
import hexToRgba from "hex-to-rgba";
import { ethers } from "ethers";
import { SUPPORTED_CHAIN_IDS, CHAIN_NAMES_MAP } from "config/chains";

import {
  USD_DECIMALS,
  UTX_DECIMALS,
  ULP_DECIMALS,
  BASIS_POINTS_DIVISOR,
  DEFAULT_MAX_USDG_AMOUNT,
  getPageTitle,
  importImage,
  arrayURLFetcher,
} from "lib/legacy";
import { useTotalUtxInLiquidity, useTotalUtxStaked, useTotalUtxSupply } from "domain/legacy";
import { usePriceUTX } from "lib/useGetPriceToken";
import { getContract } from "config/contracts";

import VaultV2 from "abis/VaultV2.json";
import ReaderV2 from "abis/ReaderV2.json";
import UlpManager from "abis/UlpManager.json";
import Footer from "components/Footer/Footer";

import "./DashboardV2.css";

import AssetDropdown from "./AssetDropdown";
import ExternalLink from "components/ExternalLink/ExternalLink";
import SEO from "components/Common/SEO";
import { useTotalVolume, useVolumeInfo, useFeesSummary } from "domain/stats";
import StatsTooltip from "components/StatsTooltip/StatsTooltip";
import StatsTooltipRow from "components/StatsTooltip/StatsTooltipRow";
import { ARBITRUM, FTM_TESTNET, U2U_TESTNET, getChainName } from "config/chains";
import { getServerUrl } from "config/backend";
import { contractFetcher } from "lib/contracts";
import { useInfoTokens } from "domain/tokens";
import { getTokenBySymbol, getWhitelistedTokens, ULP_POOL_COLORS } from "config/tokens";
import { bigNumberify, expandDecimals, formatAmount, formatKeyAmount, formatNumberDecimal } from "lib/numbers";
import { useChainId } from "lib/chains";
import { formatDate } from "lib/dates";
import { getIcons } from "config/icons";
import useUniqueUsers from "domain/stats/useUniqueUsers";

const { AddressZero } = ethers.constants;

function getPositionStats(positionStats) {
  if (!positionStats || positionStats.length === 0) {
    return null;
  }
  return positionStats.reduce(
    (acc, cv, i) => {
      cv.openInterest = bigNumberify(cv.totalLongPositionSizes).add(cv.totalShortPositionSizes).toString();
      acc.totalLongPositionSizes = acc.totalLongPositionSizes.add(cv.totalLongPositionSizes);
      acc.totalShortPositionSizes = acc.totalShortPositionSizes.add(cv.totalShortPositionSizes);
      acc.totalOpenInterest = acc.totalOpenInterest.add(cv.openInterest);

      acc[SUPPORTED_CHAIN_IDS[i]] = cv;
      return acc;
    },
    {
      totalLongPositionSizes: bigNumberify(0),
      totalShortPositionSizes: bigNumberify(0),
      totalOpenInterest: bigNumberify(0),
    }
  );
}

function getCurrentFeesUsd(tokenAddresses, fees, infoTokens) {
  if (!fees || !infoTokens) {
    return bigNumberify(0);
  }

  let currentFeesUsd = bigNumberify(0);
  for (let i = 0; i < tokenAddresses.length; i++) {
    const tokenAddress = tokenAddresses[i];
    const tokenInfo = infoTokens[tokenAddress];
    if (!tokenInfo || !tokenInfo?.contractMinPrice) {
      continue;
    }

    const feeUsd = fees[i].mul(tokenInfo?.contractMinPrice).div(expandDecimals(1, tokenInfo.decimals));
    currentFeesUsd = currentFeesUsd.add(feeUsd);
  }
  return currentFeesUsd;
}

export default function DashboardV2() {
  const { active, library } = useWeb3React();
  const { chainId } = useChainId();
  const totalVolume = useTotalVolume();
  const uniqueUsers = useUniqueUsers();
  const chainName = getChainName(chainId);
  const currentIcons = getIcons(chainId);
  const { data: positionStats } = useSWR(
    SUPPORTED_CHAIN_IDS.map((chainId) => getServerUrl(chainId, "/position_stats")),
    {
      fetcher: arrayURLFetcher,
    }
  );

  let { total: totalUtxSupply } = useTotalUtxSupply();

  const currentVolumeInfo = useVolumeInfo();

  const positionStatsInfo = getPositionStats(positionStats);

  function getWhitelistedTokenAddresses(chainId) {
    const whitelistedTokens = getWhitelistedTokens(chainId);
    return whitelistedTokens.map((token) => token.address);
  }

  const whitelistedTokens = getWhitelistedTokens(chainId);
  const tokenList = whitelistedTokens.filter((t) => !t.isWrapped);
  const visibleTokens = tokenList.filter((t) => !t.isTempHidden);

  const readerAddress = getContract(chainId, "Reader");
  const vaultAddress = getContract(chainId, "Vault");
  const ulpManagerAddress = getContract(chainId, "UlpManager");

  const utxAddress = getContract(chainId, "UTX");
  const ulpAddress = getContract(chainId, "ULP");
  const usdgAddress = getContract(chainId, "USDG");

  const tokensForSupplyQuery = [utxAddress, ulpAddress, usdgAddress];

  const { data: aums } = useSWR([`Dashboard:getAums:${active}`, chainId, ulpManagerAddress, "getAums"], {
    fetcher: contractFetcher(library, UlpManager),
  });

  const { data: totalSupplies } = useSWR(
    [`Dashboard:totalSupplies:${active}`, chainId, readerAddress, "getTokenBalancesWithSupplies", AddressZero],
    {
      fetcher: contractFetcher(library, ReaderV2, [tokensForSupplyQuery]),
    }
  );

  const { data: totalTokenWeights } = useSWR(
    [`UlpSwap:totalTokenWeights:${active}`, chainId, vaultAddress, "totalTokenWeights"],
    {
      fetcher: contractFetcher(library, VaultV2),
    }
  );

  const { infoTokens } = useInfoTokens(library, chainId, active, undefined, undefined);
  const { infoTokens: infoTokensFTM } = useInfoTokens(null, FTM_TESTNET, active, undefined, undefined);
  const { infoTokens: infoTokensU2U } = useInfoTokens(null, U2U_TESTNET, active, undefined, undefined);
  // const { infoTokens: infoTokensArbitrum } = useInfoTokens(null, ARBITRUM, active, undefined, undefined);

  const { data: currentFees } = useSWR(infoTokens[AddressZero]?.contractMinPrice ? "Dashboard:currentFees" : null, {
    fetcher: () => {
      return Promise.all(
        SUPPORTED_CHAIN_IDS.map((chainId) =>
          contractFetcher(null, ReaderV2, [getWhitelistedTokenAddresses(chainId)])(
            `Dashboard:fees:${chainId}`,
            chainId,
            getContract(chainId, "Reader"),
            "getFees",
            getContract(chainId, "Vault")
          )
        )
      ).then((fees) => {
        return fees.reduce(
          (acc, cv, i) => {
            const currentInfoToken =
              SUPPORTED_CHAIN_IDS[i] === FTM_TESTNET
                ? infoTokensFTM
                : SUPPORTED_CHAIN_IDS[i] === U2U_TESTNET
                ? infoTokensU2U
                : infoTokens;
            const feeUSD = getCurrentFeesUsd(
              getWhitelistedTokenAddresses(SUPPORTED_CHAIN_IDS[i]),
              cv,
              currentInfoToken
            );
            acc[SUPPORTED_CHAIN_IDS[i]] = feeUSD;
            acc.total = acc.total.add(feeUSD);
            return acc;
          },
          { total: bigNumberify(0) }
        );
      });
    },
  });
  const { data: feesSummaryByChain } = useFeesSummary();
  const feesSummary = feesSummaryByChain[chainId];

  const eth = infoTokens[getTokenBySymbol(chainId, "ETH").address];
  const shouldIncludeCurrrentFees =
    feesSummaryByChain[chainId]?.lastUpdatedAt &&
    parseInt(Date.now() / 1000) - feesSummaryByChain[chainId]?.lastUpdatedAt > 60 * 60;

  const totalFees = SUPPORTED_CHAIN_IDS.map((chainId) => {
    if (shouldIncludeCurrrentFees && currentFees && currentFees[chainId]) {
      return currentFees[chainId].div(expandDecimals(1, USD_DECIMALS)).add(feesSummaryByChain[chainId]?.totalFees || 0);
    }
    return feesSummaryByChain[chainId].totalFees || 0;
  })
    .map((v) => Math.round(v))
    .reduce(
      (acc, cv, i) => {
        acc[SUPPORTED_CHAIN_IDS[i]] = cv;
        acc.total = acc.total + cv;
        return acc;
      },
      { total: 0 }
    );

  const utxPrice = usePriceUTX();

  let { total: totalUtxInLiquidity } = useTotalUtxInLiquidity(chainId, active);

  let { total: totalStakedUtx } = useTotalUtxStaked();

  let utxMarketCap;
  if (utxPrice && totalUtxSupply) {
    utxMarketCap = totalUtxSupply.mul(utxPrice).div(expandDecimals(1, UTX_DECIMALS));
  }

  let stakedUtxSupplyUsd;
  if (utxPrice && totalStakedUtx) {
    stakedUtxSupplyUsd = totalStakedUtx.mul(utxPrice).div(expandDecimals(1, UTX_DECIMALS));
  }

  let aum;
  if (aums && aums.length > 0) {
    aum = aums[0].add(aums[1]).div(2);
  }

  let ulpPrice;
  let ulpSupply;
  let ulpMarketCap;
  if (aum && totalSupplies && totalSupplies[3]) {
    ulpSupply = totalSupplies[3];
    ulpPrice =
      aum && aum.gt(0) && ulpSupply.gt(0)
        ? aum.mul(expandDecimals(1, ULP_DECIMALS)).div(ulpSupply)
        : expandDecimals(1, USD_DECIMALS);
    ulpMarketCap = ulpPrice.mul(ulpSupply).div(expandDecimals(1, ULP_DECIMALS));
  }

  let tvl;
  if (ulpMarketCap && utxPrice && totalStakedUtx) {
    tvl = ulpMarketCap.add(totalStakedUtx.mul(utxPrice).div(expandDecimals(1, UTX_DECIMALS)));
  }

  const ethFloorPriceFund = expandDecimals(350 + 148 + 384, 18);
  const ulpFloorPriceFund = expandDecimals(660001, 18);
  const usdcFloorPriceFund = expandDecimals(784598 + 200000, 30);

  let totalFloorPriceFundUsd;

  if (eth && eth?.contractMinPrice && ulpPrice) {
    const ethFloorPriceFundUsd = ethFloorPriceFund.mul(eth?.contractMinPrice).div(expandDecimals(1, eth.decimals));
    const ulpFloorPriceFundUsd = ulpFloorPriceFund.mul(ulpPrice).div(expandDecimals(1, 18));

    totalFloorPriceFundUsd = ethFloorPriceFundUsd.add(ulpFloorPriceFundUsd).add(usdcFloorPriceFund);
  }

  let adjustedUsdgSupply = bigNumberify(0);

  for (let i = 0; i < tokenList.length; i++) {
    const token = tokenList[i];
    const tokenInfo = infoTokens[token.address];
    if (tokenInfo && tokenInfo.usdgAmount) {
      adjustedUsdgSupply = adjustedUsdgSupply.add(tokenInfo.usdgAmount);
    }
  }

  const getWeightText = (tokenInfo) => {
    if (
      !tokenInfo.weight ||
      !tokenInfo.usdgAmount ||
      !adjustedUsdgSupply ||
      adjustedUsdgSupply.eq(0) ||
      !totalTokenWeights
    ) {
      return "...";
    }

    const currentWeightBps = tokenInfo.usdgAmount.mul(BASIS_POINTS_DIVISOR).div(adjustedUsdgSupply);
    // use add(1).div(10).mul(10) to round numbers up
    const targetWeightBps = tokenInfo.weight.mul(BASIS_POINTS_DIVISOR).div(totalTokenWeights).add(1).div(10).mul(10);

    const weightText = `${formatAmount(currentWeightBps, 2, 2, false)}% / ${formatAmount(
      targetWeightBps,
      2,
      2,
      false
    )}%`;

    return (
      <TooltipComponent
        handle={weightText}
        position="right-bottom"
        renderContent={() => {
          return (
            <>
              <StatsTooltipRow
                label={t`Current Weight`}
                value={`${formatAmount(currentWeightBps, 2, 2, false)}%`}
                showDollar={false}
              />
              <StatsTooltipRow
                label={t`Target Weight`}
                value={`${formatAmount(targetWeightBps, 2, 2, false)}%`}
                showDollar={false}
              />
              <br />
              {currentWeightBps.lt(targetWeightBps) && (
                <div className="text-white">
                  <Trans>
                    {tokenInfo.symbol} is below its target weight.
                    <br />
                    <br />
                    Get lower fees to{" "}
                    <Link to="/buy_ulp" target="_blank" rel="noopener noreferrer">
                      buy ULP
                    </Link>{" "}
                    with {tokenInfo.symbol}, and to{" "}
                    <Link to="/trade" target="_blank" rel="noopener noreferrer">
                      swap
                    </Link>{" "}
                    {tokenInfo.symbol} for other tokens.
                  </Trans>
                </div>
              )}
              {currentWeightBps.gt(targetWeightBps) && (
                <div className="text-white">
                  <Trans>
                    {tokenInfo.symbol} is above its target weight.
                    <br />
                    <br />
                    Get lower fees to{" "}
                    <Link to="/trade" target="_blank" rel="noopener noreferrer">
                      swap
                    </Link>{" "}
                    tokens for {tokenInfo.symbol}.
                  </Trans>
                </div>
              )}
              <br />
              <div>
                <ExternalLink href="">
                  <Trans>More Info</Trans>
                </ExternalLink>
              </div>
            </>
          );
        }}
      />
    );
  };

  let stakedPercent = 0;

  if (totalUtxSupply && !totalUtxSupply.isZero() && !totalStakedUtx.isZero()) {
    stakedPercent = totalStakedUtx.mul(100).div(totalUtxSupply).toNumber();
  }

  let liquidityPercent = 0;

  if (totalUtxSupply && !totalUtxSupply.isZero() && totalUtxInLiquidity) {
    liquidityPercent = totalUtxInLiquidity.mul(100).div(totalUtxSupply).toNumber();
  }

  let notStakedPercent = 100 - stakedPercent - liquidityPercent;

  let utxDistributionData = [
    {
      name: t`staked`,
      value: stakedPercent,
      color: "#4353fa",
    },
    {
      name: t`in liquidity`,
      value: liquidityPercent,
      color: "#0598fa",
    },
    {
      name: t`not staked`,
      value: notStakedPercent,
      color: "#5c0af5",
    },
  ];

  const totalStatsStartDate = t`01 Sep 2021`;

  let stableUlp = 0;
  let totalUlp = 0;

  let ulpPool = tokenList.map((token) => {
    const tokenInfo = infoTokens[token.address];
    if (tokenInfo.usdgAmount && adjustedUsdgSupply && adjustedUsdgSupply.gt(0)) {
      const currentWeightBps = tokenInfo.usdgAmount.mul(BASIS_POINTS_DIVISOR).div(adjustedUsdgSupply);
      if (tokenInfo.isStable) {
        stableUlp += parseFloat(`${formatAmount(currentWeightBps, 2, 2, false)}`);
      }
      totalUlp += parseFloat(`${formatAmount(currentWeightBps, 2, 2, false)}`);
      return {
        fullname: token.name,
        name: token.symbol,
        value: parseFloat(`${formatAmount(currentWeightBps, 2, 2, false)}`),
      };
    }
    return null;
  });

  let stablePercentage = totalUlp > 0 ? ((stableUlp * 100) / totalUlp).toFixed(2) : "0.0";

  ulpPool = ulpPool.filter(function (element) {
    return element !== null;
  });

  ulpPool = ulpPool.sort(function (a, b) {
    if (a.value < b.value) return 1;
    else return -1;
  });

  utxDistributionData = utxDistributionData.sort(function (a, b) {
    if (a.value < b.value) return 1;
    else return -1;
  });

  const [utxActiveIndex, setUTXActiveIndex] = useState(null);

  const onUTXDistributionChartEnter = (_, index) => {
    setUTXActiveIndex(index);
  };

  const onUTXDistributionChartLeave = (_, index) => {
    setUTXActiveIndex(null);
  };

  const [ulpActiveIndex, setULPActiveIndex] = useState(null);

  const onULPPoolChartEnter = (_, index) => {
    setULPActiveIndex(index);
  };

  const onULPPoolChartLeave = (_, index) => {
    setULPActiveIndex(null);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="stats-label">
          <div className="stats-label-color" style={{ backgroundColor: payload[0].color }}></div>
          {payload[0].value}% {payload[0].name}
        </div>
      );
    }

    return null;
  };

  const ChainCard = () => {
    return (
      <div className="chain-card">
        <img className="chain-card-img-wrap" src={currentIcons.network} alt="NetworkIcon" />
        <span className="chain-card-name">{chainName}</span>
      </div>
    );
  };

  return (
    <SEO title={getPageTitle(t`Dashboard`)}>
      <div className="default-container DashboardV2 page-layout">
        <div className="section-title-block">
          <div className="section-title-icon"></div>
          <div className="section-title-content">
            <div className="Page-title dashboard">
              <Trans>Overview Stats</Trans>
              <ChainCard />
            </div>
            <div className="Page-description">
              <Trans>
                {chainName} Total Stats start from {totalStatsStartDate}.<br />
              </Trans>{" "}
            </div>
          </div>
        </div>
        <div className="DashboardV2-content">
          <div className="DashboardV2-overview-cards">
            <div className="item-overview-card">
              <img className="overview-card-img" src={dashboard_clock} alt="24h" />
              <span className="overview-card-number">
                ${formatAmount(currentVolumeInfo?.[chainId], USD_DECIMALS, 2, true)}
              </span>
              <span className="overview-card-text">24h Volume</span>
            </div>

            <div className="item-overview-card">
              <img className="overview-card-img" src={dashboard_up} alt="24h" />
              <span className="overview-card-number">
                ${formatAmount(positionStatsInfo?.[chainId]?.openInterest, USD_DECIMALS, 0, true)}
              </span>
              <span className="overview-card-text">Open Interest</span>
            </div>
            <div className="item-overview-card">
              <img className="overview-card-img" src={dashboard_tivi} alt="24h" />
              <span className="overview-card-number">
                ${formatAmount(positionStatsInfo?.[chainId]?.totalLongPositionSizes, USD_DECIMALS, 0, true)}
              </span>
              <span className="overview-card-text">Long Positions</span>
            </div>
            <div className="item-overview-card">
              <img className="overview-card-img" src={dashboard_down} alt="24h" />
              <span className="overview-card-number">
                ${formatAmount(positionStatsInfo?.[chainId]?.totalShortPositionSizes, USD_DECIMALS, 0, true)}
              </span>
              <span className="overview-card-text">Short Positions</span>
            </div>
          </div>
          <div className="DashboardV2-cards">
            <div className="App-card">
              <div className="App-card-title dashboard">
                <div className="dashboard-card-title-left">
                  <div className="dashboard-card-title-mark-left"></div>
                  <span>Overview</span>
                </div>
                <div className="dashboard-card-title-right">
                  <span className="dashboard-card-title-text">From {totalStatsStartDate}</span>
                </div>
              </div>
              <div className="App-card-divider"></div>
              <div className="App-card-content">
                <div className="App-card-row dashboard">
                  <div className="label">
                    <Trans>AUM</Trans>
                  </div>
                  <div>
                    <TooltipComponent
                      handle={`$${formatAmount(tvl, USD_DECIMALS, 0, true)}`}
                      position="right-bottom"
                      renderContent={() => (
                        <span>{t`Assets Under Management: UTX staked (All chains) + ULP pool (${chainName}).`}</span>
                      )}
                    />
                  </div>
                </div>
                <div className="App-card-row dashboard">
                  <div className="label">
                    <Trans>ULP Pool</Trans>
                  </div>
                  <div>
                    <TooltipComponent
                      handle={`$${formatAmount(aum, USD_DECIMALS, 0, true)}`}
                      position="right-bottom"
                      renderContent={() => (
                        <Trans>
                          <p>Total value of tokens in ULP pool ({chainName}).</p>
                          <p>
                            Other websites may show a higher value as they add positions' collaterals to the ULP pool.
                          </p>
                        </Trans>
                      )}
                    />
                  </div>
                </div>
                {feesSummary?.lastUpdatedAt ? (
                  <div className="App-card-row dashboard">
                    <div className="label">
                      <Trans>Fees since</Trans> {formatDate(feesSummary.lastUpdatedAt)}
                    </div>
                    <div>
                      <TooltipComponent
                        position="right-bottom"
                        className="nowrap"
                        handle={`$${formatAmount(currentFees?.total, USD_DECIMALS, 2, true)}`}
                        renderContent={() =>
                          SUPPORTED_CHAIN_IDS.map((chain, index) => (
                            <StatsTooltipRow
                              label={t`Fees on ${CHAIN_NAMES_MAP[chain]}`}
                              value={formatAmount(currentFees[chain], USD_DECIMALS, 2, true)}
                              showDollar={true}
                              key={index}
                            />
                          ))
                        }
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="App-card">
              <div className="App-card-title dashboard">
                <div className="dashboard-card-title-left">
                  <div className="dashboard-card-title-mark-right"></div>
                  <span>Total Stats</span>
                </div>
                <div className="dashboard-card-title-right">
                  <span className="dashboard-card-title-text">From {totalStatsStartDate}</span>
                </div>
              </div>
              <div className="App-card-divider"></div>
              <div className="App-card-content">
                <div className="App-card-row dashboard">
                  <div className="label">
                    <Trans>Total Fees</Trans>
                  </div>
                  <div>
                    <TooltipComponent
                      position="right-bottom"
                      className="nowrap"
                      handle={`$${formatNumberDecimal(totalFees?.total, 2)}`}
                      renderContent={() =>
                        SUPPORTED_CHAIN_IDS.map((chain, index) => (
                          <StatsTooltipRow
                            label={t`Total fees on ${CHAIN_NAMES_MAP[chain]}`}
                            value={formatNumberDecimal(totalFees[chain], 2)}
                            showDollar={true}
                            key={index}
                          />
                        ))
                      }
                    />
                  </div>
                </div>
                <div className="App-card-row dashboard">
                  <div className="label">
                    <Trans>Total Volume</Trans>
                  </div>
                  <div>
                    <TooltipComponent
                      position="right-bottom"
                      className="nowrap"
                      handle={`$${formatAmount(totalVolume?.total, USD_DECIMALS, 0, true)}`}
                      renderContent={() =>
                        SUPPORTED_CHAIN_IDS.map((chain, index) => (
                          <StatsTooltipRow
                            label={t`Total Volumne on ${CHAIN_NAMES_MAP[chain]}`}
                            value={`${formatAmount(totalVolume?.[chain], USD_DECIMALS, 0, true)}`}
                            showDollar={true}
                            key={index}
                          />
                        ))
                      }
                    />
                  </div>
                </div>
                <div className="App-card-row dashboard">
                  <div className="label">
                    <Trans>Total Users</Trans>
                  </div>
                  <div>
                    <TooltipComponent
                      position="right-bottom"
                      className="nowrap"
                      handle={formatAmount(uniqueUsers?.["total"], 0, 0, true)}
                      renderContent={() =>
                        SUPPORTED_CHAIN_IDS.map((chain, index) => (
                          <StatsTooltipRow
                            label={t`User on ${CHAIN_NAMES_MAP[chain]}`}
                            value={formatAmount(uniqueUsers?.[chain], 0, 0, true)}
                            showDollar={false}
                            key={index}
                          />
                        ))
                      }
                    />
                  </div>
                </div>
                <div className="App-card-row dashboard">
                  <div className="label">
                    <Trans>Floor Price Fund</Trans>
                  </div>
                  <div>${formatAmount(totalFloorPriceFundUsd, 30, 0, true)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="Tab-title-section">
            <div className="Page-title dashboard">
              <Trans>Token Stats</Trans>
              <ChainCard />
            </div>
            <div className="Page-description">
              <Trans>UTX and ULP tokens stats.</Trans>
            </div>
          </div>
          <div className="DashboardV2-token-cards">
            <div className="stats-wrapper stats-wrapper--utx">
              <div className="App-card">
                <div className="stats-block">
                  <div className="App-card-title">
                    <div className="App-card-title-mark dashboard">
                      <div className="App-card-token-title-left">
                        <div className="App-card-title-mark-icon">
                          <img src={dashboard_utx_icon} width="40" alt="UTX Token Icon" />
                        </div>
                        <div className="App-card-title-mark-info">
                          <div className="App-card-title-mark-title">UTX</div>
                        </div>
                      </div>
                      <div className="App-card-token-title-right">
                        <AssetDropdown assetSymbol="UTX" />
                      </div>
                    </div>
                  </div>
                  <div className="App-card-divider"></div>
                  <div className="App-card-content-wrapper">
                    <div className="stats-piechart" onMouseLeave={onUTXDistributionChartLeave}>
                      {utxDistributionData.length > 0 && (
                        <PieChart width={210} height={210}>
                          <Pie
                            data={utxDistributionData}
                            cx={100}
                            cy={100}
                            cornerRadius={8}
                            innerRadius={73}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                            paddingAngle={2}
                            onMouseEnter={onUTXDistributionChartEnter}
                            onMouseOut={onUTXDistributionChartLeave}
                            onMouseLeave={onUTXDistributionChartLeave}
                          >
                            {utxDistributionData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={entry.color}
                                style={{
                                  filter:
                                    utxActiveIndex === index
                                      ? `drop-shadow(0px 0px 6px ${hexToRgba(entry.color, 0.7)})`
                                      : "none",
                                  cursor: "pointer",
                                }}
                                stroke={entry.color}
                                strokeWidth={utxActiveIndex === index ? 1 : 1}
                              />
                            ))}
                          </Pie>
                          <text x={"50%"} y={"50%"} fill="white" textAnchor="middle" dominantBaseline="middle">
                            <Trans>Distribution</Trans>
                          </text>
                          <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                      )}
                    </div>
                    <div className="App-card-content dashboard">
                      <div className="App-card-row dashboard">
                        <div className="label">
                          <Trans>Price</Trans>
                        </div>
                        <div>
                          {!utxPrice && "..."}
                          {utxPrice && <>${formatAmount(utxPrice, USD_DECIMALS, 2, true)}</>}
                        </div>
                      </div>
                      <div className="App-card-row dashboard">
                        <div className="label">
                          <Trans>Supply</Trans>
                        </div>
                        <div>{formatAmount(totalUtxSupply, UTX_DECIMALS, 0, true)} UTX</div>
                      </div>
                      <div className="App-card-row dashboard">
                        <div className="label">
                          <Trans>Total Staked</Trans>
                        </div>
                        <div>${formatAmount(stakedUtxSupplyUsd, USD_DECIMALS, 0, true)}</div>
                      </div>
                      <div className="App-card-row dashboard">
                        <div className="label">
                          <Trans>Market Cap</Trans>
                        </div>
                        <div>${formatAmount(utxMarketCap, USD_DECIMALS, 0, true)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="App-card">
                <div className="stats-block">
                  <div className="App-card-title">
                    <div className="App-card-title-mark dashboard">
                      <div className="App-card-token-title-left">
                        <div className="App-card-title-mark-icon">
                          <img src={dashboard_ulp_icon} width="40" alt="ULP Icon" />
                        </div>
                        <div className="App-card-title-mark-info">
                          <div className="App-card-title-mark-title">ULP</div>
                        </div>
                      </div>
                      <div className="App-card-token-title-right">
                        <AssetDropdown assetSymbol="ULP" />
                      </div>
                    </div>
                  </div>
                  <div className="App-card-divider"></div>
                  <div className="App-card-content-wrapper">
                    <div className="stats-piechart" onMouseOut={onULPPoolChartLeave}>
                      {ulpPool.length > 0 && (
                        <PieChart width={210} height={210}>
                          <Pie
                            data={ulpPool}
                            cx={100}
                            cy={100}
                            cornerRadius={8}
                            innerRadius={73}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                            onMouseEnter={onULPPoolChartEnter}
                            onMouseOut={onULPPoolChartLeave}
                            onMouseLeave={onULPPoolChartLeave}
                            paddingAngle={2}
                          >
                            {ulpPool.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={ULP_POOL_COLORS[entry.name]}
                                style={{
                                  filter:
                                    ulpActiveIndex === index
                                      ? `drop-shadow(0px 0px 6px ${hexToRgba(ULP_POOL_COLORS[entry.name], 0.7)})`
                                      : "none",
                                  cursor: "pointer",
                                }}
                                stroke={ULP_POOL_COLORS[entry.name]}
                                strokeWidth={ulpActiveIndex === index ? 1 : 1}
                              />
                            ))}
                          </Pie>
                          <text x={"50%"} y={"50%"} fill="white" textAnchor="middle" dominantBaseline="middle">
                            ULP Pool
                          </text>
                          <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                      )}
                    </div>
                    <div className="App-card-content">
                      <div className="App-card-row dashboard">
                        <div className="label">
                          <Trans>Price</Trans>
                        </div>
                        <div>${formatAmount(ulpPrice, USD_DECIMALS, 3, true)}</div>
                      </div>
                      <div className="App-card-row dashboard">
                        <div className="label">
                          <Trans>Supply</Trans>
                        </div>
                        <div>{formatAmount(ulpSupply, ULP_DECIMALS, 0, true)} ULP</div>
                      </div>
                      <div className="App-card-row dashboard">
                        <div className="label">
                          <Trans>Total Staked</Trans>
                        </div>
                        <div>${formatAmount(ulpMarketCap, USD_DECIMALS, 0, true)}</div>
                      </div>
                      <div className="App-card-row dashboard">
                        <div className="label">
                          <Trans>Market Cap</Trans>
                        </div>
                        <div>${formatAmount(ulpMarketCap, USD_DECIMALS, 0, true)}</div>
                      </div>
                      <div className="App-card-row dashboard">
                        <div className="label">
                          <Trans>Stablecoin Percentage</Trans>
                        </div>
                        <div>{stablePercentage}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="token-table-wrapper App-card">
              <div className="App-card-title">
                <div className="dashboard-card-title-mark-left"></div>
                <Trans>ULP Index Composition</Trans>
              </div>
              <div className="App-card-divider"></div>
              <table className="token-table dashboard">
                <thead>
                  <tr>
                    <th className="token-table-label">
                      <Trans>Token</Trans>
                    </th>
                    <th className="token-table-label">
                      <Trans>Price</Trans>
                    </th>
                    <th className="token-table-label">
                      <Trans>Pool</Trans>
                    </th>
                    <th className="token-table-label">
                      <Trans>Weight</Trans>
                    </th>
                    <th className="token-table-label">
                      <Trans>Utilization</Trans>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visibleTokens.map((token) => {
                    const tokenInfo = infoTokens[token.address];
                    let utilization = bigNumberify(0);
                    if (tokenInfo && tokenInfo.reservedAmount && tokenInfo.poolAmount && tokenInfo.poolAmount.gt(0)) {
                      utilization = tokenInfo.reservedAmount.mul(BASIS_POINTS_DIVISOR).div(tokenInfo.poolAmount);
                    }
                    let maxUsdgAmount = DEFAULT_MAX_USDG_AMOUNT;
                    if (tokenInfo.maxUsdgAmount && tokenInfo.maxUsdgAmount.gt(0)) {
                      maxUsdgAmount = tokenInfo.maxUsdgAmount;
                    }
                    const tokenImage = token?.imageUrl;

                    return (
                      <tr key={token.symbol}>
                        <td>
                          <div className="token-symbol-wrapper">
                            <div className="App-card-title-info">
                              <div className="App-card-title-info-icon">
                                <img src={tokenImage} alt={token.symbol} width="40" height={"40"} />
                              </div>
                              <div className="App-card-title-info-text">
                                <div className="App-card-info-title">{token.name}</div>
                                <div className="App-card-info-subtitle">{token.symbol}</div>
                              </div>
                              <div>
                                <AssetDropdown assetSymbol={token.symbol} assetInfo={token} />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>${formatKeyAmount(tokenInfo, "minPrice", USD_DECIMALS, 2, true)}</td>
                        <td>
                          <TooltipComponent
                            handle={`$${formatKeyAmount(tokenInfo, "managedUsd", USD_DECIMALS, 0, true)}`}
                            position="right-bottom"
                            className="nowrap"
                            renderContent={() => {
                              return (
                                <>
                                  <StatsTooltipRow
                                    label={t`Pool Amount`}
                                    value={`${formatKeyAmount(tokenInfo, "managedAmount", token.decimals, 0, true)} ${
                                      token.symbol
                                    }`}
                                    showDollar={false}
                                  />
                                  <StatsTooltipRow
                                    label={t`Target Min Amount`}
                                    value={`${formatKeyAmount(tokenInfo, "bufferAmount", token.decimals, 0, true)} ${
                                      token.symbol
                                    }`}
                                    showDollar={false}
                                  />
                                  <StatsTooltipRow
                                    label={t`Max ${tokenInfo.symbol} Capacity`}
                                    value={formatAmount(maxUsdgAmount, 18, 0, true)}
                                    showDollar={true}
                                  />
                                </>
                              );
                            }}
                          />
                        </td>
                        <td>{getWeightText(tokenInfo)}</td>
                        <td>{formatAmount(utilization, 2, 2, false)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="Page-title dashboard Tab-title-section">
              <div className="dashboard-card-title-left ulp-composition-small">
                <div className="dashboard-card-title-mark-left"></div>
                <span>ULP Index Composition</span>
              </div>
            </div>
            <div className="token-grid">
              {visibleTokens.map((token) => {
                const tokenInfo = infoTokens[token.address];
                let utilization = bigNumberify(0);
                if (tokenInfo && tokenInfo.reservedAmount && tokenInfo.poolAmount && tokenInfo.poolAmount.gt(0)) {
                  utilization = tokenInfo.reservedAmount.mul(BASIS_POINTS_DIVISOR).div(tokenInfo.poolAmount);
                }
                let maxUsdgAmount = DEFAULT_MAX_USDG_AMOUNT;
                if (tokenInfo.maxUsdgAmount && tokenInfo.maxUsdgAmount.gt(0)) {
                  maxUsdgAmount = tokenInfo.maxUsdgAmount;
                }

                const tokenImage = tokenInfo?.imageUrl;
                return (
                  <div className="App-card" key={token.symbol}>
                    <div className="App-card-title">
                      <div className="mobile-token-card">
                        <img src={tokenImage} alt={token.symbol} width="20px" />
                        <div className="token-symbol-text">{token.symbol}</div>
                        <div>
                          <AssetDropdown assetSymbol={token.symbol} assetInfo={token} />
                        </div>
                      </div>
                    </div>
                    <div className="App-card-divider"></div>
                    <div className="App-card-content">
                      <div className="App-card-row dashboard">
                        <div className="label">
                          <Trans>Price</Trans>
                        </div>
                        <div>${formatKeyAmount(tokenInfo, "minPrice", USD_DECIMALS, 2, true)}</div>
                      </div>
                      <div className="App-card-row dashboard">
                        <div className="label">
                          <Trans>Pool</Trans>
                        </div>
                        <div>
                          <TooltipComponent
                            handle={`$${formatKeyAmount(tokenInfo, "managedUsd", USD_DECIMALS, 0, true)}`}
                            position="right-bottom"
                            renderContent={() => {
                              return (
                                <>
                                  <StatsTooltipRow
                                    label={t`Pool Amount`}
                                    value={`${formatKeyAmount(tokenInfo, "managedAmount", token.decimals, 0, true)} ${
                                      token.symbol
                                    }`}
                                    showDollar={false}
                                  />
                                  <StatsTooltipRow
                                    label={t`Target Min Amount`}
                                    value={`${formatKeyAmount(tokenInfo, "bufferAmount", token.decimals, 0, true)} ${
                                      token.symbol
                                    }`}
                                    showDollar={false}
                                  />
                                  <StatsTooltipRow
                                    label={t`Max ${tokenInfo.symbol} Capacity`}
                                    value={formatAmount(maxUsdgAmount, 18, 0, true)}
                                  />
                                </>
                              );
                            }}
                          />
                        </div>
                      </div>
                      <div className="App-card-row dashboard">
                        <div className="label">
                          <Trans>Weight</Trans>
                        </div>
                        <div>{getWeightText(tokenInfo)}</div>
                      </div>
                      <div className="App-card-row dashboard">
                        <div className="label">
                          <Trans>Utilization</Trans>
                        </div>
                        <div>{formatAmount(utilization, 2, 2, false)}%</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </SEO>
  );
}
