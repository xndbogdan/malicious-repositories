import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Flex, useColorModeValue, Text } from "@chakra-ui/react";
import Ticker from "react-ticker";

//API Key
const API_KEY = "ckey_4e73d56514984838ab3206fbaf4";
//const API_KEY = process.env["API_KEY"];

function DexTicker() {
  const [items, setItems] = useState([]);
  const chainNameText = useColorModeValue("black", "gray.500");
  const TextColorMode = useColorModeValue("brand.200", "brand.300");
  const BoxTextColor = useColorModeValue("red", "green");
  const borderColor = useColorModeValue("gray.100", "gray.600");
  const BoxBgColor = useColorModeValue("gray.200", "#243036");

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    //Using fetch
    const response = await axios.get(
      `https://api.covalenthq.com/v1/xy=k/supported_dexes/?quote-currency=USD&format=JSON&key=${API_KEY}`
    );
    console.log(response.data.data);
    setItems(response.data.data.items);
    {
      console.log(items);
    }
  };

  return (
    <Ticker offset="run-in" speed={10}>
      {({}) => (
        <Flex
          borderRadius="xl"
          bg={BoxBgColor}
          p={0.1}
          w="full"
          alignItems="center"
          justifyContent="center"
          borderColor={borderColor}
          borderWidth={1}
          mb={8}
        >
          {items.map((item) => (
            <Box
              w="200"
              maxW="xs"
              mx="auto"
              px={4}
              py={3}
              bg={BoxBgColor}
              shadow="md"
              key={item.factory_contract_address}
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="md" color={chainNameText}>
                  {item.chain_name}
                </Text>

                <Text
                  bg={TextColorMode}
                  color={BoxTextColor}
                  px={3}
                  py={1}
                  rounded="full"
                  fontSize="xs"
                >
                  {item.chain_id}
                </Text>
              </Flex>

              <Box>
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  mt={2}
                  color={TextColorMode}
                >
                  {item.dex_name}
                </Text>
              </Box>
            </Box>
          ))}
        </Flex>
      )}
    </Ticker>
  );
}
export default DexTicker;
