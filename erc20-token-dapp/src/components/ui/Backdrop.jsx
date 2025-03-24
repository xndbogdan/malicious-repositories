import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import TimerIcon from '@mui/icons-material/Timer';
import Countdown from 'react-countdown';
import Chip from '@mui/material/Chip';

const renderer = ({ days, hours, minutes, seconds }) => {
  return (
    <Typography variant="body1" sx={{ fontWeight: 500, minWidth: '95px' }}>
      {days}:{hours}:{minutes}:{seconds}
    </Typography>
  );
};

const TimeCountdown = ({ date }) => {
  return <Countdown date={date} renderer={renderer} />;
};

const BackdropMask = ({ date }) => {
  return (
    <Backdrop
      sx={{ zIndex: 1, bgcolor: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(2px)' }}
      open={true}
    >
      <Chip icon={<TimerIcon />} label={<TimeCountdown date={date} />} color="primary" />
    </Backdrop>
  );
};

export default BackdropMask;
