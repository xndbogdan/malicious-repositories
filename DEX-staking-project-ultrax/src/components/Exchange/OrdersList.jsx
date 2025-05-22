import React, { useState, useCallback } from "react";
import { t, Trans } from "@lingui/macro";
import cancelX from "../../img/cancelX.svg";
import {
  SWAP,
  INCREASE,
  DECREASE,
  USD_DECIMALS,
  getOrderError,
  getExchangeRateDisplay,
  getExchangeRate,
  getPositionForOrder,
} from "lib/legacy";
import { handleCancelOrder } from "domain/legacy";
import { getContract } from "config/contracts";

import Tooltip from "../Tooltip/Tooltip";
import OrderEditor from "./OrderEditor";

import "./OrdersList.css";
import StatsTooltipRow from "../StatsTooltip/StatsTooltipRow";
import { TRIGGER_PREFIX_ABOVE, TRIGGER_PREFIX_BELOW } from "config/ui";
import { getTokenInfo, getUsd } from "domain/tokens/utils";
import { formatAmount } from "lib/numbers";
// import ExternalLink from "components/ExternalLink/ExternalLink";

function getOrderTitle(order, indexTokenSymbol) {
  const orderTypeText = order.type === INCREASE ? t`Increase` : t`Decrease`;
  return `${orderTypeText} ${indexTokenSymbol}`;
}

