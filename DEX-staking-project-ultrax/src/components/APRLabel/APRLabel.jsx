import React from "react";

import useSWR from "swr";

import {
  PLACEHOLDER_ACCOUNT,
  getBalanceAndSupplyData,
  getDepositBalanceData,
  getVestingData,
  getStakingData,
  getProcessedData,
} from "lib/legacy";

import Vault from "abis/Vault.json";
import ReaderV2 from "abis/ReaderV2.json";
import RewardReader from "abis/RewardReader.json";
import Token from "abis/Token.json";
import UlpManager from "abis/UlpManager.json";

import { useWeb3React } from "@web3-react/core";

import { usePriceUTX } from "lib/useGetPriceToken";

import { getContract } from "config/contracts";
import { contractFetcher } from "lib/contracts";
import { formatKeyAmount } from "lib/numbers";

export default function APRLabel({ chainId, label }) {
  let { active } = useWeb3React();

  const rewardReaderAddress = getContract(chainId, "RewardReader");
  const readerAddress = getContract(chainId, "Reader");

  const vaultAddress = getContract(chainId, "Vault");
  const nativeTokenAddress = getContract(chainId, "NATIVE_TOKEN");
  const utxAddress = getContract(chainId, "UTX");
  const esUtxAddress = getContract(chainId, "ES_UTX");
  const bnUtxAddress = getContract(chainId, "BN_UTX");
  const ulpAddress = getContract(chainId, "ULP");

  const stakedUtxTrackerAddress = getContract(chainId, "StakedUtxTracker");
  const bonusUtxTrackerAddress = getContract(chainId, "BonusUtxTracker");
  const feeUtxTrackerAddress = getContract(chainId, "FeeUtxTracker");

  const stakedUlpTrackerAddress = getContract(chainId, "StakedUlpTracker");
  const feeUlpTrackerAddress = getContract(chainId, "feeUlpTracker");

  const ulpManagerAddress = getContract(chainId, "UlpManager");

  const utxVesterAddress = getContract(chainId, "UtxVester");
  const ulpVesterAddress = getContract(chainId, "UlpVester");

  const vesterAddresses = [utxVesterAddress, ulpVesterAddress];

  const walletTokens = [utxAddress, esUtxAddress, ulpAddress, stakedUtxTrackerAddress];
  const depositTokens = [
    utxAddress,
    esUtxAddress,
    stakedUtxTrackerAddress,
    bonusUtxTrackerAddress,
    bnUtxAddress,
    ulpAddress,
  ];
  const rewardTrackersForDepositBalances = [
    stakedUtxTrackerAddress,
    stakedUtxTrackerAddress,
    bonusUtxTrackerAddress,
    feeUtxTrackerAddress,
    feeUtxTrackerAddress,
    feeUlpTrackerAddress,
  ];
  const rewardTrackersForStakingInfo = [
    stakedUtxTrackerAddress,
    bonusUtxTrackerAddress,
    feeUtxTrackerAddress,
    stakedUlpTrackerAddress,
    feeUlpTrackerAddress,
  ];

  const { data: walletBalances } = useSWR(
    [`StakeV2:walletBalances:${active}`, chainId, readerAddress, "getTokenBalancesWithSupplies", PLACEHOLDER_ACCOUNT],
    {
      fetcher: contractFetcher(undefined, ReaderV2, [walletTokens]),
    }
  );

  const { data: depositBalances } = useSWR(
    [`StakeV2:depositBalances:${active}`, chainId, rewardReaderAddress, "getDepositBalances", PLACEHOLDER_ACCOUNT],
    {
      fetcher: contractFetcher(undefined, RewardReader, [depositTokens, rewardTrackersForDepositBalances]),
    }
  );

  const { data: stakingInfo } = useSWR(
    [`StakeV2:stakingInfo:${active}`, chainId, rewardReaderAddress, "getStakingInfo", PLACEHOLDER_ACCOUNT],
    {
      fetcher: contractFetcher(undefined, RewardReader, [rewardTrackersForStakingInfo]),
    }
  );

  const { data: stakedUtxSupply } = useSWR(
    [`StakeV2:stakedUtxSupply:${active}`, chainId, utxAddress, "balanceOf", stakedUtxTrackerAddress],
    {
      fetcher: contractFetcher(undefined, Token),
    }
  );

  const { data: aums } = useSWR([`StakeV2:getAums:${active}`, chainId, ulpManagerAddress, "getAums"], {
    fetcher: contractFetcher(undefined, UlpManager),
  });

  const { data: nativeTokenPrice } = useSWR(
    [`StakeV2:nativeTokenPrice:${active}`, chainId, vaultAddress, "getMinPrice", nativeTokenAddress],
    {
      fetcher: contractFetcher(undefined, Vault),
    }
  );

  const { data: vestingInfo } = useSWR(
    [`StakeV2:vestingInfo:${active}`, chainId, readerAddress, "getVestingInfoV2", PLACEHOLDER_ACCOUNT],
    {
      fetcher: contractFetcher(undefined, ReaderV2, [vesterAddresses]),
    }
  );

  const utxPrice = usePriceUTX();

  const utxSupplyUrl = "https://gmx-server-mainnet.uw.r.appspot.com/gmx_supply";
  // REMEMBER REOPEN
  // getServerUrl(chainId, "/gmx_supply");
  const { data: utxSupply } = useSWR([utxSupplyUrl], {
    fetcher: (...args) => fetch(...args).then((res) => res.text()),
  });

  let aum;
  if (aums && aums.length > 0) {
    aum = aums[0].add(aums[1]).div(2);
  }

  const { balanceData, supplyData } = getBalanceAndSupplyData(walletBalances);
  const depositBalanceData = getDepositBalanceData(depositBalances);
  const stakingData = getStakingData(stakingInfo);
  const vestingData = getVestingData(vestingInfo);

  const processedData = getProcessedData(
    balanceData,
    supplyData,
    depositBalanceData,
    stakingData,
    vestingData,
    aum,
    nativeTokenPrice,
    stakedUtxSupply,
    utxPrice,
    utxSupply
  );

  return <>{`${formatKeyAmount(processedData, label, 2, 2, true)}%`}</>;
}
