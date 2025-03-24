import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import StakingGuide from './StakingGuide';

const HowToStake = () => {
  const [stakingGuideDialogOpen, setStakingGuideDialogOpen] = useState(false);

  const handleStakingGuideDialogToggle = () => {
    setStakingGuideDialogOpen(!stakingGuideDialogOpen);
  };

  return (
    <Box component="div" sx={{ textAlign: 'center', mt: 2, mb: 4 }}>
      <Button onClick={handleStakingGuideDialogToggle}>Learn how to stake</Button>
      <StakingGuide open={stakingGuideDialogOpen} handleClose={handleStakingGuideDialogToggle} />
    </Box>
  );
};

export default HowToStake;
