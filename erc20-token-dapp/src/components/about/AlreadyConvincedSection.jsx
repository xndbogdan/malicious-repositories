import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

const AlreadyConvincedSection = () => {
  return (
    <Box
      id="eloNft"
      sx={{
        py: 7,
        textAlign: 'center',
        bgcolor: 'neutral.main',
        borderTop: 1,
        borderBottom: 1,
        borderColor: 'grey.100',
      }}
    >
      <Container>
        <Typography
          variant="h6"
          component="div"
          color="primary.main"
          sx={{ fontWeight: 'bold', mb: 1 }}
        >
          Already convinced?
        </Typography>
        <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 2 }}>
          What are you waiting for?
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 3,
            maxWidth: '500px',
            mx: 'auto',
          }}
        >
          Ensure to grab your ELO token now and enjoy vast benefits that come along with being a
          part of us.
        </Typography>
        <Button
          component={Link}
          to="/pre-sale"
          disableElevation
          variant="contained"
          endIcon={<ArrowForwardIcon />}
        >
          Get $ELO Now
        </Button>
      </Container>
    </Box>
  );
};

export default AlreadyConvincedSection;
