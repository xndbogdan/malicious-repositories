import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Chip from '@mui/material/Chip';
import { EthereumLogo, BinanceLogo } from '../ui/NetworkLogos';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useChain, useMoralis } from 'react-moralis';

//main net
// const menuItems = [
//   {
//     key: "0x1",
//     value: "Ethereum",
//     symbol: "ETH",
//     icon: <EthereumLogo />,
//   },
//   {
//     key: "0x38",
//     value: "BSC Mainnet",
//     symbol: "BSC",
//     icon: <BinanceLogo />,
//   },
// ];

//testnet
const menuItems = [
  {
    key: '0x3',
    value: 'Ropsten Testnet ',
    symbol: 'ETH',
    icon: <EthereumLogo />,
  },
  {
    key: '0x61',
    value: 'BSC Mainnet',
    symbol: 'BSC',
    icon: <BinanceLogo />,
  },
];

export default function Networks() {
  const { isAuthenticated } = useMoralis();
  const { switchNetwork, chainId } = useChain();
  const [selected, setSelected] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (item) => {
    setAnchorEl(null);
    switchNetwork(item.key);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!chainId) return null;
    const newSelected = menuItems.find((item) => item.key === chainId);
    setSelected(newSelected);
  }, [chainId]);

  const handleChipIcon = () => {
    if (selected) {
      return <div style={{ marginLeft: '5px' }}>{selected.icon}</div>;
    } else {
      return <KeyboardArrowDownIcon />;
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div style={{ minWidth: '100px', textAlign: 'right' }}>
      <Chip
        icon={handleChipIcon()}
        label={selected?.symbol || 'Network'}
        onClick={handleClickListItem}
        sx={{ fontWeight: 500 }}
      />
      <Menu
        id="networks-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            boxShadow: '0 4px 14px 0 rgb(0 0 0 / 10%)',
            borderRadius: '15px',
            mt: 1,
          },
        }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.key}
            selected={chainId === item.key}
            onClick={() => handleMenuItemClick(item)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.value}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