export default function OrdersList(props) {
  const {
    account,
    library,
    setPendingTxns,
    pendingTxns,
    infoTokens,
    positionsMap,
    totalTokenWeights,
    usdgSupply,
    orders,
    hideActions,
    chainId,
    savedShouldDisableValidationForTesting,
    cancelOrderIdList,
    setCancelOrderIdList,
  } = props;

  const [editingOrder, setEditingOrder] = useState(null);

  const onCancelClick = useCallback(
    (order) => {
      handleCancelOrder(chainId, library, order, { pendingTxns, setPendingTxns });
    },
    [library, pendingTxns, setPendingTxns, chainId]
  );

  const onEditClick = useCallback(
    (order) => {
      setEditingOrder(order);
    },
    [setEditingOrder]
  );

  const renderHead = useCallback(() => {
    return (
      <tr className="Exchange-list-header order-list row">
        <th className="Symbol">
          <Trans>Symbol</Trans>
        </th>
        <th className="Order">
          <Trans>Order</Trans>
        </th>
        <th className="Type">
          <Trans>Type</Trans>
        </th>
        <th className="Side">
          <Trans>Side</Trans>
        </th>
        <th className="OrderPrice">
          <Trans>Order Price</Trans>
        </th>
        <th className="Amount">
          <Trans>Amount</Trans>
        </th>
        <th className="Edit">
          <div></div>
        </th>
        <th className="Close">
          <div></div>
        </th>
      </tr>
    );
  }, []);

  const renderEmptyRow = useCallback(() => {
    if (orders && orders.length) {
      return null;
    }

    return (
      <tr>
        <td colSpan="6">
          {!account ? (
            <div className="Exchange-list-no-connect">
              <span className="Exchange-list-no-connect-title">Wallet Required</span>
              <span className="Exchange-list-no-connect-text">Connect wallet to view your opening orders</span>
            </div>
          ) : (
            orders.length === 0 && (
              <div
                style={{
                  width: "100%",
                }}
              >
                <div
                  className="fz-lg fw-600 text-primary"
                  style={{
                    textAlign: "center",
                    marginTop: "4rem",
                  }}
                >
                  No Order Found
                </div>
                <div
                  className="fz-sm fw-500 text-secondary"
                  style={{
                    textAlign: "center",
                    marginTop: "0.5rem",
                    marginBottom: "4rem",
                  }}
                >
                  You have no opening order
                </div>
              </div>
            )
          )}
        </td>
      </tr>
    );
  }, [account, orders]);

  const renderActions = useCallback(
    (order) => {
      return (
        <>
          <td>
            <button className="Exchange-list-action Edit" onClick={() => onEditClick(order)}>
              <Trans>Edit</Trans>
            </button>
          </td>
          <td>
            <button className="Exchange-list-action Close" onClick={() => onCancelClick(order)}>
              <img src={cancelX} alt="cancelX" />
            </button>
          </td>
        </>
      );
    },
    [onEditClick, onCancelClick]
  );

  const renderLargeList = useCallback(() => {
    if (!orders || !orders.length) {
      return null;
    }
    return orders.reverse().map((order) => {
      if (order.type === SWAP) {
        const nativeTokenAddress = getContract(chainId, "NATIVE_TOKEN");
        const fromTokenInfo = getTokenInfo(infoTokens, order.path[0], true, nativeTokenAddress.toLowerCase());
        const toTokenInfo = getTokenInfo(
          infoTokens,
          order.path[order.path.length - 1],
          order.shouldUnwrap,
          nativeTokenAddress.toLowerCase()
        );
        const collateralUSD = getUsd(order.amountIn, fromTokenInfo.address, true, infoTokens);
        const markExchangeRate = getExchangeRate(fromTokenInfo, toTokenInfo);
        const orderId = `${order.type}-${order.index}`;
        const titleText = (
          <>
            <Trans>Swap</Trans>{" "}
            {formatAmount(
              order.amountIn,
              fromTokenInfo.decimals,
              fromTokenInfo.isStable || fromTokenInfo.isUsdg ? 2 : 4,
              true
            )}{" "}
            {fromTokenInfo?.symbol} for{" "}
            {formatAmount(order.minOut, toTokenInfo.decimals, toTokenInfo.isStable || toTokenInfo.isUsdg ? 2 : 4, true)}{" "}
            {toTokenInfo?.symbol}
          </>
        );

        return (
          <tr className="Exchange-list-item" key={orderId}>
            <td className="Exchange-list-item-type">
              <Trans>Limit</Trans>
            </td>
            <td>
              <Tooltip
                handle={titleText}
                position="right-bottom"
                renderContent={() => {
                  return (
                    <StatsTooltipRow
                      label={t`Collateral`}
                      value={`${formatAmount(collateralUSD, USD_DECIMALS, 2, true)} (${formatAmount(
                        order.amountIn,
                        fromTokenInfo.decimals,
                        4,
                        true
                      )}
                      ${fromTokenInfo.baseSymbol || fromTokenInfo?.symbol})`}
                    />
                  );
                }}
              />
            </td>
            <td>
              {!hideActions ? (
                <Tooltip
                  handle={getExchangeRateDisplay(order.triggerRatio, fromTokenInfo, toTokenInfo)}
                  renderContent={() => t`
                  You will receive at least ${formatAmount(
                    order.minOut,
                    toTokenInfo.decimals,
                    toTokenInfo.isStable || toTokenInfo.isUsdg ? 2 : 4,
                    true
                  )} ${
                    toTokenInfo?.symbol
                  } if this order is executed. The execution price may vary depending on swap fees at the time the order is executed.
                `}
                />
              ) : (
                getExchangeRateDisplay(order.triggerRatio, fromTokenInfo, toTokenInfo)
              )}
            </td>
            <td>{getExchangeRateDisplay(markExchangeRate, fromTokenInfo, toTokenInfo, true)}</td>
            {!hideActions && renderActions(order)}
          </tr>
        );
      }

      const indexToken = getTokenInfo(infoTokens, order.indexToken.toLowerCase());
      const indexTokenSymbol = indexToken?.isWrapped ? indexToken?.baseSymbol : indexToken?.symbol;

      // Longs Increase: max price
      // Longs Decrease: min price
      // Short Increase: min price
      // Short Decrease: max price

      // const maximisePrice = (order.type === INCREASE && order.isLong) || (order.type === DECREASE && !order.isLong);
      // const markPrice = maximisePrice ? indexToken.contractMaxPrice : indexToken.contractMinPrice;
      // const triggerPricePrefix = order.triggerAboveThreshold ? TRIGGER_PREFIX_ABOVE : TRIGGER_PREFIX_BELOW;

      const error = getOrderError(account, order, positionsMap);
      const orderTitle = getOrderTitle(order, indexTokenSymbol);

      const orderText = (
        <>
          {error ? (
            <Tooltip
              className="order-error"
              handle={orderTitle}
              position="right-bottom"
              handleClassName="plain"
              renderContent={() => <span className="negative">{error}</span>}
            />
          ) : (
            orderTitle
          )}
        </>
      );
      const longShortText = order.isLong ? t`Long` : t`Short`;
      const sizeDeltaText = formatAmount(order.sizeDelta, USD_DECIMALS, 2, true);
      return (
        <tr className="Exchange-list-item order-list row" key={`${order.isLong}-${order.type}-${order.index}`}>
          <td className="Symbol">
            <div className="Exchange-symbol-label-long-short">
              <div className="Exchange-symbol-mark" style={{ background: order.isLong ? "#3FB68B" : "#FF5353" }}></div>
              {indexTokenSymbol}
            </div>
          </td>
          <td className="Order">{order.type === DECREASE ? orderText : orderText}</td>
          <td className="Exchange-list-item-type Type">{order.type === INCREASE ? t`Limit` : t`Trigger`}</td>
          <td className="Side">
            <div style={{ color: order.isLong ? "#3FB68B" : "#FF5353" }}>{longShortText}</div>
          </td>
          <td className="OrderPrice">${formatAmount(order.triggerPrice, USD_DECIMALS, 2, true)}</td>
          <td className="Amount">${sizeDeltaText}</td>
          {!hideActions && (
            <>
              <td className="Edit">
                <button className="Exchange-list-action" onClick={() => onEditClick(order)}>
                  <Trans>Edit</Trans>
                </button>
              </td>
              <td className="Close">
                <button className="Exchange-list-action" onClick={() => onCancelClick(order)}>
                  <img src={cancelX} alt="cancelX" />
                </button>
              </td>
            </>
          )}
        </tr>
      );
    });
  }, [orders, renderActions, infoTokens, positionsMap, hideActions, chainId, account, onCancelClick, onEditClick]);

  const renderSmallList = useCallback(() => {
    return orders.reverse().map((order) => {
      if (order.type === SWAP) {
        const nativeTokenAddress = getContract(chainId, "NATIVE_TOKEN");
        const fromTokenInfo = getTokenInfo(infoTokens, order.path[0], true, nativeTokenAddress.toLowerCase());
        const toTokenInfo = getTokenInfo(
          infoTokens,
          order.path[order.path.length - 1],
          order.shouldUnwrap,
          nativeTokenAddress.toLowerCase()
        );
        const markExchangeRate = getExchangeRate(fromTokenInfo, toTokenInfo);
        const collateralUSD = getUsd(order.amountIn, fromTokenInfo.address, true, infoTokens);
        const titleText = (
          <>
            Swap {formatAmount(order.amountIn, fromTokenInfo.decimals, fromTokenInfo.isStable ? 2 : 4, true)}{" "}
            {fromTokenInfo?.symbol} for{" "}
            {formatAmount(order.minOut, toTokenInfo.decimals, toTokenInfo.isStable ? 2 : 4, true)} {toTokenInfo?.symbol}
          </>
        );
        return (
          <div key={`${order.type}-${order.index}`} className="App-card">
            <div className="App-card-content">
              <div className="App-card-title-small">{titleText}</div>
              <div className="App-card-divider"></div>
              <div className="App-card-row">
                <div className="label">
                  <Trans>Price</Trans>
                </div>
                <div>
                  <Tooltip
                    position="right-bottom"
                    handle={getExchangeRateDisplay(order.triggerRatio, fromTokenInfo, toTokenInfo)}
                    renderContent={() => t`
                    You will receive at least ${formatAmount(
                      order.minOut,
                      toTokenInfo.decimals,
                      toTokenInfo.isStable || toTokenInfo.isUsdg ? 2 : 4,
                      true
                    )} ${
                      toTokenInfo?.symbol
                    } if this order is executed. The exact execution price may vary depending on fees at the time the order is executed.
                  `}
                  />
                </div>
              </div>
              <div className="App-card-row">
                <div className="label">
                  <Trans>Mark Price</Trans>
                </div>
                <div>{getExchangeRateDisplay(markExchangeRate, fromTokenInfo, toTokenInfo)}</div>
              </div>
              <div className="App-card-row">
                <div className="label">
                  <Trans>Collateral</Trans>
                </div>
                <div>
                  ${formatAmount(collateralUSD, USD_DECIMALS, 2, true)} (
                  {formatAmount(order.amountIn, fromTokenInfo.decimals, 4, true)}{" "}
                  {fromTokenInfo.baseSymbol || fromTokenInfo?.symbol})
                </div>
              </div>
            </div>
            <div>
              {!hideActions && (
                <>
                  <div className="App-card-divider"></div>
                  <div className="App-card-options">
                    <button className="App-button-option App-card-option" onClick={() => onEditClick(order)}>
                      <Trans>Edit</Trans>
                    </button>
                    <button className="App-button-option App-card-option" onClick={() => onCancelClick(order)}>
                      <Trans>Cancel</Trans>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      }

      const indexToken = getTokenInfo(infoTokens, order.indexToken.toLowerCase());
      const indexTokenSymbol = indexToken?.isWrapped ? indexToken?.baseSymbol : indexToken?.symbol;
      // const maximisePrice = (order.type === INCREASE && order.isLong) || (order.type === DECREASE && !order.isLong);
      // const markPrice = maximisePrice ? indexToken.contractMaxPrice : indexToken.contractMinPrice;
      // const triggerPricePrefix = order.triggerAboveThreshold ? TRIGGER_PREFIX_ABOVE : TRIGGER_PREFIX_BELOW;

      // const collateralTokenInfo = getTokenInfo(infoTokens, order.purchaseToken);
      // const collateralUSD = getUsd(order.purchaseTokenAmount, order.purchaseToken, true, infoTokens);

      const error = getOrderError(account, order, positionsMap);
      const orderTitle = getOrderTitle(order, indexTokenSymbol);
      const longShortText = order.isLong ? t`Long` : t`Short`;
      const sizeDeltaText = formatAmount(order.sizeDelta, USD_DECIMALS, 2, true);

      return (
        <div key={`${order.isLong}-${order.type}-${order.index}`} className="App-card App-card-container">
          <div className="App-card-content">
            <div className="App-card-title-small">
              <div className="App-card-title-small-left">
                <div style={{ fontSize: "18px", fontWeight: "600" }}>
                  {error ? (
                    <Tooltip
                      className="order-error"
                      handle={indexTokenSymbol}
                      position="left-bottom"
                      handleClassName="plain"
                      renderContent={() => <span className="negative">{error}</span>}
                    />
                  ) : (
                    indexTokenSymbol
                  )}
                </div>
                <div
                  className="App-card-title-small-long-short"
                  style={{
                    background: order.isLong ? "rgba(46, 199, 135, 0.10)" : "rgba(229, 97, 97, 0.10)",
                    border: order.isLong ? "1px solid #3FB68B" : "1px solid #FF5353",
                    color: order.isLong ? "#3FB68B" : "#FF5353",
                  }}
                >
                  {longShortText}
                </div>
              </div>
              {!hideActions && (
                <div className="App-card-title-small-right">
                  <button className="Exchange-list-action" onClick={() => onEditClick(order)}>
                    <Trans>Edit</Trans>
                  </button>
                  <div className="App-card-title-small-right-divider"></div>
                  <button className="Exchange-list-action" onClick={() => onCancelClick(order)}>
                    <img src={cancelX} alt="camcelX" />
                  </button>
                </div>
              )}
            </div>
            <div className="App-card-divider"></div>
            <div className="App-card-row App-card-row-container">
              <div className="App-card-row-item">
                <div className="label">
                  <Trans>Order</Trans>
                </div>
                <div>{orderTitle}</div>
              </div>
              <div className="App-card-row-item">
                <div className="label">
                  <Trans>Type</Trans>
                </div>
                <div>{order.type === INCREASE ? t`Limit` : t`Trigger`}</div>
              </div>
            </div>
            <div className="App-card-row App-card-row-container">
              <div className="App-card-row-item">
                <div className="label">
                  <Trans>Order Price</Trans>
                </div>
                <div>${formatAmount(order.triggerPrice, USD_DECIMALS, 2, true)}</div>
              </div>
              <div className="App-card-row-item">
                <div className="label">
                  <Trans>Amount</Trans>
                </div>
                <div>${sizeDeltaText}</div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }, [orders, onEditClick, onCancelClick, infoTokens, positionsMap, hideActions, chainId, account]);

  return (
    <React.Fragment>
      <table className="Exchange-list Orders large App-box">
        <tbody>
          {!!account && !!orders && !!orders.length && renderHead()}
          {renderEmptyRow()}
          <div className="Exchange-list-container">{renderLargeList()}</div>
        </tbody>
      </table>
      {!account ? (
        <div className="Exchange-list Orders small no-order">
          <div className="Exchange-list-no-connect">
            <span className="Exchange-list-no-connect-title">Wallet Required</span>
            <span className="Exchange-list-no-connect-text">Connect wallet to view your positions</span>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="Exchange-list Orders small no-order">
          <div
            style={{
              width: "100%",
            }}
          >
            <div
              className="fz-lg fw-600 text-primary"
              style={{
                textAlign: "center",
                marginTop: "4rem",
              }}
            >
              No Order Found
            </div>
            <div
              className="fz-sm fw-500 text-secondary"
              style={{
                textAlign: "center",
                marginTop: "0.5rem",
                marginBottom: "4rem",
              }}
            >
              You have no open order
            </div>
          </div>
        </div>
      ) : (
        <div className="Exchange-list Orders small order-list">{renderSmallList()}</div>
      )}

      {editingOrder && (
        <OrderEditor
          account={account}
          order={editingOrder}
          setEditingOrder={setEditingOrder}
          infoTokens={infoTokens}
          pendingTxns={pendingTxns}
          setPendingTxns={setPendingTxns}
          getPositionForOrder={getPositionForOrder}
          positionsMap={positionsMap}
          library={library}
          totalTokenWeights={totalTokenWeights}
          usdgSupply={usdgSupply}
          savedShouldDisableValidationForTesting={savedShouldDisableValidationForTesting}
        />
      )}
    </React.Fragment>
  );
}
