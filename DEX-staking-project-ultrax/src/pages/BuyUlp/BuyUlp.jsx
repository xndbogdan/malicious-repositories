import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UlpSwap from "components/Ulp/UlpSwap";
import Footer from "components/Footer/Footer";
import "./BuyUlp.css";
import { Trans } from "@lingui/macro";

export default function BuyUlp(props) {
  const history = useHistory();
  const [isBuying, setIsBuying] = useState(true);

  useEffect(() => {
    const hash = history.location.hash.replace("#", "");
    const buying = hash === "redeem" ? false : true;
    setIsBuying(buying);
  }, [history.location.hash]);

  return (
    <div className="default-container page-layout">
      <div className="section-title-block">
        <div className="section-title-content">
          <div className="Page-title fz-xl fw-600 text-primary">
            <Trans>Buy&Sell ULP</Trans>
          </div>
          <div className="Page-description fz-base fw-400">
            Choose to buy from decentralized or centralized exchanges.
          </div>
        </div>
      </div>
      <UlpSwap {...props} isBuying={isBuying} setIsBuying={setIsBuying} />
      <Footer />
    </div>
  );
}
