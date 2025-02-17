import React, { useEffect, useState } from "react";
import { SwapWidget, lightTheme, darkTheme } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import { Flex } from "@chakra-ui/react";

declare var window: any;

//Dex Color mode
let darkMode = true;

export default function SwapInterface() {
  // Web3 provider

  const [ethereum, setEthereum] = useState();

  // Infura endpoint
  //const jsonRpcEndpoint = process.env.REACT_APP_RPC_ENDPOINT;
  const jsonRpcEndpoint = "3ef17ef5bf7340ab9d97f938b3c4019c";

  useEffect(() => {
    setEthereum(window.ethereum);
  }, []);

  return (
    <Flex justifyContent="center" my="32" className="Uniswap">
      <SwapWidget
        provider={ethereum}
        jsonRpcEndpoint={jsonRpcEndpoint}
        theme={darkMode ? darkTheme : lightTheme}
        width={450}
      />
    </Flex>
  );
}
