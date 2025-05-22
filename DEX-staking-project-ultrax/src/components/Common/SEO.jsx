import { Helmet } from "react-helmet";
import { t } from "@lingui/macro";

function SEO(props) {
  const { children, ...customMeta } = props;
  const meta = {
    title: t`UTX | Decentralized Perpetual Exchange`,
    description: t`Trade spot or perpetual BTC, ETH and other top cryptocurrencies with up to 50x leverage directly from your wallet on Arbitrum and Avalanche.`,
    image: "https://utx.io/og.png",
    type: "exchange",
    ...customMeta,
  };
  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="UTX" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@utx_io" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
      </Helmet>
      {children}
    </>
  );
}

export default SEO;
