import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const statistics = [
  {
    label: 'Presale',
    value: 10,
  },
  {
    label: 'DEX',
    value: 10,
  },
  {
    label: 'CEX reserved',
    value: 10,
  },
  {
    label: 'Staking',
    value: 25,
  },
  {
    label: 'Team',
    value: 10,
  },
  {
    label: 'Reward for Ordering',
    value: 25,
  },
  {
    label: 'Reward for Customers',
    value: 5,
  },
  {
    label: 'Airdrop',
    value: 5,
  },
];

const TokenomicsSection = () => {
  return (
    <Box
      id="tokenomics"
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
          sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}
        >
          Tokenomics
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 5, maxWidth: 800, mx: 'auto', textAlign: 'center' }}
        >
          During the presale, you will have the option to buy $ELO, presale will take place in two
          steps with different price, presale supports only BEP20 $BNB. All $ELO purchased can be
          claimed at the pre-sale page after the end of the vesting period.
        </Typography>
        <Typography
          variant="h3"
          component="div"
          color="text.primary"
          sx={{
            fontWeight: 700,
            textAlign: 'center',
            color: 'primary.main',
          }}
        >
          1B - 1,000,000,000
        </Typography>
        <Typography
          variant="h6"
          component="div"
          color="text.secondary"
          sx={{ mb: 5, textAlign: 'center' }}
        >
          Total Supply
        </Typography>
        <Card
          elevation={0}
          sx={{
            borderRadius: 5,
            p: 2,
            boxShadow: '0 2px 16px rgb(53 69 89 / 5%)',
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              color="text.primary"
              sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}
            >
              Tokenomic Statistics
            </Typography>
            {statistics.map((item, i) => (
              <Grid container key={i} sx={{ mt: 2 }}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6" component="span" color="text.secondary">
                    {item.label}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ width: '10%' }}>
                      <Typography variant="h6" component="span" sx={{ mb: 0 }}>
                        {item.value}%
                      </Typography>
                    </Box>
                    <Box sx={{ width: '90%' }}>
                      <BorderLinearProgress variant="determinate" value={item.value} />
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            ))}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default TokenomicsSection;
