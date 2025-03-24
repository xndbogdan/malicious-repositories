import moment from 'moment';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const CountingDown = ({ counter, opensIn }) => {
  return (
    <Box sx={{ my: 2, textAlign: 'center' }} className="fadeInUp">
      <Typography variant="body1" color="primary.main">
        Opens in
      </Typography>
      <Typography variant="h2" sx={{ fontFamily: 'Roboto Mono', mb: 1 }}>
        {counter}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {moment.utc(opensIn).format('Do of MMMM, h A')} UTC
      </Typography>
    </Box>
  );
};

export default CountingDown;
