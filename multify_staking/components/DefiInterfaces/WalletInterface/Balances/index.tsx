import React from "react";
import {
  chakra,
  Flex,
  useColorModeValue,
  Stack,
  SimpleGrid,
  Text,
  Avatar,
} from "@chakra-ui/react";

export default function Balances({ getBalance }) {
  const TextColorMode1 = useColorModeValue("gray.700", "white");
  const BoxBgColor = useColorModeValue("gray.400", "#243036");
  const BoxBgColor2 = useColorModeValue("gray.300", "#303E46");

  const formatCash = (n) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1);
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1);
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1);
    if (n >= 1e12) return +(n / 1e12).toFixed(1);
  };

  return (
    <>
      <Flex
        w="full"
        bg="gray.800"
        alignItems="center"
        justifyContent="center"
        borderRadius={20}
        // bg="#243036"
      >
        <Stack
          direction={{ base: "column" }}
          w="full"
          bg={{ md: BoxBgColor }}
          shadow="lg"
          borderRadius={20}
        >
          return (
          <Flex direction={{ base: "row", md: "column" }} borderRadius={20}>
            <SimpleGrid
              borderTopRadius={20}
              textAlign="center"
              spacingY={4}
              columns={[1, null, 4]}
              w={{ base: 120, md: "full" }}
              textTransform="uppercase"
              bg={BoxBgColor2}
              color={"gray.100"}
              py={{ base: 1, md: 4 }}
              px={{ base: 2, md: 10 }}
              fontSize="md"
              fontWeight="semibold"
            >
              <span>Token</span>
              <span>Symbol</span>
              <span>Crypto Balance</span>
              <span>Fiat Balance</span>
            </SimpleGrid>

            {getBalance.map((item) => (
              <SimpleGrid
                spacingY={4}
                borderRadius={20}
                columns={[1, null, 4]}
                w="full"
                py={10}
                px={10}
                as="samp"
                fontSize="lg"
                textAlign="center"
                key={item.logo_url}
              >
                <Stack direction="row" borderRadius={20}>
                  <Avatar
                    size="sm"
                    name={item.contract_name}
                    src={item.logo_url}
                  />
                  <Text color={TextColorMode1}>{item.contract_address}</Text>
                </Stack>
                <chakra.span
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  color={TextColorMode1}
                >
                  {item.contract_ticker_symbol}
                </chakra.span>
                <chakra.span
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  color={TextColorMode1}
                >
                  {formatCash(item.balance)}
                </chakra.span>
                <chakra.span
                  color={TextColorMode1}
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  {/* ${item.quote_rate} */}
                </chakra.span>
              </SimpleGrid>
            ))}
          </Flex>
          );
        </Stack>
      </Flex>
    </>
  );
}
