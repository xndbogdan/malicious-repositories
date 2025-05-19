import React from "react";
import { useHistory } from "react-router-dom";
const Homepage = () => {
  const history = useHistory();
  return (
    <div className="container-fluid padding0">
      {/* BEGIN: Main */}
      <main>
        {/* BEGIN: Focus Top */}
        <div id="focus-top">
          <img className="light2" src="images/robot.png?v=1.0.0" alt="robot" />
          <div className="container">
            {/* BEGIN: Content Top Main */}
            <div className="row">
              <div className="col-12 col-sm-9 col-md-8 col-xl-7">
                <h1 className="animate a_01">
                  <span className="animate a_02">UltraX</span> is Decentralized Perpetual{" "}
                  <span className="animate a_03">Exchange</span>
                </h1>
                <p className="animate a_04">
                  Trade BTC, ETH, FTM, OP and other top cryptocurrencies with up to 100x leverage directly from your
                  wallet.
                </p>
                <div className="group-btn animate a_05">
                  <span
                    className="btn-a btn-blue"
                    style={{ cursor: "pointer", userSelect: "none" }}
                    onClick={() => history.push("/trade")}
                  >
                    START TRADING
                  </span>
                </div>
              </div>
              <div className="col-12 col-sm-3 col-md-4 col-xl-5"></div>
            </div>
            {/* END: Content Top Main */}
          </div>

          {/* BEGIN: Total Information */}
          <div className="content-width">
            <div className="information">
              <div className="row">
                <div className="col-12 col-sm-6 col-xl-3 animate a_06">
                  <article>
                    <img src="images/icon-01.png" alt="Trading volume" />
                    <h6>
                      Total trading volume
                      <strong>2,323,323,000</strong>
                    </h6>
                  </article>
                </div>
                <div className="col-12 col-sm-6 col-xl-3 animate a_07">
                  <article>
                    <img src="images/icon-02.png" alt="Total fees" />
                    <h6>
                      Total fees
                      <strong>$5,000,000</strong>
                    </h6>
                  </article>
                </div>
                <div className="col-12 col-sm-6 col-xl-3 animate a_08">
                  <article>
                    <img src="images/icon-03.png" alt="Open interest" />
                    <h6>
                      Open interest
                      <strong>$4,323,323,000</strong>
                    </h6>
                  </article>
                </div>
                <div className="col-12 col-sm-6 col-xl-3 animate a_09">
                  <article>
                    <img src="images/icon-04.png" alt="Total user" />
                    <h6>
                      Total user
                      <strong>1,000,000</strong>
                    </h6>
                  </article>
                </div>
              </div>
            </div>
          </div>
          {/* END: Total Information  */}
        </div>
        {/* END: Focus Top */}

        {/* BEGIN: 3 box (features) */}
        <div id="features">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-4 animate a_08 d-flex">
                <article>
                  <div className="row">
                    <div className="col-12 col-lg-8 col-xl-7 order-a">
                      <h5>Low Cost</h5>
                      <p>
                        Execute trades with negligible spread and no price impact when opening or closing positions.
                      </p>
                    </div>
                    <div className="col-12 col-lg-4 col-xl-5 pdl-0 order-b">
                      <img src="images/icon-05.png" alt="icon" />
                    </div>
                  </div>
                </article>
              </div>
              <div className="col-12 col-md-4 animate a_09 d-flex">
                <article>
                  <div className="row">
                    <div className="col-12 col-lg-8 col-xl-7 order-a">
                      <h5>Multi collateral</h5>
                      <p>
                        Allow traders the flexibility to deposit a variety of collateral currencies to back their
                        positions.
                      </p>
                    </div>
                    <div className="col-12 col-lg-4 col-xl-5 pdl-0 order-b">
                      <img src="images/icon-06.png" alt="icon" />
                    </div>
                  </div>
                </article>
              </div>
              <div className="col-12 col-md-4 animate a_10 d-flex">
                <article>
                  <div className="row">
                    <div className="col-12 col-lg-8 col-xl-7 order-a">
                      <h5>Transparency</h5>
                      <p>Smart contracts that are entirely transparent and open-source.</p>
                    </div>
                    <div className="col-12 col-lg-4 col-xl-5 pdl-0 order-b">
                      <img src="images/icon-07.png" alt="icon" />
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
        {/* END:3 box (features) */}

        {/* BEGIN: U2U Chain */}
        <div id="u2u-chain" className="space_section">
          <div className="container">
            <hgroup className="title-main">
              <h2>Available on U2U chain</h2>
              {/* <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h6> */}
            </hgroup>
            <article>
              <div className="row">
                <div className="col-12 col-lg-7 order-a">
                  <h6>U2U Chain</h6>
                  <ul>
                    <li>
                      <span>Total Volume:</span> <strong>$1,413,184,702</strong>
                    </li>
                    <li>
                      <span>Total Value Locked:</span> <strong>$5,711,914</strong>
                    </li>
                    <li>
                      <span>Total Fees:</span> <strong>$2,515,491</strong>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-lg-5 order-b">
                  <img src="images/logo-vertical.svg" alt="logo Unicorn Ultra" />
                  <div className="text-a">
                    <span
                      className="btn-a btn-blue"
                      style={{ cursor: "pointer", userSelect: "none" }}
                      onClick={() => history.push("/trade")}
                    >
                      Launch App
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
        {/* END: U2U Chain */}

        {/* BEGIN: Ecosystem Tokens */}
        <div id="ecosystem">
          <div className="container">
            <hgroup className="title-main">
              <h2>Ecosystem tokens</h2>
              {/* <h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h6 */}
            </hgroup>
            <div className="row">
              <div className="col-12 col-lg-4 d-flex">
                <article>
                  <div className="item-header">
                    <img src="images/icon-uniultra.png?v=1.0.0" alt="icon-uniultra" />
                    <h6>
                      <strong>U2U</strong>
                      $14,40
                    </h6>
                    <div className="clearfix"></div>
                  </div>
                  <div className="item-body">
                    <p>
                      The U2U token is a native coin of the U2U Chain, which is utilized for paying transaction fees.
                      Its designated name is Unicorn Ultra Token, and its symbol is U2U. This token type is categorized
                      as utility and transactional, making it ideal for various purposes on the platform.
                    </p>
                  </div>
                  <div className="item-footer">
                    <a className="btn-a-link btn-blue" href="/">
                      Buy
                    </a>
                    <a className="btn-a-link btn-blue-border" href="/">
                      Read More
                    </a>
                  </div>
                </article>
              </div>
              <div className="col-12 col-lg-4 d-flex">
                <article>
                  <div className="item-header">
                    <img src="images/icon-uniultra.png?v=1.0.0" alt="icon-uniultra" />
                    <h6>
                      <strong>UTX</strong>
                      $14,40
                    </h6>
                    <div className="clearfix"></div>
                  </div>
                  <div className="item-body">
                    <p>
                      UTX serves as the utility and governance token of the platform, possessing the token grants access
                      to a wide range of advantageous privileges.
                    </p>
                  </div>
                  <div className="item-footer">
                    <a className="btn-a-link btn-blue" href="/">
                      Buy
                    </a>
                    <a className="btn-a-link btn-blue-border" href="/">
                      Read More
                    </a>
                  </div>
                </article>
              </div>
              <div className="col-12 col-lg-4 d-flex">
                <article>
                  <div className="item-header">
                    <img src="images/icon-uniultra.png?v=1.0.0" alt="icon-uniultra" />
                    <h6>
                      <strong>ULP</strong>
                      $14,40
                    </h6>
                    <div className="clearfix"></div>
                  </div>
                  <div className="item-body">
                    <p>
                      ULP is a composite of various assets utilized for swaps and leverage trading. It can be created by
                      utilizing any index asset and can be redeemed for any index asset.
                    </p>
                  </div>
                  <div className="item-footer">
                    <a className="btn-a-link btn-blue" href="/">
                      Buy
                    </a>
                    <a className="btn-a-link btn-blue-border" href="/">
                      Read More
                    </a>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
        {/* END: Ecosystem Tokens */}
      </main>
      {/* END: Main */}

      {/* BEGIN: Footer */}
      <footer>
        <div className="content-footer">
          <a className="logo-footer" href="/">
            <img src="images/icon-logo.png" alt="icon-logo" />
          </a>
          <p>Join our community</p>
          <ul>
            <li>
              <a href="/" target="_blank">
                <img src="images/f-discord.png" alt="discord" />
              </a>
            </li>
            <li>
              <a href="/" target="_blank">
                <img src="images/f-github.png" alt="github" />
              </a>
            </li>
            <li>
              <a href="/" target="_blank">
                <img src="images/f-telegram.png" alt="telegram" />
              </a>
            </li>
            <li>
              <a href="/" target="_blank">
                <img src="images/f-twitter.png" alt="twitter" />
              </a>
            </li>
          </ul>
        </div>
      </footer>
      {/* END: Footer */}
    </div>
  );
};

export default Homepage;
