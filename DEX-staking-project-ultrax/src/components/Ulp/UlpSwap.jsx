/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Trans, t } from "@lingui/macro";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import { ethers } from "ethers";
import Tab from "../Tab/Tab";
import cx from "classnames";
import { getContract } from "config/contracts";
import {
  getBuyUlpToAmount,
  getBuyUlpFromAmount,
  getSellUlpFromAmount,
  getSellUlpToAmount,
  adjustForDecimals,
  ULP_DECIMALS,
  USD_DECIMALS,
  BASIS_POINTS_DIVISOR,
  ULP_COOLDOWN_DURATION,
  SECONDS_PER_YEAR,
  USDG_DECIMALS,
  PLACEHOLDER_ACCOUNT,
  importImage,
} from "lib/legacy";

import { usePriceUTX } from "lib/useGetPriceToken";

import TokenSelector from "../Exchange/TokenSelector";
import BuyInputSection from "../BuyInputSection/BuyInputSection";
import Tooltip from "../Tooltip/Tooltip";

import ReaderV2 from "abis/ReaderV2.json";
import RewardReader from "abis/RewardReader.json";
import VaultV2 from "abis/VaultV2.json";
import UlpManager from "abis/UlpManager.json";
import RewardTracker from "abis/RewardTracker.json";
import Vester from "abis/Vester.json";
import RewardRouter from "abis/RewardRouter.json";
import Token from "abis/Token.json";

import "./UlpSwap.css";
import AssetDropdown from "pages/Dashboard/AssetDropdown";
import SwapErrorModal from "./SwapErrorModal";
import StatsTooltipRow from "../StatsTooltip/StatsTooltipRow";
import { ARBITRUM, FEES_HIGH_BPS, getChainName, IS_NETWORK_DISABLED } from "config/chains";
import { callContract, contractFetcher } from "lib/contracts";
import { approveTokens, useInfoTokens } from "domain/tokens";
import { useLocalStorageByChainId } from "lib/localStorage";
import { helperToast } from "lib/helperToast";
import { getTokenInfo, getUsd } from "domain/tokens/utils";
import { bigNumberify, expandDecimals, formatAmount, formatAmountFree, formatKeyAmount, parseValue } from "lib/numbers";
import { getNativeToken, getToken, getTokens, getWhitelistedTokens, getWrappedToken } from "config/tokens";
import { useChainId } from "lib/chains";
import ExternalLink from "components/ExternalLink/ExternalLink";
import { getIcon } from "config/icons";
import Button from "components/Button/Button";
import { IoArrowDown } from "react-icons/io5";
import { DEFAULT_TOKEN } from "config/tokens";

const { AddressZero } = ethers.constants;

function getStakingData(stakingInfo) {
  if (!stakingInfo || stakingInfo.length === 0) {
    return;
  }

  const keys = ["StakedUlpTracker", "feeUlpTracker"];
  const data = {};
  const propsLength = 5;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    data[key] = {
      claimable: stakingInfo[i * propsLength],
      tokensPerInterval: stakingInfo[i * propsLength + 1],
      averageStakedAmounts: stakingInfo[i * propsLength + 2],
      cumulativeRewards: stakingInfo[i * propsLength + 3],
      totalSupply: stakingInfo[i * propsLength + 4],
    };
  }

  return data;
}

function getTooltipContent(managedUsd, tokenInfo, token) {
  return (
    <>
      <StatsTooltipRow
        label={t`Current Pool Amount`}
        value={[
          `$${formatAmount(managedUsd, USD_DECIMALS, 0, true)}`,
          `(${formatKeyAmount(tokenInfo, "managedAmount", token.decimals, 0, true)} ${token.symbol})`,
        ]}
      />
      <StatsTooltipRow label={t`Max Pool Capacity`} value={formatAmount(tokenInfo.maxUsdgAmount, 18, 0, true)} />
    </>
  );
}

