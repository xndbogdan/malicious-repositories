import { Fragment, useState } from 'react';
import Button from '@mui/material/Button';
import WalletProviders from './NetworkWalletProviders';
import WalletIcon from '../ui/icons/Wallet';

const Unauthenticated = () => {
  const [walletProvidersDialogOpen, setWalletProvidersDialogOpen] = useState(false);

  const handleWalletProvidersDialogToggle = () => {
    setWalletProvidersDialogOpen(!walletProvidersDialogOpen);
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        disableElevation
        fullWidth
        onClick={handleWalletProvidersDialogToggle}
        startIcon={<WalletIcon />}
        sx={{ boxShadow: 'rgb(0 0 0 / 8%) 0px 8px 28px' }}
      >
        Wallet Connect
      </Button>
      <WalletProviders
        walletProvidersDialogOpen={walletProvidersDialogOpen}
        handleWalletProvidersDialogToggle={handleWalletProvidersDialogToggle}
      />
    </Fragment>
  );
};

export default Unauthenticated;
