import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const CryptoDisclaimer = () => {
  return (
    <Alert severity="warning" variant="outlined" sx={{ border: 0 }}>
      <AlertTitle>Cryptoasset Disclaimer</AlertTitle>
      Trading/Minting crypto-assets carries a high level of risk. The possibility exists that{' '}
      <strong>you could sustain a loss of some or all of your initial investment</strong> and
      therefore you should not invest money that you cannot afford to lose.
    </Alert>
  );
};

export default CryptoDisclaimer;
