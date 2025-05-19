import Footer from "components/Footer/Footer";
import "./BuyUTX.css";
import { Trans, t } from "@lingui/macro";
import Button from "components/Button/Button";
import { ARBITRUM, getChainName } from "config/chains";
import { useChainId } from "lib/chains";
import Card from "components/Common/Card";
import { importImage } from "lib/legacy";
import bondProtocolIcon from "img/ic_bondprotocol_arbitrum.svg";
import uniswapArbitrumIcon from "img/ic_uni_arbitrum.svg";
import {
  CENTRALISED_EXCHANGES,
  DECENTRALISED_AGGRIGATORS,
  EXTERNAL_LINKS,
  FIAT_GATEWAYS,
  GMX_FROM_ANY_NETWORKS,
} from "./constants";

export default function BuyUTX() {
  const { chainId } = useChainId();
  const externalLinks = EXTERNAL_LINKS[chainId];

  return (
    <div
      className="BuyUTXULP default-container page-layout"
      style={{
        background: "var(--bg-black)",
      }}
    >
      <div className="BuyUTXULP-container">
        <div className="section-title-block">
          <div className="section-title-content">
            <div className="Page-title">
              <Trans>Buy UTX on {getChainName(chainId)}</Trans>
            </div>
            <div className="Page-description fz-base fw-400 text-secondary">
              <Trans>Choose to buy from decentralized or centralized exchanges.</Trans>
            </div>
          </div>
        </div>
        <div className="cards-row">
          <DecentralisedExchanges chainId={chainId} externalLinks={externalLinks} />
          <CentralisedExchanges chainId={chainId} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

function DecentralisedExchanges({ chainId, externalLinks }) {
  const isArbitrum = chainId === ARBITRUM;
  return (
    <Card title={t`Buy UTX from Decentralized Exchange`}>
      <div className="App-card-content">
        <div className="exchange-info-group">
          <div className="BuyUTXULP-description fz-base fw-400 text-secondary">
            <Trans>Buy from Spooky:</Trans>
          </div>
          <div className="buttons-group col-1">
            <Button
              variant="secondary"
              imgInfo={{ src: uniswapArbitrumIcon, alt: "Uniswap" }}
              to={externalLinks.buyGmx.uniswap}
              newTab
            >
              Uniswap
            </Button>
          </div>
        </div>

        <div className="exchange-info-group">
          <div className="BuyUTXULP-description fz-base fw-400 text-secondary">
            <Trans>Buy UTX using Decentralized Exchange Aggregators:</Trans>
          </div>
          <div className="buttons-group">
            {DECENTRALISED_AGGRIGATORS.filter((e) => chainId in e.links).map((exchange) => {
              const icon = importImage(exchange.icon) || "";
              const link = exchange.links[chainId];
              return (
                <Button
                  variant="secondary"
                  key={exchange.name}
                  to={link}
                  imgInfo={{ src: icon, alt: exchange.name }}
                  newTab
                >
                  {exchange.name}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="exchange-info-group">
          <div className="BuyUTXULP-description fz-base fw-400 text-secondary">
            <Trans>Buy UTX from Cross-chain Swap:</Trans>
          </div>
          <div className="buttons-group">
            {GMX_FROM_ANY_NETWORKS.filter((e) => chainId in e.links).map((exchange) => {
              const icon = importImage(exchange.icon) || "";
              const link = exchange.links[chainId];
              return (
                <Button
                  variant="secondary"
                  key={exchange.name}
                  to={link}
                  imgInfo={{ src: icon, alt: exchange.name }}
                  newTab
                >
                  {exchange.name}
                </Button>
              );
            })}
          </div>
        </div>
        {isArbitrum && (
          <div className="exchange-info-group">
            <div className="BuyUTXULP-description fz-base fw-400 text-secondary">
              <Trans>UTX bonds can be bought on Bond Protocol with a discount and a small vesting period:</Trans>
            </div>
            <div className="buttons-group col-1">
              <Button
                variant="secondary"
                to={"https://app.bondprotocol.finance/#/issuers/UTX"}
                imgInfo={{ src: bondProtocolIcon, alt: "Bond Protocol" }}
                newTab
              >
                Bond Protocol
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

function CentralisedExchanges({ chainId }) {
  return (
    <Card title={t`Buy UTX from Centralized Services`}>
      <div className="App-card-content">
        <div className="exchange-info-group">
          <div className="BuyUTXULP-description fz-base fw-400 text-secondary">
            <Trans>Buy UTX from centralized exchanges:</Trans>
          </div>
          <div className="buttons-group">
            {CENTRALISED_EXCHANGES.filter((e) => chainId in e.links).map((exchange) => {
              const icon = importImage(exchange.icon) || "";
              const link = exchange.links[chainId];
              return (
                <Button
                  variant="secondary"
                  key={exchange.name}
                  to={link}
                  imgInfo={{ src: icon, alt: exchange.name }}
                  newTab
                >
                  {exchange.name}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="exchange-info-group">
          <div className="BuyUTXULP-description fz-base fw-400 text-secondary">
            <Trans>Buy UTX using FIAT gateways:</Trans>
          </div>
          <div className="buttons-group col-2">
            {FIAT_GATEWAYS.filter((e) => chainId in e.links).map((exchange) => {
              const icon = importImage(exchange.icon) || "";
              let link = exchange.links[chainId];

              return (
                <Button
                  variant="secondary"
                  key={exchange.name}
                  to={link}
                  imgInfo={{ src: icon, alt: exchange.name }}
                  newTab
                >
                  {exchange.name}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
