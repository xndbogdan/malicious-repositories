import { useEffect, useMemo, useState } from "react";
import { Menu } from "@headlessui/react";
import cx from "classnames";
import "./ChartTokenSelector.css";
import { LONG, SHORT, SWAP } from "lib/legacy";
import { getTokens, getWhitelistedTokens } from "config/tokens";
import { IoSearch, IoStar, IoStarOutline } from "react-icons/io5";
import { AutoSizer, Column, Table } from "react-virtualized";
import "react-virtualized/styles.css";
import useSWR from "swr";
import { getServerUrl } from "config/backend";
import { getTokenBySymbol, getWrappedToken } from "config/tokens";
import { formatAmount } from "lib/numbers";
import { USD_DECIMALS } from "lib/legacy";

export default function ChartTokenSelector(props) {
  const { chainId, selectedToken, onSelectToken, swapOption } = props;
  const [tabIndex, setTabIndex] = useState(1);
  const [listFavoriteLocal, setListFavoriteLocal] = useState();
  const [inputSearch, setInputSearch] = useState("");
  const listPairUrl = getServerUrl(chainId, "/symbols");

  const { data: listPair } = useSWR("/apo/get-list-pair", async () => {
    const response = await fetch(listPairUrl);
    return response.json();
  });

  useEffect(() => {
    setListFavoriteLocal(JSON.parse(localStorage.getItem("favorites-tokens")) || []);
  }, []);

  const isLong = swapOption === LONG;
  const isShort = swapOption === SHORT;
  const isSwap = swapOption === SWAP;

  let options = getTokens(chainId);
  const whitelistedTokens = getWhitelistedTokens(chainId);
  const indexTokens = whitelistedTokens.filter((token) => !token.isStable && !token.isWrapped);
  const shortableTokens = indexTokens.filter((token) => token.isShortable);

  if (isLong) {
    options = indexTokens;
  }
  if (isShort) {
    options = shortableTokens;
  }

  const hanldeFavoriteToken = (symbol) => {
    const isAdded = listFavoriteLocal && listFavoriteLocal.length > 0 && listFavoriteLocal.find((e) => e === symbol);

    if (isAdded) {
      const listRemove = listFavoriteLocal.filter((e) => e !== symbol);
      setListFavoriteLocal(listRemove);
      localStorage.setItem("favorites-tokens", JSON.stringify(listRemove));
    } else {
      const newListFavorite = [...listFavoriteLocal, symbol];
      setListFavoriteLocal(newListFavorite);
      localStorage.setItem("favorites-tokens", JSON.stringify(newListFavorite));
    }
  };

  const listTokens = useMemo(() => {
    if (tabIndex === 1) {
      return options;
    } else {
      return options?.filter((e) => listFavoriteLocal.includes(e?.symbol));
    }
  }, [listFavoriteLocal, options, tabIndex]);

  const listFilterToken = useMemo(() => {
    if (inputSearch) {
      return listTokens.filter((e) => e?.symbol?.toLowerCase()?.includes(inputSearch?.toLowerCase()));
    }
    return listTokens;
  }, [inputSearch, listTokens]);

  const onSelect = async (token) => {
    onSelectToken(token);
  };

  var value = selectedToken;

  const _headerRenderer = ({ columnData, dataKey, disableSort, label, sortBy, sortDirection }) => {
    return (
      <div
        key={dataKey}
        className="fw-400 text-secondary"
        style={{
          fontSize: "1.2rem",
          textTransform: "capitalize",
          textAlign: label.toLowerCase() === "symbol" ? "left" : "right",
        }}
      >
        {label}
      </div>
    );
  };

  const indexPricesUrl = getServerUrl(chainId, "/prices");
  const { data: listPrice } = useSWR("api/price/token", async () => {
    return await fetch(indexPricesUrl).then((res) => res.json());
  });

  const getPrice = (symbol) => {
    let symbolInfo = getTokenBySymbol(chainId, symbol);
    if (symbolInfo.isNative) {
      symbolInfo = getWrappedToken(chainId);
    }
    return listPrice[symbolInfo.address];
  };

  return (
    <Menu>
      <Menu.Button as="div" disabled={isSwap}>
        <div
          className="Container-select-tokens"
          style={{
            width: "fit-content",
          }}
        >
          <div className="button-select-token-chart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 18H20M4 6H20H4ZM4 12H12H4Z"
                stroke="#F7F7F7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 11L17 13L15 11"
                stroke="#F7F7F7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <button
              style={{
                paddingRight: "0px",
              }}
              className={cx("App-cta small transparent chart-token-selector", { "default-cursor": isSwap })}
            >
              <span className="fz-lg fw-600">{value.symbol}USD</span>
            </button>
          </div>
        </div>
      </Menu.Button>
      <div className="chart-token-menu">
        <Menu.Items
          as="div"
          className="menu-items chart-token-menu-items"
          style={{
            maxWidth: "380px",
            width: "100%",
          }}
        >
          <div
            style={{
              height: "40px",
              display: "flex",
              alignItems: "center",
              background: "var(--bg-primary)",
              margin: "1rem",
              padding: "0 12px",
              borderRadius: "6px",
            }}
          >
            <IoSearch
              style={{
                color: "var(--text-secondary)",
              }}
            />
            <input
              className="style-input-search"
              onChange={(e) => setInputSearch(e.target.value)}
              placeholder="Search"
              style={{
                fontSize: "var(--font-base)",
                fontWeight: 400,
                color: "var(--text-primary)",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              margin: "1rem",
              borderBottom: "1px solid var(--bg-divider)",
            }}
          >
            {["Favorites", "All Crypto"].map((e, idx) => {
              return (
                <div
                  style={{
                    marginLeft: idx ? "2.4rem" : "0",
                    marginTop: "1rem",
                    color: idx === tabIndex ? "var(--text-accent)" : "var(--text-secondary)",
                    borderBottom: `1px solid ${idx === tabIndex ? "var(--bg-accent)" : "var(--bg-default)"}`,
                    paddingBottom: "1.6rem",
                  }}
                  onClick={() => setTabIndex(idx)}
                  className="fz-sm fw-500 "
                  xw
                  key={`item-tab-${e}`}
                >
                  {e}
                </div>
              );
            })}
          </div>

          {/* <Menu.Item> */}
          <div
            style={{
              height: "300px",
              margin: "1rem",
              display: "flex",
            }}
          >
            <AutoSizer>
              {({ width, height }) => {
                return (
                  <Table
                    width={width}
                    height={height}
                    rowClassName={"list-pair-row"}
                    headerClassName={"list-pair-header"}
                    headerHeight={30}
                    rowHeight={44}
                    // onRowClick={(prop) => {
                    //   onSelect(prop.rowData);
                    // }}
                    disableHeader={listFilterToken?.length === 0}
                    noRowsRenderer={() => {
                      return (
                        <div
                          style={{
                            textAlign: "center",
                            marginTop: "100px",
                            color: "var(--text-primary)",
                          }}
                        >
                          Not Found
                        </div>
                      );
                    }}
                    rowCount={(listFilterToken && listFilterToken.length) || 0}
                    rowGetter={({ index }) => listFilterToken[index]}
                  >
                    <Column
                      dataKey="symbol"
                      headerRenderer={_headerRenderer}
                      label="symbol"
                      width={width / 4}
                      cellRenderer={(props) => {
                        const isStart = listFavoriteLocal.includes(props?.rowData?.symbol);
                        return (
                          <div
                            className="fz-sm fw-400 text-primary"
                            style={{
                              alignItems: "center",
                              alignContent: "center",
                              display: "flex",
                            }}
                          >
                            <div
                              onClick={() => hanldeFavoriteToken(props?.rowData?.symbol)}
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              {isStart ? (
                                <IoStar
                                  style={{
                                    color: "var(--bg-accent)",
                                    marginRight: "0.8rem",
                                    marginBottom: "-2px",
                                  }}
                                />
                              ) : (
                                <IoStarOutline
                                  style={{
                                    color: "var(--text-secondary)",
                                    marginBottom: "-2px",
                                    marginRight: "0.8rem",
                                  }}
                                />
                              )}
                            </div>

                            <Menu.Button className="reset-menu-button">
                              <div className="fz-sm fw-400 text-primary" onClick={() => onSelect(props.rowData)}>
                                {props?.rowData?.symbol}/USD
                              </div>
                            </Menu.Button>
                          </div>
                        );
                      }}
                    />
                    <Column
                      dataKey="Last Price"
                      headerRenderer={_headerRenderer}
                      label="Last Price"
                      width={width / 3}
                      cellRenderer={(props) => {
                        const currentPrice = getPrice(props.rowData?.symbol);
                        return (
                          <Menu.Button className="reset-menu-button">
                            <div
                              onClick={() => onSelect(props.rowData)}
                              className="fz-sm fw-400 text-primary"
                              style={{
                                textAlign: "right",
                              }}
                            >
                              {parseFloat(formatAmount(currentPrice, USD_DECIMALS, 4))}
                            </div>
                          </Menu.Button>
                        );
                      }}
                    />
                    {/* <Column
                      cellRenderer={(props) => {
                        return (
                          <Menu.Button className="reset-menu-button">
                            <div
                              onClick={() => onSelect(props.rowData)}
                              className="fz-sm fw-400"
                              style={{
                                color: "var(--text-success)",
                                textAlign: "right",
                              }}
                            >
                              +6.10%
                            </div>
                          </Menu.Button>
                        );
                      }}
                      headerRenderer={_headerRenderer}
                      dataKey="24h %"
                      label="24h %"
                      width={width / 4}
                    /> */}
                    {/* <Column
                      cellRenderer={(props) => {
                        return (
                          <Menu.Button className="reset-menu-button">
                            <div
                              onClick={() => onSelect(props.rowData)}
                              className="fz-sm fw-400 text-primary"
                              style={{
                                textAlign: "right",
                                marginLeft: "auto",
                              }}
                            >
                              $1.52b
                            </div>
                          </Menu.Button>
                        );
                      }}
                      dataKey="Volume"
                      headerRenderer={_headerRenderer}
                      label="Volume"
                      width={width / 4}
                    /> */}
                  </Table>
                );
              }}
            </AutoSizer>
          </div>
          {/* </Menu.Item> */}
        </Menu.Items>
      </div>
    </Menu>
  );
}
