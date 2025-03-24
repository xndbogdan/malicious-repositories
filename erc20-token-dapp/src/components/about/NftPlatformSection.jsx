import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const NftPlatformSection = () => {
  return (
    <Box
      id="Nft"
      sx={{
        py: 7,
        borderBottom: 1,
        borderColor: 'grey.100',
      }}
    >
      <Container>
        <Typography
          variant="h4"
          component="div"
          color="text.primary"
          sx={{ fontWeight: 'bold', mb: 2 }}
        >
          NFT Platform
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 1, maxWidth: '900px' }}>
          ...
        </Typography>
      </Container>
    </Box>
  );
};

export default NftPlatformSection;
