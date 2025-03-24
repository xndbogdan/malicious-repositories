import React, { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import ERC20Transfers from 'components/ERC20Transfers';

export default function Transactions() {
  return (
    <Fragment>
      <Container>
        <Box sx={{ mb: 4 }}>
          <Typography
            color="primary.main"
            variant="h4"
            sx={{ fontWeight: 'bold', mb: 1 }}
            component="div"
          >
            Transactions
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your latest transactions will be shown here
          </Typography>
        </Box>
      </Container>
      <Box
        sx={{
          bgcolor: 'neutral.main',
          py: 7,
          borderTop: 1,
          borderBottom: 1,
          borderColor: 'grey.100',
          mb: 4,
        }}
      >
        <Container>
          <ERC20Transfers />
        </Container>
      </Box>
    </Fragment>
  );
}
