import React, { useEffect, useRef } from "react";
import {
  Button,
  Select,
  FormControl,
  Radio,
  RadioGroup,
  Stack,
  Flex,
  Box,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";

export default function SelectButton(props) {
  //const BoxBgColor = useColorModeValue("gray.200", "#243036");
  const ButtonColorMode = useColorModeValue("#319795", "#00AF91");
  const ButtonColorMode1 = useColorModeValue("gray.300", "#303E46");
  const ButtonBorderColorMode1 = useColorModeValue("gray.300", "gray.600");

  const ref = useRef(null);
  useForm();

  const myfunc = () => {
    console.log("I was activated 1 seconds later");
  };

  useEffect(() => {
    setTimeout(() => {
      ref.current.click();
    }, 1000);
  }, []);

  return (
    <Flex justifyContent="left" my={1} mb={4} py={1} maxW="xl">
      <Flex mt={5} mx={4}>
        <form onSubmit={props.getApi}>
          <FormControl>
            <Stack spacing={1} direction="row">
              <Select
                colorScheme="teal"
                variant="outline"
                w="4xs"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize={{ base: "md", md: "lg" }}
                cursor="pointer"
                textAlign="center"
                maxW={200}
                name="chainId"
                type="number"
                borderWidth={1}
                borderColor={ButtonBorderColorMode1}
                bg={ButtonColorMode1}
                shadow="md"
              >
                <option name="chainId" value="1">
                  Ethereum
                </option>
                <option name="chainId" value="137">
                  Polygon
                </option>
                <option name="chainId" value="43114">
                  Avalanche
                </option>
                <option name="chainId" value="56">
                  Binance
                </option>
                <option name="chainId" value="1284">
                  Moonbeam
                </option>
                <option name="chainId" value="42161">
                  Arbitrum
                </option>
                <option name="chainId" value="250">
                  Fantom
                </option>
              </Select>
              <Button
                ref={ref}
                onClick={myfunc}
                borderRadius="lg"
                right="0"
                bg={ButtonColorMode}
                type="submit"
                textTransform="uppercase"
                shadow="lg"
              >
                analyse
              </Button>
            </Stack>
          </FormControl>

          <Box mx="xl">
            <RadioGroup
              my={2}
              textAlign="left"
              name="dexName"
              type="number"
              defaultValue="sushiswap"
            >
              <SimpleGrid
                spacing={5}
                direction="row"
                textTransform="uppercase"
                fontWeight="normal"
                fontSize="xs"
                columns={[1, null, 5]}
              >
                <Radio
                  size="sm"
                  colorScheme="red"
                  name="dexName"
                  value="uniswap_v2"
                  borderColor="gray.600"
                >
                  Uniswap
                </Radio>
                <Radio
                  size="sm"
                  name="dexName"
                  colorScheme="green"
                  value="sushiswap"
                  borderColor="gray.600"
                >
                  Sushiswap
                </Radio>

                <Radio
                  size="sm"
                  colorScheme="red"
                  name="dexName"
                  value="quickswap"
                  borderColor="gray.600"
                >
                  Quickswap
                </Radio>

                <Radio
                  size="sm"
                  name="dexName"
                  colorScheme="green"
                  value="traderjoe"
                  borderColor="gray.600"
                >
                  Traderjoe
                </Radio>
                <Radio
                  size="sm"
                  colorScheme="orange"
                  name="dexName"
                  value="pancakeswap"
                  borderColor="gray.600"
                >
                  Pancakeswap
                </Radio>
              </SimpleGrid>
            </RadioGroup>
          </Box>
        </form>
      </Flex>
    </Flex>
  );
}
