import React, { useState, useCallback } from "react";
import { Trans, t } from "@lingui/macro";
import { useWeb3React } from "@web3-react/core";
import { Link } from "react-router-dom";
import WETH from "abis/WETH.json";

import { usePriceU2U, usePriceUTX } from "lib/useGetPriceToken";

import Modal from "components/Modal/Modal";
import Checkbox from "components/Checkbox/Checkbox";
import Tooltip from "components/Tooltip/Tooltip";
import Footer from "components/Footer/Footer";

import Vault from "abis/Vault.json";
import ReaderV2 from "abis/ReaderV2.json";
import Vester from "abis/Vester.json";
import RewardRouter from "abis/RewardRouter.json";
import RewardReader from "abis/RewardReader.json";
import Token from "abis/Token.json";
import UlpManager from "abis/UlpManager.json";

import { ethers } from "ethers";
import {
  ULP_DECIMALS,
  USD_DECIMALS,
  BASIS_POINTS_DIVISOR,
  PLACEHOLDER_ACCOUNT,
  getBalanceAndSupplyData,
  getDepositBalanceData,
  getVestingData,
  getStakingData,
  getProcessedData,
  getPageTitle,
} from "lib/legacy";
import { useTotalUtxStaked, useTotalUtxSupply, useTotalU2UStaked } from "domain/legacy";
import { getChainName, getConstant } from "config/chains";
import earn_esutx_icon from "img/earn_esutx_icon.svg";
import dashboard_ulp_icon from "img/dashboard_ulp_icon.svg";
import dashboard_utx_icon from "img/dashboard_utx_icon.svg";
import earn_rewards_icon from "img/earn_rewards_icon.svg";
import earn_multi_icon from "img/earn_multi_icon.svg";
import earn_stake_icon from "img/earn_stake_icon.svg";
import earn_stake_utx_icon from "img/earn_stake_utx_icon.svg";
import earn_stake_ulp_icon from "img/earn_stake_ulp_icon.svg";
import earn_stake_esutx_icon from "img/earn_stake_esutx_icon.svg";
import caret_up from "img/caret_up.svg";
import caret_down from "img/caret_down.svg";
import earn_info_icon from "img/earn_info_icon.svg";

import useSWR from "swr";

import { getContract } from "config/contracts";
import vestUtx from "img/vest-utx.svg";

import "./StakeV2.css";
import SEO from "components/Common/SEO";
import StatsTooltip from "components/StatsTooltip/StatsTooltip";
import StatsTooltipRow from "components/StatsTooltip/StatsTooltipRow";
import { getServerUrl } from "config/backend";
import { callContract, contractFetcher } from "lib/contracts";
import { useLocalStorageSerializeKey } from "lib/localStorage";
import { helperToast } from "lib/helperToast";
import { approveTokens } from "domain/tokens";
import { bigNumberify, expandDecimals, formatAmount, formatAmountFree, formatKeyAmount, parseValue } from "lib/numbers";
import { useChainId } from "lib/chains";
import ExternalLink from "components/ExternalLink/ExternalLink";
import Button from "components/Button/Button";
import TooltipWithPortal from "components/Tooltip/TooltipWithPortal";
import BuyInputSection from "components/BuyInputSection/BuyInputSection";
import UTXAprTooltip from "components/Stake/UTXAprTooltip";
import { Collapse } from "react-collapse";

const { AddressZero } = ethers.constants;

