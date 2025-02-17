/* eslint-disable @next/next/link-passhref */
import React from "react";
//import Link from "next/link";

import {
  chakra,
  Link,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  useColorMode,
  Switch,
  Text,
} from "@chakra-ui/react";

import { GiWallet } from "react-icons/gi";
import { BsCurrencyBitcoin } from "react-icons/bs";
import { RiExchangeDollarFill } from "react-icons/ri";
import { AiOutlineMenu } from "react-icons/ai";
import ConnectButton from "../../Buttons/ConnectButton";
import ConnectUNS from "../../Buttons/ConnectUNS";

export default function HorizontalNarbar() {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const BoxBgColor = useColorModeValue("gray.200", "#243036");
  const NavButtonColorMode = useColorModeValue("gray.300", "gray.900");
  const ButtonColorMode = useColorModeValue("#319795", "#00AF91");

  return (
    <>
      <chakra.header
        bg={BoxBgColor}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
        borderColor="gray.500"
        borderRadius="2xl"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <HStack display="flex" spacing={3} alignItems="center">
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue("gray.800", "inherit")}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />
              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  borderRadius="lg"
                  aria-label="Close menu"
                  justifySelf="self-start"
                  onClick={mobileNav.onClose}
                />
                <Button
                  bgColor="gray.900"
                  borderRadius="2xl"
                  w="full"
                  variant="outlne"
                  color="#00AF91"
                  leftIcon={<RiExchangeDollarFill />}
                >
                  <Link href="/summary">
                    <Text textTransform="uppercase" letterSpacing={1}>
                      Home
                    </Text>
                  </Link>
                </Button>
                <Button
                  borderRadius="2xl"
                  w="full"
                  variant="ghost"
                  leftIcon={<GiWallet />}
                >
                  <Link href="/walletanalyse">
                    <Text textTransform="uppercase" letterSpacing={1}>
                      Wallet Analytics
                    </Text>
                  </Link>
                </Button>
                <Button
                  borderRadius="2xl"
                  w="full"
                  variant="ghost"
                  leftIcon={<RiExchangeDollarFill />}
                >
                  <Link href="/swapinterface">
                    <Text textTransform="uppercase" letterSpacing={1}>
                      Swap
                    </Text>
                  </Link>
                </Button>
                <Button
                  borderRadius="2xl"
                  w="full"
                  variant="ghost"
                  leftIcon={<BsCurrencyBitcoin />}
                >
                  <Link href="/transak">
                    <Text textTransform="uppercase" letterSpacing={1}>
                      Buy Crypto
                    </Text>
                  </Link>
                </Button>
              </VStack>
            </Box>
            <chakra.a
              href="/"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
              {/* <Logo /> */}

              <VisuallyHidden>Choc</VisuallyHidden>
            </chakra.a>

            <HStack spacing={3} display={{ base: "none", md: "inline-flex" }}>
              <Button
                color="#00AF91"
                bgColor="gray.800"
                variant="outline"
                borderRadius="xl"
                leftIcon={<RiExchangeDollarFill />}
                shadow="lg"
                size="sm"
              >
                <Link href="/summary">
                  <Text textTransform="uppercase" letterSpacing={1}>
                    Home
                  </Text>
                </Link>
              </Button>
              <Button
                bgColor={NavButtonColorMode}
                borderRadius="xl"
                variant="ghost"
                leftIcon={<GiWallet />}
                shadow="lg"
                size="sm"
              >
                <Link href="/walletanalyse">
                  <Text textTransform="uppercase" letterSpacing={1}>
                    Transactions
                  </Text>
                </Link>
              </Button>
              <Button
                bgColor={NavButtonColorMode}
                borderRadius="xl"
                variant="ghost"
                leftIcon={<RiExchangeDollarFill />}
                shadow="lg"
                size="sm"
              >
                <Link href="/swapinterface">
                  <Text textTransform="uppercase" letterSpacing={1}>
                    Swap
                  </Text>
                </Link>
              </Button>
              <Button
                bgColor={NavButtonColorMode}
                borderRadius="xl"
                variant="ghost"
                leftIcon={<BsCurrencyBitcoin />}
                size="sm"
              >
                <Link href="/transak">
                  <Text textTransform="uppercase" letterSpacing={1}>
                    Buy Crypto
                  </Text>
                </Link>
              </Button>
            </HStack>
          </HStack>
          <HStack spacing={3} display={mobileNav.isOpen ? "none" : "flex"}>
            <ConnectUNS />
            <ConnectButton />
            <Switch
              colorScheme="teal"
              size="lg"
              isChecked={isDark}
              onChange={toggleColorMode}
            />
            );
          </HStack>
        </Flex>
      </chakra.header>
    </>
  );
}
