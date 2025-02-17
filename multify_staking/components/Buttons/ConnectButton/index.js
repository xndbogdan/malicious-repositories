import React from "react";

import { Button, useColorModeValue } from "@chakra-ui/react";

import { GiWallet } from "react-icons/gi";

// Import Wagmi hooks
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function WalletModel() {
  // bgColor
  const bg = useColorModeValue("white", "gray.800");
  const ButtonColorMode = useColorModeValue("#319795", "#00AF91");
  const { data } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  const getEllipsisTxt = (str, n = 6) => {
    if (str) {
      return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
    }
    return "";
  };

  if (data) {
    return (
      <Button
        borderRadius="lg"
        bgColor={ButtonColorMode}
        leftIcon={<GiWallet />}
        onClick={() => disconnect()}
        shadow="lg"
      >
        {getEllipsisTxt(data.address)}
        {/* {`${Number(getBalance?.formatted).toFixed(3)} ETH`} */}
      </Button>
    );
  }
  return (
    <>
      <Button
        borderRadius="lg"
        borderColor="gray.500"
        bgColor={ButtonColorMode}
        leftIcon={<GiWallet />}
        onClick={() => connect()}
        shadow="lg"
      >
        Connect Wallet
      </Button>
    </>
  );
}
