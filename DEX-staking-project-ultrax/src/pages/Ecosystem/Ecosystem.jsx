import React from "react";
import { Trans } from "@lingui/macro";
import SEO from "components/Common/SEO";

import Footer from "components/Footer/Footer";
import { getPageTitle } from "lib/legacy";

import "./Ecosystem.css";
import ExternalLink from "components/ExternalLink/ExternalLink";
import { ARBITRUM } from "config/chains";
import { t } from "@lingui/macro";
import { getIcon } from "config/icons";

const NETWORK_ICONS = {
  [ARBITRUM]: getIcon(ARBITRUM, "network"),
};

const NETWORK_ICON_ALTS = {
  [ARBITRUM]: "Arbitrum Icon",
};

export default function Ecosystem() {
  const utxPages = [
    {
      title: "UTX Governance",
      link: "https://gov.utx.io/",
      linkLabel: "gov.utx.io",
      about: t`UTX Governance Page`,
      chainIds: [ARBITRUM],
    },
    {
      title: "UTX Stats",
      link: "https://stats.utx.io/",
      linkLabel: "stats.utx.io",
      about: t`UTX Stats Page`,
      chainIds: [ARBITRUM],
    },
    {
      title: "UTX Proposals",
      link: "https://snapshot.org/#/utx.eth",
      linkLabel: "snapshot.org",
      about: t`UTX Proposals Voting page`,
      chainIds: [ARBITRUM],
    },
    {
      title: "UTX Announcements",
      link: "https://t.me/GMX_Announcements",
      linkLabel: "t.me",
      about: t`UTX Announcements and Updates`,
      chainIds: [ARBITRUM],
    },
  ];

  const communityProjects = [
    {
      title: "UTX Blueberry Club",
      link: "https://www.blueberry.club/",
      linkLabel: "blueberry.club",
      about: t`UTX Blueberry NFTs`,
      creatorLabel: "@xm92boi",
      creatorLink: "https://t.me/xm92boi",
      chainIds: [ARBITRUM],
    },
    {
      title: "UTX Leaderboard",
      link: "https://www.utx.house/",
      linkLabel: "utx.house",
      about: t`Leaderboard for UTX traders`,
      creatorLabel: "@Itburnz",
      creatorLink: "https://t.me/Itburnz",
      chainIds: [ARBITRUM],
    },
    {
      title: "UTX Positions Bot",
      link: "https://t.me/GMXPositions",
      linkLabel: "t.me",
      about: t`Telegram bot for UTX position updates`,
      creatorLabel: "@zhongfu",
      creatorLink: "https://t.me/zhongfu",
      chainIds: [ARBITRUM],
    },
    {
      title: "Blueberry Pulse",
      link: "https://blueberrypulse.substack.com/",
      linkLabel: "substack.com",
      about: t`UTX Weekly Updates`,
      creatorLabel: "@puroscohiba",
      creatorLink: "https://t.me/puroscohiba",
      chainIds: [ARBITRUM],
    },
    {
      title: "DegenClip",
      link: "https://degenclip.com/utx",
      linkLabel: "degenclip.com",
      about: t`Community curated tweet collection`,
      creatorLabel: "@ox21l",
      creatorLink: "https://t.me/ox21l",
      chainIds: [ARBITRUM],
    },
    {
      title: "UTX Yield Simulator",
      link: "https://utx.defisims.com/",
      linkLabel: "defisims.com",
      about: t`Yield simulator for UTX`,
      creatorLabel: "@kyzoeth",
      creatorLink: "https://twitter.com/kyzoeth",
      chainIds: [ARBITRUM],
    },
    {
      title: "UTX Returns Calculator",
      link: "https://docs.google.com/spreadsheets/u/4/d/1mQZlztz_NpTg5qQiYIzc_Ls1OTLfMOUtmEQN-WW8jj4/copy",
      linkLabel: "docs.google.com",
      about: t`Returns calculator for UTX and ULP`,
      creatorLabel: "@AStoicTrader1",
      creatorLink: "https://twitter.com/AStoicTrader1",
      chainIds: [ARBITRUM],
    },
    {
      title: "UTX Trading Stats",
      link: "https://t.me/GMXTradingStats",
      linkLabel: "t.me",
      about: t`Telegram bot for Open Interest on UTX`,
      creatorLabel: "@SniperMonke01",
      creatorLink: "https://twitter.com/SniperMonke01",
      chainIds: [ARBITRUM],
    },
    {
      title: "UTX Staking Bot",
      link: "https://t.me/GMX_Staking_bot",
      linkLabel: "t.me",
      about: t`UTX staking rewards updates and insights`,
      creatorLabel: "@GMX_Staking_bot",
      creatorLink: "https://twitter.com/GMX_Staking_bot",
      chainIds: [ARBITRUM],
    },
    {
      title: "UTX Staking Calculator",
      link: "https://gmxstaking.com",
      linkLabel: "gmxstaking.com",
      about: t`UTX staking calculator`,
      creatorLabel: "@n1njawtf",
      creatorLink: "https://t.me/n1njawtf",
      chainIds: [ARBITRUM],
    },
    {
      title: "UTX Hedging Simulator",
      link: "https://www.gmxhedge.com/",
      linkLabel: "gmxhedge.com",
      about: t`Simulate your hedge strategy`,
      creatorLabel: "@kyzoeth",
      creatorLink: "https://twitter.com/kyzoeth",
      chainIds: [ARBITRUM],
    },
    {
      title: "UTX Swaps",
      link: "https://t.me/GMXSwaps",
      linkLabel: "t.me",
      about: t`Telegram bot for UTX Swaps monitoring`,
      creatorLabel: "@snipermonke01",
      creatorLink: "https://twitter.com/snipermonke01",
      chainIds: [ARBITRUM],
    },
    {
      title: "UTX Position Calculator",
      link: "https://docs.google.com/spreadsheets/d/1OKCeRGU7l-xGx33-siBw_l8x7vP97y4KKKjA2x5LqhQ/edit#gid=0",
      linkLabel: "docs.google.com",
      about: t`Spreadsheet for position calculations`,
      creatorLabel: "@barryfried1",
      creatorLink: "https://twitter.com/barryfried1",
      chainIds: [ARBITRUM],
    },
  ];

  const dashboardProjects = [
    {
      title: "UTX Referrals Dashboard",
      link: "https://www.gmxreferrals.com/",
      linkLabel: "gmxreferrals.com",
      about: t`Dashboard for UTX referral stats`,
      creatorLabel: "@kyzoeth",
      creatorLink: "https://twitter.com/kyzoeth",
      chainIds: [ARBITRUM],
    },
    {
      title: "UTX Terminal",
      link: "https://gmxterminal.com",
      linkLabel: "gmxterminal.com",
      about: t`UTX explorer for stats and traders`,
      creatorLabel: "@vipineth",
      creatorLink: "https://t.me/vipineth",
      chainIds: [ARBITRUM],
    },
    {
      title: "UTX Analytics",
      link: "https://gmxstats.com/",
      linkLabel: "gmxstats.com",
      about: t`Financial reports and protocol analytics`,
      creatorLabel: "@CryptoMessiah",
      creatorLink: "https://t.me/LarpCapital",
      chainIds: [ARBITRUM],
    },
    {
      title: "TokenTerminal",
      link: "https://tokenterminal.com/terminal/projects/utx",
      linkLabel: "tokenterminal.com",
      about: t`UTX fundamentals`,
      creatorLabel: "@tokenterminal",
      creatorLink: "https://twitter.com/tokenterminal",
      chainIds: [ARBITRUM],
    },
    {
      title: "CryptoFees",
      link: "https://cryptofees.info",
      linkLabel: "cryptofees.info",
      about: t`Fees generated by UTX`,
      creatorLabel: "@CryptoFeesInfo",
      creatorLink: "https://twitter.com/CryptoFeesInfo",
      chainIds: [ARBITRUM],
    },
    {
      title: "Shogun Dashboard (Dune Arbitrum)",
      link: "https://dune.com/shogun/utx-analytics-arbitrum",
      linkLabel: "dune.com",
      about: t`Protocol analytics`,
      creatorLabel: "@JamesCliffyz",
      creatorLink: "https://twitter.com/JamesCliffyz",
      chainIds: [ARBITRUM],
    },
    {
      title: "Shogun Dashboard (Dune )",
      link: "https://dune.com/shogun/utx-analytics-",
      linkLabel: "dune.com",
      about: t`Protocol analytics`,
      creatorLabel: "@JamesCliffyz",
      creatorLink: "https://twitter.com/JamesCliffyz",
      chainIds: [],
    },
    {
      title: "UTX Perpetuals Data",
      link: "https://app.laevitas.ch/altsderivs/UTX/perpetualswaps",
      linkLabel: "laevitas.ch",
      about: t`UTX Perpetuals Data`,
      creatorLabel: "@laevitas1",
      creatorLink: "https://twitter.com/laevitas1",
      chainIds: [ARBITRUM],
    },
    {
      title: "UTX Blueberry Leaderboard",
      link: "https://www.blueberryboard.com",
      linkLabel: "blueberryboard.com",
      about: t`GBC NFTs APR tracker and rewards`,
      creatorLabel: "@kyzoeth",
      creatorLink: "https://twitter.com/kyzoeth",
      chainIds: [ARBITRUM],
    },
    {
      title: "UTX Open Trades Ranking and Stats",
      link: "https://dune.com/HanSolar/utx-open-trade-ranking-and-stats",
      linkLabel: "dune.com",
      about: t`Open trades ranking and stats`,
      creatorLabel: "@hansolar21",
      creatorLink: "https://twitter.com/hansolar21",
      chainIds: [ARBITRUM],
    },
    {
      title: "UTX Everything Dashboard",
      link: "https://dune.com/gmxtrader/utx-dashboard-insights",
      linkLabel: "dune.com",
      about: t`Overall protocol analytics`,
      creatorLabel: "@gmxtrader",
      creatorLink: "https://twitter.com/gmxtrader",
      chainIds: [ARBITRUM],
    },
  ];

  const integrations = [
    {
      title: "DeBank",
      link: "debank.com",
      linkLabe: "debank.com",
      about: t`DeFi Portfolio Tracker`,
      announcementLabel: "twitter.com",
      announcementLink: "https://twitter.com/GMX_IO/status/1439711532884152324",
      chainIds: [ARBITRUM],
    },
    {
      title: "Defi Llama",
      link: "https://defillama.com",
      linkLabel: "defillama.com",
      about: t`Decentralized Finance Dashboard`,
      announcementLabel: "twitter.com",
      announcementLink: "https://twitter.com/GMX_IO/status/1438124768033660938",
      chainIds: [ARBITRUM],
    },
    {
      title: "Dopex",
      link: "https://dopex.io",
      linkLabel: "dopex.io",
      about: t`Decentralized Options Protocol`,
      announcementLabel: "twitter.com",
      announcementLink: "https://twitter.com/GMX_IO/status/1482445801523716099",
      chainIds: [ARBITRUM],
    },
    {
      title: "Rook",
      link: "https://www.rook.fi/",
      linkLabel: "rook.fi",
      about: t`MEV Optimizer`,
      announcementLabel: "twitter.com",
      announcementLink: "https://twitter.com/Rook/status/1509613786600116251",
      chainIds: [ARBITRUM],
    },
    {
      title: "Jones DAO",
      link: "https://jonesdao.io",
      linkLabel: "jonesdao.io",
      about: t`Decentralized Options Strategies`,
      announcementLabel: "twitter.com",
      announcementLink: "https://twitter.com/GMX_IO/status/1482788805635678212",
      chainIds: [ARBITRUM],
    },
    {
      title: "Yield Yak Optimizer",
      link: "https://yieldyak.com/",
      linkLabel: "yieldyak.com",
      about: t`Yield Optimizer on `,
      announcementLabel: "twitter.com",
      announcementLink: "https://twitter.com/GMX_IO/status/1484601407378378754",
      chainIds: [],
    },
    {
      title: "Vovo Finance",
      link: "https://vovo.finance/",
      linkLabel: "vovo.finance",
      about: t`Structured Products`,
      announcementLabel: "twitter.com",
      announcementLink: "https://twitter.com/VovoFinance/status/1531517177790345217",
      chainIds: [ARBITRUM],
    },
    {
      title: "Stabilize Protocol",
      link: "https://www.stabilize.finance/",
      linkLabel: "stabilize.finance",
      about: t`Yield Vaults`,
      announcementLabel: "twitter.com",
      announcementLink: "https://twitter.com/StabilizePro/status/1532348674986082306",
      chainIds: [ARBITRUM],
    },
    {
      title: "DODO",
      link: "https://dodoex.io/",
      linkLabel: "dodoex.io",
      about: t`Decentralized Trading Protocol`,
      announcementLabel: "twitter.com",
      announcementLink: "https://twitter.com/GMX_IO/status/1438899138549145605",
      chainIds: [ARBITRUM],
    },
    {
      title: "Open Ocean",
      link: "https://openocean.finance/",
      linkLabel: "openocean.finance",
      about: t`DEX Aggregator`,
      announcementLabel: "twitter.com",
      announcementLink: "https://twitter.com/GMX_IO/status/1495780826016989191",
      chainIds: [ARBITRUM],
    },
    {
      title: "Paraswap",
      link: "https://www.paraswap.io/",
      linkLabel: "paraswap.io",
      about: t`DEX Aggregator`,
      announcementLabel: "twitter.com",
      announcementLink: "https://twitter.com/paraswap/status/1546869879336222728",
      chainIds: [ARBITRUM],
    },
    {
      title: "1inch",
      link: "https://1inch.io/",
      linkLabel: "1inch.io",
      about: t`DEX Aggregator`,
      announcementLabel: "twitter.com",
      announcementLink: "https://twitter.com/GMX_IO/status/1522247451410845696",
      chainIds: [ARBITRUM],
    },
    {
      title: "Firebird Finance",
      link: "https://app.firebird.finance/swap",
      linkLabel: "firebird.finance",
      about: t`DEX Aggregator`,
      announcementLabel: "twitter.com",
      announcementLink: "https://twitter.com/financefirebird/status/1561767094064238595",
      chainIds: [],
    },
    {
      title: "Yield Yak Swap",
      link: "https://yieldyak.com/swap",
      linkLabel: "yieldyak.com",
      about: t`DEX Aggregator`,
      announcementLabel: "twitter.com",
      announcementLink: "https://twitter.com/yieldyak_/status/1484458884827947008",
      chainIds: [],
    },
    {
      title: "Plutus",
      link: "https://plutusdao.io/vaults",
      linkLabel: "plutusdao.io",
      about: t`ULP autocompounding vaults`,
      announcementLabel: "medium.com",
      announcementLink: "https://medium.com/@plutusdao.io/product-release-plutus-vaults-d0b0252cdf03",
      chainIds: [ARBITRUM],
    },
    {
      title: "Beefy.com",
      link: "https://app.beefy.com/",
      linkLabel: "beefy.com",
      about: t`ULP and UTX autocompounding vaults`,
      announcementLabel: "beefy.com",
      announcementLink: "https://beefy.com/articles/earn-ulp-with-beefy-s-new-ulp-strategy-and-vaults/",
      chainIds: [ARBITRUM],
    },
  ];

  const telegramGroups = [
    {
      title: "UTX",
      link: "https://t.me/GMX_IO",
      linkLabel: "t.me",
      about: t`Telegram Group`,
    },
    {
      title: "UTX (Chinese)",
      link: "https://t.me/gmxch",
      linkLabel: "t.me",
      about: t`Telegram Group (Chinese)`,
    },
    {
      title: "UTX (Portuguese)",
      link: "https://t.me/GMX_Portuguese",
      linkLabel: "t.me",
      about: t`Telegram Group (Portuguese)`,
    },
    {
      title: "UTX Trading Chat",
      link: "https://t.me/gambittradingchat",
      linkLabel: "t.me",
      about: t`UTX community discussion`,
    },
  ];

  return (
    <SEO title={getPageTitle(t`Ecosystem Projects`)}>
      <div className="default-container page-layout">
        <div>
          <div className="section-title-block">
            <div className="section-title-icon" />
            <div className="section-title-content">
              <div className="Page-title">
                <Trans>UTX Pages</Trans>
              </div>
              <div className="Page-description">
                <Trans>UTX ecosystem pages.</Trans>
              </div>
            </div>
          </div>
          <div className="DashboardV2-projects">
            {utxPages.map((item) => {
              const linkLabel = item.linkLabel ? item.linkLabel : item.link;
              return (
                <div className="App-card" key={item.title}>
                  <div className="App-card-title">
                    {item.title}
                    <div className="App-card-title-icon">
                      {item.chainIds.map((network) => (
                        <img width="16" key={network} src={NETWORK_ICONS[network]} alt={NETWORK_ICON_ALTS[network]} />
                      ))}
                    </div>
                  </div>
                  <div className="App-card-divider"></div>
                  <div className="App-card-content">
                    <div className="App-card-row">
                      <div className="label">
                        <Trans>Link</Trans>
                      </div>
                      <div>
                        <ExternalLink href={item.link}>{linkLabel}</ExternalLink>
                      </div>
                    </div>
                    <div className="App-card-row">
                      <div className="label">
                        <Trans>About</Trans>
                      </div>
                      <div>{item.about}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="Tab-title-section">
            <div className="Page-title">
              <Trans>Community Projects</Trans>
            </div>
            <div className="Page-description">
              <Trans>
                Projects developed by the UTX community. <br />
                Please exercise caution when interacting with any app, apps are fully maintained by community
                developers.
              </Trans>
            </div>
          </div>
          <div className="DashboardV2-projects">
            {communityProjects.map((item) => {
              const linkLabel = item.linkLabel ? item.linkLabel : item.link;
              return (
                <div className="App-card" key={item.title}>
                  <div className="App-card-title">
                    {item.title}
                    <div className="App-card-title-icon">
                      {item.chainIds.map((network) => (
                        <img width="16" key={network} src={NETWORK_ICONS[network]} alt={NETWORK_ICON_ALTS[network]} />
                      ))}
                    </div>
                  </div>
                  <div className="App-card-divider" />
                  <div className="App-card-content">
                    <div className="App-card-row">
                      <div className="label">
                        <Trans>Link</Trans>
                      </div>
                      <div>
                        <ExternalLink href={item.link}>{linkLabel}</ExternalLink>
                      </div>
                    </div>
                    <div className="App-card-row">
                      <div className="label">
                        <Trans>About</Trans>
                      </div>
                      <div>{item.about}</div>
                    </div>
                    <div className="App-card-row">
                      <div className="label">
                        <Trans>Creator</Trans>
                      </div>
                      <div>
                        <ExternalLink href={item.creatorLink}>{item.creatorLabel}</ExternalLink>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="Tab-title-section">
            <div className="Page-title">
              <Trans>Dashboards</Trans>
            </div>
            <div className="Page-description">
              <Trans>UTX dashboards and analytics.</Trans>
            </div>
          </div>
          <div className="DashboardV2-projects">
            {dashboardProjects.map((item) => {
              const linkLabel = item.linkLabel ? item.linkLabel : item.link;
              return (
                <div className="App-card" key={item.title}>
                  <div className="App-card-title">
                    {item.title}
                    <div className="App-card-title-icon">
                      {item.chainIds.map((network) => (
                        <img width="16" key={network} src={NETWORK_ICONS[network]} alt={NETWORK_ICON_ALTS[network]} />
                      ))}
                    </div>
                  </div>

                  <div className="App-card-divider"></div>
                  <div className="App-card-content">
                    <div className="App-card-row">
                      <div className="label">
                        <Trans>Link</Trans>
                      </div>
                      <div>
                        <ExternalLink href={item.link}>{linkLabel}</ExternalLink>
                      </div>
                    </div>
                    <div className="App-card-row">
                      <div className="label">
                        <Trans>About</Trans>
                      </div>
                      <div>{item.about}</div>
                    </div>
                    <div className="App-card-row">
                      <div className="label">
                        <Trans>Creator</Trans>
                      </div>
                      <div>
                        <ExternalLink href={item.creatorLink}>{item.creatorLabel}</ExternalLink>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="Tab-title-section">
            <div className="Page-title">
              <Trans>Partnerships and Integrations</Trans>
            </div>
            <div className="Page-description">
              <Trans>Projects integrated with UTX.</Trans>
            </div>
          </div>
          <div className="DashboardV2-projects">
            {integrations.map((item) => {
              const linkLabel = item.linkLabel ? item.linkLabel : item.link;
              return (
                <div key={item.title} className="App-card">
                  <div className="App-card-title">
                    {item.title}
                    <div className="App-card-title-icon">
                      {item.chainIds.map((network) => (
                        <img width="16" key={network} src={NETWORK_ICONS[network]} alt={NETWORK_ICON_ALTS[network]} />
                      ))}
                    </div>
                  </div>
                  <div className="App-card-divider"></div>
                  <div className="App-card-content">
                    <div className="App-card-row">
                      <div className="label">
                        <Trans>Link</Trans>
                      </div>
                      <div>
                        <ExternalLink href={item.link}>{linkLabel}</ExternalLink>
                      </div>
                    </div>
                    <div className="App-card-row">
                      <div className="label">
                        <Trans>About</Trans>
                      </div>
                      <div>{item.about}</div>
                    </div>
                    <div className="App-card-row">
                      <div className="label">
                        <Trans>Announcement</Trans>
                      </div>
                      <div>
                        <ExternalLink href={item.announcementLink}>{item.announcementLabel}</ExternalLink>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="Tab-title-section">
            <div className="Page-title">
              <Trans>Telegram Groups</Trans>
            </div>
            <div className="Page-description">
              <Trans>Community-led Telegram groups.</Trans>
            </div>
          </div>
          <div className="DashboardV2-projects">
            {telegramGroups.map((item) => {
              const linkLabel = item.linkLabel ? item.linkLabel : item.link;
              return (
                <div className="App-card" key={item.title}>
                  <div className="App-card-title">{item.title}</div>
                  <div className="App-card-divider"></div>
                  <div className="App-card-content">
                    <div className="App-card-row">
                      <div className="label">
                        <Trans>Link</Trans>
                      </div>
                      <div>
                        <ExternalLink href={item.link}>{linkLabel}</ExternalLink>
                      </div>
                    </div>
                    <div className="App-card-row">
                      <div className="label">
                        <Trans>About</Trans>
                      </div>
                      <div>{item.about}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Footer />
      </div>
    </SEO>
  );
}
