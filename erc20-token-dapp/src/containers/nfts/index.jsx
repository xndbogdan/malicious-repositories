import React, { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import NFTBalance from 'components/NFTBalance';

export default function NFTs() {
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
            NFTs
          </Typography>
          <Typography variant="body1" color="text.secondary">
            All the NFTs you are holding will be shown here
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
          <NFTBalance />
        </Container>
      </Box>
    </Fragment>
  );
}
