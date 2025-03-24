import React from 'react';
import Countdown from 'react-countdown';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <Chip label="OPEN" color="success" sx={{ fontWeight: 500, px: 1 }} />;
  } else {
    return (
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        Opens in {days}:{hours}:{minutes}:{seconds}
      </Typography>
    );
  }
};

const TimeCountdown = ({ date }) => {
  return <Countdown date={date} renderer={renderer} />;
};

export default TimeCountdown;
