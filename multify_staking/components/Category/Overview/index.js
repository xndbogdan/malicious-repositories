import React, { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  Text,
  useColorModeValue,
  HStack,
  Badge,
  Stack,
} from "@chakra-ui/react";
import millify from "millify";

import DexSelectBtn from "../DexSelectBtn";
import { ConnectButton, ConnectUNS, LiquidityChart, VolumeChart } from "../..";

//API Key
const API_KEY = "ckey_4e73d56514984838ab3206fbaf4";

function Overview() {
  const [items, setItems] = useState([]);
  const [liquidData, setLiquidGraph] = useState([]);
  const [VolumeData, setVolumeGraph] = useState([]);
  const BoxBgColor = useColorModeValue("gray.200", "#243036");
  const TextColorMode = useColorModeValue("gray.500", "gray.400");
  const TextColorMode1 = useColorModeValue("gray.600", "white");
  const BoxBorderColor = useColorModeValue("gray.200", "gray.500");

  const formatCash = (n) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1);
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1);
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1);
    if (n >= 1e12) return +(n / 1e12).toFixed(1);
  };

  useEffect(() => {
    items;
    liquidData;
    VolumeData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //handle Ecosystem data
  const getApi = async (e) => {
    const chainId = e.target.elements.chainId.value;
    e.preventDefault();
    const dexName = e.target.elements.dexName.value;
    e.preventDefault();

    const response = await fetch(
      `https://api.covalenthq.com/v1/${chainId}/xy=k/${dexName}/ecosystem/?quote-currency=USD&format=JSON&key=${API_KEY}`
    );
    const data = await response.json();
    setItems(data.data.items);
    setLiquidGraph(
      data.data.items[0].liquidity_chart_7d
        .map((item) => ({
          x: new Date(item.dt).toLocaleDateString(),
          y: formatCash(item.liquidity_quote),
        }))
        .reverse()
    );
    setVolumeGraph(
      data.data.items[0].volume_chart_7d
        .map((item) => ({
          x: new Date(item.dt).toLocaleDateString(),
          y: formatCash(item.volume_quote),
        }))
        .reverse()
    );
  };

  return (
    <>
      {/* <DexTicker /> */}
      <Box justifyContent="center" mx="24">
        <HStack spacing="auto">
          <DexSelectBtn getApi={getApi} />
          <Stack pt={5}>
            <ConnectButton />
            <ConnectUNS />
          </Stack>
        </HStack>
        <Box>
          <Text
            justifyContent="center"
            right={2}
            letterSpacing={1}
            fontSize="xl"
            fontWeight="semibold"
            decoration="lightblue"
            textTransform="uppercase"
          >
            Summary Analytics
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

        {items.map((item) => (
          <SimpleGrid
            columns={[1, null, 3]}
            spacing={7}
            key={item.chain_id}
            mt={7}
          >
            <Box
              w="full"
              maxW="xs"
              justifyContent="center"
              px={5}
              ps={5}
              py={3}
              bg={BoxBgColor}
              shadow="xl"
              rounded="md "
              borderRadius="lg"
              borderWidth={1}
              borderColor={BoxBorderColor}
            >
              <Box>
                <Text
                  color={TextColorMode}
                  fontSize="sm"
                  fontWeight="thin"
                  mt={2}
                >
                  Total Fees(24h)
                </Text>
                <Text
                  fontSize="lg"
                  mt={2}
                  textAlign="center"
                  color={TextColorMode1}
                  as="samp"
                  fontWeight="bold"
                >
                  $
                  {item.total_fees_24h
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Text>
              </Box>
            </Box>
            <Box
              w="full"
              maxW="xs"
              justifyContent="center"
              px={4}
              py={3}
              bg={BoxBgColor}
              shadow="xl"
              rounded="md "
              borderRadius="lg"
              borderWidth={1}
              borderColor={BoxBorderColor}
            >
              <Box>
                <Text
                  color={TextColorMode}
                  fontSize="sm"
                  fontWeight="thin"
                  mt={2}
                >
                  Total Pair (7d)
                </Text>
                <Text
                  fontWeight="bold"
                  fontSize="lg"
                  mt={2}
                  color={TextColorMode1}
                  as="samp"
                >
                  {item.total_active_pairs_7d}
                </Text>
              </Box>
            </Box>
            <Box
              w="full"
              maxW="xs"
              justifyContent="center"
              px={4}
              py={3}
              bg={BoxBgColor}
              shadow="xl"
              rounded="md "
              borderRadius="lg"
              borderWidth={1}
              borderColor={BoxBorderColor}
            >
              <Box>
                <Text
                  fontSize="sm"
                  fontWeight="thin"
                  mt={2}
                  color={TextColorMode}
                >
                  Total Swaps(24h)
                </Text>
                <Text
                  fontWeight="bold"
                  fontSize="lg"
                  mt={2}
                  color={TextColorMode1}
                  as="samp"
                >
                  {item.total_swaps_24h}
                </Text>
              </Box>
            </Box>
          </SimpleGrid>
        ))}
        {items.map((item) => (
          <HStack key={item.chain_id} justifyContent="left" my={2}>
            <Box p="1">
              <Box d="flex" alignItems="baseline">
                <Badge color="Blue.900" rounded="full" px="2" bg="#319795">
                  <Text color="white"> Dex Name</Text>
                </Badge>
                <Box
                  color="white"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="md"
                  textTransform="uppercase"
                  ml="2"
                >
                  <Text color={TextColorMode1}>{item.dex_name}</Text>
                </Box>
              </Box>
            </Box>

            <Box p="6">
              <Box d="flex" alignItems="baseline">
                <Badge color="Blue.900" rounded="full" px="2" bg="#319795">
                  <Text color="white">Price Quote</Text>
                </Badge>
                <Box
                  color="white"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="md"
                  textTransform="uppercase"
                  ml="2"
                >
                  <Text color={TextColorMode1}>
                    ${millify(item.gas_token_price_quote)}
                  </Text>
                </Box>
              </Box>
            </Box>
          </HStack>
        ))}
        <SimpleGrid
          alignContent="center"
          columns={[1, null, 2]}
          mt={5}
          spacing={5}
        >
          {/* <Box>
            <Text
              ml={10}
              right={2}
              letterSpacing={1}
              fontSize="lg"
              fontWeight="thin"
              decoration="lightblue"
              textTransform="uppercase"
            >
              Liquidity Chart
            </Text>
          </Box> */}
          <Box
            my={5}
            w="100%"
            maxW="100%"
            //mx={10}
            px={5}
            ps={5}
            py={5}
            bg={BoxBgColor}
            shadow="xl"
            rounded="md "
            borderRadius="lg"
            borderWidth={1}
            borderColor={BoxBorderColor}
            h="450px"
            minW="100%"
          >
            <LiquidityChart liquid={liquidData} />
          </Box>
          {/* <Text
            ml={10}
            right={2}
            letterSpacing={1}
            fontSize="lg"
            fontWeight="thin"
            decoration="lightblue"
            textTransform="uppercase"
          >
            Volume Chart
          </Text> */}
          <Box
            my={5}
            w="100%"
            // mx={10}
            maxW="100%"
            px={5}
            ps={5}
            py={5}
            bg={BoxBgColor}
            shadow="xl"
            rounded="md "
            borderRadius="lg"
            borderWidth={1}
            borderColor={BoxBorderColor}
            h="450px"
            minW="100%"
          >
            <VolumeChart Volume={VolumeData} />
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
}
export default Overview;
