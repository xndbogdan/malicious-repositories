import SEO from "components/Common/SEO";
import Footer from "components/Footer/Footer";
import { getPageTitle } from "lib/legacy";
import "./PageNotFound.css";
import { Trans, t } from "@lingui/macro";
import { getHomeUrl, getTradePageUrl } from "lib/legacy";

function PageNotFound() {
  const homeUrl = getHomeUrl();
  const tradePageUrl = getTradePageUrl();

  return (
    <SEO title={getPageTitle(t`Page not found`)}>
      <div className="page-layout">
        <div className="page-not-found-container">
          <div className="page-not-found">
            <h2>
              <Trans>Page not found</Trans>
            </h2>
          </div>
        </div>
        <Footer />
      </div>
    </SEO>
  );
}

export default PageNotFound;
