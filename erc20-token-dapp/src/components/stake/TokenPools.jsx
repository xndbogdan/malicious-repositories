import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';

const stakingPoolData = [
  { label: 'APR', value: '0.000%' },
  { label: 'Wallet Balance', value: '0.0 $' },
  { label: 'Staked', value: '0.0 $' },
  { label: 'Earned', value: '0.0000 $' },
];

const CardLabel = ({ text }) => {
  return (
    <Typography color="text.secondary" sx={{ fontWeight: 500 }} variant="body1" display="block">
      {text}
    </Typography>
  );
};

const CardValue = ({ text }) => {
  return (
    <Typography color="text.primary" sx={{ fontWeight: 500, textAlign: 'right' }}>
      {text}
    </Typography>
  );
};

const TokenPools = () => {
  const [amountToStake, setAmountToStake] = useState('');

  return (
    <Grid container spacing={0} justifyContent="center">
      <Grid item xs={12} md={5}>
        <Card
          elevation={0}
          sx={{
            borderRadius: 10,
            p: 1,
            boxShadow: '0 2px 16px rgb(53 69 89 / 5%)',
          }}
        >
          <CardContent>
            <Typography
              color="text.primary"
              sx={{ fontWeight: 'bold', mb: 4, textAlign: 'center' }}
              variant="h5"
            >
              staking pool
            </Typography>
            {stakingPoolData.map((item, i) => (
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={1}
                key={i}
              >
                <CardLabel text={item.label} />
                <CardValue text={item.value} />
              </Stack>
            ))}
            <Box mt={3}>
              <TextField
                type="number"
                id="amount-to-stake"
                label="Amount to stake"
                variant="standard"
                fullWidth
                value={amountToStake}
                onChange={(e) => setAmountToStake(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  autoComplete: 'off',
                }}
                helperText="Maximum amount is 0"
              />
            </Box>
          </CardContent>
          <CardActions>
            <Button fullWidth>Stake</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TokenPools;
