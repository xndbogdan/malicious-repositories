import React, { useCallback, useState, useMemo, useRef, useEffect } from "react";
import { useKey } from "react-use";
import "./ConfirmationBox.css";
import {
  USD_DECIMALS,
  PRECISION,
  BASIS_POINTS_DIVISOR,
  LIMIT,
  MIN_PROFIT_TIME,
  INCREASE,
  getExchangeRate,
  getExchangeRateDisplay,
  DEFAULT_SLIPPAGE_AMOUNT,
  DEFAULT_HIGHER_SLIPPAGE_AMOUNT,
  calculatePositionDelta,
  DECREASE,
} from "lib/legacy";
import { getConstant } from "config/chains";
import { getContract } from "config/contracts";
import Vault from "abis/Vault.json";

import { BsArrowRight } from "react-icons/bs";
import Modal from "../Modal/Modal";
import Tooltip from "../Tooltip/Tooltip";
import Checkbox from "../Checkbox/Checkbox";
import ExchangeInfoRow from "./ExchangeInfoRow";
import { cancelDecreaseOrder, handleCancelOrder } from "domain/legacy";
import StatsTooltipRow from "../StatsTooltip/StatsTooltipRow";
import { TRIGGER_PREFIX_ABOVE, TRIGGER_PREFIX_BELOW } from "config/ui";
import { useLocalStorageSerializeKey } from "lib/localStorage";
import { SLIPPAGE_BPS_KEY } from "config/localStorage";
import { expandDecimals, formatAmount } from "lib/numbers";
import { getToken, getWrappedToken } from "config/tokens";
import { Plural, t, Trans } from "@lingui/macro";
import Button from "components/Button/Button";
import FeesTooltip from "./FeesTooltip";
import { getTokenInfo, getUsd } from "domain/tokens";
import SlippageInput from "components/SlippageInput/SlippageInput";
import { contractFetcher } from "lib/contracts";
import useSWR from "swr";

const HIGH_SPREAD_THRESHOLD = expandDecimals(1, USD_DECIMALS).div(100); // 1%;

function getSwapSpreadInfo(fromTokenInfo, toTokenInfo, isLong, nativeTokenAddress) {
  if (fromTokenInfo?.spread && toTokenInfo?.spread) {
    let value = fromTokenInfo.spread.add(toTokenInfo.spread);

    const fromTokenAddress = fromTokenInfo.isNative ? nativeTokenAddress : fromTokenInfo.address;
    const toTokenAddress = toTokenInfo.isNative ? nativeTokenAddress : toTokenInfo.address;

    if (isLong && fromTokenAddress === toTokenAddress) {
      value = fromTokenInfo.spread;
    }

    return {
      value,
      isHigh: value.gt(HIGH_SPREAD_THRESHOLD),
    };
  }
}

function renderAllowedSlippage(setAllowedSlippage, defaultSlippage) {
  return (
    <ExchangeInfoRow label={"Allowed Slippage"}>
      <div className="text-primary">{defaultSlippage / 100}%</div>
    </ExchangeInfoRow>
  );
}

