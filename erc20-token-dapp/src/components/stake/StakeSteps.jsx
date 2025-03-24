import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

const steps = ["Approve you've $", 'Enter an amount', 'Press stake'];

const StakeSteps = () => {
  return (
    <Box sx={{ maxWidth: '650px', margin: 'auto' }}>
      <Stepper activeStep={-1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>
              <Typography sx={{ fontWeight: 500 }}>{label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StakeSteps;
