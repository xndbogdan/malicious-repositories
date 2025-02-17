import React, { useState, useEffect } from "react";
import { Box, Text, Stack } from "@chakra-ui/react";

import DexSelectBtn from "../DexSelectBtn";
import TokenTable from "./TokenTable";
import ConnectButton from "../../Buttons/ConnectButton";
import ConnectUNS from "../../Buttons/ConnectUNS";

//API Key
const API_KEY = "ckey_4e73d56514984838ab3206fbaf4";

function Tokens() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getApi = async (e: {
    target: { elements: { chainId: { value: any }; dexName: { value: any } } };
    preventDefault: () => void;
  }) => {
    const chainId = e.target.elements.chainId.value;
    e.preventDefault();
    const dexName = e.target.elements.dexName.value;
    e.preventDefault();

    const response = await fetch(
      `https://api.covalenthq.com/v1/${chainId}/xy=k/${dexName}/tokens/?quote-currency=USD&format=JSON&key=${API_KEY}`
    );

    const data = await response.json();
    setItems(data.data.items);
    console.log(items);
  };

  return (
    <>
      <Box justifyContent="center">
        <Text
          justifyContent="center"
          right={2}
          letterSpacing={1}
          fontSize="xl"
          fontWeight="semibold"
          decoration="lightblue"
          textTransform="uppercase"
        >
          Tokens Analytics
        </Text>
        <Text
          justifyContent="center"
          right={2}
          color="gray.400"
          letterSpacing={1}
          fontSize="md"
          fontWeight="thin"
          decoration="lightblue"
          textTransform="uppercase"
        >
          Overview
        </Text>
      </Box>

      <Box justifyContent="center">
        <Stack direction="row" spacing="auto">
          <DexSelectBtn getApi={getApi} />
          <Stack pt="7" pr="20">
            <ConnectButton />
            <ConnectUNS />
          </Stack>
        </Stack>
        <TokenTable data={items} />
      </Box>
    </>
  );
}
export default Tokens;
