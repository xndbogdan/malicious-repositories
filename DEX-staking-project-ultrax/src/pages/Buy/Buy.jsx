import React from "react";
import { Trans, t } from "@lingui/macro";
import Footer from "components/Footer/Footer";
import "./Buy.css";
import TokenCard from "components/TokenCard/TokenCard";
import buyUTXIcon from "img/buy_gmx.svg";
import SEO from "components/Common/SEO";
import { getPageTitle } from "lib/legacy";

export default function BuyUTXULP() {
  return (
    <SEO title={getPageTitle(t`Buy ULP or UTX`)}>
      <div className="BuyUTXULP page-layout">
        <div className="BuyUTXULP-container default-container">
          <div className="section-title-block">
            <div className="section-title-icon">
              <img src={buyUTXIcon} alt="buyUTXIcon" />
            </div>
            <div className="section-title-content">
              <div className="Page-title">
                <Trans>Buy UTX or ULP token easily!</Trans>
              </div>
              <div className="Page-description fz-base fw-400 text-secondary">
                <Trans>Easily buy UTX or ULP using your favorite payment methods</Trans>
              </div>
            </div>
          </div>
          <TokenCard />
        </div>
        <Footer />
      </div>
    </SEO>
  );
}
