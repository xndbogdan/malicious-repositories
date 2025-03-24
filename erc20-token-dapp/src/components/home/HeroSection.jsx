import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
//import logoArt from "assets/images/logo-blue-art1.png";
import ReactPlayer from 'react-player';

const HeroSection = () => {
  return (
    <Container className="fadeInUp">
      <Stack direction="row" spacing={3} alignItems="center" justifyContent="space-between">
        <Box sx={{ maxWidth: '700px', py: 5, mb: 5, mx: 'auto' }}>
          <Typography
            color="primary.main"
            variant="h2"
            sx={{ fontWeight: 'bold', mb: 3 }}
            component="div"
          >
            Effortless Order Foods
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            ELO is decentralized reward system, the overall system including reward will be extended
            and we will launch extra services to make our token more valuable. People who own $ELO
            can get more and more reward. Our community will grow so fast and surely go to the moon
            with strong supporters and investors.
          </Typography>
          {/* <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            ...
          </Typography> */}
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2, fontWeight: 700 }}>
            Let's get more and more $ELO token.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              component={Link}
              to="/pre-sale"
              disableElevation
              variant="contained"
              endIcon={<ArrowForwardIcon />}
            >
              Get ELO
            </Button>
            <Button
              component="a"
              href={''} // elo whitepaper url
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<ArrowDownwardIcon />}
            >
              ELO Whitepaper
            </Button>
          </Stack>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          {/* <img 
            src={logoArt}
            alt="ELO Logo Alt" 
            width="450"
          /> */}
          <ReactPlayer url="https://www.youtube.com/watch?v=VB5_R9_F8MY" />
        </Box>
      </Stack>
    </Container>
  );
};

export default HeroSection;