export default function UlpSwap(props) {
  const { isBuying, setPendingTxns, connectWallet, setIsBuying, savedShouldDisableValidationForTesting } = props;
  const history = useHistory();
  const swapLabel = isBuying ? "BuyUlp" : "SellUlp";
  const tabLabel = isBuying ? t`Buy ULP` : t`Sell ULP`;
  const { active, library, account } = useWeb3React();
  const { chainId } = useChainId();
  const tokens = getTokens(chainId);
  const whitelistedTokens = getWhitelistedTokens(chainId);
  const tokenList = whitelistedTokens.filter((t) => !t.isWrapped);
  const visibleTokens = tokenList.filter((t) => !t.isTempHidden);
  const [swapValue, setSwapValue] = useState("");
  const [ulpValue, setUlpValue] = useState("");
  const [swapTokenAddress, setSwapTokenAddress] = useLocalStorageByChainId(
    chainId,
    `${swapLabel}-swap-token-address`,
    DEFAULT_TOKEN
  );
  const [isApproving, setIsApproving] = useState(false);
  const [isWaitingForApproval, setIsWaitingForApproval] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [anchorOnSwapAmount, setAnchorOnSwapAmount] = useState(true);
  const [feeBasisPoints, setFeeBasisPoints] = useState("");
  const [modalError, setModalError] = useState(false);

  const readerAddress = getContract(chainId, "Reader");
  const rewardReaderAddress = getContract(chainId, "RewardReader");
  const vaultAddress = getContract(chainId, "Vault");
  const nativeTokenAddress = getContract(chainId, "NATIVE_TOKEN");
  const stakedUlpTrackerAddress = getContract(chainId, "StakedUlpTracker");
  const feeUlpTrackerAddress = getContract(chainId, "feeUlpTracker");
  const usdgAddress = getContract(chainId, "USDG");
  const ulpManagerAddress = getContract(chainId, "UlpManager");
  const ulpRewardRouterAddress = getContract(chainId, "UlpRewardRouter");

  const tokensForBalanceAndSupplyQuery = [stakedUlpTrackerAddress, usdgAddress];
  const ulpIcon = getIcon(chainId, "ulp");

  const isFeesHigh = feeBasisPoints > FEES_HIGH_BPS;

  const tokenAddresses = tokens.map((token) => token.address);
  const { data: tokenBalances } = useSWR(
    [`UlpSwap:getTokenBalances:${active}`, chainId, readerAddress, "getTokenBalances", account || PLACEHOLDER_ACCOUNT],
    {
      fetcher: contractFetcher(library, ReaderV2, [tokenAddresses]),
    }
  );

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

  const { data: aums } = useSWR([`UlpSwap:getAums:${active}`, chainId, ulpManagerAddress, "getAums"], {
    fetcher: contractFetcher(library, UlpManager),
  });

  const { data: totalTokenWeights } = useSWR(
    [`UlpSwap:totalTokenWeights:${active}`, chainId, vaultAddress, "totalTokenWeights"],
    {
      fetcher: contractFetcher(library, VaultV2),
    }
  );

  const tokenAllowanceAddress = swapTokenAddress === AddressZero ? nativeTokenAddress : swapTokenAddress;
  const { data: tokenAllowance } = useSWR(
    [active, chainId, tokenAllowanceAddress, "allowance", account || PLACEHOLDER_ACCOUNT, ulpManagerAddress],
    {
      fetcher: contractFetcher(library, Token),
    }
  );

  const { data: lastPurchaseTime } = useSWR(
    [`UlpSwap:lastPurchaseTime:${active}`, chainId, ulpManagerAddress, "lastAddedAt", account || PLACEHOLDER_ACCOUNT],
    {
      fetcher: contractFetcher(library, UlpManager),
    }
  );

  const { data: ulpBalance } = useSWR(
    [`UlpSwap:ulpBalance:${active}`, chainId, feeUlpTrackerAddress, "stakedAmounts", account || PLACEHOLDER_ACCOUNT],
    {
      fetcher: contractFetcher(library, RewardTracker),
    }
  );

  const ulpVesterAddress = getContract(chainId, "UlpVester");
  const { data: reservedAmount } = useSWR(
    [`UlpSwap:reservedAmount:${active}`, chainId, ulpVesterAddress, "pairAmounts", account || PLACEHOLDER_ACCOUNT],
    {
      fetcher: contractFetcher(library, Vester),
    }
  );

  const utxPrice = usePriceUTX();

  const rewardTrackersForStakingInfo = [stakedUlpTrackerAddress, feeUlpTrackerAddress];
  const { data: stakingInfo } = useSWR(
    [`UlpSwap:stakingInfo:${active}`, chainId, rewardReaderAddress, "getStakingInfo", account || PLACEHOLDER_ACCOUNT],
    {
      fetcher: contractFetcher(library, RewardReader, [rewardTrackersForStakingInfo]),
    }
  );

  const stakingData = getStakingData(stakingInfo);

  const redemptionTime = lastPurchaseTime ? lastPurchaseTime.add(ULP_COOLDOWN_DURATION) : undefined;
  const inCooldownWindow = redemptionTime && parseInt(Date.now() / 1000) < redemptionTime;

  const ulpSupply = balancesAndSupplies ? balancesAndSupplies[1] : bigNumberify(0);
  const usdgSupply = balancesAndSupplies ? balancesAndSupplies[3] : bigNumberify(0);
  let aum;
  if (aums && aums.length > 0) {
    aum = isBuying ? aums[0] : aums[1];
  }
  const ulpPrice =
    aum && aum.gt(0) && ulpSupply.gt(0)
      ? aum.mul(expandDecimals(1, ULP_DECIMALS)).div(ulpSupply)
      : expandDecimals(1, USD_DECIMALS);
  let ulpBalanceUsd;
  if (ulpBalance) {
    ulpBalanceUsd = ulpBalance.mul(ulpPrice).div(expandDecimals(1, ULP_DECIMALS));
  }
  const ulpSupplyUsd = ulpSupply.mul(ulpPrice).div(expandDecimals(1, ULP_DECIMALS));

  let reserveAmountUsd;
  if (reservedAmount) {
    reserveAmountUsd = reservedAmount.mul(ulpPrice).div(expandDecimals(1, ULP_DECIMALS));
  }

  let maxSellAmount = ulpBalance;
  if (ulpBalance && reservedAmount) {
    maxSellAmount = ulpBalance.sub(reservedAmount);
  }

  const { infoTokens } = useInfoTokens(library, chainId, active, tokenBalances, undefined);
  const swapToken = getToken(chainId, swapTokenAddress);
  const swapTokenInfo = getTokenInfo(infoTokens, swapTokenAddress);

  const swapTokenBalance = swapTokenInfo && swapTokenInfo.balance ? swapTokenInfo.balance : bigNumberify(0);

  const swapAmount = parseValue(swapValue, swapToken && swapToken.decimals);
  const ulpAmount = parseValue(ulpValue, ULP_DECIMALS);

  const needApproval =
    isBuying && swapTokenAddress !== AddressZero && tokenAllowance && swapAmount && swapAmount.gt(tokenAllowance);

  const swapUsdMin = getUsd(swapAmount, swapTokenAddress, false, infoTokens);
  const ulpUsdMax = ulpAmount && ulpPrice ? ulpAmount.mul(ulpPrice).div(expandDecimals(1, ULP_DECIMALS)) : undefined;

  let isSwapTokenCapReached;
  if (swapTokenInfo.managedUsd && swapTokenInfo.maxUsdgAmount) {
    isSwapTokenCapReached = swapTokenInfo.managedUsd.gt(
      adjustForDecimals(swapTokenInfo.maxUsdgAmount, USDG_DECIMALS, USD_DECIMALS)
    );
  }

  const onSwapValueChange = (e) => {
    setAnchorOnSwapAmount(true);
    setSwapValue(e.target.value);
  };

  const onulpValueChange = (e) => {
    setAnchorOnSwapAmount(false);
    setUlpValue(e.target.value);
  };

  const onSelectSwapToken = (token) => {
    setSwapTokenAddress(token.address);
    setIsWaitingForApproval(false);
  };

  const nativeToken = getTokenInfo(infoTokens, AddressZero);

  let totalApr = bigNumberify(0);

  let feeUlpTrackerAnnualRewardsUsd;
  let feeUlpTrackerApr;
  if (
    stakingData &&
    stakingData.feeUlpTracker &&
    stakingData.feeUlpTracker.tokensPerInterval &&
    nativeToken &&
    nativeToken.minPrice &&
    ulpSupplyUsd &&
    ulpSupplyUsd.gt(0)
  ) {
    feeUlpTrackerAnnualRewardsUsd = stakingData.feeUlpTracker.tokensPerInterval
      .mul(SECONDS_PER_YEAR)
      .mul(nativeToken.minPrice)
      .div(expandDecimals(1, 18));
    feeUlpTrackerApr = feeUlpTrackerAnnualRewardsUsd.mul(BASIS_POINTS_DIVISOR).div(ulpSupplyUsd);
    totalApr = totalApr.add(feeUlpTrackerApr);
  }

  let stakedUlpTrackerAnnualRewardsUsd;
  let stakedUlpTrackerApr;

  if (
    utxPrice &&
    stakingData &&
    stakingData.StakedUlpTracker &&
    stakingData.StakedUlpTracker.tokensPerInterval &&
    ulpSupplyUsd &&
    ulpSupplyUsd.gt(0)
  ) {
    stakedUlpTrackerAnnualRewardsUsd = stakingData.StakedUlpTracker.tokensPerInterval
      .mul(SECONDS_PER_YEAR)
      .mul(utxPrice)
      .div(expandDecimals(1, 18));
    stakedUlpTrackerApr = stakedUlpTrackerAnnualRewardsUsd.mul(BASIS_POINTS_DIVISOR).div(ulpSupplyUsd);
    totalApr = totalApr.add(stakedUlpTrackerApr);
  }

  useEffect(() => {
    const updateSwapAmounts = () => {
      if (anchorOnSwapAmount) {
        if (!swapAmount) {
          setUlpValue("");
          setFeeBasisPoints("");
          return;
        }

        if (isBuying) {
          const { amount: nextAmount, feeBasisPoints: feeBps } = getBuyUlpToAmount(
            swapAmount,
            swapTokenAddress,
            infoTokens,
            ulpPrice,
            usdgSupply,
            totalTokenWeights
          );
          const nextValue = formatAmountFree(nextAmount, ULP_DECIMALS, ULP_DECIMALS);
          setUlpValue(nextValue);
          setFeeBasisPoints(feeBps);
        } else {
          const { amount: nextAmount, feeBasisPoints: feeBps } = getSellUlpFromAmount(
            swapAmount,
            swapTokenAddress,
            infoTokens,
            ulpPrice,
            usdgSupply,
            totalTokenWeights
          );
          const nextValue = formatAmountFree(nextAmount, ULP_DECIMALS, ULP_DECIMALS);
          setUlpValue(nextValue);
          setFeeBasisPoints(feeBps);
        }

        return;
      }

      if (!ulpAmount) {
        setSwapValue("");
        setFeeBasisPoints("");
        return;
      }

      if (swapToken) {
        if (isBuying) {
          const { amount: nextAmount, feeBasisPoints: feeBps } = getBuyUlpFromAmount(
            ulpAmount,
            swapTokenAddress,
            infoTokens,
            ulpPrice,
            usdgSupply,
            totalTokenWeights
          );
          const nextValue = formatAmountFree(nextAmount, swapToken.decimals, swapToken.decimals);
          setSwapValue(nextValue);
          setFeeBasisPoints(feeBps);
        } else {
          const { amount: nextAmount, feeBasisPoints: feeBps } = getSellUlpToAmount(
            ulpAmount,
            swapTokenAddress,
            infoTokens,
            ulpPrice,
            usdgSupply,
            totalTokenWeights,
            true
          );

          const nextValue = formatAmountFree(nextAmount, swapToken.decimals, swapToken.decimals);
          setSwapValue(nextValue);
          setFeeBasisPoints(feeBps);
        }
      }
    };

    updateSwapAmounts();
  }, [
    isBuying,
    anchorOnSwapAmount,
    swapAmount,
    ulpAmount,
    swapToken,
    swapTokenAddress,
    infoTokens,
    ulpPrice,
    usdgSupply,
    totalTokenWeights,
  ]);

  const switchSwapOption = (hash = "") => {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    history.push(`${history.location.pathname}#${hash}`);
    props.setIsBuying(hash === "redeem" ? false : true);
    window.scrollTo(0, currentScrollPosition);
  };

  const fillMaxAmount = () => {
    if (isBuying) {
      setAnchorOnSwapAmount(true);
      setSwapValue(formatAmountFree(swapTokenBalance, swapToken.decimals, swapToken.decimals));
      return;
    }

    setAnchorOnSwapAmount(false);
    setUlpValue(formatAmountFree(maxSellAmount, ULP_DECIMALS, ULP_DECIMALS));
  };

  const getError = () => {
    if (IS_NETWORK_DISABLED[chainId]) {
      if (isBuying) return [t`ULP buy disabled, pending ${getChainName(chainId)} upgrade`];
      return [t`ULP sell disabled, pending ${getChainName(chainId)} upgrade`];
    }

    if (!isBuying && inCooldownWindow) {
      return [t`Redemption time not yet reached`];
    }

    if (!swapAmount || swapAmount.eq(0)) {
      return [t`Enter an amount`];
    }
    if (!ulpAmount || ulpAmount.eq(0)) {
      return [t`Enter an amount`];
    }

    if (isBuying) {
      const swapTokenInfo = getTokenInfo(infoTokens, swapTokenAddress);
      if (
        !savedShouldDisableValidationForTesting &&
        swapTokenInfo &&
        swapTokenInfo.balance &&
        swapAmount &&
        swapAmount.gt(swapTokenInfo.balance)
      ) {
        return [t`Insufficient ${swapTokenInfo.symbol} balance`];
      }

      if (swapTokenInfo.maxUsdgAmount && swapTokenInfo.usdgAmount && swapUsdMin) {
        const usdgFromAmount = adjustForDecimals(swapUsdMin, USD_DECIMALS, USDG_DECIMALS);
        const nextUsdgAmount = swapTokenInfo.usdgAmount.add(usdgFromAmount);
        if (swapTokenInfo.maxUsdgAmount.gt(0) && nextUsdgAmount.gt(swapTokenInfo.maxUsdgAmount)) {
          return [t`${swapTokenInfo.symbol} pool exceeded, try different token`, true];
        }
      }
    }

    if (!isBuying) {
      if (maxSellAmount && ulpAmount && ulpAmount.gt(maxSellAmount)) {
        return [t`Insufficient ULP balance`];
      }

      const swapTokenInfo = getTokenInfo(infoTokens, swapTokenAddress);
      if (
        swapTokenInfo &&
        swapTokenInfo.availableAmount &&
        swapAmount &&
        swapAmount.gt(swapTokenInfo.availableAmount)
      ) {
        return [t`Insufficient liquidity`];
      }
    }

    return [false];
  };

  const isPrimaryEnabled = () => {
    if (IS_NETWORK_DISABLED[chainId]) {
      return false;
    }
    if (!active) {
      return true;
    }
    const [error, modal] = getError();
    if (error && !modal) {
      return false;
    }
    if ((needApproval && isWaitingForApproval) || isApproving) {
      return false;
    }
    if (isApproving) {
      return false;
    }
    if (isSubmitting) {
      return false;
    }
    if (isBuying && isSwapTokenCapReached) {
      return false;
    }

    return true;
  };

  const getPrimaryText = () => {
    if (!active) {
      return t`Connect Wallet`;
    }
    const [error, modal] = getError();
    if (error && !modal) {
      return error;
    }
    if (isBuying && isSwapTokenCapReached) {
      return t`Max Capacity for ${swapToken.symbol} Reached`;
    }

    if (needApproval && isWaitingForApproval) {
      return t`Waiting for Approval`;
    }
    if (isApproving) {
      return t`Approving ${swapToken.symbol}...`;
    }
    if (needApproval) {
      return t`Approve ${swapToken.symbol}`;
    }

    if (isSubmitting) {
      return isBuying ? t`Buying...` : t`Selling...`;
    }

    return isBuying ? t`Buy ULP` : t`Sell ULP`;
  };

  const approveFromToken = () => {
    approveTokens({
      setIsApproving,
      library,
      tokenAddress: swapToken.address,
      spender: ulpManagerAddress,
      chainId: chainId,
      onApproveSubmitted: () => {
        setIsWaitingForApproval(true);
      },
      infoTokens,
      getTokenInfo,
    });
  };

  const buyUlp = () => {
    setIsSubmitting(true);
    const contract = new ethers.Contract(ulpRewardRouterAddress, RewardRouter.abi, library.getSigner());
    const method = swapTokenAddress === AddressZero ? "mintAndStakeUlpETH" : "mintAndStakeUlp";
    const params = swapTokenAddress === AddressZero ? [0, 0] : [swapTokenAddress, swapAmount, 0, 0];
    const value = swapTokenAddress === AddressZero ? swapAmount : 0;

    callContract(chainId, contract, method, params, {
      value,
      sentMsg: t`Buy submitted.`,
      failMsg: t`Buy failed.`,
      successMsg: t`${formatAmount(ulpAmount, 18, 4, true)} ULP bought with ${formatAmount(
        swapAmount,
        swapTokenInfo.decimals,
        4,
        true
      )} ${swapTokenInfo.symbol}!`,
      setPendingTxns,
    })
      .then(async () => {})
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const sellUlp = () => {
    setIsSubmitting(true);
    const contract = new ethers.Contract(ulpRewardRouterAddress, RewardRouter.abi, library.getSigner());
    const method = swapTokenAddress === AddressZero ? "unstakeAndRedeemUlpETH" : "unstakeAndRedeemUlp";
    const params =
      swapTokenAddress === AddressZero ? [ulpAmount, 0, account] : [swapTokenAddress, ulpAmount, 0, account];

    callContract(chainId, contract, method, params, {
      sentMsg: t`Sell submitted!`,
      failMsg: t`Sell failed.`,
      successMsg: t`${formatAmount(ulpAmount, 18, 4, true)} ULP sold for ${formatAmount(
        swapAmount,
        swapTokenInfo.decimals,
        4,
        true
      )} ${swapTokenInfo.symbol}!`,
      setPendingTxns,
    })
      .then(async () => {})
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const onClickPrimary = () => {
    if (!active) {
      connectWallet();
      return;
    }

    if (needApproval) {
      approveFromToken();
      return;
    }

    const [, modal] = getError();

    if (modal) {
      setModalError(true);
      return;
    }

    if (isBuying) {
      buyUlp();
    } else {
      sellUlp();
    }
  };

  let payLabel = t`Pay`;
  let receiveLabel = t`Receive`;
  let payBalance = "$0.00";
  let receiveBalance = "$0.00";
  if (isBuying) {
    if (swapUsdMin) {
      payBalance = `$${formatAmount(swapUsdMin, USD_DECIMALS, 2, true)}`;
    }
    if (ulpUsdMax) {
      receiveBalance = `$${formatAmount(ulpUsdMax, USD_DECIMALS, 2, true)}`;
    }
  } else {
    if (ulpUsdMax) {
      payBalance = `$${formatAmount(ulpUsdMax, USD_DECIMALS, 2, true)}`;
    }
    if (swapUsdMin) {
      receiveBalance = `$${formatAmount(swapUsdMin, USD_DECIMALS, 2, true)}`;
    }
  }

  const selectToken = (token) => {
    setAnchorOnSwapAmount(false);
    setSwapTokenAddress(token.address);
    helperToast.success(t`${token.symbol} selected in order form`);
  };

  let feePercentageText = formatAmount(feeBasisPoints, 2, 2, true, "0.0");
  if (feeBasisPoints !== undefined && feeBasisPoints.toString().length > 0) {
    feePercentageText += "%";
  }

  const onSwapOptionChange = (opt) => {
    if (opt === t`Sell ULP`) {
      switchSwapOption("redeem");
    } else {
      switchSwapOption();
    }
  };

  return (
    <div className="UlpSwap style-form-buy-sell">
      <SwapErrorModal
        isVisible={Boolean(modalError)}
        setIsVisible={setModalError}
        swapToken={swapToken}
        chainId={chainId}
        ulpAmount={ulpAmount}
        usdgSupply={usdgSupply}
        totalTokenWeights={totalTokenWeights}
        ulpPrice={ulpPrice}
        infoTokens={infoTokens}
        swapUsdMin={swapUsdMin}
      />
      <div
        className="UlpSwap-content"
        style={{
          height: "fit-content",
        }}
      >
        <div
          className="App-card UlpSwap-stats-card"
          style={{
            padding: "0px",
            border: "none",
          }}
        >
          <div
            className="App-card-content"
            style={{
              padding: "16px 24px 24px 24px",
              background: "var(--bg-default)",
              boxShadow: "4px 4px 0px 0px #090D13",
              borderRadius: "6px",
              marginTop: "0px",
            }}
          >
            <div className="App-card-title">
              <div className="App-card-title-mark" style={{ alignItems: "center", alignContent: "center" }}>
                <div className="App-card-title-mark-icon">
                  <img width="40" src={ulpIcon} alt="ULP" />
                </div>
                <div className="App-card-title-mark-info">
                  <div className="App-card-title-mark-title">ULP</div>
                </div>
                {/* <div>
              </div> */}
              </div>
              <div
                style={{
                  position: "relative",
                  width: "160px",
                }}
              >
                <AssetDropdown assetSymbol="ULP" marginLeft="auto" />
              </div>
            </div>
            <div className="App-card-divider" style={{ marginTop: 0 }} />
            <div
              className="App-card-row"
              style={{
                justifyContent: "space-between",
              }}
            >
              <div className="label fz-base fw-400 text-secondary">
                <Trans>ULP Price</Trans>
              </div>
              <div
                className="value fw-600 text-primary"
                style={{
                  fontSize: "1.8rem",
                }}
              >
                ${formatAmount(ulpPrice, USD_DECIMALS, 3, true)}
              </div>
            </div>

            <div
              className="App-card-row"
              style={{
                justifyContent: "space-between",
              }}
            >
              <div className="label fz-base fw-400 text-secondary">
                <Trans>Total Supply</Trans>
              </div>
              <div
                className="value fw-600 text-primary"
                style={{
                  fontSize: "1.8rem",
                }}
              >
                <Trans>{formatAmount(ulpSupply, ULP_DECIMALS, 4, true)} ULP</Trans>
              </div>
            </div>
          </div>
          <div
            className="App-card-content"
            style={{
              marginTop: "16px",
              padding: "16px 24px 24px 24px",
              background: "var(--bg-default)",
              boxShadow: "4px 4px 0px 0px #090D13",
              borderRadius: "6px",
            }}
          >
            {!isBuying && (
              <div
                className="App-card-row"
                style={{
                  justifyContent: "space-between",
                }}
              >
                <div className="label fz-base fw-400 text-secondary">
                  <Trans>Reserved</Trans>
                </div>
                <div
                  className="value fw-600 text-primary"
                  style={{
                    fontSize: "1.8rem",
                  }}
                >
                  {formatAmount(reservedAmount, 18, 4, true)} ULP
                </div>
              </div>
            )}
            <div
              className="App-card-row"
              style={{
                justifyContent: "space-between",
              }}
            >
              <div className="label fz-base fw-400 text-secondary">
                <Trans>APR</Trans>
              </div>
              <div
                className="value fw-600 text-warning "
                style={{
                  fontSize: "1.8rem",
                }}
              >
                {formatAmount(totalApr, 2, 2, true)}%
              </div>
            </div>
            <div
              className="App-card-row"
              style={{
                justifyContent: "space-between",
              }}
            >
              <div className="label fz-base fw-400 text-secondary">
                <Trans>Wallet</Trans>
              </div>
              <div
                className="value fw-600 text-primary"
                style={{
                  fontSize: "1.8rem",
                }}
              >
                {formatAmount(ulpBalance, ULP_DECIMALS, 4, true)} ULP
              </div>
            </div>
            <div
              className="App-card-row"
              style={{
                justifyContent: "space-between",
              }}
            >
              <div className="label fz-base fw-400 text-secondary">
                <Trans>Staked</Trans>
              </div>
              <div
                className="value fw-600 text-primary"
                style={{
                  fontSize: "1.8rem",
                }}
              >
                {formatAmount(ulpBalance, ULP_DECIMALS, 4, true)}
              </div>
            </div>
          </div>
        </div>
        <div
          className="UlpSwap-box App-box"
          style={{
            background: "var(--bg-default)",
            boxShadow: "4px 4px 0px 0px #090D13",
            borderRadius: "6px",
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onClickPrimary();
            }}
          >
            <Tab
              options={[t`Buy ULP`, t`Sell ULP`]}
              option={tabLabel}
              onChange={onSwapOptionChange}
              className="Exchange-swap-option-tabs"
            />
            {isBuying && (
              <BuyInputSection
                topLeftLabel={payLabel}
                topRightLabel={t`Balance`}
                tokenBalance={`${formatAmount(swapTokenBalance, swapToken.decimals, 4, true)}`}
                inputValue={swapValue}
                onInputValueChange={onSwapValueChange}
                showMaxButton={swapValue !== formatAmountFree(swapTokenBalance, swapToken.decimals, swapToken.decimals)}
                onClickTopRightLabel={fillMaxAmount}
                onClickMax={fillMaxAmount}
                selectedToken={swapToken}
                balance={payBalance}
              >
                <div
                  style={{
                    background: "var(--bg-primary)",
                    padding: "0px 8px",
                    borderRadius: "6px",
                  }}
                >
                  <TokenSelector
                    label={t`Pay`}
                    chainId={chainId}
                    tokenAddress={swapTokenAddress}
                    onSelectToken={onSelectSwapToken}
                    tokens={whitelistedTokens}
                    infoTokens={infoTokens}
                    className="UlpSwap-from-token"
                    showSymbolImage={true}
                    showTokenImgInDropdown={true}
                  />
                </div>
              </BuyInputSection>
            )}

            {!isBuying && (
              <BuyInputSection
                topLeftLabel={payLabel}
                topRightLabel={t`Available`}
                tokenBalance={`${formatAmount(maxSellAmount, ULP_DECIMALS, 4, true)}`}
                inputValue={ulpValue}
                onInputValueChange={onulpValueChange}
                showMaxButton={ulpValue !== formatAmountFree(maxSellAmount, ULP_DECIMALS, ULP_DECIMALS)}
                onClickTopRightLabel={fillMaxAmount}
                onClickMax={fillMaxAmount}
                balance={payBalance}
                defaultTokenName={"ULP"}
              >
                <div className="selected-token">ULP</div>
              </BuyInputSection>
            )}

            <div className="AppOrder-ball-container">
              <button
                type="button"
                className="AppOrder-ball"
                onClick={() => {
                  setIsBuying(!isBuying);
                  switchSwapOption(isBuying ? "redeem" : "");
                }}
              >
                <IoArrowDown className="AppOrder-ball-icon" />
              </button>
            </div>

            {isBuying && (
              <BuyInputSection
                topLeftLabel={receiveLabel}
                topRightLabel={t`Balance`}
                tokenBalance={`${formatAmount(ulpBalance, ULP_DECIMALS, 4, true)}`}
                inputValue={ulpValue}
                onInputValueChange={onulpValueChange}
                balance={receiveBalance}
                defaultTokenName={"ULP"}
              >
                <div className="selected-token">ULP</div>
              </BuyInputSection>
            )}

            {!isBuying && (
              <BuyInputSection
                topLeftLabel={receiveLabel}
                topRightLabel={t`Balance`}
                tokenBalance={`${formatAmount(swapTokenBalance, swapToken.decimals, 4, true)}`}
                inputValue={swapValue}
                onInputValueChange={onSwapValueChange}
                balance={receiveBalance}
                selectedToken={swapToken}
              >
                <div
                  style={{
                    background: "var(--bg-primary)",
                    padding: "0px 8px",
                    borderRadius: "6px",
                  }}
                >
                  <TokenSelector
                    label={t`Receive`}
                    chainId={chainId}
                    tokenAddress={swapTokenAddress}
                    onSelectToken={onSelectSwapToken}
                    tokens={whitelistedTokens}
                    infoTokens={infoTokens}
                    className="UlpSwap-from-token"
                    showSymbolImage={true}
                    showTokenImgInDropdown={true}
                  />
                </div>
              </BuyInputSection>
            )}

            <div>
              <div className="Exchange-info-row">
                <div className="Exchange-info-label fz-base fw-400 text-secondary">
                  {isFeesHigh ? t`WARNING: High Fees` : t`Fees`}
                </div>
                <div className="align-right fee-block fz-base fw-400 text-primary">
                  {isBuying && (
                    <Tooltip
                      handle={isBuying && isSwapTokenCapReached ? "NA" : feePercentageText}
                      position="right-bottom"
                      renderContent={() => {
                        if (!feeBasisPoints) {
                          return (
                            <div className="text-white">
                              <Trans>Fees will be shown once you have entered an amount in the order form.</Trans>
                            </div>
                          );
                        }
                        return (
                          <div className="text-white">
                            {isFeesHigh && <Trans>To reduce fees, select a different asset to pay with.</Trans>}
                            <Trans>Check the "Save on Fees" section below to get the lowest fee percentages.</Trans>
                          </div>
                        );
                      }}
                    />
                  )}
                  {!isBuying && (
                    <Tooltip
                      handle={feePercentageText}
                      position="right-bottom"
                      renderContent={() => {
                        if (!feeBasisPoints) {
                          return (
                            <div className="text-white">
                              <Trans>Fees will be shown once you have entered an amount in the order form.</Trans>
                            </div>
                          );
                        }
                        return (
                          <div className="text-white">
                            {isFeesHigh && <Trans>To reduce fees, select a different asset to receive.</Trans>}
                            <Trans>Check the "Save on Fees" section below to get the lowest fee percentages.</Trans>
                          </div>
                        );
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: "20px",
              }}
              className="UlpSwap-cta Exchange-swap-button-container"
            >
              <Button type="submit" variant="brand-action" className="w-full" disabled={!isPrimaryEnabled()}>
                {getPrimaryText()}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="Tab-title-section">
        <div className="Page-title fz-xl fw-600 text-primary">
          <Trans>Fee Compare</Trans>
        </div>
        {isBuying && (
          <div className="Page-description">
            <Trans>
              Fees may vary depending on which asset you use to buy ULP <br />
              Enter the amount of ULP you want to purchase in the order form, then check here to compare fees.
            </Trans>
          </div>
        )}
        {!isBuying && (
          <div className="Page-description">
            <Trans>
              Fees may vary depending on which asset you sell ULP for. <br />
              Enter the amount of ULP you want to redeem in the order form, then check here to compare fees.
            </Trans>
          </div>
        )}
      </div>
      <div className="UlpSwap-token-list">
        {/* <div className="UlpSwap-token-list-content"> */}
        <table className="token-table">
          <thead>
            <tr>
              <th className="fz-sm fw-400 text-secondary">
                <Trans>Token</Trans>
              </th>
              <th className="fz-sm fw-400 text-secondary">
                <Trans>Price</Trans>
              </th>
              <th className="fz-sm fw-400 text-secondary">
                {isBuying ? (
                  <Tooltip
                    handle={t`Pool`}
                    tooltipIconPosition="right"
                    position="right-bottom text-none"
                    renderContent={() => (
                      <p className="text-white">
                        <Trans>Available amount to deposit into ULP.</Trans>
                      </p>
                    )}
                  />
                ) : (
                  <Tooltip
                    handle={t`Pool`}
                    tooltipIconPosition="right"
                    position="center-bottom text-none"
                    renderContent={() => {
                      return (
                        <p className="text-white">
                          <Trans>
                            Available amount to withdraw from ULP. Funds not utilized by current open positions.
                          </Trans>
                        </p>
                      );
                    }}
                  />
                )}
              </th>
              <th className="fz-sm fw-400 text-secondary">
                <Trans>Wallet</Trans>
              </th>
              <th className="fz-sm fw-400 text-secondary">
                <Tooltip
                  handle={t`Fees`}
                  tooltipIconPosition="right"
                  position="right-bottom text-none"
                  renderContent={() => {
                    return (
                      <div className="text-white">
                        <Trans>Fees will be shown once you have entered an amount in the order form.</Trans>
                      </div>
                    );
                  }}
                />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {visibleTokens.map((token) => {
              let tokenFeeBps;
              if (isBuying) {
                const { feeBasisPoints: feeBps } = getBuyUlpFromAmount(
                  ulpAmount,
                  token.address,
                  infoTokens,
                  ulpPrice,
                  usdgSupply,
                  totalTokenWeights
                );
                tokenFeeBps = feeBps;
              } else {
                const { feeBasisPoints: feeBps } = getSellUlpToAmount(
                  ulpAmount,
                  token.address,
                  infoTokens,
                  ulpPrice,
                  usdgSupply,
                  totalTokenWeights
                );
                tokenFeeBps = feeBps;
              }
              const tokenInfo = getTokenInfo(infoTokens, token.address);
              let managedUsd;
              if (tokenInfo && tokenInfo.managedUsd) {
                managedUsd = tokenInfo.managedUsd;
              }
              let availableAmountUsd;
              if (tokenInfo && tokenInfo.minPrice && tokenInfo.availableAmount) {
                availableAmountUsd = tokenInfo.availableAmount
                  .mul(tokenInfo.minPrice)
                  .div(expandDecimals(1, token.decimals));
              }
              let balanceUsd;
              if (tokenInfo && tokenInfo.minPrice && tokenInfo.balance) {
                balanceUsd = tokenInfo.balance.mul(tokenInfo.minPrice).div(expandDecimals(1, token.decimals));
              }
              const tokenImage = token?.imageUrl;
              let isCapReached = tokenInfo.managedAmount?.gt(tokenInfo.maxUsdgAmount);

              let amountLeftToDeposit = bigNumberify(0);
              if (tokenInfo.maxUsdgAmount && tokenInfo.maxUsdgAmount.gt(0)) {
                amountLeftToDeposit = tokenInfo.maxUsdgAmount
                  .sub(tokenInfo.usdgAmount)
                  .mul(expandDecimals(1, USD_DECIMALS))
                  .div(expandDecimals(1, USDG_DECIMALS));
              }
              if (amountLeftToDeposit.lt(0)) {
                amountLeftToDeposit = bigNumberify(0);
              }
              function renderFees() {
                const swapUrl = `https://app.1inch.io/#/${chainId}/swap/`;
                switch (true) {
                  case (isBuying && isCapReached) || (!isBuying && managedUsd?.lt(1)):
                    return (
                      <Tooltip
                        handle="0.0"
                        position="right-bottom"
                        renderContent={() => (
                          <div className="text-white">
                            <Trans>
                              Max pool capacity reached for {tokenInfo.symbol}
                              <br />
                              <br />
                              Please mint ULP using another token
                            </Trans>
                            <br />
                            <p>
                              <ExternalLink href={swapUrl}>
                                <Trans> Swap {tokenInfo.symbol} on 1inch</Trans>
                              </ExternalLink>
                            </p>
                          </div>
                        )}
                      />
                    );
                  case (isBuying && !isCapReached) || (!isBuying && managedUsd?.gt(0)):
                    return `${formatAmount(tokenFeeBps, 2, 2, true, "-")}${
                      tokenFeeBps !== undefined && tokenFeeBps.toString().length > 0 ? "%" : ""
                    }`;
                  default:
                    return "";
                }
              }

              return (
                <tr key={token.symbol}>
                  <td>
                    <div className="App-card-title-info">
                      <div className="App-card-title-info-icon">
                        <img src={tokenImage} alt={token.symbol} width="28" height={"28"} />
                      </div>
                      <div className="App-card-title-info-text">
                        <div className="App-card-info-title fz-base fw-500 text-primary">{token.name}</div>
                        <div
                          className="App-card-info-subtitle  fw-400 text-secondary"
                          style={{
                            fontSize: "1.2rem",
                          }}
                        >
                          {token.symbol}
                        </div>
                      </div>
                      <div>
                        <AssetDropdown assetSymbol={token.symbol} assetInfo={token} />
                      </div>
                    </div>
                  </td>
                  <td className="fz-base fw-500 text-primary">
                    ${formatKeyAmount(tokenInfo, "minPrice", USD_DECIMALS, 2, true)}
                  </td>
                  <td>
                    {isBuying && (
                      <div className="fz-base fw-500 text-primary">
                        <Tooltip
                          handle={
                            amountLeftToDeposit && amountLeftToDeposit.lt(0)
                              ? "$0.00"
                              : `$${formatAmount(amountLeftToDeposit, USD_DECIMALS, 2, true)}`
                          }
                          className="nowrap"
                          position="right-bottom"
                          tooltipIconPosition="right"
                          renderContent={() => getTooltipContent(managedUsd, tokenInfo, token)}
                        />
                      </div>
                    )}
                    {!isBuying && (
                      <div className="fz-base fw-500 text-primary">
                        <Tooltip
                          handle={
                            availableAmountUsd && availableAmountUsd.lt(0)
                              ? "$0.00"
                              : `$${formatAmount(availableAmountUsd, USD_DECIMALS, 2, true)}`
                          }
                          className="nowrap"
                          position="right-bottom"
                          tooltipIconPosition="right"
                          renderContent={() => getTooltipContent(managedUsd, tokenInfo, token)}
                        />
                      </div>
                    )}
                  </td>
                  <td className="fz-base fw-500 text-primary">
                    {formatKeyAmount(tokenInfo, "balance", tokenInfo.decimals, 2, true)} {tokenInfo.symbol} ($
                    {formatAmount(balanceUsd, USD_DECIMALS, 2, true)})
                  </td>
                  <td className="fz-base fw-500 text-primary">{renderFees()}</td>
                  <td>
                    <Button
                      variant="secondary"
                      className={`${cx("w-full", isBuying ? "buying" : "selling")} fz-sm text-primary fw-500`}
                      onClick={() => selectToken(token)}
                      style={{
                        background: "transparent",
                        border: "1px solid var(--bg-tertiary)",
                      }}
                    >
                      {isBuying ? t`Buy with ${token.symbol}` : t`Sell for ${token.symbol}`}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="token-grid">
          {visibleTokens.map((token) => {
            let tokenFeeBps;
            if (isBuying) {
              const { feeBasisPoints: feeBps } = getBuyUlpFromAmount(
                ulpAmount,
                token.address,
                infoTokens,
                ulpPrice,
                usdgSupply,
                totalTokenWeights
              );
              tokenFeeBps = feeBps;
            } else {
              const { feeBasisPoints: feeBps } = getSellUlpToAmount(
                ulpAmount,
                token.address,
                infoTokens,
                ulpPrice,
                usdgSupply,
                totalTokenWeights
              );
              tokenFeeBps = feeBps;
            }
            const tokenInfo = getTokenInfo(infoTokens, token.address);
            let managedUsd;
            if (tokenInfo && tokenInfo.managedUsd) {
              managedUsd = tokenInfo.managedUsd;
            }
            let availableAmountUsd;
            if (tokenInfo && tokenInfo.minPrice && tokenInfo.availableAmount) {
              availableAmountUsd = tokenInfo.availableAmount
                .mul(tokenInfo.minPrice)
                .div(expandDecimals(1, token.decimals));
            }
            let balanceUsd;
            if (tokenInfo && tokenInfo.minPrice && tokenInfo.balance) {
              balanceUsd = tokenInfo.balance.mul(tokenInfo.minPrice).div(expandDecimals(1, token.decimals));
            }

            let amountLeftToDeposit = bigNumberify(0);
            if (tokenInfo.maxUsdgAmount && tokenInfo.maxUsdgAmount.gt(0)) {
              amountLeftToDeposit = tokenInfo.maxUsdgAmount
                .sub(tokenInfo.usdgAmount)
                .mul(expandDecimals(1, USD_DECIMALS))
                .div(expandDecimals(1, USDG_DECIMALS));
            }
            if (amountLeftToDeposit.lt(0)) {
              amountLeftToDeposit = bigNumberify(0);
            }
            let isCapReached = tokenInfo.managedAmount?.gt(tokenInfo.maxUsdgAmount);

            function renderFees() {
              switch (true) {
                case (isBuying && isCapReached) || (!isBuying && managedUsd?.lt(1)):
                  return (
                    <Tooltip
                      handle="0.0"
                      position="right-bottom"
                      renderContent={() => (
                        <Trans>
                          Max pool capacity reached for {tokenInfo.symbol}. Please mint ULP using another token
                        </Trans>
                      )}
                    />
                  );
                case (isBuying && !isCapReached) || (!isBuying && managedUsd?.gt(0)):
                  return `${formatAmount(tokenFeeBps, 2, 2, true, "0.00%")}${
                    tokenFeeBps !== undefined && tokenFeeBps.toString().length > 0 ? "%" : ""
                  }`;
                default:
                  return "";
              }
            }
            const tokenImage = token?.imageUrl;
            return (
              <div
                className="App-card"
                key={token.symbol}
                style={{
                  boxShadow: "4px 4px 0px 0px #090D13",
                  background: "var(--bg-default)",
                }}
              >
                <div
                  className="mobile-token-card"
                  style={{
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={tokenImage} alt={token.symbol} width="20px" />
                    <div style={{ paddingLeft: "8px" }} className="token-symbol-text">
                      {token.symbol}
                    </div>
                    <div>
                      <AssetDropdown assetSymbol={token.symbol} assetInfo={token} />
                    </div>
                  </div>
                  <div className="App-card-row fz-base fw-400">
                    Fees
                    <div>{renderFees()}</div>
                  </div>
                </div>
                <div className="App-card-divider" />
                <div className="App-card-content">
                  <div
                    className="App-card-row"
                    style={{
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="label fz-base fw-400 text-secondary">
                      <Trans>Price</Trans>
                    </div>
                    <div>${formatKeyAmount(tokenInfo, "minPrice", USD_DECIMALS, 2, true)}</div>
                  </div>
                  {/* {isBuying && (
                    <div className="App-card-row" style={{
                      justifyContent: 'space-between'
                    }}>
                      <Tooltip
                        handle={t`Balance`}
                        position="left-bottom"
                        className="label  fz-base fw-400 text-secondary"
                        renderContent={() => (
                          <p className="text-white">
                            <Trans>Available amount to deposit into ULP.</Trans>
                          </p>
                        )}
                      />
                      <div className="fz-base fw-400 text-secondary">
                        <Tooltip
                          handle={amountLeftToDeposit && `$${formatAmount(amountLeftToDeposit, USD_DECIMALS, 2, true)}`}
                          position="right-bottom"
                          tooltipIconPosition="right"
                          renderContent={() => getTooltipContent(managedUsd, tokenInfo, token)}
                        />
                      </div>
                    </div>
                  )} */}
                  {/* {!isBuying && (
                    <div className="App-card-row" style={{
                      justifyContent: 'space-between'
                    }}>
                      <div className="label fz-base fw-400 text-secondary">
                        <Tooltip
                          handle={t`Balance`}
                          className="fz-base fw-400 text-secondary"
                          position="left-bottom"
                          renderContent={() => {
                            return (
                              <p className="text-white">
                                <Trans>
                                  Available amount to withdraw from ULP. Funds not utilized by current open positions.
                                </Trans>
                              </p>
                            );
                          }}
                        />
                      </div>

                      <div className="fz-base fw-400 text-secondary">
                        <Tooltip
                          handle={
                            availableAmountUsd && availableAmountUsd.lt(0)
                              ? "$0.00"
                              : `$${formatAmount(availableAmountUsd, USD_DECIMALS, 2, true)}`
                          }
                          position="right-bottom"
                          tooltipIconPosition="right"
                          renderContent={() => getTooltipContent(managedUsd, tokenInfo, token)}
                        />
                      </div>
                    </div>
                  )} */}
                  <div
                    className="App-card-row"
                    style={{
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="label fz-base fw-400 text-secondary">
                      <Trans>Pool</Trans>
                    </div>
                    <div>
                      {!isBuying
                        ? availableAmountUsd && availableAmountUsd.lt(0)
                          ? "$0.00"
                          : `$${formatAmount(availableAmountUsd, USD_DECIMALS, 2, true)}`
                        : amountLeftToDeposit && amountLeftToDeposit.lt(0)
                        ? "$0.00"
                        : `$${formatAmount(amountLeftToDeposit, USD_DECIMALS, 2, true)}`}
                    </div>
                  </div>
                  <div className="App-card-divider"></div>

                  <div
                    className="App-card-row"
                    style={{
                      justifyContent: "space-between",
                    }}
                  >
                    <div className="label fz-base fw-400 text-secondary">
                      <Trans>Balance</Trans>
                    </div>
                    <div>
                      {formatKeyAmount(tokenInfo, "balance", tokenInfo.decimals, 2, true)} {tokenInfo.symbol} ($
                      {formatAmount(balanceUsd, USD_DECIMALS, 2, true)})
                    </div>
                  </div>

                  <div
                    className="App-card-options"
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    {isBuying && (
                      <Button
                        style={{
                          width: "100%",
                          height: "44px",
                          background: "transparent",
                          border: "1px solid var(--bg-tertiary)",
                        }}
                        className="fz-base fw-500 text-primary"
                        variant="secondary"
                        onClick={() => selectToken(token)}
                      >
                        <Trans>Buy with {token.symbol}</Trans>
                      </Button>
                    )}
                    {!isBuying && (
                      <Button
                        style={{
                          width: "100%",
                          height: "44px",
                          background: "transparent",
                          border: "1px solid var(--bg-tertiary)",
                        }}
                        className="fz-base fw-500 text-primary"
                        variant="secondary"
                        onClick={() => selectToken(token)}
                      >
                        <Trans>Sell for {token.symbol}</Trans>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
