import { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Ended from 'components/pre-sale/PhaseI/Ended';

export default function PreSale() {
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
            Pre-sale
          </Typography>
          <Typography variant="body1" color="text.secondary">
            During the pre-sale, you will have the option to buy $ELO. All $ELO purchased can be
            claimed after the end of the vesting period.
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
          <Typography
            color="text.primary"
            sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}
            variant="h5"
          >
            I C O
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 2, textAlign: 'center', maxWidth: 600, mx: 'auto' }}
          >
            The pre-sale has ended, you can claim your tokens after the end of the vesting period
          </Typography>
          <Ended />
        </Container>
      </Box>
    </Fragment>
  );
}
