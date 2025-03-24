import React, { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import GalleryItems from '../../components/gallery/GalleryItems';

export default function Gallery() {
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
            Gallery
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
            NFT Marketplace
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
          <GalleryItems />
        </Container>
      </Box>
    </Fragment>
  );
}
