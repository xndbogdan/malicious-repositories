import { useMoralis, useNativeBalance } from 'react-moralis';
import Chip from '@mui/material/Chip';

function NativeBalance() {
  const { data: balance } = useNativeBalance();
  const { isAuthenticated } = useMoralis();

  if (!isAuthenticated) return null;

  return (
    <Chip
      label={balance.formatted}
      sx={{
        fontWeight: 500,
        minWidth: '70px',
      }}
    />
  );
}

export default NativeBalance;
