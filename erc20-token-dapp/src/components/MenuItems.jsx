import { useLocation } from 'react-router';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';

function MenuItems() {
  const { pathname } = useLocation();

  return (
    <Menu
      theme="light"
      mode="horizontal"
      style={{
        display: 'flex',
        fontSize: '17px',
        fontWeight: '500',
        width: '100%',
        justifyContent: 'center',
      }}
      defaultSelectedKeys={[pathname]}
    >
      <Menu.Item key="/">
        <NavLink to="/">Home</NavLink>
      </Menu.Item>
      <Menu.Item key="/about">
        <NavLink to="/about">About</NavLink>
      </Menu.Item>
      <Menu.Item key="/1inch">
        <NavLink to="/1inch">Swap</NavLink>
      </Menu.Item>
      <Menu.Item key="/erc20balance">
        <NavLink to="/erc20balance">Balances</NavLink>
      </Menu.Item>
      <Menu.Item key="/erc20transfers">
        <NavLink to="/erc20transfers">Transactions</NavLink>
      </Menu.Item>
      <Menu.Item key="/nftBalance">
        <NavLink to="/nftBalance">NFTs</NavLink>
      </Menu.Item>
      <Menu.Item key="/contract">
        <NavLink to="/contract">Contract</NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default MenuItems;
