import React from "react";
import "./Footer.css";
import { Link, NavLink } from "react-router-dom";
import footer_logo_full from "img/footer_logo_full.svg";
import { SOCIAL_LINKS } from "./constants";
import ExternalLink from "components/ExternalLink/ExternalLink";
import metamaskIcon from "img/ic_metamask_16.svg";
import { addTokenToMetamask } from "lib/wallets";
import { PLATFORM_TOKENS } from "config/tokens";
import { useChainId } from "lib/chains";

export default function Footer() {
  const { chainId } = useChainId();

  return (
    <div className="Footer">
      <div className="Footer-wrapper">
        <div className="Footer-wrapper-left">
          <div className="Footer-left-logo">
            <Link className="App-header-link-main" to="/">
              <img className="Footer-left-logo-img" src={footer_logo_full} alt="logo_full" />
            </Link>
            <span className="Footer-left-text">Future Trading never been easier</span>
          </div>
          <div className="Footer-left-btn">
            <div
              className="footer-item-add-metamask-wrapper"
              onClick={() => {
                let token = PLATFORM_TOKENS[chainId]["UTX"];
                addTokenToMetamask(token);
              }}
            >
              <img className="footer-item-add-metamask" src={metamaskIcon} alt={`Add to Metamask`} />
            </div>
            <NavLink className="Footer-item-buy-utx" exact={true} to={"/buy-utx"}>
              <span>Buy UTX</span>
            </NavLink>
          </div>
        </div>
        <div className="Footer-wrapper-right">
          <div className="Footer-item Footer-product">
            <NavLink className="Footer-item-link-page" exact={true} to={"/trade"}>
              <span className="Footer-item-text">Trade</span>
            </NavLink>
            <NavLink className="Footer-item-link-page" exact={true} to={"/dashboard"}>
              <span className="Footer-item-text">Dashboard</span>
            </NavLink>
            <NavLink className="Footer-item-link-page" exact={true} to={"/earn"}>
              <span className="Footer-item-text">Earn</span>
            </NavLink>
          </div>
          <div className="Footer-item Footer-product">
            <NavLink className="Footer-item-link-page" exact={true} to={"/buy"}>
              <span className="Footer-item-text">Buy</span>
            </NavLink>
            <ExternalLink href="https://utxio.gitbook.io/utx/" className="Footer-item-link-page">
              <span className="Footer-item-text">Docs</span>
            </ExternalLink>
          </div>
          <div className="Footer-item Footer-product">
            <ExternalLink href="https://utxio.gitbook.io/termsandconditions/" className="Footer-item-link-page">
              <span className="Footer-item-text">Terms & Conditions</span>
            </ExternalLink>
            <ExternalLink href="https://utxio.gitbook.io/privacypolicy/" className="Footer-item-link-page">
              <span className="Footer-item-text">Privacy Policy</span>
            </ExternalLink>
            <ExternalLink href="https://utxio.gitbook.io/cookiepolicy/" className="Footer-item-link-page">
              <span className="Footer-item-text">Cookie Policy</span>
            </ExternalLink>
          </div>
          <div className="Footer-item Footer-social-link-block">
            <span>Join our community!</span>
            <div className="Footer-social-link-wrapper">
              {SOCIAL_LINKS.map((platform) => {
                return (
                  <ExternalLink key={platform.name} className="App-social-link footer" href={platform.link}>
                    <img src={platform.icon} alt={platform.name} />
                  </ExternalLink>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
