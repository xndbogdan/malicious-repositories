import Ethereum from 'assets/images/network-logos/ethereum.svg';
import Binance from 'assets/images/network-logos/binance.svg';

export const EthereumLogo = ({ width = 25 }) => (
  <img src={Ethereum} alt="Ethereum Logo" width={width} />
);

export const BinanceLogo = ({ width = 25 }) => (
  <img src={Binance} alt="Binance Logo" width={width} />
);
