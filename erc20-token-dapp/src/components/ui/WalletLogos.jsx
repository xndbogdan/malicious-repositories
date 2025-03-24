import Metamask from 'assets/images/wallet-logos/metamask.svg';
import WalletConnect from 'assets/images/wallet-logos/wallet-connect.svg';

export const MetamaskLogo = ({ width = 25 }) => (
  <img src={Metamask} alt="Metamask Logo" width={width} />
);

export const WalletConnectLogo = ({ width = 25 }) => (
  <img src={WalletConnect} alt="Wallet Connect Logo" width={width} />
);
