import { useState, useEffect, Fragment } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import PRESALE_ABI from '../../../contracts/presale.json';
import Alert from '../../ui/Alert';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

const PresaleContractAddress = ['', '0xfA0Ae53f2c064975DeEEC123f21107680351CC04'];

// 0: ropsten, 1: bsc testnet
let chainindex = 0;

// const netChainId = [
//   0x1,  //Eth mainnet
//   0x38  //BSC mainnet
// ];

const netChainId = [
  0x3, //Ropsten
  0x61, //BSC testnet
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

const Ended = () => {
  const [buyerInfo, setBuyerInfo] = useState([]);
  const [status, setStatus] = useState([]);
  const [alertMsg, setAlertMsg] = useState('');
  const [openAlert, setOpenAlert] = useState(false);

  const { account, library } = useWeb3React();

  useEffect(() => {
    if (!library) {
      Init();
      return;
    }

    if (!library.provider) {
      Init();
      return;
    }

    if (parseInt(library.provider.chainId) === netChainId[0]) {
      chainindex = 0;
      getInfo();
    } else if (parseInt(library.provider.chainId) === netChainId[1]) {
      chainindex = 1;
      getInfo();
    } else {
      setOpenAlert(true);
      setAlertMsg('Selected chain is unrecognized');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, library]);

  const Init = () => {
    setStatus([]);
    setBuyerInfo([]);
  };

  const getContract = (abi, address, signer = null) => {
    const signerOrProvider = signer;
    return new ethers.Contract(address, abi, signerOrProvider);
  };

  const getInfo = async () => {
    let presalecontract;

    if (!account) {
      setOpenAlert(true);
      setAlertMsg('Wallet is unconnected');
      return null;
    }

    const signer = await library.getSigner();

    presalecontract = getContract(PRESALE_ABI, PresaleContractAddress[chainindex], signer);

    let chainSuffix = '';
    if (parseInt(library.provider.chainId) === netChainId[0]) {
      chainSuffix = 'ETH';
    } else {
      chainSuffix = 'BNB';
    }

    let tokeninfoarr;
    try {
      tokeninfoarr = await presalecontract.tokeninfo();
    } catch (error) {
      setOpenAlert(true);
      setAlertMsg('Get Token Information Error');
      return null;
    }

    let status;
    try {
      status = await presalecontract.status();
    } catch (error) {
      setOpenAlert(true);
      setAlertMsg('Get Status Information Error');
      return null;
    }

    setStatus([
      {
        id: 'Raised Amount',
        val: ethers.utils.formatUnits(status.raised_amount, 18).toString() + ' ' + chainSuffix,
      },
      {
        id: 'Sold Amount',
        val:
          ethers.utils.formatUnits(status.sold_amount, tokeninfoarr.decimal).toString() +
          ' ' +
          tokeninfoarr.symbol,
      },
    ]);

    try {
      const buyerInfo = await presalecontract.buyers(account);
      setBuyerInfo([
        {
          id: 'Invested',
          val: ethers.utils.formatUnits(buyerInfo.base, 18).toString() + ' ' + chainSuffix,
        },
        {
          id: 'ELO Amount',
          val: ethers.utils.formatUnits(buyerInfo.sale, 18).toString() + ' ' + tokeninfoarr.symbol,
        },
      ]);
    } catch (error) {
      setOpenAlert(true);
      setAlertMsg('Get Buyers Information Error');
      return null;
    }
  };

  return (
    <Fragment>
      <Alert openAlert={openAlert} setOpenAlert={setOpenAlert} msg={alertMsg} />
      <Grid container spacing={2} justifyContent="center" className="fadeInUp">
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
              <Divider light textAlign="left">
                <Chip label="Pre-sale Status" />
              </Divider>
              {status.map((item, i) => (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={2}
                  key={i}
                >
                  <CardLabel text={item.id} />
                  <CardValue text={item.val} />
                </Stack>
              ))}
              <Divider light textAlign="left" sx={{ mt: 3 }}>
                <Chip label="Buyer Information" />
              </Divider>
              {buyerInfo.map((item, i) => (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={2}
                  key={i}
                >
                  <CardLabel text={item.id} />
                  <CardValue text={item.val} />
                </Stack>
              ))}
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Typography
                color="text.secondary"
                variant="caption"
                display="block"
                sx={{ fontWeight: 500 }}
              >
                All ELO purchased can be claimed after the end of the vesting period
              </Typography>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Ended;
