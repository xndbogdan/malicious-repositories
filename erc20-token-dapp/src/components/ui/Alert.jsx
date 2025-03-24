import React, { Fragment } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const SnackbarAlert = ({ openAlert, setOpenAlert, msg }) => {
  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setOpenAlert(false)}
        sx={{
          bgcolor: 'rgba(255,255,255,0.2)',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.3)',
          },
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={openAlert}
      autoHideDuration={6000}
      onClose={() => setOpenAlert(false)}
      message={msg}
      action={action}
      ContentProps={{
        sx: { borderRadius: 10 },
      }}
    ></Snackbar>
  );
};

export default SnackbarAlert;
