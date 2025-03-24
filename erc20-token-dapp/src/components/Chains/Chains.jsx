import { useEffect, useState } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { BSCLogo, ETHLogo } from './Logos';
import { useChain } from 'react-moralis';

const styles = {
  item: {
    display: 'flex',
    alignItems: 'center',
    height: '42px',
    fontWeight: '500',
    fontSize: '14px',
    padding: '0 10px',
  },
  button: {
    border: '2px solid rgb(231, 234, 243)',
    borderRadius: '12px',
  },
};

const menuItems = [
  {
    key: '0x1',
    value: 'ETH',
    icon: <ETHLogo />,
  },

  {
    key: '0x38',
    value: 'BSC',
    icon: <BSCLogo />,
  },
];

function Chains() {
  const { switchNetwork, chainId, chain } = useChain();
  const [selected, setSelected] = useState({});

  useEffect(() => {
    if (!chainId) return null;
    const newSelected = menuItems.find((item) => item.key === chainId);
    setSelected(newSelected);
  }, [chainId]);

  const handleMenuClick = (e) => {
    switchNetwork(e.key);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon} style={styles.item}>
          <span style={{ marginLeft: '5px' }}>{item.value}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div>
      <Dropdown overlay={menu} trigger={['click']}>
        <Button
          key={selected?.key}
          icon={selected?.icon}
          style={{ ...styles.button, ...styles.item }}
        >
          <span style={{ marginLeft: '5px' }}>{selected?.value}</span>
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
}

export default Chains;
