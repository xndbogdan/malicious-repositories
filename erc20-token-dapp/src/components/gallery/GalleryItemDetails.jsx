import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CloseIcon from '@mui/icons-material/Close';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ImageWithFallback from '../ui/ImageWithFallback';
import placeholder from 'assets/images/placeholder.svg';

export default function GalleryItemDetails({ item, open, handleClose }) {
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
          <span>NFT Details</span>
          <IconButton onClick={handleClose} aria-label="close" sx={{ bgcolor: 'grey.100' }}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
          <Box>
            <ImageWithFallback
              width="172"
              height="172"
              fallbackSrc={placeholder}
              alt={item.name}
              className="rounded"
            />
          </Box>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 500, mb: 1 }}>
              {item.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {item.description}
            </Typography>
            {item.attributes.map((attribute, i) => (
              <Chip
                key={i}
                label={`${attribute.trait_type}: ${attribute.value}`}
                sx={{ fontWeight: 500, mb: 1, mr: 1 }}
              />
            ))}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}
