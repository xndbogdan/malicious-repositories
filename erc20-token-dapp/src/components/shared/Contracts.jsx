import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CopyToClipboard from './CopyToClipboard';

// mainnet
// const contracts = [
//   {
//     title: "ELO Token contract",
//     value: "",
//     link: "https://bscscan.com/token/"
//   },
//   {
//     title: "ELO Token Presale contract",
//     value: "",
//     link: "https://bscscan.com/address/"
//   }
// ]

// testnet
const contracts = [
  {
    title: 'ELO Token contract',
    value: '0xeAfD5b2DCd03f54b12128405D30aC15F89906399',
    link: 'https://testnet.bscscan.com/token/0xeAfD5b2DCd03f54b12128405D30aC15F89906399',
  },
  {
    title: 'ELO Token Presale contract',
    value: '0xBb569C738f56348B21a84D520f679fe41Fd01cc5',
    link: 'https://testnet.bscscan.com/address/0xBb569C738f56348B21a84D520f679fe41Fd01cc5',
  },
];

export default function Contracts({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      BackdropProps={{
        style: { backgroundColor: 'rgba(111, 126, 140, 0.2)', backdropFilter: 'blur(2px)' },
      }}
      PaperProps={{
        style: { borderRadius: 25, boxShadow: 'none' },
      }}
      fullWidth
    >
      <DialogTitle id="alert-dialog-title" sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
            Contracts
          </Typography>
          <IconButton onClick={handleClose} aria-label="close" sx={{ bgcolor: 'grey.100' }}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        {contracts.map((contract, i) => (
          <Stack direction="row" mb={2} key={i} justifyContent="space-between" spacing={3}>
            <Box>
              <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
                {contract.title}
              </Typography>
              <Link
                href={contract.link}
                underline="none"
                target="_blank"
                rel="noreferrer"
                sx={{ fontWeight: 500 }}
              >
                {contract.value}
              </Link>
            </Box>
            <Box sx={{ alignSelf: 'end' }}>
              <CopyToClipboard text={contract.value} />
            </Box>
          </Stack>
        ))}
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}
