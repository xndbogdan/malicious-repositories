import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const BridgeSection = () => {
  return (
    <Box
      id="bridge"
      sx={{
        bgcolor: 'neutral.main',
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
          sx={{ fontWeight: 'bold', mb: 3 }}
        >
          Bridge
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2, maxWidth: '900px' }}>
          ...
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: '900px' }}>
          ...
        </Typography>
        <Button
          component="a"
          href="https://bridge.poly.network/token/"
          target="_blank"
          rel="noopener noreferrer"
          disableElevation
          variant="contained"
          endIcon={<ArrowForwardIcon />}
        >
          Bridge Now
        </Button>
      </Container>
    </Box>
  );
};

export default BridgeSection;
