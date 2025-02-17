import React, { useEffect, useState } from "react";
import { Box, Stack, Text } from "@chakra-ui/react";
import SwapInterface from "./SwapInterface";

//AsPI Key
const API_KEY = "ckey_4e73d56514984838ab3206fbaf4";

function DexSwapLayout() {
  const [items, setItems] = useState([]);
  const [tokenListData, setTokenlist] = useState([]);

  useEffect(() => {
    items;
    tokenListData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getChain = async (e: {
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
    setTokenlist(
      data.data.items
        .map((item) => ({
          name: item.chain_name,
          address: item.contract_address,
          symbol: item.contract_ticker_symbol,
          decimals: item.contract_decimals,
          chainId: item.chain_id,
          logoURI: item.logo_url,
        }))
        .reverse()
    );
    // console.log(items);
  };

  return (
    <>
      <Box>
        <Box mt={7}>
          <Text
            ml={10}
            right={2}
            letterSpacing={1}
            fontSize="xl"
            fontWeight="semibold"
            decoration="lightblue"
            textTransform="uppercase"
          >
            Swap
          </Text>
          <Text
            ml={10}
            right={2}
            color="gray.400"
            letterSpacing={1}
            fontSize="md"
            fontWeight="thin"
            decoration="lightblue"
            textTransform="uppercase"
          >
            Interface
          </Text>
        </Box>
      </Box>

      <Stack direction="column">
        <Box justifyContent="center">
          <SwapInterface />
        </Box>

        {/* <Box>
          <DexSelectButton getChain={getChain} />
        </Box> */}
      </Stack>
    </>
  );
}
export default DexSwapLayout;
