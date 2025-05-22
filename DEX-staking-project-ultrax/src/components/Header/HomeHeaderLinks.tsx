import { FiX } from "react-icons/fi";
import logoImg from "img/dashboard_utx_icon.svg";
import { t } from "@lingui/macro";

import "./Header.css";
import { Link } from "react-router-dom";
import ExternalLink from "components/ExternalLink/ExternalLink";
import { HeaderLink } from "./HeaderLink";

type Props = {
  small?: boolean;
  clickCloseIcon?: () => void;
  redirectPopupTimestamp: number;
  showRedirectModal: (to: string) => void;
};

type HomeLink = { label: string; link: string; isHomeLink?: boolean | false };

export function HomeHeaderLinks({ small, clickCloseIcon, redirectPopupTimestamp, showRedirectModal }: Props) {
  const HOME_MENUS: HomeLink[] = [
    {
      label: t`App`,
      isHomeLink: true,
      link: "/trade",
    },
    {
      label: t`Protocol`,
      link: "https://github.com/utx-io",
    },
    {
      label: t`Governance`,
      link: "https://gov.utx.io/",
    },
    {
      label: t`Voting`,
      link: "https://snapshot.org/#/utx.eth",
    },
    {
      label: t`Docs`,
      link: "https://utxio.gitbook.io/utx/",
    },
  ];
  return (
    <div className="App-header-links">
      {small && (
        <div className="App-header-links-header">
          <Link className="App-header-link-main" to="/">
            <img src={logoImg} alt="UTX Logo" />
          </Link>
          <div
            className="App-header-menu-icon-block mobile-cross-menu"
            onClick={() => clickCloseIcon && clickCloseIcon()}
          >
            <FiX className="App-header-menu-icon" />
          </div>
        </div>
      )}
      {HOME_MENUS.map(({ link, label, isHomeLink = false }) => {
        return (
          <div key={label} className="App-header-link-container">
            {isHomeLink ? (
              <HeaderLink
                to={link}
                redirectPopupTimestamp={redirectPopupTimestamp}
                showRedirectModal={showRedirectModal}
              >
                {label}
              </HeaderLink>
            ) : (
              <ExternalLink href={link}>{label}</ExternalLink>
            )}
          </div>
        );
      })}
    </div>
  );
}
