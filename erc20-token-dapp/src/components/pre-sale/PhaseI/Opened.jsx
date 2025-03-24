import { useState, useEffect, Fragment } from 'react';
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import PRESALE_ABI from '../../../contracts/presale.json';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '../../ui/Alert';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import moment from 'moment';

const PresaleContractAddress = ['', '0xBb569C738f56348B21a84D520f679fe41Fd01cc5'];

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

const Opened = () => {
  const [amountToBuy, setAmountToBuy] = useState(1);
  const [tokenInfo, setTokenInfo] = useState([]);
  const [presaleInfo, setPresaleInfo] = useState([]);
  const [buyerInfo, setBuyerInfo] = useState([]);
  const [status, setStatus] = useState([]);
  const [presaleState, setPresaleState] = useState('');
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

    //console.log(parseInt(library.provider.chainId), "net chain id");
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
    setAmountToBuy(1);
    setTokenInfo([]);
    setPresaleInfo([]);
    setStatus([]);
    setBuyerInfo([]);
    setPresaleState('');
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

    let tokenrate;
    try {
      tokenrate = await presalecontract.token_rate();
    } catch (error) {
      setOpenAlert(true);
      setAlertMsg('Get token rate Information Error');
      return null;
    }

    let presaleinfo;
    try {
      presaleinfo = await presalecontract.presale_info();
    } catch (error) {
      setOpenAlert(true);
      setAlertMsg('Get Presale Information Error');
      return null;
    }

    const soft_starttime = `${moment.utc(parseInt(presaleinfo.soft_start) * 1000).format('Do of MMM, h A')} UTC`;
    const soft_endtime = `${moment.utc(parseInt(presaleinfo.soft_end) * 1000).format('Do of MMM, h A')} UTC`;
    const public_starttime = `${moment.utc(parseInt(presaleinfo.public_start) * 1000).format('Do of MMM, h A')} UTC`;
    const public_endtime = `${moment.utc(parseInt(presaleinfo.public_end) * 1000).format('Do of MMM, h A')} UTC`;

    setPresaleInfo([
      { id: 'Token Rate:', val: 1 / tokenrate + ' BNB' },
      {
        id: 'Softcap:',
        val: ethers.utils.formatUnits(presaleinfo.softcap, 18).toString() + ' ' + chainSuffix,
      },
      {
        id: 'Hardcap:',
        val: ethers.utils.formatUnits(presaleinfo.hardcap, 18).toString() + ' ' + chainSuffix,
      },
      {
        id: 'Buy min:',
        val: ethers.utils.formatUnits(presaleinfo.raise_min, 18).toString() + ' ' + chainSuffix,
      },
      {
        id: 'Buy max:',
        val: ethers.utils.formatUnits(presaleinfo.raise_max, 18).toString() + ' ' + chainSuffix,
      },
      { id: 'Soft Presale Start:', val: soft_starttime },
      { id: 'Soft Presale End:', val: soft_endtime },
      { id: 'Public Presale Start:', val: public_starttime },
      { id: 'Public Presale End:', val: public_endtime },
    ]);

    let tokeninfoarr;
    try {
      tokeninfoarr = await presalecontract.tokeninfo();
    } catch (error) {
      setOpenAlert(true);
      setAlertMsg('Get Token Information Error');
      return null;
    }

    let sale_supply =
      (ethers.utils.formatUnits(tokeninfoarr.totalsupply, tokeninfoarr.decimal) / 100) * 10;
    setTokenInfo([
      { id: 'Token Name:', val: tokeninfoarr.name },
      { id: 'Token Symbol:', val: tokeninfoarr.symbol },
      { id: 'Token Decimal:', val: parseInt(tokeninfoarr.decimal) },
      { id: 'Address:', val: presaleinfo.sale_token },
      { id: 'Sale Supply:', val: sale_supply + ' ' + tokeninfoarr.symbol },
    ]);

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

    const state = await getPresaleStatus(presalecontract);
    switch (parseInt(state)) {
      case 1:
        setPresaleState('Public Presale Active');
        break;
      case 2:
        setPresaleState('Stopped');
        break;
      case 3:
        setPresaleState('Soft Presale Active');
        break;
      case 4:
        setPresaleState('Success');
        break;
      case 5:
        setPresaleState('Failed');
        break;
      default:
        setPresaleState('unknown state');
        break;
    }
  };

  const getPresaleStatus = async (presalecontract) => {
    let presalestate;
    try {
      presalestate = await presalecontract.presaleStatus();
    } catch (error) {
      setOpenAlert(true);
      setAlertMsg('Get Status Error');
      return null;
    }

    return presalestate;
  };

  const Deposit = async (amount) => {
    let presalecontract;
    if (!account) {
      setOpenAlert(true);
      setAlertMsg('Wallet is unconnected');
      return null;
    }

    const signer = await library.getSigner();
    presalecontract = getContract(PRESALE_ABI, PresaleContractAddress[chainindex], signer);
    if (
      parseInt(library.provider.chainId) !== netChainId[0] &&
      parseInt(library.provider.chainId) !== netChainId[1]
    ) {
      setOpenAlert(true);
      setAlertMsg('Selected chain is unrecognized');
      return;
    }

    if (!amount || amount <= 0) {
      setOpenAlert(true);
      setAlertMsg('Please enter a valid amount');
      return;
    }

    let overrid = {
      value: ethers.utils.parseUnits(amount.toString(), 18),
    };

    try {
      await presalecontract.userDeposit(overrid);
      // const tx = await presalecontract.userDeposit(overrid)
      // let receipt = await tx.wait();
      // console.log("Transaction hash is ", tx.hash);
      // console.log(receipt)
      setOpenAlert(true);
      setAlertMsg('Deposit done successfully');
    } catch (error) {
      setOpenAlert(true);
      setAlertMsg('Deposit failed');
      return;
    }
  };

  const Withdraw = async () => {
    let presalecontract;
    if (!account) {
      setOpenAlert(true);
      setAlertMsg('Wallet is unconnected');
      return null;
    }

    const signer = await library.getSigner();
    presalecontract = getContract(PRESALE_ABI, PresaleContractAddress[chainindex], signer);
    if (
      parseInt(library.provider.chainId) !== netChainId[0] &&
      parseInt(library.provider.chainId) !== netChainId[1]
    ) {
      setOpenAlert(true);
      setAlertMsg('Selected chain is unrecognized');
      return;
    }

    try {
      await presalecontract.userWithdrawBaseTokens();
      // const tx = await presalecontract.base_withdraw()
      // let receipt = await tx.wait();
      // console.log("Transaction hash is ", tx.hash);
      // console.log(receipt)
      setOpenAlert(true);
      setAlertMsg('Withdraw done successfully');
    } catch (error) {
      setOpenAlert(true);
      setAlertMsg('Withdraw failed');
      return;
    }
  };

  const Claim = async () => {
    let presalecontract;
    if (!account) {
      setOpenAlert(true);
      setAlertMsg('Wallet is unconnected');
      return null;
    }

    const signer = await library.getSigner();
    presalecontract = getContract(PRESALE_ABI, PresaleContractAddress[chainindex], signer);
    if (
      parseInt(library.provider.chainId) !== netChainId[0] &&
      parseInt(library.provider.chainId) !== netChainId[1]
    ) {
      setOpenAlert(true);
      setAlertMsg('Selected chain is unrecognized');
      return;
    }

    try {
      await presalecontract.userWithdrawTokens();

      // const tx = await presalecontract.token_withdraw()
      // let receipt = await tx.wait();
      // console.log("Transaction hash is ", tx.hash);
      // console.log(receipt)

      setOpenAlert(true);
      setAlertMsg('Claim done successfully');
    } catch (error) {
      setOpenAlert(true);
      setAlertMsg('Claim failed');
      return;
    }
  };

  const actionButton = () => {
    let label;
    switch (presaleState) {
      case 'Soft Presale Active':
        label = 'Buy';
        break;
      case 'Public Presale Active':
        label = 'Buy';
        break;
      case 'Success':
        label = 'Claim';
        break;
      case 'Failed':
        label = 'Withdraw';
        break;
      default:
        return null;
    }

    const execFunc = async () => {
      switch (presaleState) {
        case 'Soft Presale Active':
          label = 'Buy';
          Deposit(amountToBuy);
          break;
        case 'Public Presale Active':
          label = 'Buy';
          Deposit(amountToBuy);
          break;
        case 'Success':
          label = 'Claim';
          Claim();
          break;
        case 'Failed':
          label = 'Withdraw';
          Withdraw();
          break;
        default:
          return null;
      }
    };

    return (
      <Button fullWidth onClick={() => execFunc()}>
        {label}
      </Button>
    );
  };

  const handleStateChipColor = (state) => {
    switch (state) {
      case 'Soft Presale Active':
      case 'Public Presale Active':
      case 'Success':
        return 'success';
      case 'Failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleSelectedChain = () => {
    try {
      switch (parseInt(library.provider.chainId)) {
        case netChainId[1]:
          return '$BNB';
        case netChainId[0]:
          return '$ETH';
        default:
          return 'Unknown';
      }
    } catch (e) {
      return 'Unrecognized chain';
    }
  };

  return (
    <Fragment>
      <Alert openAlert={openAlert} setOpenAlert={setOpenAlert} msg={alertMsg} />
      {presaleState === 'Soft Presale Active' && (
        <Typography
          color="text.primary"
          sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}
          variant="h6"
        >
          Soft sale started
        </Typography>
      )}
      {presaleState === 'Stopped' && (
        <Typography
          color="text.primary"
          sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}
          variant="h6"
        >
          Soft sale ended, public presale will start soon.
        </Typography>
      )}
      {presaleState === 'Public Presale Active' && (
        <Typography
          color="text.primary"
          sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}
          variant="h6"
        >
          Public sale started
        </Typography>
      )}
      {presaleState === 'Success' && (
        <Typography
          color="text.primary"
          sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}
          variant="h6"
        >
          Presale finished with successful
        </Typography>
      )}
      {presaleState === 'Failed' && (
        <Typography
          color="text.primary"
          sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center' }}
          variant="h6"
        >
          Presale finished with failure
        </Typography>
      )}

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
                <Chip label="Token Information" />
              </Divider>
              {tokenInfo.map((item, i) => (
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
                <Chip label="Pre-sale Information" />
              </Divider>
              {presaleInfo.map((item, i) => (
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
              {presaleState && (
                <Stack direction="row" justifyContent="flex-end">
                  <Chip
                    label={presaleState}
                    color={handleStateChipColor(presaleState)}
                    sx={{ letterSpacing: 1, fontWeight: 500, mt: 2 }}
                  />
                </Stack>
              )}
              {presaleState === 'Public Presale Active' && (
                <Fragment>
                  <Typography variant="caption" display="block" sx={{ fontWeight: 700, mb: 1 }}>
                    Buy ELO Token
                  </Typography>
                  <TextField
                    type="number"
                    id="amountToBuy"
                    label="Amount to Buy"
                    variant="standard"
                    value={amountToBuy}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setAmountToBuy(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">{handleSelectedChain()}</InputAdornment>
                      ),
                      autoComplete: 'off',
                    }}
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                </Fragment>
              )}
              {presaleState === 'Soft Presale Active' && (
                <Fragment>
                  <Typography variant="caption" display="block" sx={{ fontWeight: 700, mb: 1 }}>
                    Buy ELO Token
                  </Typography>
                  <TextField
                    type="number"
                    id="amountToBuy"
                    label="Amount to Buy"
                    variant="standard"
                    value={amountToBuy}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setAmountToBuy(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">{handleSelectedChain()}</InputAdornment>
                      ),
                      autoComplete: 'off',
                    }}
                    fullWidth
                    sx={{ mb: 1 }}
                  />
                </Fragment>
              )}
            </CardContent>
            <CardActions>{actionButton()}</CardActions>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Opened;