export default function ConfirmationBox(props) {
  const {
    fromToken,
    fromTokenInfo,
    toToken,
    toTokenInfo,
    isSwap,
    isLong,
    isMarketOrder,
    orderOption,
    isShort,
    toAmount,
    fromAmount,
    isHigherSlippageAllowed,
    onConfirmationClick,
    setIsConfirming,
    hasExistingPosition,
    leverage,
    existingPosition,
    existingLiquidationPrice,
    displayLiquidationPrice,
    shortCollateralToken,
    isPendingConfirmation,
    triggerPriceUsd,
    triggerRatio,
    feesUsd,
    isSubmitting,
    fromUsdMin,
    toUsdMax,
    nextAveragePrice,
    collateralTokenAddress,
    feeBps,
    chainId,
    orders,
    library,
    setPendingTxns,
    pendingTxns,
    minExecutionFee,
    minExecutionFeeUSD,
    minExecutionFeeErrorMessage,
    entryMarkPrice,
    positionFee,
    swapFees,
    infoTokens,
    fundingRate,
    borrowFeeText,
  } = props;

  const [savedSlippageAmount] = useLocalStorageSerializeKey([chainId, SLIPPAGE_BPS_KEY], DEFAULT_SLIPPAGE_AMOUNT);
  const [isProfitWarningAccepted, setIsProfitWarningAccepted] = useState(false);
  const [isTriggerWarningAccepted, setIsTriggerWarningAccepted] = useState(false);
  const [isLimitOrdersVisible, setIsLimitOrdersVisible] = useState(false);

  const [allowedSlippage, setAllowedSlippage] = useState(savedSlippageAmount);
  const vaultAddress = getContract(chainId, "Vault");

  const { data: spreadFeeBasisPoints } = useSWR(
    [`spreadFeeBasisPoints`, chainId, vaultAddress, "spreadFeeBasisPoints"],
    {
      fetcher: contractFetcher(library, Vault, []),
    }
  );

  const spreadFeePercent = spreadFeeBasisPoints ? spreadFeeBasisPoints?.toNumber() / 100 : 0;

  useEffect(() => {
    setAllowedSlippage(savedSlippageAmount);
    if (isHigherSlippageAllowed) {
      setAllowedSlippage(DEFAULT_HIGHER_SLIPPAGE_AMOUNT);
    }
  }, [savedSlippageAmount, isHigherSlippageAllowed]);

  const onCancelOrderClick = useCallback(
    (order) => {
      handleCancelOrder(chainId, library, order, { pendingTxns, setPendingTxns });
    },
    [library, pendingTxns, setPendingTxns, chainId]
  );

  let minOut;
  let fromTokenUsd;
  let toTokenUsd;

  let collateralAfterFees = fromUsdMin;
  if (feesUsd) {
    collateralAfterFees = fromUsdMin.sub(feesUsd);
  }
  if (isSwap) {
    minOut = toAmount.mul(BASIS_POINTS_DIVISOR - allowedSlippage).div(BASIS_POINTS_DIVISOR);

    fromTokenUsd = fromTokenInfo ? formatAmount(fromTokenInfo.minPrice, USD_DECIMALS, 2, true) : 0;
    toTokenUsd = toTokenInfo ? formatAmount(toTokenInfo.maxPrice, USD_DECIMALS, 2, true) : 0;
  }

  const getTitle = () => {
    if (!isMarketOrder) {
      return t`Confirm Limit Order`;
    }
    if (isSwap) {
      return t`Confirm Swap`;
    }
    return isLong ? t`Confirm Long` : t`Confirm Short`;
  };

  const title = getTitle();

  const existingOrder = useMemo(() => {
    const wrappedToken = getWrappedToken(chainId);
    for (const order of orders) {
      if (order.type !== INCREASE) continue;
      const sameToken =
        order.indexToken === wrappedToken.address ? toToken.isNative : order.indexToken === toToken.address;
      if (order.isLong === isLong && sameToken) {
        return order;
      }
    }
  }, [orders, chainId, isLong, toToken.address, toToken.isNative]);

  const existingOrders = useMemo(() => {
    const wrappedToken = getWrappedToken(chainId);
    return orders.filter((order) => {
      if (order.type !== INCREASE) return false;
      const sameToken =
        order.indexToken === wrappedToken.address ? toToken.isNative : order.indexToken === toToken.address;
      return order.isLong === isLong && sameToken;
    });
  }, [orders, chainId, isLong, toToken.address, toToken.isNative]);

  const existingTriggerOrders = useMemo(() => {
    const wrappedToken = getWrappedToken(chainId);
    return orders.filter((order) => {
      if (order.type !== DECREASE) return false;
      const sameToken =
        order.indexToken === wrappedToken.address ? toToken.isNative : order.indexToken === toToken.address;
      return order.isLong === isLong && sameToken;
    });
  }, [orders, chainId, isLong, toToken.address, toToken.isNative]);

  const decreaseOrdersThatWillBeExecuted = useMemo(() => {
    if (isSwap) return [];
    return existingTriggerOrders.filter((order) => {
      if (order.triggerAboveThreshold) {
        return existingPosition?.markPrice.gte(order.triggerPrice);
      } else {
        return existingPosition?.markPrice.lte(order.triggerPrice);
      }
    });
  }, [existingPosition, existingTriggerOrders, isSwap]);

  const getError = () => {
    if (!isSwap && hasExistingPosition && !isMarketOrder) {
      const { delta, hasProfit } = calculatePositionDelta(triggerPriceUsd, existingPosition);
      if (hasProfit && delta.eq(0)) {
        return t`Invalid price, see warning`;
      }
    }
    if (isMarketOrder && hasPendingProfit && !isProfitWarningAccepted) {
      return t`Forfeit profit not checked`;
    }
    return false;
  };

  const getPrimaryText = () => {
    if (decreaseOrdersThatWillBeExecuted.length > 0 && !isTriggerWarningAccepted) {
      return t`Accept confirmation of trigger orders`;
    }

    if (!isPendingConfirmation) {
      const error = getError();
      if (error) {
        return error;
      }

      if (isSwap) {
        return title;
      }
      const action = isLong ? t`Long` : t`Short`;

      if (
        isMarketOrder &&
        MIN_PROFIT_TIME > 0 &&
        hasExistingPosition &&
        existingPosition.delta.eq(0) &&
        existingPosition.pendingDelta.gt(0)
      ) {
        return isLong ? t`Forfeit profit and ${action}` : t`Forfeit profit and Short`;
      }

      return isMarketOrder && MIN_PROFIT_TIME > 0 ? t`Accept minimum and ${action}` : action;
    }

    if (!isMarketOrder) {
      return t`Creating Order...`;
    }
    if (isSwap) {
      return t`Swapping...`;
    }
    if (isLong) {
      return t`Longing...`;
    }
    return t`Shorting...`;
  };

  const isPrimaryEnabled = () => {
    if (getError()) {
      return false;
    }
    if (decreaseOrdersThatWillBeExecuted.length > 0 && !isTriggerWarningAccepted) {
      return false;
    }
    return !isPendingConfirmation && !isSubmitting;
  };

  const nativeTokenAddress = getContract(chainId, "NATIVE_TOKEN");
  const spreadInfo = getSwapSpreadInfo(fromTokenInfo, toTokenInfo, isLong, nativeTokenAddress);

  // it's meaningless for limit/stop orders to show spread based on current prices
  const showSwapSpread = isSwap && isMarketOrder && !!spreadInfo;

  const renderSwapSpreadWarning = useCallback(() => {
    if (!isMarketOrder) {
      return null;
    }

    if (spreadInfo && spreadInfo.isHigh) {
      return (
        <div className="Confirmation-box-warning">
          <Trans>The spread is {`>`} 1%, please ensure the trade details are acceptable before confirming</Trans>
        </div>
      );
    }
  }, [isMarketOrder, spreadInfo]);

  const collateralSpreadInfo = useMemo(() => {
    if (!toTokenInfo?.spread || !collateralTokenAddress) {
      return null;
    }

    let totalSpread = toTokenInfo.spread;
    if (toTokenInfo.address === collateralTokenAddress) {
      return {
        value: totalSpread,
        isHigh: toTokenInfo.spread.gt(HIGH_SPREAD_THRESHOLD),
      };
    }

    const collateralTokenInfo = getTokenInfo(infoTokens, collateralTokenAddress);
    if (collateralTokenInfo?.spread) {
      totalSpread = totalSpread.add(collateralTokenInfo.spread);
    }

    return {
      value: totalSpread,
      isHigh: totalSpread.gt(HIGH_SPREAD_THRESHOLD),
    };
  }, [toTokenInfo, collateralTokenAddress, infoTokens]);

  const renderCollateralSpreadWarning = useCallback(() => {
    if (collateralSpreadInfo && collateralSpreadInfo.isHigh) {
      return (
        <div className="Confirmation-box-warning">
          <Trans>
            Transacting with a depegged stable coin is subject to spreads reflecting the worse of current market price
            or $1.00, with transactions involving multiple stablecoins may have multiple spreads.
          </Trans>
        </div>
      );
    }
  }, [collateralSpreadInfo]);

  const showCollateralSpread = !isSwap && isMarketOrder && !!collateralSpreadInfo;

  const renderFeeWarning = useCallback(() => {
    if (orderOption === LIMIT || !feeBps || feeBps <= 60) {
      return null;
    }

    if (isSwap) {
      return (
        <div className="Confirmation-box-warning">
          <Trans>
            Fees are high to swap from {fromToken.symbol} to {toToken.symbol}.
          </Trans>
        </div>
      );
    }

    if (!collateralTokenAddress) {
      return null;
    }

    const collateralToken = getToken(chainId, collateralTokenAddress);
    return (
      <div className="Confirmation-box-warning">
        <Trans>
          Fees are high to swap from {fromToken.symbol} to {collateralToken.symbol}. <br />
          {collateralToken.symbol} is needed for collateral.
        </Trans>
      </div>
    );
  }, [feeBps, isSwap, collateralTokenAddress, chainId, fromToken.symbol, toToken.symbol, orderOption]);

  const hasPendingProfit =
    MIN_PROFIT_TIME > 0 && existingPosition && existingPosition.delta.eq(0) && existingPosition.pendingDelta.gt(0);

  const renderExistingOrderWarning = useCallback(() => {
    if (isSwap || !existingOrder) {
      return;
    }
    const indexToken = getToken(chainId, existingOrder.indexToken);
    const sizeInToken = formatAmount(
      existingOrder.sizeDelta.mul(PRECISION).div(existingOrder.triggerPrice),
      USD_DECIMALS,
      4,
      true
    );
    const longOrShortText = existingOrder.isLong ? t`Long` : t`Short`;
    if (existingOrders?.length > 1) {
      return (
        <div>
          <div className="Confirmation-box-info">
            <span>
              <Trans>
                You have multiple existing Increase {longOrShortText} {indexToken.symbol} limit orders{" "}
              </Trans>
            </span>
            <span onClick={() => setIsLimitOrdersVisible((p) => !p)} className="view-orders">
              ({isLimitOrdersVisible ? t`hide` : t`view`})
            </span>
          </div>
          {isLimitOrdersVisible && (
            <ul className="order-list">
              {existingOrders.map((order) => {
                const { account, index, type, triggerAboveThreshold, triggerPrice } = order;
                const id = `${account}-${index}`;
                const triggerPricePrefix = triggerAboveThreshold ? TRIGGER_PREFIX_ABOVE : TRIGGER_PREFIX_BELOW;
                const indexToken = getToken(chainId, order.indexToken);

                return (
                  <li key={id} className="font-sm">
                    <p>
                      {type === INCREASE ? t`Increase` : t`Decrease`} {indexToken.symbol} {isLong ? t`Long` : t`Short`}{" "}
                      &nbsp;{triggerPricePrefix} ${formatAmount(triggerPrice, USD_DECIMALS, 2, true)}
                    </p>
                    <button onClick={() => onCancelOrderClick(order)}>
                      <Trans>Cancel</Trans>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      );
    }
    return (
      <div className="Confirmation-box-info">
        <Trans>
          You have an active Limit Order to Increase {longOrShortText} {sizeInToken} {indexToken.symbol} ($
          {formatAmount(existingOrder.sizeDelta, USD_DECIMALS, 2, true)}) at price $
          {formatAmount(existingOrder.triggerPrice, USD_DECIMALS, 2, true)}
        </Trans>
      </div>
    );
  }, [existingOrder, isSwap, chainId, existingOrders, isLong, isLimitOrdersVisible, onCancelOrderClick]);

  const renderExistingTriggerErrors = useCallback(() => {
    if (isSwap || decreaseOrdersThatWillBeExecuted?.length < 1) {
      return;
    }
    const existingTriggerOrderLength = decreaseOrdersThatWillBeExecuted.length;
    return (
      <>
        <div className="Confirmation-box-warning">
          <Plural
            value={existingTriggerOrderLength}
            one="You have an active trigger order that might execute immediately after you open this position. Please cancel the order or accept the confirmation to continue."
            other="You have # active trigger orders that might execute immediately after you open this position. Please cancel the orders or accept the confirmation to continue."
          />
        </div>
        <ul className="order-list">
          {decreaseOrdersThatWillBeExecuted.map((order) => {
            const { account, index, type, triggerAboveThreshold, triggerPrice } = order;
            const id = `${account}-${index}`;
            const triggerPricePrefix = triggerAboveThreshold ? TRIGGER_PREFIX_ABOVE : TRIGGER_PREFIX_BELOW;
            const indexToken = getToken(chainId, order.indexToken);
            return (
              <li key={id} className="font-sm">
                <p>
                  {type === INCREASE ? t`Increase` : t`Decrease`} {indexToken.symbol} {isLong ? t`Long` : t`Short`}
                  &nbsp;{triggerPricePrefix} ${formatAmount(triggerPrice, USD_DECIMALS, 2, true)}
                </p>
                <button
                  onClick={() =>
                    cancelDecreaseOrder(chainId, library, index, {
                      successMsg: t`Order cancelled`,
                      failMsg: t`Cancel failed`,
                      sentMsg: t`Cancel submitted`,
                      pendingTxns,
                      setPendingTxns,
                    })
                  }
                >
                  <Trans>Cancel</Trans>
                </button>
              </li>
            );
          })}
        </ul>
      </>
    );
  }, [decreaseOrdersThatWillBeExecuted, isSwap, chainId, library, pendingTxns, setPendingTxns, isLong]);

  const renderExistingTriggerWarning = useCallback(() => {
    if (
      isSwap ||
      existingTriggerOrders.length < 1 ||
      decreaseOrdersThatWillBeExecuted.length > 0 ||
      renderExistingOrderWarning()
    ) {
      return;
    }
    const existingTriggerOrderLength = existingTriggerOrders.length;
    return (
      <div className="Confirmation-box-info">
        <Plural
          value={existingTriggerOrderLength}
          one="You have an active trigger order that could impact this position."
          other="You have # active trigger orders that could impact this position."
        />
      </div>
    );
  }, [existingTriggerOrders, isSwap, decreaseOrdersThatWillBeExecuted, renderExistingOrderWarning]);

  // TODO handle unaprproved order plugin (very unlikely case)
  const renderMain = useCallback(() => {
    if (isSwap) {
      return (
        <div
          className="Confirmation-box-main"
          style={{
            position: "relative",
            marginBottom: "24px",
          }}
        >
          <div className="content-modal-confirm-swap text-secondary fz-base fw-400">
            <div className="text-primary fz-md fw-600">
              <Trans>Pay</Trans>&nbsp;{formatAmount(fromAmount, fromToken.decimals, 4, true)} {fromToken.symbol}
            </div>
            ~${formatAmount(fromUsdMin, USD_DECIMALS, 2, true)}
          </div>
          <div className="style-switch-swap">
            <div className="Confirmation-box-main-icon"></div>
          </div>
          <div
            className="content-modal-confirm-swap text-secondary  fz-base fw-400"
            style={{
              marginTop: "8px",
            }}
          >
            <div className="text-primary  fz-md fw-600">
              <Trans>Receive</Trans>&nbsp;{formatAmount(toAmount, toToken.decimals, 4, true)} {toToken.symbol}
            </div>
            ~${formatAmount(toUsdMax, USD_DECIMALS, 2, true)}
          </div>
        </div>
      );
    }

    return (
      <div className="Confirmation-box-main" style={{ marginBottom: "24px" }}>
        <div className="content-modal-confirm-swap text-primary fz-md fw-600">
          {isLong ? t`Long` : t`Short`}&nbsp;
          {formatAmount(toAmount, toToken.decimals, 4, true)} {toToken.symbol}
          <div className="text-secondary fz-base fw-400">
            ~$
            {formatAmount(toUsdMax, USD_DECIMALS, 2, true)}
          </div>
        </div>
      </div>
    );
  }, [isSwap, fromAmount, fromToken, toToken, fromUsdMin, toUsdMax, isLong, toAmount]);

  const SWAP_ORDER_EXECUTION_GAS_FEE = getConstant(chainId, "SWAP_ORDER_EXECUTION_GAS_FEE");
  const INCREASE_ORDER_EXECUTION_GAS_FEE = getConstant(chainId, "INCREASE_ORDER_EXECUTION_GAS_FEE");
  const executionFee = isSwap ? SWAP_ORDER_EXECUTION_GAS_FEE : INCREASE_ORDER_EXECUTION_GAS_FEE;
  const executionFeeUsd = getUsd(executionFee, nativeTokenAddress, false, infoTokens);
  const currentExecutionFee = isMarketOrder ? minExecutionFee : executionFee;
  const currentExecutionFeeUsd = isMarketOrder ? minExecutionFeeUSD : executionFeeUsd;

  const renderAvailableLiquidity = useCallback(() => {
    let availableLiquidity;
    const riskThresholdBps = 5000;
    let isLiquidityRisk;
    const token = isSwap || isLong ? toTokenInfo : shortCollateralToken;

    if (!token || !token.poolAmount || !token.availableAmount) {
      return null;
    }

    if (isSwap) {
      const poolWithoutBuffer = token.poolAmount.sub(token.bufferAmount);
      availableLiquidity = token.availableAmount.gt(poolWithoutBuffer) ? poolWithoutBuffer : token.availableAmount;
      isLiquidityRisk = availableLiquidity.mul(riskThresholdBps).div(BASIS_POINTS_DIVISOR).lt(toAmount);
    } else {
      if (isShort) {
        availableLiquidity = token.availableAmount;

        let adjustedMaxGlobalShortSize;

        if (toTokenInfo.maxAvailableShort && toTokenInfo.maxAvailableShort.gt(0)) {
          adjustedMaxGlobalShortSize = toTokenInfo.maxAvailableShort
            .mul(expandDecimals(1, token.decimals))
            .div(expandDecimals(1, USD_DECIMALS));
        }

        if (adjustedMaxGlobalShortSize && adjustedMaxGlobalShortSize.lt(token.availableAmount)) {
          availableLiquidity = adjustedMaxGlobalShortSize;
        }

        const sizeTokens = toUsdMax.mul(expandDecimals(1, token.decimals)).div(token.minPrice);
        isLiquidityRisk = availableLiquidity.mul(riskThresholdBps).div(BASIS_POINTS_DIVISOR).lt(sizeTokens);
      } else {
        availableLiquidity = token.availableAmount;
        isLiquidityRisk = availableLiquidity.mul(riskThresholdBps).div(BASIS_POINTS_DIVISOR).lt(toAmount);
      }
    }

    if (!availableLiquidity) {
      return null;
    }

    return (
      <ExchangeInfoRow label={t`Available Liquidity`}>
        <div className="text-primary">
          {formatAmount(availableLiquidity, token.decimals, token.isStable ? 0 : 2, true)} {token.symbol}
        </div>
      </ExchangeInfoRow>
    );
  }, [toTokenInfo, shortCollateralToken, isShort, isLong, isSwap, toAmount, toUsdMax]);

  const renderMarginSection = useCallback(() => {
    const collateralToken = getToken(chainId, collateralTokenAddress);
    return (
      <>
        <div>
          {renderMain()}
          {/* {renderCollateralSpreadWarning()} */}
          {/* {renderFeeWarning()} */}
          {/* {renderExistingOrderWarning()} */}
          {/* {renderExistingTriggerErrors()} */}
          {/* {renderExistingTriggerWarning()} */}
          {minExecutionFeeErrorMessage && <div className="Confirmation-box-warning">{minExecutionFeeErrorMessage}</div>}
          {hasPendingProfit && isMarketOrder && (
            <div className="PositionEditor-accept-profit-warning">
              <Checkbox isChecked={isProfitWarningAccepted} setIsChecked={setIsProfitWarningAccepted}>
                <span className="muted">
                  <Trans>Forfeit profit</Trans>
                </span>
              </Checkbox>
            </div>
          )}
          <ExchangeInfoRow label={t`Pay`}>
            <div>
              {formatAmount(fromAmount, fromToken.decimals, 4, true)} {fromToken.symbol} ($
              {formatAmount(fromUsdMin, USD_DECIMALS, 2, true)})
            </div>
          </ExchangeInfoRow>
          {renderAvailableLiquidity()}
          <ExchangeInfoRow label={t`Collateral in`}>
            <div className="text.primary">{isMarketOrder ? "USD" : collateralToken.symbol}</div>
          </ExchangeInfoRow>

          <ExchangeInfoRow label={t`Leverage`}>
            {hasExistingPosition && toAmount && toAmount.gt(0) && (
              <div className="inline-block muted">
                {formatAmount(existingPosition.leverage, 4, 2)}x
                <BsArrowRight className="transition-arrow" />
              </div>
            )}
            {toAmount && leverage && leverage.gt(0) && `${formatAmount(leverage, 4, 2)}x`}
            {!toAmount && leverage && leverage.gt(0) && `-`}
            {leverage && leverage.eq(0) && `-`}
          </ExchangeInfoRow>

          <ExchangeInfoRow label={t`Fees`}>
            <FeesTooltip
              isNoTooltip={true}
              fundingRate={fundingRate}
              executionFees={{
                fee: currentExecutionFee,
                feeUsd: currentExecutionFeeUsd,
              }}
              positionFee={positionFee}
              swapFee={swapFees}
            />
          </ExchangeInfoRow>

          <ExchangeInfoRow label={t`Collateral`}>
            <div className="text-primary">${formatAmount(collateralAfterFees, USD_DECIMALS, 2, true)}</div>
          </ExchangeInfoRow>

          {/* {showCollateralSpread && (
            <ExchangeInfoRow label={t`Collateral Spread`} isWarning={collateralSpreadInfo.isHigh} isTop>
              {formatAmount(collateralSpreadInfo.value.mul(100), USD_DECIMALS, 2, true)}%
            </ExchangeInfoRow>
          )} */}
          {isMarketOrder && (
            <ExchangeInfoRow label={t`Entry Price`} isTop>
              {hasExistingPosition && toAmount && toAmount.gt(0) && (
                <div className="inline-block muted">
                  ${formatAmount(existingPosition.averagePrice, USD_DECIMALS, 2, true)}
                  <BsArrowRight className="transition-arrow" />
                </div>
              )}
              {nextAveragePrice && `$${formatAmount(nextAveragePrice, USD_DECIMALS, 2, true)}`}
              {!nextAveragePrice && `-`}
            </ExchangeInfoRow>
          )}
          {!isMarketOrder && (
            <ExchangeInfoRow label={t`Mark Price`} isTop={true}>
              ${formatAmount(entryMarkPrice, USD_DECIMALS, 2, true)}
            </ExchangeInfoRow>
          )}
          {!isMarketOrder && (
            <ExchangeInfoRow label={t`Limit Price`}>
              ${formatAmount(triggerPriceUsd, USD_DECIMALS, 2, true)}
            </ExchangeInfoRow>
          )}
          <ExchangeInfoRow label={t`Liq. Price`}>
            {hasExistingPosition && toAmount && toAmount.gt(0) && (
              <div className="inline-block muted">
                ${formatAmount(existingLiquidationPrice, USD_DECIMALS, 2, true)}
                <BsArrowRight className="transition-arrow" />
              </div>
            )}
            {toAmount && displayLiquidationPrice && `$${formatAmount(displayLiquidationPrice, USD_DECIMALS, 2, true)}`}
            {!toAmount && displayLiquidationPrice && `-`}
            {!displayLiquidationPrice && `-`}
          </ExchangeInfoRow>
          {!isSwap ? (
            <ExchangeInfoRow label={t`Spread Fee`} isTop>
              <div className="text-primary">{spreadFeePercent}%</div>
            </ExchangeInfoRow>
          ) : null}

          <ExchangeInfoRow label={t`Borrow Fee`} isTop={isSwap}>
            <div className="text-primary">{borrowFeeText}</div>
          </ExchangeInfoRow>
          <ExchangeInfoRow label={t`Execution Fee`}>
            <div className="text-primary">{formatAmount(currentExecutionFee, USD_DECIMALS, 2, true)}</div>
          </ExchangeInfoRow>
          {isMarketOrder && renderAllowedSlippage(setAllowedSlippage, savedSlippageAmount)}

          {/* {decreaseOrdersThatWillBeExecuted.length > 0 && (
            <div className="PositionEditor-allow-higher-slippage">
              <Checkbox isChecked={isTriggerWarningAccepted} setIsChecked={setIsTriggerWarningAccepted}>
                <span className="muted font-sm">
                  <Trans>I am aware of the trigger orders</Trans>
                </span>
              </Checkbox>
            </div>
          )} */}
        </div>
      </>
    );
  }, [
    renderMain,
    nextAveragePrice,
    toAmount,
    hasExistingPosition,
    existingPosition,
    isMarketOrder,
    triggerPriceUsd,
    displayLiquidationPrice,
    existingLiquidationPrice,
    feesUsd,
    leverage,
    chainId,
    renderFeeWarning,
    hasPendingProfit,
    isProfitWarningAccepted,
    renderAvailableLiquidity,
    orderOption,
    fromUsdMin,
    collateralAfterFees,
    renderExistingOrderWarning,
    renderExistingTriggerWarning,
    renderExistingTriggerErrors,
    isTriggerWarningAccepted,
    decreaseOrdersThatWillBeExecuted,
    minExecutionFeeErrorMessage,
    collateralTokenAddress,
    entryMarkPrice,
    positionFee,
    swapFees,
    currentExecutionFee,
    currentExecutionFeeUsd,
    renderCollateralSpreadWarning,
    collateralSpreadInfo,
    showCollateralSpread,
    savedSlippageAmount,
    fundingRate,
  ]);

  const renderSwapSection = useCallback(() => {
    return (
      <div>
        {renderMain()}
        {renderFeeWarning()}
        {renderSwapSpreadWarning()}
        {orderOption === LIMIT && renderAvailableLiquidity()}
        <ExchangeInfoRow label={t`Min. Receive`}>
          {formatAmount(minOut, toTokenInfo.decimals, 4, true)} {toTokenInfo.symbol}
        </ExchangeInfoRow>
        <ExchangeInfoRow label={t`Rate`}>
          {getExchangeRateDisplay(getExchangeRate(fromTokenInfo, toTokenInfo), fromTokenInfo, toTokenInfo)}
        </ExchangeInfoRow>
        {showSwapSpread && (
          <ExchangeInfoRow label={t`Spread`} isWarning={spreadInfo.isHigh}>
            {formatAmount(spreadInfo.value.mul(100), USD_DECIMALS, 2, true)}%
          </ExchangeInfoRow>
        )}

        <ExchangeInfoRow label={t`Fees`}>
          <FeesTooltip
            executionFees={
              !isMarketOrder && {
                fee: currentExecutionFee,
                feeUsd: currentExecutionFeeUsd,
              }
            }
            isNoTooltip
            swapFee={feesUsd}
          />
        </ExchangeInfoRow>
        {/* {isMarketOrder && renderAllowedSlippage(setAllowedSlippage, savedSlippageAmount)} */}
        {!isMarketOrder && (
          <div className="Exchange-info-row">
            <div className="Exchange-info-label">
              <Trans>Limit Price</Trans>
            </div>
            <div className="align-right">{getExchangeRateDisplay(triggerRatio, fromTokenInfo, toTokenInfo)}</div>
          </div>
        )}

        {fromTokenUsd && (
          <ExchangeInfoRow label={`${fromTokenInfo.symbol} Price`} isTop>
            <div className="align-right">{fromTokenUsd} USD</div>
          </ExchangeInfoRow>
        )}

        {toTokenUsd && (
          <div className="Exchange-info-row">
            <div className="Exchange-info-label">
              <Trans>{toTokenInfo.symbol} Price</Trans>
            </div>
            <div className="align-right">{toTokenUsd} USD</div>
          </div>
        )}
      </div>
    );
  }, [
    renderMain,
    renderSwapSpreadWarning,
    fromTokenInfo,
    toTokenInfo,
    orderOption,
    showSwapSpread,
    spreadInfo,
    feesUsd,
    fromTokenUsd,
    toTokenUsd,
    triggerRatio,
    isMarketOrder,
    minOut,
    renderFeeWarning,
    renderAvailableLiquidity,
    currentExecutionFee,
    currentExecutionFeeUsd,
    savedSlippageAmount,
  ]);
  const submitButtonRef = useRef(null);

  useKey("Enter", () => {
    submitButtonRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    onConfirmationClick();
  });

  const textButton = getPrimaryText();

  return (
    <div className="Confirmation-box">
      <Modal isVisible={true} setIsVisible={() => setIsConfirming(false)} label={title}>
        {isSwap && renderSwapSection()}
        {!isSwap && renderMarginSection()}
        <div className="Confirmation-box-row" ref={submitButtonRef}>
          <Button
            variant={
              textButton.includes("Long")
                ? "long-action"
                : textButton.includes("Short")
                ? "short-action"
                : "brand-action"
            }
            onClick={onConfirmationClick}
            className="w-full mt-sm"
            disabled={!isPrimaryEnabled()}
            type="submit"
          >
            {getPrimaryText()}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