function StakeModal(props) {
  const {
    isVisible,
    setIsVisible,
    chainId,
    title,
    maxAmount,
    value,
    setValue,
    active,
    account,
    library,
    stakingTokenSymbol,
    stakingTokenAddress,
    farmAddress,
    rewardRouterAddress,
    stakeMethodName,
    setPendingTxns,
    isNativeToken,
  } = props;
  const [isStaking, setIsStaking] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  const { data: tokenAllowance } = useSWR(
    active && stakingTokenAddress && [active, chainId, stakingTokenAddress, "allowance", account, farmAddress],
    {
      fetcher: contractFetcher(library, Token),
    }
  );

  let amount = parseValue(value, 18);
  const needApproval = farmAddress !== AddressZero && tokenAllowance && amount && amount.gt(tokenAllowance);

  const getError = () => {
    if (!amount || amount.eq(0)) {
      return t`Enter an amount`;
    }
    if (maxAmount && amount.gt(maxAmount)) {
      return t`Max amount exceeded`;
    }
  };

  const onClickPrimary = () => {
    if (needApproval) {
      approveTokens({
        setIsApproving,
        library,
        tokenAddress: stakingTokenAddress,
        spender: farmAddress,
        chainId,
      });
      return;
    }

    setIsStaking(true);

    const contract = new ethers.Contract(rewardRouterAddress, RewardRouter.abi, library.getSigner());

    const options = {
      sentMsg: t`Stake submitted!`,
      failMsg: t`Stake failed.`,
      setPendingTxns,
    };

    if (isNativeToken) {
      options.value = amount;
    }

    callContract(chainId, contract, stakeMethodName, isNativeToken ? [] : [amount], options)
      .then(async (res) => {
        setIsVisible(false);
      })
      .finally(() => {
        setIsStaking(false);
      });
  };

  const isPrimaryEnabled = () => {
    const error = getError();
    if (error) {
      return false;
    }
    if (isApproving) {
      return false;
    }
    if (isStaking) {
      return false;
    }
    return true;
  };

  const getPrimaryText = () => {
    const error = getError();
    if (error) {
      return error;
    }
    if (isApproving) {
      return t`Approving ${stakingTokenSymbol}...`;
    }
    if (needApproval) {
      return t`Approve ${stakingTokenSymbol}`;
    }
    if (isStaking) {
      return t`Staking...`;
    }
    return t`Stake`;
  };

  return (
    <div className="StakeModal">
      <Modal isVisible={isVisible} setIsVisible={setIsVisible} label={title}>
        <BuyInputSection
          topLeftLabel={t`Amount`}
          topRightLabel={t`Balance`}
          tokenBalance={formatAmount(maxAmount, 18, 4, true)}
          onClickTopRightLabel={() => setValue(formatAmountFree(maxAmount, 18, 18))}
          onClickMax={() => setValue(formatAmountFree(maxAmount, 18, 18))}
          inputValue={value}
          onInputValueChange={(e) => setValue(e.target.value)}
          showMaxButton={true}
        >
          {stakingTokenSymbol}
        </BuyInputSection>

        <div className="Exchange-swap-button-container">
          <Button
            style={{ marginTop: "12px" }}
            variant="primary-action"
            className="w-full"
            onClick={onClickPrimary}
            disabled={!isPrimaryEnabled()}
          >
            {getPrimaryText()}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function UnstakeModal(props) {
  const {
    isVisible,
    setIsVisible,
    chainId,
    title,
    maxAmount,
    value,
    setValue,
    library,
    unstakingTokenSymbol,
    rewardRouterAddress,
    unstakeMethodName,
    multiplierPointsAmount,
    reservedAmount,
    bonusUtxInFeeUtx,
    setPendingTxns,
    isNativeToken,
    account,
  } = props;
  const [isUnstaking, setIsUnstaking] = useState(false);

  let amount = parseValue(value, 18);
  let burnAmount;

  if (
    multiplierPointsAmount &&
    multiplierPointsAmount.gt(0) &&
    amount &&
    amount.gt(0) &&
    bonusUtxInFeeUtx &&
    bonusUtxInFeeUtx.gt(0)
  ) {
    burnAmount = multiplierPointsAmount.mul(amount).div(bonusUtxInFeeUtx);
  }

  const shouldShowReductionAmount = true;
  let rewardReductionBasisPoints;
  if (burnAmount && bonusUtxInFeeUtx) {
    rewardReductionBasisPoints = burnAmount.mul(BASIS_POINTS_DIVISOR).div(bonusUtxInFeeUtx);
  }

  const getError = () => {
    if (!amount) {
      return t`Enter an amount`;
    }
    if (amount.gt(maxAmount)) {
      return t`Max amount exceeded`;
    }
  };

  const onClickPrimary = () => {
    setIsUnstaking(true);
    const contract = new ethers.Contract(rewardRouterAddress, RewardRouter.abi, library.getSigner());

    const options = {
      sentMsg: t`Unstake submitted!`,
      failMsg: t`Unstake failed.`,
      successMsg: t`Unstake completed!`,
      setPendingTxns,
    };

    const param = isNativeToken ? [amount, account] : [amount];

    callContract(chainId, contract, unstakeMethodName, param, options)
      .then(async (res) => {
        setIsVisible(false);
      })
      .finally(() => {
        setIsUnstaking(false);
      });
  };

  const isPrimaryEnabled = () => {
    const error = getError();
    if (error) {
      return false;
    }
    if (isUnstaking) {
      return false;
    }
    return true;
  };

  const getPrimaryText = () => {
    const error = getError();
    if (error) {
      return error;
    }
    if (isUnstaking) {
      return t`Unstaking...`;
    }
    return t`Unstake`;
  };

  return (
    <div className="StakeModal">
      <Modal isVisible={isVisible} setIsVisible={setIsVisible} label={title}>
        <BuyInputSection
          topLeftLabel={t`Amount`}
          topRightLabel={t`Avail.`}
          tokenBalance={formatAmount(maxAmount, 18, 4, true)}
          onClickTopRightLabel={() => setValue(formatAmountFree(maxAmount, 18, 18))}
          onClickMax={() => setValue(formatAmountFree(maxAmount, 18, 18))}
          inputValue={value}
          onInputValueChange={(e) => setValue(e.target.value)}
          showMaxButton={true}
        >
          {unstakingTokenSymbol}
        </BuyInputSection>
        {reservedAmount && reservedAmount.gt(0) && (
          <div className="Modal-note">
            You have {formatAmount(reservedAmount, 18, 2, true)} tokens reserved for vesting.
          </div>
        )}
        {burnAmount && burnAmount.gt(0) && rewardReductionBasisPoints && rewardReductionBasisPoints.gt(0) && (
          <div className="Modal-note">
            <Trans>
              Unstaking will burn&nbsp;
              <ExternalLink className="display-inline" href="https://utxio.gitbook.io/utx/rewards">
                {formatAmount(burnAmount, 18, 4, true)} Multiplier Points
              </ExternalLink>
              .&nbsp;
              {shouldShowReductionAmount && (
                <span>Boost Percentage: -{formatAmount(rewardReductionBasisPoints, 2, 2)}%.</span>
              )}
            </Trans>
          </div>
        )}
        <div className="Exchange-swap-button-container">
          <Button variant="primary-action" className="w-full" onClick={onClickPrimary} disabled={!isPrimaryEnabled()}>
            {getPrimaryText()}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function VesterDepositModal(props) {
  const {
    isVisible,
    setIsVisible,
    chainId,
    title,
    maxAmount,
    value,
    setValue,
    balance,
    vestedAmount,
    averageStakedAmount,
    maxVestableAmount,
    library,
    stakeTokenLabel,
    reserveAmount,
    maxReserveAmount,
    vesterAddress,
    setPendingTxns,
  } = props;
  const [isDepositing, setIsDepositing] = useState(false);

  let amount = parseValue(value, 18);

  let nextReserveAmount = reserveAmount;

  let nextDepositAmount = vestedAmount;
  if (amount) {
    nextDepositAmount = vestedAmount.add(amount);
  }

  let additionalReserveAmount = bigNumberify(0);
  if (amount && averageStakedAmount && maxVestableAmount && maxVestableAmount.gt(0)) {
    nextReserveAmount = nextDepositAmount.mul(averageStakedAmount).div(maxVestableAmount);
    if (nextReserveAmount.gt(reserveAmount)) {
      additionalReserveAmount = nextReserveAmount.sub(reserveAmount);
    }
  }

  const getError = () => {
    if (!amount || amount.eq(0)) {
      return t`Enter an amount`;
    }
    if (maxAmount && amount.gt(maxAmount)) {
      return t`Max amount exceeded`;
    }
    if (nextReserveAmount.gt(maxReserveAmount)) {
      return t`Insufficient staked tokens`;
    }
  };

  const onClickPrimary = () => {
    setIsDepositing(true);
    const contract = new ethers.Contract(vesterAddress, Vester.abi, library.getSigner());

    callContract(chainId, contract, "deposit", [amount], {
      sentMsg: t`Deposit submitted!`,
      failMsg: t`Deposit failed!`,
      successMsg: t`Deposited!`,
      setPendingTxns,
    })
      .then(async (res) => {
        setIsVisible(false);
      })
      .finally(() => {
        setIsDepositing(false);
      });
  };

  const isPrimaryEnabled = () => {
    const error = getError();
    if (error) {
      return false;
    }
    if (isDepositing) {
      return false;
    }
    return true;
  };

  const getPrimaryText = () => {
    const error = getError();
    if (error) {
      return error;
    }
    if (isDepositing) {
      return t`Depositing...`;
    }
    return t`Deposit`;
  };

  return (
    <SEO title={getPageTitle(t`Earn`)}>
      <div
        className="StakeModal"
        style={{
          width: "900px",
        }}
      >
        <Modal isVisible={isVisible} setIsVisible={setIsVisible} label={title} className="non-scrollable">
          <BuyInputSection
            topLeftLabel={t`Deposit`}
            topRightLabel={t`Max`}
            tokenBalance={formatAmount(maxAmount, 18, 4, true)}
            onClickTopRightLabel={() => setValue(formatAmountFree(maxAmount, 18, 18))}
            inputValue={value}
            onInputValueChange={(e) => setValue(e.target.value)}
            showMaxButton={false}
          >
            esUTX
          </BuyInputSection>

          <div className="VesterDepositModal-info-rows">
            <div className="Exchange-info-row">
              <div className="Exchange-info-label">
                <Trans>Wallet</Trans>
              </div>
              <div className="align-right">{formatAmount(balance, 18, 2, true)} esUTX</div>
            </div>
            <div className="Exchange-info-row">
              <div className="Exchange-info-label">
                <Trans>Vault Capacity</Trans>
              </div>
              <div className="align-right">
                <TooltipWithPortal
                  handle={`${formatAmount(nextDepositAmount, 18, 2, true)} / ${formatAmount(
                    maxVestableAmount,
                    18,
                    2,
                    true
                  )}`}
                  position="right-top"
                  renderContent={() => {
                    return (
                      <div>
                        <p className="text-white">
                          <Trans>Vault Capacity for your Account:</Trans>
                        </p>
                        <StatsTooltipRow
                          showDollar={false}
                          label={t`Deposited`}
                          value={`${formatAmount(vestedAmount, 18, 2, true)} esUTX`}
                        />
                        <StatsTooltipRow
                          showDollar={false}
                          label={t`Max Capacity`}
                          value={`${formatAmount(maxVestableAmount, 18, 2, true)} esUTX`}
                        />
                      </div>
                    );
                  }}
                />
              </div>
            </div>
            <div className="Exchange-info-row">
              <div className="Exchange-info-label">
                <Trans>Reserve Amount</Trans>
              </div>
              <div className="align-right">
                <TooltipWithPortal
                  handle={`${formatAmount(
                    reserveAmount && reserveAmount.gte(additionalReserveAmount)
                      ? reserveAmount
                      : additionalReserveAmount,
                    18,
                    2,
                    true
                  )} / ${formatAmount(maxReserveAmount, 18, 2, true)}`}
                  position="right-top"
                  renderContent={() => {
                    return (
                      <>
                        <StatsTooltipRow
                          label={t`Current Reserved`}
                          value={formatAmount(reserveAmount, 18, 2, true)}
                          showDollar={false}
                        />
                        <StatsTooltipRow
                          label={t`Additional reserve required`}
                          value={formatAmount(additionalReserveAmount, 18, 2, true)}
                          showDollar={false}
                        />
                        {amount && nextReserveAmount.gt(maxReserveAmount) && (
                          <>
                            <br />
                            <Trans>
                              You need a total of at least {formatAmount(nextReserveAmount, 18, 2, true)}{" "}
                              {stakeTokenLabel} to vest {formatAmount(amount, 18, 2, true)} esUTX.
                            </Trans>
                          </>
                        )}
                      </>
                    );
                  }}
                />
              </div>
            </div>
          </div>
          <div className="Exchange-swap-button-container">
            <Button variant="primary-action" className="w-full" onClick={onClickPrimary} disabled={!isPrimaryEnabled()}>
              {getPrimaryText()}
            </Button>
          </div>
        </Modal>
      </div>
    </SEO>
  );
}

function VesterWithdrawModal(props) {
  const { isVisible, setIsVisible, chainId, title, library, vesterAddress, setPendingTxns } = props;
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const onClickPrimary = () => {
    setIsWithdrawing(true);
    const contract = new ethers.Contract(vesterAddress, Vester.abi, library.getSigner());

    callContract(chainId, contract, "withdraw", [], {
      sentMsg: t`Withdraw submitted.`,
      failMsg: t`Withdraw failed.`,
      successMsg: t`Withdrawn!`,
      setPendingTxns,
    })
      .then(async (res) => {
        setIsVisible(false);
      })
      .finally(() => {
        setIsWithdrawing(false);
      });
  };

  return (
    <div className="StakeModal">
      <Modal isVisible={isVisible} setIsVisible={setIsVisible} label={title}>
        <Trans>
          <div>
            This will withdraw and unreserve all tokens as well as pause vesting.
            <br />
            <br />
            esUTX tokens that have been converted to UTX will remain as UTX tokens.
            <br />
            <br />
            To claim UTX tokens without withdrawing, use the "Claim" button under the Total Rewards section.
            <br />
            <br />
          </div>
        </Trans>
        <div className="Exchange-swap-button-container">
          <Button variant="primary-action" className="w-full" onClick={onClickPrimary} disabled={isWithdrawing}>
            {!isWithdrawing && "Confirm Withdraw"}
            {isWithdrawing && "Confirming..."}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function CompoundModal(props) {
  const {
    isVisible,
    setIsVisible,
    rewardRouterAddress,
    active,
    account,
    library,
    chainId,
    setPendingTxns,
    totalVesterRewards,
    nativeTokenSymbol,
    wrappedTokenSymbol,
    processedData,
  } = props;
  const [isCompounding, setIsCompounding] = useState(false);
  const [shouldClaimUtx, setShouldClaimUtx] = useLocalStorageSerializeKey(
    [chainId, "StakeV2-compound-should-claim-utx"],
    true
  );
  const [shouldStakeUtx, setShouldStakeUtx] = useLocalStorageSerializeKey(
    [chainId, "StakeV2-compound-should-stake-utx"],
    true
  );
  const [shouldClaimEsUtx, setShouldClaimEsUtx] = useLocalStorageSerializeKey(
    [chainId, "StakeV2-compound-should-claim-es-utx"],
    true
  );
  const [shouldStakeEsUtx, setShouldStakeEsUtx] = useLocalStorageSerializeKey(
    [chainId, "StakeV2-compound-should-stake-es-utx"],
    true
  );
  const [shouldStakeMultiplierPoints, setShouldStakeMultiplierPoints] = useState(true);
  const [shouldClaimWeth, setShouldClaimWeth] = useLocalStorageSerializeKey(
    [chainId, "StakeV2-compound-should-claim-weth"],
    true
  );
  const [shouldConvertWeth, setShouldConvertWeth] = useLocalStorageSerializeKey(
    [chainId, "StakeV2-compound-should-convert-weth"],
    true
  );

  const utxAddress = getContract(chainId, "UTX");
  const stakedUtxTrackerAddress = getContract(chainId, "StakedUtxTracker");

  const [isApproving, setIsApproving] = useState(false);

  const { data: tokenAllowance } = useSWR(
    active && [active, chainId, utxAddress, "allowance", account, stakedUtxTrackerAddress],
    {
      fetcher: contractFetcher(library, Token),
    }
  );

  const needApproval = shouldStakeUtx && tokenAllowance && totalVesterRewards && totalVesterRewards.gt(tokenAllowance);

  const isPrimaryEnabled = () => {
    return !isCompounding && !isApproving && !isCompounding;
  };

  const getPrimaryText = () => {
    if (isApproving) {
      return t`Approving UTX...`;
    }
    if (needApproval) {
      return t`Approve UTX`;
    }
    if (isCompounding) {
      return t`Compounding...`;
    }
    return t`Compound`;
  };

  const onClickPrimary = () => {
    if (needApproval) {
      approveTokens({
        setIsApproving,
        library,
        tokenAddress: utxAddress,
        spender: stakedUtxTrackerAddress,
        chainId,
      });
      return;
    }

    setIsCompounding(true);

    const contract = new ethers.Contract(rewardRouterAddress, RewardRouter.abi, library.getSigner());
    callContract(
      chainId,
      contract,
      "handleRewards",
      [
        shouldClaimUtx || shouldStakeUtx,
        shouldStakeUtx,
        shouldClaimEsUtx || shouldStakeEsUtx,
        shouldStakeEsUtx,
        shouldStakeMultiplierPoints,
        shouldClaimWeth || shouldConvertWeth,
        shouldConvertWeth,
      ],
      {
        sentMsg: t`Compound submitted!`,
        failMsg: t`Compound failed.`,
        successMsg: t`Compound completed!`,
        setPendingTxns,
      }
    )
      .then(async (res) => {
        setIsVisible(false);
      })
      .finally(() => {
        setIsCompounding(false);
      });
  };

  const toggleShouldStakeUtx = (value) => {
    if (value) {
      setShouldClaimUtx(true);
    }
    setShouldStakeUtx(value);
  };

  const toggleShouldStakeEsUtx = (value) => {
    if (value) {
      setShouldClaimEsUtx(true);
    }
    setShouldStakeEsUtx(value);
  };

  const toggleConvertWeth = (value) => {
    if (value) {
      setShouldClaimWeth(true);
    }
    setShouldConvertWeth(value);
  };

  return (
    <div className="StakeModal">
      <Modal isVisible={isVisible} setIsVisible={setIsVisible} label={t`Compound Rewards`}>
        <div className="CompoundModal-menu">
          <div>
            <Checkbox
              isChecked={shouldStakeMultiplierPoints}
              setIsChecked={setShouldStakeMultiplierPoints}
              disabled={true}
            >
              <Trans>Stake Multiplier Points</Trans>
            </Checkbox>
            <div style={{ color: "var(--text-secondary" }}>
              {formatKeyAmount(processedData, "bnUtxInFeeUtx", 18, 2, true)} Points
            </div>
          </div>
          <div className="App-card-divider"></div>
          <div>
            <Checkbox isChecked={shouldClaimUtx} setIsChecked={setShouldClaimUtx} disabled={shouldStakeUtx}>
              <Trans>Claim UTX Rewards</Trans>
            </Checkbox>
          </div>
          <div>
            <Checkbox isChecked={shouldStakeUtx} setIsChecked={toggleShouldStakeUtx}>
              <Trans>Stake UTX Rewards</Trans>
            </Checkbox>

            <div style={{ color: "var(--text-secondary" }}>
              {formatKeyAmount(processedData, "totalVesterRewards", 18, 4, true)} UTX ($
              {formatKeyAmount(processedData, "totalVesterRewardsUsd", USD_DECIMALS, 2, true)})
            </div>
          </div>
          <div className="App-card-divider"></div>
          <div>
            <Checkbox isChecked={shouldClaimEsUtx} setIsChecked={setShouldClaimEsUtx} disabled={shouldStakeEsUtx}>
              <Trans>Claim esUTX Rewards</Trans>
            </Checkbox>
          </div>
          <div>
            <Checkbox isChecked={shouldStakeEsUtx} setIsChecked={toggleShouldStakeEsUtx}>
              <Trans>Stake esUTX Rewards</Trans>
            </Checkbox>

            <div style={{ color: "var(--text-secondary" }}>
              {formatKeyAmount(processedData, "totalEsUtxRewards", 18, 4, true)} esUTX ($
              {formatKeyAmount(processedData, "totalEsUtxRewardsUsd", USD_DECIMALS, 2, true)})
            </div>
          </div>
          {/* <div className="App-card-divider"></div>
          <div>
            <Checkbox isChecked={shouldClaimWeth} setIsChecked={setShouldClaimWeth} disabled={shouldConvertWeth}>
              <Trans>Claim {nativeTokenSymbol} Rewards</Trans>
            </Checkbox>
          </div>
          <div>
            <Checkbox isChecked={shouldConvertWeth} setIsChecked={toggleConvertWeth}>
              <Trans>
                Convert {wrappedTokenSymbol} to {nativeTokenSymbol}
              </Trans>
            </Checkbox>
            <div style={{ color: "var(--text-secondary" }}>
              {formatKeyAmount(processedData, "totalNativeTokenRewards", 18, 4, true)} {nativeTokenSymbol} ($
              {formatKeyAmount(processedData, "totalNativeTokenRewardsUsd", USD_DECIMALS, 2, true)})
            </div>
          </div> */}
        </div>
        <div className="Exchange-swap-button-container" style={{ marginTop: "16px" }}>
          <Button variant="primary-action" className="w-full" onClick={onClickPrimary} disabled={!isPrimaryEnabled()}>
            {getPrimaryText()}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function ClaimModal(props) {
  const {
    isVisible,
    setIsVisible,
    rewardRouterAddress,
    library,
    chainId,
    setPendingTxns,
    nativeTokenSymbol,
    wrappedTokenSymbol,
    processedData,
  } = props;
  const [isClaiming, setIsClaiming] = useState(false);
  const [shouldClaimUtx, setShouldClaimUtx] = useLocalStorageSerializeKey(
    [chainId, "StakeV2-claim-should-claim-utx"],
    true
  );
  const [shouldClaimEsUtx, setShouldClaimEsUtx] = useLocalStorageSerializeKey(
    [chainId, "StakeV2-claim-should-claim-es-utx"],
    true
  );
  const [shouldClaimWeth, setShouldClaimWeth] = useLocalStorageSerializeKey(
    [chainId, "StakeV2-claim-should-claim-weth"],
    true
  );
  const [shouldConvertWeth, setShouldConvertWeth] = useLocalStorageSerializeKey(
    [chainId, "StakeV2-claim-should-convert-weth"],
    true
  );

  const isPrimaryEnabled = () => {
    return !isClaiming;
  };

  const getPrimaryText = () => {
    if (isClaiming) {
      return t`Claiming...`;
    }
    return t`Claim`;
  };

  const onClickPrimary = () => {
    setIsClaiming(true);

    const contract = new ethers.Contract(rewardRouterAddress, RewardRouter.abi, library.getSigner());
    callContract(
      chainId,
      contract,
      "handleRewards",
      [
        shouldClaimUtx,
        false, // shouldStakeUtx
        shouldClaimEsUtx,
        false, // shouldStakeEsUtx
        false, // shouldStakeMultiplierPoints
        shouldClaimWeth,
        shouldConvertWeth,
      ],
      {
        sentMsg: t`Claim submitted.`,
        failMsg: t`Claim failed.`,
        successMsg: t`Claim completed!`,
        setPendingTxns,
      }
    )
      .then(async (res) => {
        setIsVisible(false);
      })
      .finally(() => {
        setIsClaiming(false);
      });
  };

  const toggleConvertWeth = (value) => {
    if (value) {
      setShouldClaimWeth(true);
    }
    setShouldConvertWeth(value);
  };

  return (
    <div className="StakeModal">
      <Modal isVisible={isVisible} setIsVisible={setIsVisible} label={t`Claim Rewards`}>
        <div className="CompoundModal-menu">
          <div>
            <Checkbox isChecked={shouldClaimUtx} setIsChecked={setShouldClaimUtx}>
              <Trans>Claim UTX Rewards</Trans>
            </Checkbox>
            <div style={{ color: "var(--text-secondary" }}>
              {formatKeyAmount(processedData, "totalVesterRewards", 18, 4, true)} UTX ($
              {formatKeyAmount(processedData, "totalVesterRewardsUsd", USD_DECIMALS, 2, true)})
            </div>
          </div>
          <div>
            <Checkbox isChecked={shouldClaimEsUtx} setIsChecked={setShouldClaimEsUtx}>
              <Trans>Claim esUTX Rewards</Trans>
            </Checkbox>

            <div style={{ color: "var(--text-secondary" }}>
              {formatKeyAmount(processedData, "totalEsUtxRewards", 18, 4, true)} esUTX ($
              {formatKeyAmount(processedData, "totalEsUtxRewardsUsd", USD_DECIMALS, 2, true)})
            </div>
          </div>
          {/* <div>
            <Checkbox isChecked={shouldClaimWeth} setIsChecked={setShouldClaimWeth} disabled={shouldConvertWeth}>
              <Trans>Claim {nativeTokenSymbol} Rewards</Trans>
            </Checkbox>
            <div style={{ color: "var(--text-secondary" }}>
              {formatKeyAmount(processedData, "totalNativeTokenRewards", 18, 4, true)} {nativeTokenSymbol} ($
              {formatKeyAmount(processedData, "totalNativeTokenRewardsUsd", USD_DECIMALS, 2, true)})
            </div>
          </div>
          <div>
            <Checkbox isChecked={shouldConvertWeth} setIsChecked={toggleConvertWeth}>
              <Trans>
                Convert {wrappedTokenSymbol} to {nativeTokenSymbol}
              </Trans>
            </Checkbox>
          </div> */}
        </div>
        <div className="Exchange-swap-button-container" style={{ marginTop: "16px" }}>
          <Button variant="primary-action" className="w-full" onClick={onClickPrimary} disabled={!isPrimaryEnabled()}>
            {getPrimaryText()}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default function StakeV2({ setPendingTxns, connectWallet }) {
  const { active, library, account } = useWeb3React();
  const { chainId } = useChainId();

  const chainName = getChainName(chainId);

  const hasInsurance = true;

  const [isStakeModalVisible, setIsStakeModalVisible] = useState(false);
  const [stakeModalTitle, setStakeModalTitle] = useState("");
  const [stakeModalMaxAmount, setStakeModalMaxAmount] = useState(undefined);
  const [stakeValue, setStakeValue] = useState("");
  const [stakingTokenSymbol, setStakingTokenSymbol] = useState("");
  const [stakingTokenAddress, setStakingTokenAddress] = useState("");
  const [isNativeToken, setNativeToken] = useState(false);
  const [stakingFarmAddress, setStakingFarmAddress] = useState("");
  const [stakeMethodName, setStakeMethodName] = useState("");

  const [isUnstakeModalVisible, setIsUnstakeModalVisible] = useState(false);
  const [unstakeModalTitle, setUnstakeModalTitle] = useState("");
  const [unstakeModalMaxAmount, setUnstakeModalMaxAmount] = useState(undefined);
  const [unstakeModalReservedAmount, setUnstakeModalReservedAmount] = useState(undefined);
  const [unstakeValue, setUnstakeValue] = useState("");
  const [unstakingTokenSymbol, setUnstakingTokenSymbol] = useState("");
  const [unstakeMethodName, setUnstakeMethodName] = useState("");

  const [isVesterDepositModalVisible, setIsVesterDepositModalVisible] = useState(false);
  const [vesterDepositTitle, setVesterDepositTitle] = useState("");
  const [vesterDepositStakeTokenLabel, setVesterDepositStakeTokenLabel] = useState("");
  const [vesterDepositMaxAmount, setVesterDepositMaxAmount] = useState("");
  const [vesterDepositBalance, setVesterDepositBalance] = useState("");
  const [vesterDepositEscrowedBalance, setVesterDepositEscrowedBalance] = useState("");
  const [vesterDepositVestedAmount, setVesterDepositVestedAmount] = useState("");
  const [vesterDepositAverageStakedAmount, setVesterDepositAverageStakedAmount] = useState("");
  const [vesterDepositMaxVestableAmount, setVesterDepositMaxVestableAmount] = useState("");
  const [vesterDepositValue, setVesterDepositValue] = useState("");
  const [vesterDepositReserveAmount, setVesterDepositReserveAmount] = useState("");
  const [vesterDepositMaxReserveAmount, setVesterDepositMaxReserveAmount] = useState("");
  const [vesterDepositAddress, setVesterDepositAddress] = useState("");

  const [isVesterWithdrawModalVisible, setIsVesterWithdrawModalVisible] = useState(false);
  const [vesterWithdrawTitle, setVesterWithdrawTitle] = useState(false);
  const [vesterWithdrawAddress, setVesterWithdrawAddress] = useState("");

  const [isCompoundModalVisible, setIsCompoundModalVisible] = useState(false);
  const [isClaimModalVisible, setIsClaimModalVisible] = useState(false);

  const rewardRouterAddress = getContract(chainId, "RewardRouter");
  const utxRewardRouterAddress = getContract(chainId, "UtxRewardRouter");
  const u2uRewardRouter = getContract(chainId, "U2URewardRouter");
  const ulpRewardRouterAddress = getContract(chainId, "UlpRewardRouter");
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
  const feeU2UTrackerAddress = getContract(chainId, "feeU2UTracker");

  const ulpManagerAddress = getContract(chainId, "UlpManager");

  const stakedUtxDistributorAddress = getContract(chainId, "StakedUtxDistributor");
  const stakedUlpDistributorAddress = getContract(chainId, "StakedUlpDistributor");

  const utxVesterAddress = getContract(chainId, "UtxVester");
  const ulpVesterAddress = getContract(chainId, "UlpVester");

  const vesterAddresses = [utxVesterAddress, ulpVesterAddress];

  const excludedEsUtxAccounts = [stakedUtxDistributorAddress, stakedUlpDistributorAddress];

  const nativeTokenSymbol = getConstant(chainId, "nativeTokenSymbol");
  const wrappedTokenSymbol = getConstant(chainId, "wrappedTokenSymbol");

  const walletTokens = [utxAddress, esUtxAddress, ulpAddress, stakedUtxTrackerAddress, nativeTokenAddress];
  const depositTokens = [
    utxAddress,
    esUtxAddress,
    stakedUtxTrackerAddress,
    bonusUtxTrackerAddress,
    bnUtxAddress,
    ulpAddress,
    nativeTokenAddress,
  ];
  const rewardTrackersForDepositBalances = [
    stakedUtxTrackerAddress,
    stakedUtxTrackerAddress,
    bonusUtxTrackerAddress,
    feeUtxTrackerAddress,
    feeUtxTrackerAddress,
    feeUlpTrackerAddress,
    feeU2UTrackerAddress,
  ];
  const rewardTrackersForStakingInfo = [
    stakedUtxTrackerAddress,
    bonusUtxTrackerAddress,
    feeUtxTrackerAddress,
    stakedUlpTrackerAddress,
    feeUlpTrackerAddress,
    feeU2UTrackerAddress,
  ];

  const { data: walletBalances } = useSWR(
    [
      `StakeV2:walletBalances:${active}`,
      chainId,
      readerAddress,
      "getTokenBalancesWithSupplies",
      account || PLACEHOLDER_ACCOUNT,
    ],
    {
      fetcher: contractFetcher(library, ReaderV2, [walletTokens]),
    }
  );

  const { data: nativeTokenBalance } = useSWR(
    [`UlpSwap:getTokenBalances:${active}`, chainId, readerAddress, "getTokenBalances", account || PLACEHOLDER_ACCOUNT],
    {
      fetcher: contractFetcher(library, ReaderV2, [[ethers.constants.AddressZero]]),
    }
  );

  const { data: depositBalances } = useSWR(
    [
      `StakeV2:depositBalances:${active}`,
      chainId,
      rewardReaderAddress,
      "getDepositBalances",
      account || PLACEHOLDER_ACCOUNT,
    ],
    {
      fetcher: contractFetcher(library, RewardReader, [depositTokens, rewardTrackersForDepositBalances]),
    }
  );

  const { data: stakingInfo } = useSWR(
    [`StakeV2:stakingInfo:${active}`, chainId, rewardReaderAddress, "getStakingInfo", account || PLACEHOLDER_ACCOUNT],
    {
      fetcher: contractFetcher(library, RewardReader, [rewardTrackersForStakingInfo]),
    }
  );

  const { data: stakedUtxSupply } = useSWR(
    [`StakeV2:stakedUtxSupply:${active}`, chainId, utxAddress, "balanceOf", stakedUtxTrackerAddress],
    {
      fetcher: contractFetcher(library, Token),
    }
  );

  const { data: aums } = useSWR([`StakeV2:getAums:${active}`, chainId, ulpManagerAddress, "getAums"], {
    fetcher: contractFetcher(library, UlpManager),
  });

  const nativeTokenPrice = usePriceU2U();

  const { data: esUtxSupply } = useSWR(
    [`StakeV2:esUtxSupply:${active}`, chainId, readerAddress, "getTokenSupply", esUtxAddress],
    {
      fetcher: contractFetcher(library, ReaderV2, [excludedEsUtxAccounts]),
    }
  );

  const { data: vestingInfo } = useSWR(
    [`StakeV2:vestingInfo:${active}`, chainId, readerAddress, "getVestingInfo", account || PLACEHOLDER_ACCOUNT],
    {
      fetcher: contractFetcher(library, ReaderV2, [vesterAddresses]),
    }
  );

  const utxPrice = usePriceUTX();

  let { total: totalUtxSupply } = useTotalUtxSupply();

  let { total: totalUtxStaked } = useTotalUtxStaked();
  let { data: totalU2uStaked } = useTotalU2UStaked(chainId);

  const utxSupplyUrl = "https://gmx-server-mainnet.uw.r.appspot.com/gmx_supply";
  // REMEMBER REOPEN
  // getServerUrl(chainId, "/gmx_supply");
  const { data: utxSupply } = useSWR([utxSupplyUrl], {
    fetcher: (...args) => fetch(...args).then((res) => res.text()),
  });

  const isUtxTransferEnabled = true;

  let esUtxSupplyUsd;
  if (esUtxSupply && utxPrice) {
    esUtxSupplyUsd = esUtxSupply.mul(utxPrice).div(expandDecimals(1, 18));
  }

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

  let hasMultiplierPoints = false;
  let multiplierPointsAmount;
  if (processedData && processedData.bonusUtxTrackerRewards && processedData.bnUtxInFeeUtx) {
    multiplierPointsAmount = processedData.bonusUtxTrackerRewards.add(processedData.bnUtxInFeeUtx);
    if (multiplierPointsAmount.gt(0)) {
      hasMultiplierPoints = true;
    }
  }
  let totalRewardTokens;
  if (processedData && processedData.bnUtxInFeeUtx && processedData.bonusUtxInFeeUtx) {
    totalRewardTokens = processedData.bnUtxInFeeUtx.add(processedData.bonusUtxInFeeUtx);
  }

  let totalRewardTokensAndUlp;
  if (totalRewardTokens && processedData && processedData.ulpBalance) {
    totalRewardTokensAndUlp = totalRewardTokens.add(processedData.ulpBalance);
  }

  const bonusUtxInFeeUtx = processedData ? processedData.bonusUtxInFeeUtx : undefined;

  let stakedUtxSupplyUsd;
  if (!totalUtxStaked.isZero() && utxPrice) {
    stakedUtxSupplyUsd = totalUtxStaked.mul(utxPrice).div(expandDecimals(1, 18));
  }

  let stakedU2uSupplyUsd;
  if (utxPrice && totalU2uStaked) {
    stakedU2uSupplyUsd = totalU2uStaked.mul(utxPrice).div(expandDecimals(1, 18));
  }

  let totalSupplyUsd;
  if (totalUtxSupply && !totalUtxSupply.isZero() && utxPrice) {
    totalSupplyUsd = totalUtxSupply.mul(utxPrice).div(expandDecimals(1, 18));
  }

  let maxUnstakeableUtx = bigNumberify(0);
  if (
    totalRewardTokens &&
    vestingData &&
    vestingData.gmxVesterPairAmount &&
    multiplierPointsAmount &&
    processedData.bonusUtxInFeeUtx
  ) {
    const availableTokens = totalRewardTokens.sub(vestingData.gmxVesterPairAmount);
    const stakedTokens = processedData.bonusUtxInFeeUtx;
    const divisor = multiplierPointsAmount.add(stakedTokens);
    if (divisor.gt(0)) {
      maxUnstakeableUtx = availableTokens.mul(stakedTokens).div(divisor);
    }
  }

  const showStakeUtxModal = () => {
    if (!isUtxTransferEnabled) {
      helperToast.error(t`UTX transfers not yet enabled`);
      return;
    }

    setIsStakeModalVisible(true);
    setStakeModalTitle(t`Stake UTX`);
    setStakeModalMaxAmount(processedData.utxBalance);
    setStakeValue("");
    setStakingTokenSymbol("UTX");
    setStakingTokenAddress(utxAddress);
    setNativeToken(false);
    setStakingFarmAddress(stakedUtxTrackerAddress);
    setStakeMethodName("stakeGmx");
  };

  const showStakeEsUtxModal = () => {
    setIsStakeModalVisible(true);
    setStakeModalTitle(t`Stake esUTX`);
    setStakeModalMaxAmount(processedData.esUtxBalance);
    setStakeValue("");
    setNativeToken(false);
    setStakingTokenSymbol("esUTX");
    setStakingTokenAddress(esUtxAddress);
    setStakingFarmAddress(AddressZero);
    setStakeMethodName("stakeEsGmx");
  };

  const showStakeEsU2UModal = () => {
    setIsStakeModalVisible(true);
    setStakeModalTitle(t`Stake U2U`);
    setStakeModalMaxAmount(nativeTokenBalance[0].toString() || 0);
    setStakeValue("");
    setStakingTokenSymbol("U2U");
    setNativeToken(true);
    setStakingTokenAddress(AddressZero);
    setStakingFarmAddress(u2uRewardRouter);
    setStakeMethodName("stakeU2U");
  };

  const showUtxVesterDepositModal = () => {
    let remainingVestableAmount = 0;
    // if (processedData.esUtxBalance.lt(remainingVestableAmount)) {
    //   remainingVestableAmount = processedData.esUtxBalance;
    // }

    setIsVesterDepositModalVisible(true);
    setVesterDepositTitle(t`UTX Vault`);
    setVesterDepositStakeTokenLabel("staked UTX + esUTX + Multiplier Points");
    setVesterDepositMaxAmount(remainingVestableAmount);
    setVesterDepositBalance(processedData.esUtxBalance);
    setVesterDepositEscrowedBalance(vestingData.utxVester.escrowedBalance);
    setVesterDepositVestedAmount(vestingData.utxVester.vestedAmount);
    setVesterDepositMaxVestableAmount(vestingData.utxVester.maxVestableAmount);
    setVesterDepositAverageStakedAmount(vestingData.utxVester.averageStakedAmount);
    setVesterDepositReserveAmount(vestingData.utxVester.pairAmount);
    setVesterDepositMaxReserveAmount(totalRewardTokens);
    setVesterDepositValue("");
    setVesterDepositAddress(utxVesterAddress);
  };

  const showUlpVesterDepositModal = () => {
    let remainingVestableAmount = vestingData.UlpVester.maxVestableAmount.sub(vestingData.UlpVester.vestedAmount);
    if (processedData.esUtxBalance.lt(remainingVestableAmount)) {
      remainingVestableAmount = processedData.esUtxBalance;
    }

    setIsVesterDepositModalVisible(true);
    setVesterDepositTitle(t`ULP Vault`);
    setVesterDepositStakeTokenLabel("staked ULP");
    setVesterDepositMaxAmount(remainingVestableAmount);
    setVesterDepositBalance(processedData.esUtxBalance);
    setVesterDepositEscrowedBalance(vestingData.UlpVester.escrowedBalance);
    setVesterDepositVestedAmount(vestingData.UlpVester.vestedAmount);
    setVesterDepositMaxVestableAmount(vestingData.UlpVester.maxVestableAmount);
    setVesterDepositAverageStakedAmount(vestingData.UlpVester.averageStakedAmount);
    setVesterDepositReserveAmount(vestingData.UlpVester.pairAmount);
    setVesterDepositMaxReserveAmount(processedData.ulpBalance);
    setVesterDepositValue("");
    setVesterDepositAddress(ulpVesterAddress);
  };

  const showUtxVesterWithdrawModal = () => {
    if (!vestingData || !vestingData.gmxVesterVestedAmount || vestingData.gmxVesterVestedAmount.eq(0)) {
      helperToast.error(t`You have not deposited any tokens for vesting.`);
      return;
    }

    setIsVesterWithdrawModalVisible(true);
    setVesterWithdrawTitle(t`Withdraw from UTX Vault`);
    setVesterWithdrawAddress(utxVesterAddress);
  };

  const showUlpVesterWithdrawModal = () => {
    if (!vestingData || !vestingData.glpVesterVestedAmount || vestingData.glpVesterVestedAmount.eq(0)) {
      helperToast.error(t`You have not deposited any tokens for vesting.`);
      return;
    }

    setIsVesterWithdrawModalVisible(true);
    setVesterWithdrawTitle(t`Withdraw from ULP Vault`);
    setVesterWithdrawAddress(ulpVesterAddress);
  };

  const showUnstakeUtxModal = () => {
    if (!isUtxTransferEnabled) {
      helperToast.error(t`UTX transfers not yet enabled`);
      return;
    }
    setIsUnstakeModalVisible(true);
    setUnstakeModalTitle(t`Unstake UTX`);
    let maxAmount = processedData.utxInStakedUtx;
    if (
      processedData.utxInStakedUtx &&
      vestingData &&
      // vestingData.gmxVesterPairAmount.gt(0) &&
      vestingData.gmxVesterPairAmount &&
      maxUnstakeableUtx &&
      maxUnstakeableUtx.lt(processedData.utxInStakedUtx)
    ) {
      maxAmount = maxUnstakeableUtx;
    }
    setNativeToken(false);
    setUnstakeModalMaxAmount(maxAmount);
    setUnstakeModalReservedAmount(vestingData.gmxVesterPairAmount);
    setUnstakeValue("");
    setUnstakingTokenSymbol("UTX");
    setUnstakeMethodName("unstakeGmx");
  };

  const showUnstakeU2UModal = () => {
    // if (!isUtxTransferEnabled) {
    //   helperToast.error(t`UTX transfers not yet enabled`);
    //   return;
    // }
    setNativeToken(true);

    setIsUnstakeModalVisible(true);
    setUnstakeModalTitle(t`Unstake U2U`);
    const maxAmount = depositBalanceData?.u2uInStakedU2U?.toString() ?? 0;

    setUnstakeModalMaxAmount(maxAmount);
    setUnstakeModalReservedAmount(vestingData.gmxVesterPairAmount);
    setUnstakeValue("");
    setUnstakingTokenSymbol("U2U");
    setUnstakeMethodName("unstakeU2U");
  };

  const showUnstakeEsUtxModal = () => {
    setIsUnstakeModalVisible(true);
    setNativeToken(false);
    setUnstakeModalTitle(t`Unstake esUTX`);
    let maxAmount = processedData.esUtxInStakedUtx;
    if (
      processedData.esUtxInStakedUtx &&
      vestingData &&
      // vestingData.gmxVesterPairAmount.gt(0) &&
      vestingData.gmxVesterPairAmount &&
      maxUnstakeableUtx &&
      maxUnstakeableUtx.lt(processedData.esUtxInStakedUtx)
    ) {
      maxAmount = maxUnstakeableUtx;
    }
    setUnstakeModalMaxAmount(maxAmount);
    setUnstakeModalReservedAmount(vestingData.gmxVesterPairAmount);
    setUnstakeValue("");
    setUnstakingTokenSymbol("esUTX");
    setUnstakeMethodName("unstakeEsGmx");
  };

  const renderMultiplierPointsLabel = useCallback(() => {
    return t`Multiplier Points APR`;
  }, []);

  const renderMultiplierPointsValue = useCallback(() => {
    return (
      <Tooltip
        handle={`100.00%`}
        position="right-bottom"
        renderContent={() => {
          return (
            <Trans>
              Boost your rewards with Multiplier Points.&nbsp;
              <ExternalLink href="">More info</ExternalLink>.
            </Trans>
          );
        }}
      />
    );
  }, []);

  let earnMsg;
  if (totalRewardTokensAndUlp && totalRewardTokensAndUlp.gt(0)) {
    let utxAmountStr;
    if (processedData.utxInStakedUtx && processedData.utxInStakedUtx.gt(0)) {
      utxAmountStr = formatAmount(processedData.utxInStakedUtx, 18, 2, true) + " UTX";
    }
    let esUtxAmountStr;
    if (processedData.esUtxInStakedUtx && processedData.esUtxInStakedUtx.gt(0)) {
      esUtxAmountStr = formatAmount(processedData.esUtxInStakedUtx, 18, 2, true) + " esUTX";
    }
    let mpAmountStr;
    if (processedData.bonusUtxInFeeUtx && processedData.bnUtxInFeeUtx.gt(0)) {
      mpAmountStr = formatAmount(processedData.bnUtxInFeeUtx, 18, 2, true) + " MP";
    }
    let ulpStr;
    if (processedData.ulpBalance && processedData.ulpBalance.gt(0)) {
      ulpStr = formatAmount(processedData.ulpBalance, 18, 2, true) + " ULP";
    }
    const amountStr = [utxAmountStr, esUtxAmountStr, mpAmountStr, ulpStr].filter((s) => s).join(", ");
    earnMsg = (
      <div>
        <Trans>
          You are earning {nativeTokenSymbol} rewards with {formatAmount(totalRewardTokensAndUlp, 18, 2, true)} tokens.
          <br />
          Tokens: {amountStr}.
        </Trans>
      </div>
    );
  }
  const [isOpenCollapseUTX, setIsOpenCollapseUTX] = useState(false);
  const handleOpenCollapseUTX = () => {
    setIsOpenCollapseUTX(!isOpenCollapseUTX);
  };
  const [isOpenCollapseesUTX, setIsOpenCollapseesUTX] = useState(false);
  const handleOpenCollapseesUTX = () => {
    setIsOpenCollapseesUTX(!isOpenCollapseesUTX);
  };
  const [isOpenCollapseULP, setIsOpenCollapseULP] = useState(false);
  const handleOpenCollapseULP = () => {
    setIsOpenCollapseULP(!isOpenCollapseULP);
  };
  return (
    <div className="default-container page-layout">
      <StakeModal
        isVisible={isStakeModalVisible}
        setIsVisible={setIsStakeModalVisible}
        chainId={chainId}
        title={stakeModalTitle}
        maxAmount={stakeModalMaxAmount}
        value={stakeValue}
        setValue={setStakeValue}
        active={active}
        isNativeToken={isNativeToken}
        account={account}
        library={library}
        stakingTokenSymbol={stakingTokenSymbol}
        stakingTokenAddress={stakingTokenAddress}
        farmAddress={stakingFarmAddress}
        rewardRouterAddress={isNativeToken ? u2uRewardRouter : utxRewardRouterAddress}
        stakeMethodName={stakeMethodName}
        hasMultiplierPoints={hasMultiplierPoints}
        setPendingTxns={setPendingTxns}
        nativeTokenSymbol={nativeTokenSymbol}
        wrappedTokenSymbol={wrappedTokenSymbol}
      />
      <UnstakeModal
        isNativeToken={isNativeToken}
        setPendingTxns={setPendingTxns}
        isVisible={isUnstakeModalVisible}
        setIsVisible={setIsUnstakeModalVisible}
        chainId={chainId}
        title={unstakeModalTitle}
        maxAmount={unstakeModalMaxAmount}
        reservedAmount={unstakeModalReservedAmount}
        value={unstakeValue}
        setValue={setUnstakeValue}
        library={library}
        account={account}
        unstakingTokenSymbol={unstakingTokenSymbol}
        rewardRouterAddress={isNativeToken ? u2uRewardRouter : utxRewardRouterAddress}
        unstakeMethodName={unstakeMethodName}
        multiplierPointsAmount={multiplierPointsAmount}
        bonusUtxInFeeUtx={bonusUtxInFeeUtx}
      />
      <VesterDepositModal
        isVisible={isVesterDepositModalVisible}
        setIsVisible={setIsVesterDepositModalVisible}
        chainId={chainId}
        title={vesterDepositTitle}
        stakeTokenLabel={vesterDepositStakeTokenLabel}
        maxAmount={vesterDepositMaxAmount}
        balance={vesterDepositBalance}
        escrowedBalance={vesterDepositEscrowedBalance}
        vestedAmount={vesterDepositVestedAmount}
        averageStakedAmount={vesterDepositAverageStakedAmount}
        maxVestableAmount={vesterDepositMaxVestableAmount}
        reserveAmount={vesterDepositReserveAmount}
        maxReserveAmount={vesterDepositMaxReserveAmount}
        value={vesterDepositValue}
        setValue={setVesterDepositValue}
        library={library}
        vesterAddress={vesterDepositAddress}
        setPendingTxns={setPendingTxns}
      />
      <VesterWithdrawModal
        isVisible={isVesterWithdrawModalVisible}
        setIsVisible={setIsVesterWithdrawModalVisible}
        vesterAddress={vesterWithdrawAddress}
        chainId={chainId}
        title={vesterWithdrawTitle}
        library={library}
        setPendingTxns={setPendingTxns}
      />
      <CompoundModal
        active={active}
        account={account}
        setPendingTxns={setPendingTxns}
        isVisible={isCompoundModalVisible}
        setIsVisible={setIsCompoundModalVisible}
        rewardRouterAddress={rewardRouterAddress}
        totalVesterRewards={processedData.totalVesterRewards}
        wrappedTokenSymbol={wrappedTokenSymbol}
        nativeTokenSymbol={nativeTokenSymbol}
        library={library}
        chainId={chainId}
        processedData={processedData}
      />
      <ClaimModal
        active={active}
        account={account}
        setPendingTxns={setPendingTxns}
        isVisible={isClaimModalVisible}
        setIsVisible={setIsClaimModalVisible}
        rewardRouterAddress={rewardRouterAddress}
        totalVesterRewards={processedData.totalVesterRewards}
        wrappedTokenSymbol={wrappedTokenSymbol}
        nativeTokenSymbol={nativeTokenSymbol}
        library={library}
        chainId={chainId}
        processedData={processedData}
      />

      <div className="section-title-block">
        <div className="section-title-icon"></div>
        <div className="section-title-content">
          <div className="Page-title">
            <Trans>Stake & Earn</Trans>
          </div>
          <div className="Page-description" style={{ color: "var(--text-secondary)" }}>
            <Trans>
              Stake <ExternalLink href="https://utxio.gitbook.io/utx/tokenomics">UTX</ExternalLink> and{" "}
              <ExternalLink href="https://utxio.gitbook.io/utx/ulp">ULP</ExternalLink> to Earn Rewards.
            </Trans>
          </div>
          {earnMsg && <div className="Page-description">{earnMsg}</div>}
        </div>
      </div>
      <div className="StakeV2-content">
        <div className="StakeV2-cards asset-and-reward">
          <div className="App-card StakeV2-utx-card Asset">
            <div className="App-card-title">Your UltraX Asset</div>
            <div className="App-card-content stake">
              <div className="App-card-row-session-wrapper">
                <div className="App-card-row-stake-icon">
                  <img src={dashboard_utx_icon} alt="utx-icon" />
                </div>
                <div className="App-card-row-stake-wrapper">
                  <div className="App-card-row stake">
                    <div className="label">
                      <Trans>UTX in Wallet</Trans>
                    </div>
                    <div>
                      {formatKeyAmount(processedData, "utxBalance", 18, 2, true)} UTX{" "}
                      <span style={{ color: "var(--text-secondary" }}>
                        ($
                        {formatKeyAmount(processedData, "utxBalanceUsd", USD_DECIMALS, 2, true)})
                      </span>
                    </div>
                  </div>
                  <div className="App-card-row stake">
                    <div className="label">
                      <Trans>UTX Staked</Trans>
                    </div>
                    <div>
                      {formatKeyAmount(processedData, "utxInStakedUtx", 18, 2, true)} UTX{" "}
                      <span style={{ color: "var(--text-secondary" }}>
                        ($
                        {formatKeyAmount(processedData, "utxInStakedUtxUsd", USD_DECIMALS, 2, true)})
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="App-card-divider"></div>
              <div className="App-card-row-session-wrapper">
                <div className="App-card-row-stake-icon">
                  <img src={earn_esutx_icon} alt="esutx-icon" />
                </div>
                <div className="App-card-row-stake-wrapper">
                  <div className="App-card-row stake">
                    <div className="label">
                      <Trans>esUTX in Wallet</Trans>
                    </div>
                    <div>
                      {formatKeyAmount(processedData, "esUtxBalance", 18, 2, true)} esUTX{" "}
                      <span style={{ color: "var(--text-secondary" }}>
                        ($
                        {formatKeyAmount(processedData, "esUtxBalanceUsd", USD_DECIMALS, 2, true)})
                      </span>
                    </div>
                  </div>
                  <div className="App-card-row stake">
                    <div className="label">
                      <Trans>esUTX Staked</Trans>
                    </div>
                    <div>
                      {formatKeyAmount(processedData, "esUtxInStakedUtx", 18, 2, true)} esUTX{" "}
                      <span style={{ color: "var(--text-secondary" }}>
                        ($
                        {formatKeyAmount(processedData, "esUtxInStakedUtxUsd", USD_DECIMALS, 2, true)})
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="App-card-divider"></div>
              <div className="App-card-row-session-wrapper">
                <div className="App-card-row-stake-icon">
                  <img src={dashboard_ulp_icon} alt="esutx-icon" />
                </div>
                <div className="App-card-row-stake-wrapper">
                  <div className="App-card-row stake">
                    <div className="label">
                      <Trans>ULP in Wallet</Trans>
                    </div>
                    <div>
                      {formatKeyAmount(processedData, "ulpBalance", ULP_DECIMALS, 2, true)} ULP{" "}
                      <span style={{ color: "var(--text-secondary" }}>
                        ($
                        {formatKeyAmount(processedData, "ulpBalanceUsd", USD_DECIMALS, 2, true)})
                      </span>
                    </div>
                  </div>
                  <div className="App-card-row stake">
                    <div className="label">
                      <Trans>ULP Staked</Trans>
                    </div>
                    <div>
                      {formatKeyAmount(processedData, "ulpBalance", ULP_DECIMALS, 2, true)} ULP{" "}
                      <span style={{ color: "var(--text-secondary" }}>
                        ($
                        {formatKeyAmount(processedData, "ulpBalanceUsd", USD_DECIMALS, 2, true)})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: "44px" }}></div>
              <div className="App-card-buttons left-side m-0">
                <Button className="earn-btn" variant="secondary" to="/buy-utx">
                  <Trans>Buy UTX</Trans>
                </Button>
                {active && (
                  <Button className="earn-btn transparent" variant="secondary" to="/begin_account_transfer">
                    <Trans>Transfer Account</Trans>
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="App-card primary StakeV2-total-rewards-card">
            <div className="App-card-title">
              <Trans>Your UltraX Rewards</Trans>
            </div>
            <div className="App-card-content stake">
              <div className="App-card-reward-stake">
                <div className="App-card-reward-img">
                  <img src={earn_rewards_icon} alt="reward_icon" />
                </div>
                <div className="App-card-reward-info">
                  <span className="App-card-reward-title">Total reward</span>
                  <span className="App-card-reward-number">
                    ${formatKeyAmount(processedData, "totalRewardsUsd", USD_DECIMALS, 2, true)}
                  </span>
                </div>
              </div>
              <div className="App-card-row-session-wrapper">
                <div className="App-card-row-stake-icon">
                  <img src={dashboard_utx_icon} alt="utx-icon" />
                </div>
                <div className="App-card-row-stake-wrapper">
                  <div className="App-card-row stake">
                    <div className="label">UTX</div>
                    <div>
                      {formatKeyAmount(processedData, "totalVesterRewards", 18, 4, true)}{" "}
                      <span style={{ color: "var(--text-secondary" }}>
                        ($
                        {formatKeyAmount(processedData, "totalVesterRewardsUsd", USD_DECIMALS, 2, true)})
                      </span>
                      {active && (
                        <span onClick={() => setIsClaimModalVisible(true)} className="stake-claim-reward">
                          Claim
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="App-card-row-session-wrapper">
                <div className="App-card-row-stake-icon">
                  <img src={earn_esutx_icon} alt="utx-icon" />
                </div>
                <div className="App-card-row-stake-wrapper">
                  <div className="App-card-row stake">
                    <div className="label">Escrowed UTX</div>
                    <div>
                      {formatKeyAmount(processedData, "totalEsUtxRewards", 18, 4, true)}{" "}
                      <span style={{ color: "var(--text-secondary" }}>
                        ($
                        {formatKeyAmount(processedData, "totalEsUtxRewardsUsd", USD_DECIMALS, 2, true)})
                      </span>
                      {active && (
                        <span onClick={() => setIsClaimModalVisible(true)} className="stake-claim-reward">
                          Claim
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="App-card-row-session-wrapper">
                <div className="App-card-row-stake-icon">
                  <img src={dashboard_utx_icon} alt="utx-icon" />
                </div>
                <div className="App-card-row-stake-wrapper">
                  <div className="App-card-row stake">
                    <div className="label">{nativeTokenSymbol}</div>
                    <div>
                      {formatKeyAmount(processedData, "totalNativeTokenRewards", 18, 4, true)}{" "}
                      <span style={{ color: "var(--text-secondary" }}>
                        ($
                        {formatKeyAmount(processedData, "totalNativeTokenRewardsUsd", USD_DECIMALS, 2, true)})
                      </span>
                      {active && (
                        <span onClick={() => setIsClaimModalVisible(true)} className="stake-claim-reward">
                          Claim
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="App-card-divider stake"></div>

              <div className="App-card-row-session-wrapper">
                <div className="App-card-row-stake-icon">
                  <img src={earn_multi_icon} alt="utx-icon" />
                </div>
                <div className="App-card-row-stake-wrapper">
                  <div className="App-card-row stake">
                    <div className="label">Multiplier Points</div>
                    <div>{formatKeyAmount(processedData, "bonusUtxTrackerRewards", 18, 4, true)}</div>
                  </div>
                </div>
              </div>

              <div className="App-card-row-session-wrapper">
                <div className="App-card-row-stake-icon">
                  <img src={earn_stake_icon} alt="utx-icon" />
                </div>
                <div className="App-card-row-stake-wrapper">
                  <div className="App-card-row stake">
                    <div className="label">Staked Multiplier Points</div>
                    <div>{formatKeyAmount(processedData, "bnUtxInFeeUtx", 18, 4, true)}</div>
                  </div>
                </div>
              </div>

              <div className="App-card-footer">
                <div className="App-card-buttons left-side m-0">
                  {active && (
                    <Button variant="secondary earn-btn compound" onClick={() => setIsCompoundModalVisible(true)}>
                      <Trans>Compound</Trans>
                    </Button>
                  )}
                  {active && (
                    <Button variant="secondary earn-btn claim-all" onClick={() => setIsClaimModalVisible(true)}>
                      <Trans>Claim</Trans>
                    </Button>
                  )}
                  {!active && (
                    <Button variant="secondary earn-btn connect-wallet" onClick={() => connectWallet()}>
                      <Trans>Connect Wallet</Trans>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginBottom: "36px" }}></div>
        <div className="StakeV2-cards stake-and-unstake">
          <div className="App-card StakeV2-utx-card stake-and-unstake">
            <div className="StakeV2-utx-card-container">
              <div>
                <div className="App-card-title fw-600 text-primary">
                  <Trans>Stake UTX</Trans>
                </div>
                <div className="text-secondary fz-base fw-400">Earn esUTX & U2U</div>
              </div>
              <img src={earn_stake_utx_icon} alt="stake-utx" />
            </div>
            <div
              className="App-card-content"
              style={{
                paddingTop: "16px",
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
            >
              <div className="App-card-divider"></div>

              <div
                style={{
                  paddingTop: "16px",
                }}
                className="App-card-row stake"
              >
                <div className="label text-secondary fw-400 fz-base">
                  <Trans>APR</Trans>
                </div>
                <div>
                  <Tooltip
                    handle={`${formatKeyAmount(processedData, "utxAprTotalWithBoost", 2, 2, true)}%`}
                    handleClassName="StakeV2-apr-text"
                    position="right-bottom"
                    renderContent={() => (
                      <UTXAprTooltip processedData={processedData} nativeTokenSymbol={nativeTokenSymbol} />
                    )}
                  />
                </div>
              </div>
              <div className="App-card-row stake">
                <div className="label text-secondary fw-400 fz-base">
                  <Trans>Rewards</Trans>
                </div>
                <div className="StakeV2-reward-text">
                  ${formatKeyAmount(processedData, "feeUtxTrackerRewardsUsd", USD_DECIMALS, 2, true)}
                  <Tooltip
                    handle={<img src={earn_info_icon} alt="reward_info" />}
                    position="right-bottom"
                    renderContent={() => {
                      return (
                        <>
                          <StatsTooltipRow
                            label={`${nativeTokenSymbol}`}
                            value={`${formatKeyAmount(
                              processedData,
                              "feeUtxTrackerRewards",
                              18,
                              4
                            )} ($${formatKeyAmount(processedData, "feeUtxTrackerRewardsUsd", USD_DECIMALS, 2, true)})`}
                            showDollar={false}
                          />
                        </>
                      );
                    }}
                  />
                </div>
              </div>
              <div
                className="App-card-row stake"
                style={{
                  paddingBottom: "16px",
                }}
              >
                <div className="label text-secondary fw-400 fz-base">
                  <Trans>UTX Staked</Trans>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {formatKeyAmount(processedData, "utxInStakedUtx", 18, 2, true)} UTX{" "}
                  <span style={{ color: "var(--text-secondary" }}>
                    ($
                    {formatKeyAmount(processedData, "utxInStakedUtxUsd", USD_DECIMALS, 2, true)})
                  </span>
                </div>
              </div>
              <div className="App-card-divider"></div>

              <div
                style={{
                  paddingTop: "16px",
                }}
                className="App-card-row stake"
              >
                <div className="label text-secondary fw-400 fz-base">{renderMultiplierPointsLabel()}</div>
                <div>{renderMultiplierPointsValue()}</div>
              </div>
              <div
                className="App-card-row stake"
                style={{
                  paddingBottom: "32px",
                }}
              >
                <div className="label text-secondary fw-400 fz-base">
                  <Trans>Boost Percentage</Trans>
                </div>
                <div>
                  <Tooltip
                    handle={`${formatAmount(processedData.boostBasisPoints, 2, 2, false)}%`}
                    position="right-bottom"
                    renderContent={() => {
                      return (
                        <div>
                          <Trans>
                            You are earning {formatAmount(processedData.boostBasisPoints, 2, 2, false)}% more{" "}
                            {nativeTokenSymbol} rewards using{" "}
                            {formatAmount(processedData.bnUtxInFeeUtx, 18, 4, 2, true)} Staked Multiplier Points.
                          </Trans>
                          <br />
                          <br />
                          <Trans>Use the "Compound" button to stake your Multiplier Points.</Trans>
                        </div>
                      );
                    }}
                  />
                </div>
              </div>

              <div
                className="App-card-buttons m-0"
                style={{
                  width: "100%",
                }}
              >
                {!active && (
                  <Button
                    style={{
                      width: "100%",
                    }}
                    variant="primary-action"
                    onClick={() => connectWallet()}
                  >
                    <Trans>Connect Wallet</Trans>
                  </Button>
                )}
                {active && (
                  <Button variant="secondary earn-btn stake" onClick={() => showStakeUtxModal()}>
                    <Trans>Stake</Trans>
                  </Button>
                )}
                {active && (
                  <Button variant="secondary earn-btn unstake" onClick={() => showUnstakeUtxModal()}>
                    <Trans>Unstake</Trans>
                  </Button>
                )}
              </div>
              <div style={{ marginBottom: "20px" }}></div>
            </div>
            <div
              className="StakeV2-card-details"
              style={{ border: "2px solid #151e2c", padding: "8px 14px 16px 14px", borderRadius: "0px 0px 6px 6px" }}
            >
              <Collapse isOpened={isOpenCollapseUTX}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div className="App-card-row stake">
                    <div className="label">
                      <Trans>UTX Price</Trans>
                    </div>
                    <div>
                      {!utxPrice && "..."}
                      {utxPrice && <div>${formatAmount(utxPrice, USD_DECIMALS, 2, true)}</div>}
                    </div>
                  </div>
                  <div className="App-card-row stake">
                    <div className="label ">
                      <Trans>Total Staked</Trans>
                    </div>
                    <div>
                      {!totalUtxStaked && "..."}
                      {totalUtxStaked && (
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          {formatAmount(totalUtxStaked, 18, 0, true) + " UTX"}
                          <span className="label text-secondary">
                            (${formatAmount(stakedUtxSupplyUsd, USD_DECIMALS, 0, true)})
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="App-card-row stake">
                    <div className="label">
                      <Trans>Total Supply</Trans>
                    </div>
                    {!totalUtxSupply && "..."}
                    {totalUtxSupply && (
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {formatAmount(totalUtxSupply, 18, 0, true) + " UTX"}
                        <span className="label text-secondary">
                          (${formatAmount(totalSupplyUsd, USD_DECIMALS, 0, true)})
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Collapse>
              <div className="App-card-row stake">
                <div
                  className="App-card-row-expand"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  onClick={handleOpenCollapseUTX}
                >
                  <span className="App-card-row-text-detail">Details</span>
                  <img src={!isOpenCollapseUTX ? caret_down : caret_up} alt="detail-icon" />
                </div>
              </div>
            </div>
          </div>

          <div className="App-card StakeV2-utx-card stake-and-unstake">
            <div className="StakeV2-utx-card-container">
              <div>
                <div className="App-card-title fw-600 text-primary">
                  <Trans>Stake esUTX</Trans>
                </div>
                <div className="text-secondary fz-base fw-400">Earn esUTX</div>
              </div>
              <img src={earn_stake_esutx_icon} alt="stake-esutx" />
            </div>
            <div
              className="App-card-content"
              style={{
                paddingTop: "16px",
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
            >
              <div className="App-card-divider"></div>

              <div
                style={{
                  paddingTop: "16px",
                }}
                className="App-card-row stake"
              >
                <div className="label text-secondary fw-400 fz-base">
                  <Trans>APR</Trans>
                </div>
                <div>
                  <Tooltip
                    handleClassName="StakeV2-apr-text"
                    handle={`${formatKeyAmount(processedData, "utxAprTotalWithBoost", 2, 2, true)}%`}
                    position="right-bottom"
                    renderContent={() => (
                      <UTXAprTooltip processedData={processedData} nativeTokenSymbol={nativeTokenSymbol} />
                    )}
                  />
                </div>
              </div>
              <div className="App-card-row stake">
                <div className="label text-secondary fw-400 fz-base">
                  <Trans>Rewards</Trans>
                </div>
                <div className="StakeV2-reward-text">
                  ${formatKeyAmount(processedData, "stakedUtxTrackerRewardsUsd", USD_DECIMALS, 2, true)}
                  <Tooltip
                    handle={<img src={earn_info_icon} alt="reward_info" />}
                    position="right-bottom"
                    renderContent={() => {
                      return (
                        <>
                          <StatsTooltipRow
                            label="Escrowed UTX"
                            value={`${formatKeyAmount(
                              processedData,
                              "stakedUtxTrackerRewards",
                              18,
                              4
                            )} ($${formatKeyAmount(
                              processedData,
                              "stakedUtxTrackerRewardsUsd",
                              USD_DECIMALS,
                              2,
                              true
                            )})`}
                            showDollar={false}
                          />
                        </>
                      );
                    }}
                  />
                </div>
              </div>
              <div
                className="App-card-row stake"
                style={{
                  paddingBottom: "16px",
                }}
              >
                <div className="label text-secondary fw-400 fz-base">
                  <Trans>esUTX Staked</Trans>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {formatKeyAmount(processedData, "esUtxInStakedUtx", 18, 2, true)} esUTX{" "}
                  <span style={{ color: "var(--text-secondary" }}>
                    ($
                    {formatKeyAmount(processedData, "esUtxInStakedUtxUsd", USD_DECIMALS, 2, true)})
                  </span>
                </div>
              </div>
              <div className="App-card-divider"></div>

              <div
                style={{
                  paddingTop: "16px",
                }}
                className="App-card-row stake"
              >
                <div className="label text-secondary fw-400 fz-base">{renderMultiplierPointsLabel()}</div>
                <div>{renderMultiplierPointsValue()}</div>
              </div>
              <div
                className="App-card-row stake"
                style={{
                  paddingBottom: "32px",
                }}
              >
                <div className="label text-secondary fw-400 fz-base">
                  <Trans>Boost Percentage</Trans>
                </div>
                <div>
                  <Tooltip
                    handle={`${formatAmount(processedData.boostBasisPoints, 2, 2, false)}%`}
                    position="right-bottom"
                    renderContent={() => {
                      return (
                        <div>
                          <Trans>
                            You are earning {formatAmount(processedData.boostBasisPoints, 2, 2, false)}% more{" "}
                            {nativeTokenSymbol} rewards using{" "}
                            {formatAmount(processedData.bnUtxInFeeUtx, 18, 4, 2, true)} Staked Multiplier Points.
                          </Trans>
                          <br />
                          <br />
                          <Trans>Use the "Compound" button to stake your Multiplier Points.</Trans>
                        </div>
                      );
                    }}
                  />
                </div>
              </div>

              <div
                className="App-card-buttons m-0"
                style={{
                  width: "100%",
                }}
              >
                {!active && (
                  <Button
                    style={{
                      width: "100%",
                    }}
                    variant="primary-action"
                    onClick={() => connectWallet()}
                  >
                    <Trans>Connect Wallet</Trans>
                  </Button>
                )}
                {active && (
                  <Button variant="secondary earn-btn stake" onClick={() => showStakeEsUtxModal()}>
                    <Trans>Stake</Trans>
                  </Button>
                )}
                {active && (
                  <Button variant="secondary earn-btn unstake" onClick={() => showUnstakeEsUtxModal()}>
                    <Trans>Unstake</Trans>
                  </Button>
                )}
              </div>
              <div style={{ marginBottom: "20px" }}></div>
            </div>
            <div
              className="StakeV2-card-details"
              style={{ border: "2px solid #151e2c", padding: "8px 14px 16px 14px", borderRadius: "0px 0px 6px 6px" }}
            >
              <Collapse isOpened={isOpenCollapseesUTX}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div className="App-card-row stake">
                    <div className="label">
                      <Trans>esUTX Price</Trans>
                    </div>
                    <div>
                      {!utxPrice && "..."}
                      {utxPrice && <div>${formatAmount(utxPrice, USD_DECIMALS, 2, true)}</div>}
                    </div>
                  </div>
                  <div className="App-card-row stake">
                    <div className="label ">
                      <Trans>Total Staked</Trans>
                    </div>
                    <div>
                      {!totalUtxStaked && "..."}
                      {totalUtxStaked && (
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          {formatKeyAmount(processedData, "stakedEsUtxSupply", 18, 0, true) + " esUTX"}
                          <span className="label text-secondary">
                            (${formatKeyAmount(processedData, "stakedEsUtxSupplyUsd", USD_DECIMALS, 0, true)})
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="App-card-row stake">
                    <div className="label">
                      <Trans>Total Supply</Trans>
                    </div>
                    {!totalUtxSupply && "..."}
                    {totalUtxSupply && (
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {formatAmount(esUtxSupply, 18, 0, true) + " esUTX"}
                        <span className="label text-secondary">
                          (${formatAmount(esUtxSupplyUsd, USD_DECIMALS, 0, true)})
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Collapse>
              <div className="App-card-row stake">
                <div
                  className="App-card-row-expand"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  onClick={handleOpenCollapseesUTX}
                >
                  <span className="App-card-row-text-detail">Details</span>
                  <img src={!isOpenCollapseesUTX ? caret_down : caret_up} alt="detail-icon" />
                </div>
              </div>
            </div>
          </div>

          <div className="App-card StakeV2-utx-card stake-and-unstake">
            <div className="StakeV2-utx-card-container">
              <div>
                <div className="App-card-title fw-600 text-primary">
                  <Trans>Buy ULP</Trans>
                </div>
                <div className="text-secondary fz-base fw-400">Earn U2U</div>
              </div>
              <img src={earn_stake_ulp_icon} alt="stake-ulp" />
            </div>
            <div
              className="App-card-content"
              style={{
                paddingTop: "16px",
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
            >
              <div className="App-card-divider"></div>

              <div
                style={{
                  paddingTop: "16px",
                }}
                className="App-card-row stake"
              >
                <div className="label text-secondary fw-400 fz-base">
                  <Trans>APR</Trans>
                </div>
                <div>
                  <Tooltip
                    handleClassName="StakeV2-apr-text"
                    handle={`${formatKeyAmount(processedData, "ulpAprTotal", 2, 2, true)}%`}
                    position="right-bottom"
                    renderContent={() => (
                      <>
                        <StatsTooltipRow
                          label={`${nativeTokenSymbol} APR`}
                          value={`${formatKeyAmount(processedData, "ulpAprForNativeToken", 2, 2, true)}%`}
                          showDollar={false}
                        />

                        {processedData?.ulpAprForEsUtx.gt(0) && (
                          <StatsTooltipRow
                            label="Escrowed UTX APR"
                            value={`${formatKeyAmount(processedData, "ulpAprForEsUtx", 2, 2, true)}%`}
                            showDollar={false}
                          />
                        )}
                      </>
                    )}
                  />
                </div>
              </div>
              <div className="App-card-row stake">
                <div className="label text-secondary fw-400 fz-base">
                  <Trans>Rewards</Trans>
                </div>
                <div className="StakeV2-reward-text">
                  ${formatKeyAmount(processedData, "totalUlpRewardsUsd", USD_DECIMALS, 2, true)}
                </div>
              </div>
              <div
                className="App-card-row stake"
                style={{
                  paddingBottom: "16px",
                }}
              >
                <div className="label text-secondary fw-400 fz-base">
                  <Trans>ULP Staked</Trans>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {formatKeyAmount(processedData, "ulpBalance", ULP_DECIMALS, 2, true)} ULP{" "}
                  <span style={{ color: "var(--text-secondary" }}>
                    ($
                    {formatKeyAmount(processedData, "ulpBalanceUsd", USD_DECIMALS, 2, true)})
                  </span>
                </div>
              </div>
              <div className="App-card-divider"></div>

              {/* <div
                style={{
                  paddingTop: "16px",
                }}
                className="App-card-row stake"
              >
                <div className="label text-secondary fw-400 fz-base">{renderMultiplierPointsLabel()}</div>
                <div>{renderMultiplierPointsValue()}</div>
              </div> 
              <div
                className="App-card-row stake"
                style={{
                  paddingBottom: "32px",
                }}
              >
                <div className="label text-secondary fw-400 fz-base">
                  <Trans>Boost Percentage</Trans>
                </div>
                <div>
                  <Tooltip
                    handle={`${formatAmount(processedData.boostBasisPoints, 2, 2, false)}%`}
                    position="right-bottom"
                    renderContent={() => {
                      return (
                        <div>
                          <Trans>
                            You are earning {formatAmount(processedData.boostBasisPoints, 2, 2, false)}% more{" "}
                            {nativeTokenSymbol} rewards using{" "}
                            {formatAmount(processedData.bnUtxInFeeUtx, 18, 4, 2, true)} Staked Multiplier Points.
                          </Trans>
                          <br />
                          <br />
                          <Trans>Use the "Compound" button to stake your Multiplier Points.</Trans>
                        </div>
                      );
                    }}
                  />
                </div>
              </div> */}

              <div
                className="App-card-buttons m-0"
                style={{
                  width: "100%",
                }}
              >
                {!active && (
                  <Button
                    style={{
                      width: "100%",
                    }}
                    className="StakeV2-btn-buy-sell"
                    variant="primary-action"
                    onClick={() => connectWallet()}
                  >
                    <Trans>Connect Wallet</Trans>
                  </Button>
                )}
                {active && (
                  <Link className="StakeV2-btn-buy-sell" to="/buy-ulp">
                    <div>Buy/Sell ULP</div>
                  </Link>
                )}
              </div>
              <div style={{ marginBottom: "20px" }}></div>
            </div>
            <div
              className="StakeV2-card-details"
              style={{ border: "2px solid #151e2c", padding: "8px 14px 16px 14px", borderRadius: "0px 0px 6px 6px" }}
            >
              <Collapse isOpened={isOpenCollapseULP}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div className="App-card-row stake">
                    <div className="label">
                      <Trans>ULP Price</Trans>
                    </div>
                    <div>
                      {!utxPrice && "..."}
                      {utxPrice && <div>${formatKeyAmount(processedData, "ulpPrice", USD_DECIMALS, 3, true)}</div>}
                    </div>
                  </div>
                  <div className="App-card-row stake">
                    <div className="label ">
                      <Trans>Total Staked</Trans>
                    </div>
                    <div>
                      {!totalUtxStaked && "..."}
                      {totalUtxStaked && (
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          {formatKeyAmount(processedData, "ulpSupply", 18, 2, true) + " ULP"}
                          <span className="label text-secondary">
                            (${formatKeyAmount(processedData, "ulpSupplyUsd", USD_DECIMALS, 2, true)})
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="App-card-row stake">
                    <div className="label">
                      <Trans>Total Supply</Trans>
                    </div>
                    {!totalUtxSupply && "..."}
                    {totalUtxSupply && (
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {formatKeyAmount(processedData, "ulpSupply", 18, 2, true) + " ULP"}
                        <span className="label text-secondary">
                          (${formatKeyAmount(processedData, "ulpSupplyUsd", USD_DECIMALS, 2, true)})
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Collapse>
              <div className="App-card-row stake">
                <div
                  className="App-card-row-expand"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  onClick={handleOpenCollapseULP}
                >
                  <span className="App-card-row-text-detail">Details</span>
                  <img src={!isOpenCollapseULP ? caret_down : caret_up} alt="detail-icon" />
                </div>
              </div>
            </div>
          </div>

          <div className="App-card StakeV2-utx-card stake-and-unstake">
            <div className="StakeV2-utx-card-container">
              <div>
                <div className="App-card-title fw-600 text-primary">
                  <Trans>Stake U2U</Trans>
                </div>
                <div className="text-secondary fz-base fw-400">Earn esUTX & U2U</div>
              </div>
              <img src={earn_stake_utx_icon} alt="stake-utx" />
            </div>
            <div
              className="App-card-content"
              style={{
                paddingTop: "16px",
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
            >
              <div className="App-card-divider"></div>

              <div
                style={{
                  paddingTop: "16px",
                }}
                className="App-card-row stake"
              >
                <div className="label text-secondary fw-400 fz-base">
                  <Trans>APR</Trans>
                </div>
                <span className="StakeV2-apr-text">
                  {formatKeyAmount(processedData, "u2uAprTotalWithBoost", 2, 2, true)}%
                </span>
              </div>
              <div className="App-card-row stake">
                <div className="label text-secondary fw-400 fz-base">
                  <Trans>Rewards</Trans>
                </div>
                <div className="StakeV2-reward-text">
                  ${formatKeyAmount(processedData, "feeU2UTrackerRewardsUsd", USD_DECIMALS, 2, true)}
                  <Tooltip
                    handle={<img src={earn_info_icon} alt="reward_info" />}
                    position="right-bottom"
                    renderContent={() => {
                      return (
                        <>
                          <StatsTooltipRow
                            label={`${nativeTokenSymbol}`}
                            value={`${formatKeyAmount(
                              processedData,
                              "feeU2UTrackerRewards",
                              18,
                              4
                            )} ($${formatKeyAmount(processedData, "feeU2UTrackerRewardsUsd", USD_DECIMALS, 2, true)})`}
                            showDollar={false}
                          />
                        </>
                      );
                    }}
                  />
                </div>
              </div>
              <div
                className="App-card-row stake"
                style={{
                  paddingBottom: "16px",
                }}
              >
                <div className="label text-secondary fw-400 fz-base">
                  <Trans>U2U Staked</Trans>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {formatKeyAmount(processedData, "u2uInStakedU2U", 18, 2, true)}
                  <span style={{ color: "var(--text-secondary" }}>
                    ($
                    {formatKeyAmount(processedData, "u2uInStakedU2UUsd", USD_DECIMALS, 2, true)})
                  </span>
                </div>
              </div>
              <div className="App-card-divider"></div>

              <div
                style={{
                  paddingTop: "16px",
                }}
                className="App-card-row stake"
              >
                <div className="label text-secondary fw-400 fz-base">{renderMultiplierPointsLabel()}</div>
                <div>{renderMultiplierPointsValue()}</div>
              </div>
              <div
                className="App-card-row stake"
                style={{
                  paddingBottom: "32px",
                }}
              >
                <div className="label text-secondary fw-400 fz-base">
                  <Trans>Boost Percentage</Trans>
                </div>
                <div>
                  <Tooltip
                    handle={`${formatAmount(processedData.boostBasisPoints, 2, 2, false)}%`}
                    position="right-bottom"
                    renderContent={() => {
                      return (
                        <div>
                          <Trans>
                            You are earning {formatAmount(processedData.boostBasisPoints, 2, 2, false)}% more{" "}
                            {nativeTokenSymbol} rewards using{" "}
                            {formatAmount(processedData.bnUtxInFeeUtx, 18, 4, 2, true)} Staked Multiplier Points.
                          </Trans>
                          <br />
                          <br />
                          <Trans>Use the "Compound" button to stake your Multiplier Points.</Trans>
                        </div>
                      );
                    }}
                  />
                </div>
              </div>

              <div
                className="App-card-buttons m-0"
                style={{
                  width: "100%",
                }}
              >
                {!active && (
                  <Button
                    style={{
                      width: "100%",
                    }}
                    variant="primary-action"
                    onClick={() => connectWallet()}
                  >
                    <Trans>Connect Wallet</Trans>
                  </Button>
                )}
                {active && (
                  <Button variant="secondary earn-btn stake" onClick={() => showStakeEsU2UModal()}>
                    <Trans>Stake</Trans>
                  </Button>
                )}
                {active && (
                  <Button variant="secondary earn-btn unstake" onClick={() => showUnstakeU2UModal()}>
                    <Trans>Unstake</Trans>
                  </Button>
                )}
              </div>
              <div style={{ marginBottom: "20px" }}></div>
            </div>
            <div
              className="StakeV2-card-details"
              style={{ border: "2px solid #151e2c", padding: "8px 14px 16px 14px", borderRadius: "0px 0px 6px 6px" }}
            >
              <Collapse isOpened={isOpenCollapseUTX}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div className="App-card-row stake">
                    <div className="label">
                      <Trans>U2U Price</Trans>
                    </div>
                    <div>
                      {!utxPrice && "..."}
                      {utxPrice && <div>${formatAmount(utxPrice, USD_DECIMALS, 2, true)}</div>}
                    </div>
                  </div>
                  <div className="App-card-row stake">
                    <div className="label ">
                      <Trans>Total Staked</Trans>
                    </div>
                    <div>
                      {!totalUtxStaked && "..."}
                      {totalUtxStaked && (
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          {formatAmount(totalU2uStaked, 18, 0, true) + " U2U"}
                          <span className="label text-secondary">
                            (${formatAmount(stakedU2uSupplyUsd, USD_DECIMALS, 0, true)})
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* <div className="App-card-row stake">
                    <div className="label">
                      <Trans>Total Supply</Trans>
                    </div>
                    {!totalUtxSupply && "..."}
                    {totalUtxSupply && (
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {formatAmount(totalUtxSupply, 18, 0, true) + " UTX"}
                        <span className="label text-secondary">
                          (${formatAmount(totalSupplyUsd, USD_DECIMALS, 0, true)})
                        </span>
                      </div>
                    )}
                  </div> */}
                </div>
              </Collapse>
              <div className="App-card-row stake">
                <div
                  className="App-card-row-expand"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    cursor: "pointer",
                    userSelect: "none",
                  }}
                  onClick={handleOpenCollapseUTX}
                >
                  <span className="App-card-row-text-detail">Details</span>
                  <img src={!isOpenCollapseUTX ? caret_down : caret_up} alt="detail-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vault Vesting */}
      <div>
        <div className="Tab-title-section">
          <div
            className="Page-title fw-600 text-primary"
            style={{
              fontSize: "4rem",
            }}
          >
            Vault Vesting
          </div>
          <div className="Page-description fz-base fw-400 text-secondary">Convert esUTX tokens to UTX tokens.</div>
        </div>
        <div>
          <div className="StakeV2-cards">
            <div
              className="App-card StakeV2-utx-card"
              style={{
                borderRadius: "6px",
                boxShadow: "4px 4px 0px 0px #090D13",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div className="App-card-title fw-600 text-primary">
                    <Trans>UTX Vault</Trans>
                  </div>
                  <div className="text-secondary fz-base fw-400">esUTX to UTX</div>
                </div>
                <img src={vestUtx} alt="vest utx" />
              </div>
              <div
                className="App-card-content"
                style={{
                  paddingTop: "16px",
                }}
              >
                <div className="App-card-divider"></div>

                <div
                  style={{
                    paddingTop: "16px",
                  }}
                  className="App-card-row stake"
                >
                  <div className="label text-secondary fw-400 fz-base">
                    <Trans>Claimable</Trans>
                  </div>
                  <div>
                    <Tooltip
                      handleClassName="StakeV2-vault-claimable"
                      handle={`${formatKeyAmount(vestingData, "gmxVesterClaimable", 18, 4, true)} UTX`}
                      position="right-bottom"
                      renderContent={() => (
                        <Trans>
                          {formatKeyAmount(vestingData, "gmxVesterClaimable", 18, 4, true)} UTX tokens can be claimed,
                          use the options under the Total Rewards section to claim them.
                        </Trans>
                      )}
                    />
                  </div>
                </div>
                <div
                  className="App-card-row stake"
                  style={{
                    paddingBottom: "16px",
                  }}
                >
                  <div className="label text-secondary fw-400 fz-base">
                    <Trans>esUTX Staked</Trans>
                  </div>
                  <div>
                    <Tooltip
                      handle={formatAmount(totalRewardTokens, 18, 2, true)}
                      position="right-bottom"
                      renderContent={() => {
                        return (
                          <>
                            <StatsTooltipRow
                              showDollar={false}
                              label="UTX"
                              value={formatAmount(processedData.utxInStakedUtx, 18, 2, true)}
                            />

                            <StatsTooltipRow
                              showDollar={false}
                              label="esUTX"
                              value={formatAmount(processedData.esUtxInStakedUtx, 18, 2, true)}
                            />
                            <StatsTooltipRow
                              showDollar={false}
                              label="Multiplier Points"
                              value={formatAmount(processedData.bnUtxInFeeUtx, 18, 2, true)}
                            />
                          </>
                        );
                      }}
                    />
                  </div>
                </div>
                <div className="App-card-divider"></div>

                <div
                  style={{
                    paddingTop: "16px",
                  }}
                  className="App-card-row stake"
                >
                  <div className="label text-secondary fw-400 fz-base">
                    <Trans>Reserved</Trans>
                  </div>
                  <div>
                    {formatKeyAmount(vestingData, "gmxVesterPairAmount", 18, 2, true)} /{" "}
                    {formatAmount(totalRewardTokens, 18, 2, true)}
                  </div>
                </div>
                <div
                  className="App-card-row stake"
                  style={{
                    paddingBottom: "32px",
                  }}
                >
                  <div className="label text-secondary fw-400 fz-base">
                    <Trans>Vesting Status</Trans>
                  </div>
                  <div>
                    <Tooltip
                      handle={`${formatKeyAmount(vestingData, "gmxVesterClaimSum", 18, 4, true)} / ${formatKeyAmount(
                        vestingData,
                        "gmxVesterVestedAmount",
                        18,
                        4,
                        true
                      )}`}
                      position="right-bottom"
                      renderContent={() => {
                        return (
                          <div>
                            <Trans>
                              {formatKeyAmount(vestingData, "gmxVesterClaimSum", 18, 4, true)} tokens have been
                              converted to UTX from the{" "}
                              {formatKeyAmount(vestingData, "gmxVesterVestedAmount", 18, 4, true)} esUTX deposited for
                              vesting.
                            </Trans>
                          </div>
                        );
                      }}
                    />
                  </div>
                </div>

                <div
                  className="App-card-buttons m-0"
                  style={{
                    width: "100%",
                  }}
                >
                  {!active && (
                    <Button
                      style={{
                        width: "100%",
                      }}
                      variant="primary-action"
                      onClick={() => connectWallet()}
                    >
                      <Trans>Connect Wallet</Trans>
                    </Button>
                  )}
                  {active && (
                    <Button
                      variant="primary-action"
                      style={{
                        width: "46%",
                      }}
                      onClick={() => showUtxVesterDepositModal()}
                    >
                      <Trans>Deposit</Trans>
                    </Button>
                  )}
                  {active && (
                    <Button
                      style={{
                        width: "46%",
                        background: "var(--bg-default)",
                        border: "1px solid var(--bg-accent)",
                        color: "var(--text-accent)",
                      }}
                      variant="primary-action"
                      onClick={() => showUtxVesterWithdrawModal()}
                    >
                      <Trans>Withdraw</Trans>
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* <div
              className="App-card StakeV2-utx-card"
              style={{
                borderRadius: "6px",
                boxShadow: "4px 4px 0px 0px #090D13",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div className="App-card-title fw-600 text-primary">
                    <Trans>ULP Vault</Trans>
                  </div>
                  <div className="text-secondary fz-base fw-400">esUTX to ULP</div>
                </div>
                <img src={vestUtx} alt="vest utx" />
              </div>
              <div
                className="App-card-content"
                style={{
                  paddingTop: "16px",
                }}
              >
                <div className="App-card-divider"></div>
                <div
                  className="App-card-row stake"
                  style={{
                    paddingTop: "16px",
                  }}
                >
                  <div className="label text-secondary fw-400 fz-base">
                    <Trans>Claimable</Trans>
                  </div>
                  <div>
                    <Tooltip
                      handle={`${formatKeyAmount(vestingData, "glpVesterClaimable", 18, 4, true)} UTX`}
                      position="right-bottom"
                      renderContent={() => (
                        <Trans>
                          {formatKeyAmount(vestingData, "glpVesterClaimable", 18, 4, true)} UTX tokens can be claimed,
                          use the options under the Total Rewards section to claim them.
                        </Trans>
                      )}
                    />
                  </div>
                </div>

                <div
                  className="App-card-row stake"
                  style={{
                    paddingBottom: "16px",
                  }}
                >
                  <div className="label text-secondary fw-400 fz-base">
                    <Trans>esUTX Staked</Trans>
                  </div>
                  <div>{formatAmount(processedData.ulpBalance, 18, 2, true)} ULP</div>
                </div>

                <div className="App-card-divider"></div>

                <div
                  className="App-card-row stake"
                  style={{
                    paddingTop: "16px",
                  }}
                >
                  <div className="label text-secondary fw-400 fz-base">
                    <Trans>Reserved</Trans>
                  </div>
                  <div>
                    {formatKeyAmount(vestingData, "glpVesterPairAmount", 18, 2, true)} /{" "}
                    {formatAmount(processedData.ulpBalance, 18, 2, true)}
                  </div>
                </div>
                <div
                  className="App-card-row stake"
                  style={{
                    paddingBottom: "32px",
                  }}
                >
                  <div className="label text-secondary fw-400 fz-base">
                    <Trans>Vesting Status</Trans>
                  </div>
                  <div>
                    <Tooltip
                      handle={`${formatKeyAmount(vestingData, "glpVesterClaimSum", 18, 4, true)} / ${formatKeyAmount(
                        vestingData,
                        "glpVesterVestedAmount",
                        18,
                        4,
                        true
                      )}`}
                      position="right-bottom"
                      renderContent={() => {
                        return (
                          <div>
                            <Trans>
                              {formatKeyAmount(vestingData, "glpVesterClaimSum", 18, 4, true)} tokens have been
                              converted to UTX from the{" "}
                              {formatKeyAmount(vestingData, "glpVesterVestedAmount", 18, 4, true)} esUTX deposited for
                              vesting.
                            </Trans>
                          </div>
                        );
                      }}
                    />
                  </div>
                </div>

                <div className="App-card-buttons m-0">
                  {!active && (
                    <Button
                      style={{
                        width: "100%",
                      }}
                      variant="primary-action"
                      onClick={() => connectWallet()}
                    >
                      <Trans>Connect Wallet</Trans>
                    </Button>
                  )}
                  {active && (
                    <Button
                      style={{
                        width: "46%",
                      }}
                      variant="primary-action"
                      onClick={() => showUlpVesterDepositModal()}
                    >
                      <Trans>Deposit</Trans>
                    </Button>
                  )}
                  {active && (
                    <Button
                      style={{
                        width: "46%",
                        background: "var(--bg-default)",
                        border: "1px solid var(--bg-accent)",
                        color: "var(--text-accent)",
                      }}
                      variant="primary-action"
                      onClick={() => showUlpVesterWithdrawModal()}
                    >
                      <Trans>Withdraw</Trans>
                    </Button>
                  )}
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
