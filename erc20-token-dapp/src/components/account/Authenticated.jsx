import { Fragment, useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import AccountDetails from './AccountDetails';
import { getEllipsisTxt } from '../../helpers/formatters';
import { ethers } from 'ethers';

const Authenticated = ({ library, account }) => {
  const [balance, setBalance] = useState();
  const [chainId, setChainId] = useState(0);
  const [accountDetailsDialogOpen, setAccountDetailsDialogOpen] = useState(false);

  const getBalance = async () => {
    const bal = await library.getBalance(account);
    setBalance(ethers.utils.formatUnits(bal, 18).toString());
  };

  const getChain = () => {
    setChainId(library.provider.chainId);
  };

  useEffect(() => {
    getBalance();

    if (library.provider) {
      getChain();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [library, account]);

  const handleAccountDetailsDialogToggle = () => {
    setAccountDetailsDialogOpen(!accountDetailsDialogOpen);
  };

  return (
    <Fragment>
      <Chip
        label={getEllipsisTxt(account, 6)}
        onClick={handleAccountDetailsDialogToggle}
        sx={{ fontWeight: 500 }}
      />
      <AccountDetails
        accountDetailsDialogOpen={accountDetailsDialogOpen}
        handleAccountDetailsDialogToggle={handleAccountDetailsDialogToggle}
        data={{ balance, account, chainId }}
      />
    </Fragment>
  );
};

export default Authenticated;
