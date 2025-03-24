import React, { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import SwapCard from '../../components/swap/SwapCard';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import oneInch from 'assets/images/partners/1inch.svg';

const poweredBy = { src: oneInch, href: 'https://1inch.exchange/#/' };

export default function Swap() {
  return (
    <Fragment>
      <Container>
        <Box sx={{ mb: 4 }}>
          <Typography
            color="primary.main"
            variant="h4"
            sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}
            component="div"
          >
            Swap
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
            Swap your token over ETH and BSC networks
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
          <Grid container spacing={0} justifyContent="center" sx={{ mb: 5 }}>
            <Grid item xs={12} md={5}>
              <SwapCard chain="eth" />
            </Grid>
          </Grid>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
            <Typography
              variant="caption"
              display="block"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              Powered by
            </Typography>
            <a href={poweredBy.href} target="_blank" rel="noreferrer">
              <img src={poweredBy.src} alt="1Inch logo" width="100" />
            </a>
          </Stack>
        </Container>
      </Box>
    </Fragment>
  );
}
