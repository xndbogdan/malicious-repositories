import { Fragment, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { useMoralis } from 'react-moralis';
import { ethers } from 'ethers';
import ERC721_ABI from '../../contracts/ERC721_abi.json';
import Alert from '../ui/Alert';

const NFTContractAddress = '0x20fEE8A8305De41DDf9d8c7CE6a7f540326e6FDf';

//const netChainId = "0x1"; // ETH Mainnet
const netChainId = 0x4; // Rinkeby

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

const marks = [
  {
    value: 1,
    label: '1 ',
  },
  {
    value: 5,
    label: '5 ',
  },
  {
    value: 10,
    label: '10 ',
  },
  {
    value: 15,
    label: '15 ',
  },
  {
    value: 20,
    label: '20 ',
  },
];

function sliderValueText(value) {
  return `${value} ${value > 1 && 's'}`;
}

const handleMint = async (Moralis, web3, amount, mintPrice, setOpenAlert, setAlertMsg) => {
  if (!web3._provider) {
    setOpenAlert(true);
    setAlertMsg('Please connect to a wallet');
    return;
  }

  if (parseInt(web3.givenProvider.chainId) !== netChainId) {
    setOpenAlert(true);
    setAlertMsg('Selected chain is unrecognized');
    return;
  }

  let price_val = amount * mintPrice;
  console.log('test print', price_val.toPrecision(8));
  //console.log("test param", ethers.utils.formatUnits(amount * mintPrice, 18).toString());

  const options = {
    contractAddress: NFTContractAddress,
    functionName: 'mintToken',
    abi: ERC721_ABI,
    params: {
      numberOfTokens: amount,
    },
    awaitReceipt: false,
    msgValue: Moralis.Units.ETH(price_val.toPrecision(8).toString()),
    //msgValue: ethers.utils.formatUnits(ethers.utils.bigNumberify(amount * mintPrice), 18).toString()
  };

  const tx = await Moralis.executeFunction(options);

  tx.on('transactionHash', (hash) => {
    setOpenAlert(true);
    setAlertMsg(`Transaction hash:  ${hash}`);
  })
    .on('receipt', () => {
      setOpenAlert(true);
      setAlertMsg('Transaction done successfully');
    })
    .on('confirmation', () => {
      setOpenAlert(true);
      setAlertMsg('Transaction is ended');
    })
    .on('error', (error) => {
      setOpenAlert(true);
      setAlertMsg(`Something went wrong: ${error}`);
    });
};

const MintCard = () => {
  const { Moralis, web3, user } = useMoralis();
  const [amountToMint, setAmountToMint] = useState(1);
  const [mintInfo, setMintInfo] = useState([]);
  const [presale_price, setPresalePrice] = useState(0);
  const [mintActive, setMintActive] = useState(true);
  const [statestr, setStateStr] = useState('Presale status');
  const [alertMsg, setAlertMsg] = useState('');
  const [openAlert, setOpenAlert] = useState(false);

  useEffect(() => {
    if (web3._provider) {
      if (parseInt(web3.givenProvider.chainId) === netChainId) {
        getBalance(Moralis);
      } else {
        // setOpenAlert(true)
        // setAlertMsg('Selected chain is unrecognized')
      }
    } else {
      // setOpenAlert(true)
      // setAlertMsg('Please reconnect wallet')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3, user]);

  Moralis.onAccountsChanged(function () {
    if (web3._provider) {
      if (parseInt(web3.givenProvider.chainId) === netChainId) {
        getBalance(Moralis);
      } else {
        setOpenAlert(true);
        setAlertMsg('Selected chain is unrecognized');
      }
    } else {
      setOpenAlert(true);
      setAlertMsg('Selected chain is unrecognized');
    }
  });

  const getBalance = async (Moralis) => {
    const options = {
      contractAddress: NFTContractAddress,
      abi: ERC721_ABI,
    };

    const totalsupply = await Moralis.executeFunction({
      functionName: 'totalSupply',
      ...options,
    });
    const tokenPrice = await Moralis.executeFunction({
      functionName: 'getTokenPrice',
      ...options,
    });
    const atokenPrice = ethers.utils.formatUnits(tokenPrice, 18);
    setPresalePrice(atokenPrice);
    const maxsupply = await Moralis.executeFunction({ functionName: 'maxSupply', ...options });
    const presaleactive = await Moralis.executeFunction({
      functionName: 'presaleActive',
      ...options,
    });
    const saleactive = await Moralis.executeFunction({
      functionName: 'saleIsActive',
      ...options,
    });
    // const isWhitelist = await Moralis.executeFunction({ functionName: 'isWhiteList', ...options })

    if (presaleactive) {
      setStateStr('Presale started');
    } else if (saleactive) {
      setStateStr('Presale ended, sale started');
    } else {
      setStateStr('Will soon');
    }

    const remainig = maxsupply - totalsupply;

    if (remainig <= 0) {
      setMintActive(true);
      setStateStr('sold out');
    } else {
      setMintActive(false);
    }

    if (presaleactive === false && saleactive === false) {
      setMintActive(true);
    }

    setMintInfo([
      { label: 'Total Supply', value: maxsupply.toString() },
      { label: 'Remaining', value: remainig.toString() },
      { label: 'Minting Cost', value: atokenPrice.toString() + ' ETH' },
      { label: 'Per Wallet', value: '20  NFT' },
    ]);
  };

  Moralis.onChainChanged(function (chain) {
    if (web3._provider) {
      if (parseInt(chain) === netChainId) {
        getBalance(Moralis);
      } else {
        setOpenAlert(true);
        setAlertMsg('Selected chain is unrecognized');
      }
    }
  });

  return (
    <Fragment>
      <Alert openAlert={openAlert} setOpenAlert={setOpenAlert} msg={alertMsg} />
      <Grid container spacing={0} justifyContent="center" className="fadeInUp">
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 10,
              p: 1,
              boxShadow: '0 2px 16px rgb(53 69 89 / 5%)',
            }}
          >
            <CardContent>
              <Chip label={statestr} color="default" sx={{ fontWeight: 500, mb: 2 }} />
              {mintInfo.map((item, i) => (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  key={i}
                  mb={2}
                >
                  <CardLabel text={item.label} />
                  <CardValue text={item.value} />
                </Stack>
              ))}
              <Typography
                color="text.secondary"
                variant="caption"
                display="block"
                sx={{ mb: 1, mt: 3 }}
              >
                Amount to mint
              </Typography>
              <Box mx="auto" sx={{ width: '90%' }}>
                <Slider
                  aria-label="Amount to mint"
                  defaultValue={1}
                  getAriaValueText={sliderValueText}
                  step={1}
                  marks={marks}
                  value={amountToMint}
                  onChange={(_, newValue) => setAmountToMint(newValue)}
                  valueLabelDisplay="auto"
                  min={1}
                  max={20}
                />
              </Box>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                disableElevation
                fullWidth
                disabled={mintActive}
                onClick={() =>
                  handleMint(Moralis, web3, amountToMint, presale_price, setOpenAlert, setAlertMsg)
                }
              >
                Mint
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default MintCard;
