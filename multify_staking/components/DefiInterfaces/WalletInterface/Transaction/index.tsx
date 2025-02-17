import React from "react";
import {
  chakra,
  Flex,
  useColorModeValue,
  Stack,
  SimpleGrid,
  Text,
  Avatar,
  VStack,
} from "@chakra-ui/react";
import moment from "moment";

export default function Transaction({ getTransaction }) {
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
          bg={{ md: "#243036" }}
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
              <span>Tx Hash</span>
              <span>Last Signed Blocks</span>
              <span>From address - To address</span>
              <span>Value</span>
            </SimpleGrid>

            {getTransaction.map((item) => (
              <SimpleGrid
                spacingY={4}
                columns={[1, null, 4]}
                w="full"
                py={10}
                px={10}
                as="samp"
                fontSize="lg"
                textAlign="center"
                key={item.block_height}
                bg={BoxBgColor}
              >
                <Stack direction="row" borderRadius={20}>
                  <Avatar size="sm" name="T X" src="" />
                  <Text isTruncated fontSize="sm">
                    {item.tx_hash}
                  </Text>
                </Stack>
                <chakra.span
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  {new Date(item.block_signed_at).toLocaleDateString()}

                  {item.block_height}
                </chakra.span>
                <chakra.span
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  <VStack>
                    <Text color="blue.500" fontSize="xs" isTruncated>
                      From:{item.from_address}
                    </Text>
                    <Text color="red.500" fontSize="sm" isTruncated>
                      To:{item.to_address}
                    </Text>
                  </VStack>
                </chakra.span>
                <chakra.span
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  color="green.500"
                >
                  {formatCash(item.value)}
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
