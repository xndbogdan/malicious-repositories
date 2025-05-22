import React, { useState } from "react";
import cx from "classnames";
import { Trans, t } from "@lingui/macro";
import Tooltip from "../Tooltip/Tooltip";
import PositionSeller from "./PositionSeller";
import PositionEditor from "./PositionEditor";
import OrdersToa from "./OrdersToa";
import { ImSpinner2 } from "react-icons/im";
import edit_icon from "../../img/edit_icon.svg";
import {
  getLiquidationPrice,
  getLeverage,
  getOrderError,
  USD_DECIMALS,
  FUNDING_RATE_PRECISION,
  SWAP,
  LONG,
  SHORT,
  INCREASE,
  DECREASE,
} from "lib/legacy";
import PositionDropdown from "./PositionDropdown";
import StatsTooltipRow from "../StatsTooltip/StatsTooltipRow";
import NetValueTooltip from "./NetValueTooltip";
import { helperToast } from "lib/helperToast";
import { getUsd } from "domain/tokens/utils";
import { bigNumberify, formatAmount } from "lib/numbers";
import { AiOutlineEdit } from "react-icons/ai";
import useAccountType, { AccountType } from "lib/wallets/useAccountType";

const getOrdersForPosition = (account, position, orders, nativeTokenAddress) => {
  if (!orders || orders.length === 0) {
    return [];
  }
  /* eslint-disable array-callback-return */
  return orders
    .filter((order) => {
      if (order.type === SWAP) {
        return false;
      }
      const hasMatchingIndexToken =
        order.indexToken === nativeTokenAddress
          ? position.indexToken.isNative
          : order.indexToken === position.indexToken.address;
      const hasMatchingCollateralToken =
        order.collateralToken === nativeTokenAddress
          ? position.collateralToken.isNative
          : order.collateralToken === position.collateralToken.address;
      if (order.isLong === position.isLong && hasMatchingIndexToken && hasMatchingCollateralToken) {
        return true;
      }
    })
    .map((order) => {
      order.error = getOrderError(account, order, undefined, position);
      if (order.type === DECREASE && order.sizeDelta.gt(position.size)) {
        order.error = t`Order size is bigger than position, will only be executable if position increases`;
      }
      return order;
    });
};

