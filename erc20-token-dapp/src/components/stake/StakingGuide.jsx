import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const stakingGuides = [
  {
    title: 'Staking ',
    details: [
      'Connect wallet',
      "Press approve to allow your ... to work the staking contract. Please wait for the transaction to confirm. (If you don't see the 'Approve', button you are likely already approved.)",
      'Enter the amount you want to stake in the input box.',
      'Press the button labeled stake. Please wait for the transaction to confirm.',
    ],
  },
  {
    title: 'Checking balance',
    summary:
      "Your stake balance should appear at the top of the staking card, labeled 'staked'. If your staked balance appears as 0.0, and you are sure you have approved and staked, try these steps:",
    details: [
      'Refresh the page (It takes some time for your balances to show up).',
      'Ensure the correct wallet address is connected. (Your connected wallet address is shown at the bottom of the staking page).',
    ],
  },
  {
    title: 'Unstaking',
    details: [
      'Connect wallet',
      'Check you have a staked coins to withdraw (see section above).',
      "Press the 'Claim & Unstake' button. Please allow some time for the transaction to confirm.",
    ],
  },
];

export default function StakingGuide({ open, handleClose }) {
  const [expanded, setExpanded] = useState(0);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      BackdropProps={{
        style: { backgroundColor: 'rgba(111, 126, 140, 0.2)', backdropFilter: 'blur(2px)' },
      }}
      PaperProps={{
        style: { borderRadius: 25, boxShadow: 'none' },
      }}
    >
      <DialogTitle id="alert-dialog-title" sx={{ p: 3 }}>
        How To Stake
      </DialogTitle>
      <DialogContent>
        {stakingGuides.map((data, i) => (
          <Accordion key={i} expanded={expanded === i} onChange={handleChange(i)} elevation={0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography variant="h6" sx={{ width: '50%', flexShrink: 0, fontWeight: 500 }}>
                {data.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {data.summary && (
                <Typography sx={{ color: 'text.secondary', mb: 2 }}>{data?.summary}</Typography>
              )}
              <Stepper activeStep={-1} orientation="vertical">
                {data.details.map((item, i) => (
                  <Step key={i}>
                    <StepLabel>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {item}
                      </Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </AccordionDetails>
          </Accordion>
        ))}
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} autoFocus>
          GOT IT
        </Button>
      </DialogActions>
    </Dialog>
  );
}
