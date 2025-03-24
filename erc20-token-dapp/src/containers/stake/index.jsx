import { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TokenPools from '../../components/stake/TokenPools';
import StakeSteps from '../../components/stake/StakeSteps';
import HowToStake from '../../components/stake/HowToStake';

export default function Stake() {
  return (
    <Fragment>
      <Container>
        <Box sx={{ mb: 4 }}>
          <Typography
            color="text.primary"
            variant="h4"
            sx={{ fontWeight: 'bold', mb: 1, color: 'primary.main' }}
            component="div"
          >
            Staking
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Stake $ELO to earn more $ELO. You can stake $ELO tokens in the staking pools to earn
            high APR as a return for holding $ELO tokens.
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
        <Container className="fadeInUp">
          <Typography
            variant="h5"
            component="div"
            color="text.primary"
            sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}
          >
            Stake $ELO tokens to earn rewards
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 2, textAlign: 'center', maxWidth: 600, mx: 'auto' }}
          >
            Please be aware{' '}
            <strong>estimated APRs will likely drop over time as more people join the pool</strong>.
            First you must approve you&apos;ve $ for use on the staking contract, then enter an
            amount and press stake.
          </Typography>
          <StakeSteps />
          <HowToStake />
          <TokenPools />
        </Container>
      </Box>
    </Fragment>
  );
}
