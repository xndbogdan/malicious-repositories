import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import cubes from 'assets/images/cubes.svg';

// Need to change later features of ELO projects
const features = [
  {
    title: 'What you get',
    description:
      'If you order foods to our restautant, you will get $ELO as rewards. If you are a customer or investor, you can get more rewards. This means you got cool rewards from us instead of orders.',
  },
  {
    title: 'Extra services',
    description: 'We will provide more extra services so that our $ELO has got more valuable',
  },
];

const FeaturesSection = () => {
  return (
    <Box sx={{ bgcolor: 'neutral.main', py: 7, borderTop: 1, borderColor: 'grey.100' }}>
      <Container>
        <Box sx={{ maxWidth: '500px' }}>
          <Typography variant="body1" color="primary.main" sx={{ mb: 1, fontWeight: 700 }}>
            Our main features
          </Typography>
          <Typography
            color="text.primary"
            variant="h4"
            sx={{ fontWeight: 700, mb: 5 }}
            component="div"
          >
            Cool Reward System for Orders
          </Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          {features.map((f, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Stack direction="row" spacing={2}>
                <Box sx={{ minWidth: 36 }}>
                  <img src={cubes} width="36" height="36" alt="cubes" />
                </Box>
                <Box>
                  <Typography
                    variant="body"
                    component="div"
                    color="text.primary"
                    sx={{ fontWeight: 700, fontSize: '0.875rem' }}
                  >
                    {f.title}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: '0.875rem' }}
                  >
                    {f.description}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
