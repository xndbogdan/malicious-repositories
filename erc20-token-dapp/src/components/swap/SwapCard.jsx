import { useState, useEffect, useMemo, Fragment } from 'react';
import { useMoralis } from 'react-moralis';
import { useMoralisDapp } from 'providers/MoralisDappProvider/MoralisDappProvider';
import Tokens from './Tokens';
import useInchDex from 'hooks/useInchDex';
import useTokenPrice from 'hooks/useTokenPrice';
import { tokenValue } from 'helpers/formatters';
import Chip from '@mui/material/Chip';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import CardActions from '@mui/material/CardActions';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Alert from '../ui/Alert';

const nativeAddress = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
const chainIds = { '0x1': 'eth', '0x38': 'bsc' };

const TokenImage = ({ src }) => (
  <Box sx={{ ml: 1 }}>
    <img src={src} width="20" alt="Token logo" />
  </Box>
);

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

const SwapCard = () => {
  const { chainId } = useMoralisDapp();
  const chain = chainIds?.[chainId];
  const { trySwap, tokenList, getQuote } = useInchDex(chain);
  const { Moralis, isInitialized } = useMoralis();
  const [isFromModalActive, setFromModalActive] = useState(false);
  const [isToModalActive, setToModalActive] = useState(false);
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [fromAmount, setFromAmount] = useState('');
  const [quote, setQuote] = useState();
  const [currentTrade, setCurrentTrade] = useState();
  const { fetchTokenPrice } = useTokenPrice();
  const [tokenPricesUSD, setTokenPricesUSD] = useState({});
  const [alertMsg, setAlertMsg] = useState('');
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    if (!isInitialized || !fromToken || !chain) return null;
    console.log(fromToken);
    fetchTokenPrice({ chain: chain, address: fromToken[['address']] })
      .then((price) =>
        setTokenPricesUSD({
          ...tokenPricesUSD,
          [fromToken['address']]: price['usdPrice'],
        })
      )
      .catch((e) => {
        setOpenAlert(true);
        setAlertMsg(e.error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, isInitialized, fromToken]);

  useEffect(() => {
    if (!isInitialized || !toToken || !chain) return null;
    fetchTokenPrice({ chain: chain, address: toToken[['address']] }).then((price) =>
      setTokenPricesUSD({
        ...tokenPricesUSD,
        [toToken['address']]: price['usdPrice'],
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, isInitialized, toToken]);

  useEffect(() => {
    if (!tokenList) return null;
    setFromToken(tokenList[nativeAddress]);
  }, [tokenList]);

  const ButtonState = useMemo(() => {
    if (chainIds?.[chainId] !== chain) return { isActive: false, text: `Switch to ${chain}` };

    if (!fromAmount || fromAmount <= 0) return { isActive: false, text: 'Enter an amount' };

    if (fromAmount && currentTrade) return { isActive: true, text: 'Swap' };

    return { isActive: false, text: 'Select tokens' };
  }, [fromAmount, currentTrade, chainId, chain]);

  useEffect(() => {
    if (fromToken && toToken && fromAmount)
      setCurrentTrade({ fromToken, toToken, fromAmount, chain });
  }, [toToken, fromToken, fromAmount, chain]);

  useEffect(() => {
    if (currentTrade) getQuote(currentTrade).then((quote) => setQuote(quote));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrade]);

  const PriceSwap = () => {
    const Quote = quote;
    if (!Quote || !tokenPricesUSD?.[toToken?.['address']]) return null;
    if (Quote?.statusCode === 400) return <>{Quote.message}</>;
    const { fromTokenAmount, toTokenAmount } = Quote;
    const { symbol: fromSymbol } = fromToken;
    const { symbol: toSymbol } = toToken;
    const pricePerToken = parseFloat(
      tokenValue(fromTokenAmount, fromToken['decimals']) /
        tokenValue(toTokenAmount, toToken['decimals'])
    ).toFixed(6);
    return (
      <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1}>
        <CardLabel text="Price" />
        <CardValue
          text={`1 ${toSymbol} = ${pricePerToken} ${fromSymbol} ($${tokenPricesUSD[[toToken['address']]].toFixed(6)})`}
        />
      </Stack>
    );
  };

  return (
    <Fragment>
      <Alert openAlert={openAlert} setOpenAlert={setOpenAlert} msg={alertMsg} />
      <Card
        elevation={0}
        sx={{
          borderRadius: 10,
          p: 1,
          boxShadow: '0 2px 16px rgb(53 69 89 / 5%)',
        }}
        className="fadeInUp"
      >
        <CardContent>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              type="number"
              id="from"
              label="From"
              variant="standard"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="0.00"
              InputProps={{
                autoComplete: 'off',
                endAdornment: (
                  <InputAdornment position="end">
                    {chainId ? (
                      <Chip
                        disabled={!tokenList}
                        icon={
                          fromToken?.logoURI ? (
                            <TokenImage src={fromToken.logoURI} />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )
                        }
                        label={fromToken?.symbol || 'Select Token'}
                        onClick={() => setFromModalActive(true)}
                        sx={{ fontWeight: 500, mb: 1 }}
                      />
                    ) : (
                      <Chip label="Connect wallet" sx={{ fontWeight: 500, mb: 1 }} />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <Avatar sx={{ mb: 3, mx: 'auto' }}>
            <ArrowDownwardIcon />
          </Avatar>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              type="number"
              id="to"
              label="To"
              variant="standard"
              value={
                quote
                  ? Moralis.Units.FromWei(quote?.toTokenAmount, quote?.toToken?.decimals).toFixed(6)
                  : ''
              }
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="0.00"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    {chainId ? (
                      <Chip
                        disabled={!tokenList}
                        icon={
                          toToken?.logoURI ? (
                            <TokenImage src={toToken.logoURI} />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )
                        }
                        label={toToken?.symbol || 'Select Token'}
                        onClick={() => setToModalActive(true)}
                        sx={{ fontWeight: 500, mb: 1 }}
                      />
                    ) : (
                      <Chip label="Connect wallet" sx={{ fontWeight: 500, mb: 1 }} />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          {quote && (
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <CardLabel text="Estimated Gas" />
                <CardValue text={quote?.estimatedGas} />
              </Stack>
              <PriceSwap />
            </Box>
          )}
        </CardContent>
        <CardActions>
          <Button fullWidth onClick={() => trySwap(currentTrade)} disabled={!ButtonState.isActive}>
            {ButtonState.text}
          </Button>
        </CardActions>
      </Card>
      {isFromModalActive && (
        <Tokens
          open={isFromModalActive}
          handleClose={() => setFromModalActive(false)}
          setToken={setFromToken}
          tokenList={tokenList}
        />
      )}
      {isToModalActive && (
        <Tokens
          open={isToModalActive}
          handleClose={() => setToModalActive(false)}
          setToken={setToToken}
          tokenList={tokenList}
        />
      )}
    </Fragment>
  );
};

export default SwapCard;