export default function PositionsList(props) {
  const {
    pendingPositions,
    setPendingPositions,
    positions,
    positionsDataIsLoading,
    positionsMap,
    infoTokens,
    active,
    account,
    library,
    pendingTxns,
    setPendingTxns,
    setListSection,
    flagOrdersEnabled,
    savedIsPnlInLeverage,
    chainId,
    nativeTokenAddress,
    orders,
    setIsWaitingForPluginApproval,
    approveOrderBook,
    isPluginApproving,
    isWaitingForPluginApproval,
    orderBookApproved,
    positionRouterApproved,
    isWaitingForPositionRouterApproval,
    isPositionRouterApproving,
    approvePositionRouter,
    showPnlAfterFees,
    setMarket,
    minExecutionFee,
    minExecutionFeeUSD,
    minExecutionFeeErrorMessage,
    usdgSupply,
    totalTokenWeights,
    hideActions,
    openSettings,
  } = props;
  const [positionToEditKey, setPositionToEditKey] = useState(undefined);
  const [positionToSellKey, setPositionToSellKey] = useState(undefined);
  const [positionToShare, setPositionToShare] = useState(null);
  const [isPositionEditorVisible, setIsPositionEditorVisible] = useState(undefined);
  const [isPositionSellerVisible, setIsPositionSellerVisible] = useState(undefined);
  const [collateralTokenAddress, setCollateralTokenAddress] = useState(undefined);
  const [isPositionShareModalOpen, setIsPositionShareModalOpen] = useState(false);
  const [ordersToaOpen, setOrdersToaOpen] = useState(false);
  const [isHigherSlippageAllowed, setIsHigherSlippageAllowed] = useState(false);
  const accountType = useAccountType();
  const isContractAccount = accountType === AccountType.CONTRACT;

  const editPosition = (position) => {
    setCollateralTokenAddress(position.collateralToken.address);
    setPositionToEditKey(position.key);
    setIsPositionEditorVisible(true);
  };

  const sellPosition = (position) => {
    setPositionToSellKey(position.key);
    setIsPositionSellerVisible(true);
    setIsHigherSlippageAllowed(false);
  };

  const onPositionClick = (position) => {
    if (hideActions) return;
    const longOrShortText = position.isLong ? t`Long` : t`Short`;
    helperToast.success(t`${longOrShortText} ${position.indexToken.symbol} market selected`);
    setMarket(position.isLong ? LONG : SHORT, position.indexToken.address);
  };
  // g("positions", positions);
  return (
    <div className="PositionsList">
      <PositionEditor
        pendingPositions={pendingPositions}
        setPendingPositions={setPendingPositions}
        positionsMap={positionsMap}
        positionKey={positionToEditKey}
        isVisible={isPositionEditorVisible}
        setIsVisible={setIsPositionEditorVisible}
        infoTokens={infoTokens}
        active={active}
        account={account}
        library={library}
        collateralTokenAddress={collateralTokenAddress}
        pendingTxns={pendingTxns}
        setPendingTxns={setPendingTxns}
        getUsd={getUsd}
        getLeverage={getLeverage}
        savedIsPnlInLeverage={savedIsPnlInLeverage}
        positionRouterApproved={positionRouterApproved}
        isPositionRouterApproving={isPositionRouterApproving}
        isWaitingForPositionRouterApproval={isWaitingForPositionRouterApproval}
        approvePositionRouter={approvePositionRouter}
        chainId={chainId}
        minExecutionFee={minExecutionFee}
        minExecutionFeeUSD={minExecutionFeeUSD}
        minExecutionFeeErrorMessage={minExecutionFeeErrorMessage}
        isContractAccount={isContractAccount}
      />
      {ordersToaOpen && (
        <OrdersToa
          setIsVisible={setOrdersToaOpen}
          approveOrderBook={approveOrderBook}
          isPluginApproving={isPluginApproving}
        />
      )}

      {ordersToaOpen && (
        <OrdersToa
          setIsVisible={setOrdersToaOpen}
          approveOrderBook={approveOrderBook}
          isPluginApproving={isPluginApproving}
        />
      )}
      {isPositionSellerVisible && positionToSellKey in positionsMap && (
        <PositionSeller
          pendingPositions={pendingPositions}
          setPendingPositions={setPendingPositions}
          setIsWaitingForPluginApproval={setIsWaitingForPluginApproval}
          approveOrderBook={approveOrderBook}
          isPluginApproving={isPluginApproving}
          isWaitingForPluginApproval={isWaitingForPluginApproval}
          orderBookApproved={orderBookApproved}
          positionsMap={positionsMap}
          positionKey={positionToSellKey}
          isVisible={isPositionSellerVisible}
          setIsVisible={setIsPositionSellerVisible}
          infoTokens={infoTokens}
          active={active}
          account={account}
          orders={orders}
          library={library}
          pendingTxns={pendingTxns}
          setPendingTxns={setPendingTxns}
          flagOrdersEnabled={flagOrdersEnabled}
          savedIsPnlInLeverage={savedIsPnlInLeverage}
          chainId={chainId}
          nativeTokenAddress={nativeTokenAddress}
          setOrdersToaOpen={setOrdersToaOpen}
          positionRouterApproved={positionRouterApproved}
          isPositionRouterApproving={isPositionRouterApproving}
          isWaitingForPositionRouterApproval={isWaitingForPositionRouterApproval}
          approvePositionRouter={approvePositionRouter}
          isHigherSlippageAllowed={isHigherSlippageAllowed}
          setIsHigherSlippageAllowed={setIsHigherSlippageAllowed}
          minExecutionFee={minExecutionFee}
          minExecutionFeeUSD={minExecutionFeeUSD}
          minExecutionFeeErrorMessage={minExecutionFeeErrorMessage}
          usdgSupply={usdgSupply}
          totalTokenWeights={totalTokenWeights}
          isContractAccount={isContractAccount}
        />
      )}

      <>
        {!account ? (
          <div className="Exchange-list-no-connect">
            <span className="Exchange-list-no-connect-title">Wallet Required</span>
            <span className="Exchange-list-no-connect-text">Connect wallet to view your positions</span>
          </div>
        ) : (
          positions.length === 0 && (
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
                No Position Found
              </div>
              <div
                className="fz-sm fw-500 text-secondary"
                style={{
                  textAlign: "center",
                  marginTop: "0.5rem",
                  marginBottom: "4rem",
                }}
              >
                You have no positions
              </div>
            </div>
          )
        )}
        <div className="Exchange-list small">
          {positions.map((position) => {
            const positionOrders = getOrdersForPosition(account, position, orders, nativeTokenAddress);
            const liquidationPrice = getLiquidationPrice(position);
            const hasPositionProfit = position[showPnlAfterFees ? "hasProfitAfterFees" : "hasProfit"];
            const positionDelta =
              position[showPnlAfterFees ? "pendingDeltaAfterFees" : "pendingDelta"] || bigNumberify(0);
            let borrowFeeUSD;
            if (position.collateralToken && position.collateralToken.fundingRate) {
              const borrowFeeRate = position.collateralToken.fundingRate
                .mul(position.size)
                .mul(24)
                .div(FUNDING_RATE_PRECISION);
              borrowFeeUSD = formatAmount(borrowFeeRate, USD_DECIMALS, 2, true);
            }
            const longShortText = position.isLong ? t`Long` : t`Short`;

            // body content of the position list on mobile
            return (
              <div key={position.key} className="App-card App-card-container">
                <div className="App-card-content">
                  <div className="App-card-title App-card-title-small">
                    <div className="App-card-title-small-left">
                      <span className="Exchange-list-title">{position.indexToken.symbol}</span>
                      <div
                        className="App-card-title-small-long-short"
                        style={{
                          background: position.isLong ? "rgba(46, 199, 135, 0.10)" : "rgba(229, 97, 97, 0.10)",
                          border: position.isLong ? "1px solid #3FB68B" : "1px solid #FF5353",
                          color: position.isLong ? "#3FB68B" : "#FF5353",
                        }}
                      >
                        {position.leverageStr} {longShortText}
                      </div>
                    </div>
                    <div className="App-card-title-small-right">
                      <button
                        className="Exchange-list-action positions"
                        onClick={() => sellPosition(position)}
                        disabled={position.size.eq(0)}
                      >
                        <div className="Exchange-list-action-positions">
                          <Trans>Close Position</Trans>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="App-card-divider" />
                  <div className="App-card-row App-card-row-container">
                    <div className="App-card-row-item">
                      <div className="label">
                        <Trans>Net Value</Trans>
                      </div>
                      <div>${formatAmount(position.netValue, USD_DECIMALS, 2, true)}</div>
                    </div>
                    <div className="App-card-row-item">
                      <div className="label">
                        <Trans>Unrealized PnL</Trans>
                      </div>
                      <div>
                        <span
                          className={cx("Exchange-list-info-label", {
                            positive: hasPositionProfit && positionDelta.gt(0),
                            negative: !hasPositionProfit && positionDelta.gt(0),
                            muted: positionDelta.eq(0),
                          })}
                        >
                          {position.deltaStr || "+$0.00"} ({position.deltaPercentageStr || "+0.00%"})
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="App-card-row App-card-row-container">
                    <div className="App-card-row-item">
                      <div className="label">
                        <Trans>Size</Trans>
                      </div>
                      <div>${formatAmount(position.size, USD_DECIMALS, 2, true)}</div>
                    </div>
                    <div className="App-card-row-item">
                      <div className="label">
                        <Trans>Collateral</Trans>
                      </div>
                      <div className="position-list-collateral">
                        <Tooltip
                          handle={`$${formatAmount(position.collateralAfterFee, USD_DECIMALS, 2, true)}`}
                          position="right-bottom"
                          handleClassName={cx("plain", { negative: position.hasLowCollateral })}
                          renderContent={() => {
                            return (
                              <>
                                {position.hasLowCollateral && (
                                  <div>
                                    <Trans>
                                      WARNING: This position has a low amount of collateral after deducting borrowing
                                      fees, deposit more collateral to reduce the position's liquidation risk.
                                    </Trans>
                                    <br />
                                    <br />
                                  </div>
                                )}
                                <StatsTooltipRow
                                  label={t`Initial Collateral`}
                                  value={formatAmount(position.collateral, USD_DECIMALS, 2, true)}
                                />
                                <StatsTooltipRow
                                  label={t`Borrow Fee`}
                                  value={formatAmount(position.fundingFee, USD_DECIMALS, 2, true)}
                                />
                                <StatsTooltipRow
                                  showDollar={false}
                                  label={t`Borrow Fee / Day`}
                                  value={`-$${borrowFeeUSD}`}
                                />

                                {!hideActions && (
                                  <span>
                                    <Trans>Use the Edit Collateral icon to deposit or withdraw collateral.</Trans>
                                  </span>
                                )}
                              </>
                            );
                          }}
                        />

                        {!hideActions && (
                          // !position.hasPendingChanges && position.leverageStr &&
                          <span className="edit-icon" onClick={() => editPosition(position)}>
                            <img src={edit_icon} alt="edit" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="App-card-row App-card-row-container"></div>
                  <div className="App-card-row App-card-row-container">
                    <div className="App-card-row-item">
                      <div className="label">
                        <Trans>Entry Price</Trans>
                      </div>
                      <div>${formatAmount(position.averagePrice, USD_DECIMALS, 2, true)}</div>
                    </div>
                    <div className="App-card-row-item">
                      <div className="label">
                        <Trans>Market Price</Trans>
                      </div>
                      <div>${formatAmount(position.markPrice, USD_DECIMALS, 2, true)}</div>
                    </div>
                    <div className="App-card-row-item">
                      <div className="label">
                        <Trans>Liq. Price</Trans>
                      </div>
                      <div>${formatAmount(liquidationPrice, USD_DECIMALS, 2, true)}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>

      <table className="Exchange-list large App-box">
        <tbody>
          {positions.length !== 0 && (
            <tr className="Exchange-list-header">
              <th>
                <Trans>Symbol</Trans>
              </th>
              <th>
                <Trans>Net Value</Trans>
              </th>
              <th>
                <Trans>Size</Trans>
              </th>
              <th>
                <Trans>Collateral</Trans>
              </th>
              <th>
                <Trans>Entry Price</Trans>
              </th>
              <th>
                <Trans>Market Price</Trans>
              </th>
              <th>
                <Trans>Liq. Price</Trans>
              </th>
              <th>
                <Trans>Close Positions</Trans>
              </th>
            </tr>
          )}

          {positions.map((position) => {
            const liquidationPrice = getLiquidationPrice(position) || bigNumberify(0);
            const positionOrders = getOrdersForPosition(account, position, orders, nativeTokenAddress);
            const hasOrderError = !!positionOrders.find((order) => order.error);
            const hasPositionProfit = position[showPnlAfterFees ? "hasProfitAfterFees" : "hasProfit"];
            const positionDelta =
              position[showPnlAfterFees ? "pendingDeltaAfterFees" : "pendingDelta"] || bigNumberify(0);
            let borrowFeeUSD;
            if (position.collateralToken && position.collateralToken.fundingRate) {
              const borrowFeeRate = position.collateralToken.fundingRate
                .mul(position.size)
                .mul(24)
                .div(FUNDING_RATE_PRECISION);
              borrowFeeUSD = formatAmount(borrowFeeRate, USD_DECIMALS, 2, true);
            }
            // body content of the position list on web
            return (
              <tr key={position.key} className="Exchange-list-item">
                <td>
                  <div className="Exchange-list-title">
                    <div
                      className="Exchange-symbol-mark"
                      style={{ background: position.isLong ? "#3FB68B" : "#FF5353" }}
                    ></div>
                    {position.indexToken.symbol}
                    {!position.leverageStr && <ImSpinner2 className="spin position-loading-icon" />}
                    <div className="Exchange-list-info-label">
                      {position.leverageStr && (
                        <div
                          className="Exchange-list-info-label-long-short"
                          style={{
                            background: position.isLong ? "rgba(46, 199, 135, 0.10)" : "rgba(229, 97, 97, 0.10)",
                            border: position.isLong ? "1px solid #3FB68B" : "1px solid #FF5353",
                            color: position.isLong ? "#3FB68B" : "#FF5353",
                          }}
                        >
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              openSettings();
                            }}
                            className="muted Position-leverage"
                          >
                            {position.leverageStr}
                          </span>
                          <span className={cx({ positive: position.isLong, negative: !position.isLong })}>
                            {position.isLong ? t`Long` : t`Short`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <div>{position.netValue ? <NetValueTooltip position={position} /> : t`Opening...`}</div>

                  {position.deltaStr && (
                    <div
                      className={cx("Exchange-list-info-label cursor-pointer Position-pnl", {
                        positive: hasPositionProfit && positionDelta.gt(0),
                        negative: !hasPositionProfit && positionDelta.gt(0),
                        muted: positionDelta.eq(0),
                      })}
                      onClick={openSettings}
                    >
                      {position.deltaStr} ({position.deltaPercentageStr})
                    </div>
                  )}
                </td>
                <td>
                  <div>${formatAmount(position.size, USD_DECIMALS, 2, true)}</div>
                </td>
                <td>
                  <div className="position-list-collateral">
                    <Tooltip
                      handle={`$${formatAmount(position.collateralAfterFee, USD_DECIMALS, 2, true)}`}
                      position="left-bottom"
                      handleClassName={cx("plain", { negative: position.hasLowCollateral })}
                      renderContent={() => {
                        return (
                          <>
                            {position.hasLowCollateral && (
                              <div>
                                <Trans>
                                  WARNING: This position has a low amount of collateral after deducting borrowing fees,
                                  deposit more collateral to reduce the position's liquidation risk.
                                </Trans>
                                <br />
                              </div>
                            )}
                            {!hideActions && (
                              <>
                                <Trans>Use the Edit Collateral icon to deposit or withdraw collateral.</Trans>
                              </>
                            )}
                          </>
                        );
                      }}
                    />
                    {!hideActions && (
                      // !position.hasPendingChanges && position.leverageStr &&
                      <span className="edit-icon" onClick={() => editPosition(position)}>
                        <img src={edit_icon} alt="edit" />
                      </span>
                    )}
                  </div>
                </td>
                <td>${formatAmount(position.averagePrice, USD_DECIMALS, 2, true)}</td>
                <td>${formatAmount(position.markPrice, USD_DECIMALS, 2, true)}</td>
                <td>${formatAmount(liquidationPrice, USD_DECIMALS, 2, true)}</td>
                <td>
                  <button
                    className="Exchange-list-action positions"
                    onClick={() => sellPosition(position)}
                    disabled={position.size.eq(0)}
                  >
                    <div className="Exchange-list-action-positions">
                      <Trans>Close</Trans>
                    </div>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
