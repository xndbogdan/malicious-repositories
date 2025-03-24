import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

const steps = ['Connect Wallet', 'Choose Network', 'Enter Amount', 'Click Buy'];

const PreSaleSteps = () => {
  return (
    <Box sx={{ maxWidth: '650px', margin: 'auto', mb: 4 }}>
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

export default PreSaleSteps;
