import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getEllipsisTxt } from '../../helpers/formatters.js';
import {
  getExplorer,
  // getNativeByChain,
  // getNetworkByChain
} from '../../helpers/networks.js';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CopyToClipboard from 'components/shared/CopyToClipboard.jsx';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { useWalletConnector } from './WalletConnector.jsx';

const resetLocalStorage = () => {
  localStorage.removeItem('wallet');
  localStorage.removeItem('connected');
};

const AccountDetails = ({ accountDetailsDialogOpen, handleAccountDetailsDialogToggle, data }) => {
  const { logoutWalletConnector } = useWalletConnector();

  const handleLogout = () => {
    logoutWalletConnector();
    handleAccountDetailsDialogToggle();
    resetLocalStorage();
  };

  return (
    <Dialog
      open={accountDetailsDialogOpen}
      onClose={handleAccountDetailsDialogToggle}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      BackdropProps={{
        style: { backgroundColor: 'rgba(111, 126, 140, 0.2)', backdropFilter: 'blur(2px)' },
      }}
      PaperProps={{
        style: { borderRadius: 25, boxShadow: 'none' },
      }}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle id="alert-dialog-title" sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <span>Account</span>
          <IconButton
            onClick={handleAccountDetailsDialogToggle}
            aria-label="close"
            sx={{ bgcolor: 'grey.100' }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack direction="row" mb={2} justifyContent="space-between">
          <Box>
            <Typography variant="caption" display="block" sx={{ fontWeight: 500 }}>
              Address
            </Typography>
            <Link
              href={`${getExplorer(data.chainId)}/address/${data.account}`}
              underline="none"
              target="_blank"
              rel="noreferrer"
              sx={{ fontWeight: 500 }}
            >
              {getEllipsisTxt(data.account, 6)}
            </Link>
          </Box>
          <Box sx={{ alignSelf: 'end' }}>
            <CopyToClipboard text={data.account} />
          </Box>
        </Stack>
        {/* <Box sx={{mb: 2}}>
          <Typography variant="caption" sx={{fontWeight: 500}}>
            Network
          </Typography>
          <Typography variant="body1" sx={{fontWeight: 500}}>
            {getNetworkByChain(data.chainId)}
          </Typography>
        </Box> */}
        <Box>
          <Typography variant="caption" sx={{ fontWeight: 500 }}>
            Balance
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {data.balance}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button startIcon={<LogoutIcon />} disableElevation onClick={handleLogout} fullWidth>
          Disconnect Wallet
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccountDetails;
