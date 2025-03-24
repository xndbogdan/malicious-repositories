import { useState } from 'react';
import useTokenPrice from 'hooks/useTokenPrice';
import Chip from '@mui/material/Chip';

const TokenImage = ({ src }) => <img src={src} width="20" alt="Token logo" />;

function TokenPrice(props) {
  const { tokenPrice } = useTokenPrice(props);
  const [isUSDMode, setIsUSDMode] = useState(false);

  const toggleDisplayStyle = () => setIsUSDMode(!isUSDMode);

  return (
    <Chip
      icon={<TokenImage src={props.image} />}
      label={tokenPrice && (isUSDMode ? tokenPrice.usdPrice : tokenPrice.nativePrice)}
      onClick={toggleDisplayStyle}
      sx={{ fontWeight: 500, minWidth: '130px' }}
      title={`Show in ${isUSDMode ? 'ETH' : 'USD'}`}
    />
  );
}
export default TokenPrice;
