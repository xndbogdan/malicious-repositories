/* eslint-disable react/no-children-prop */
/* eslint-disable @next/next/link-passhref */
import {
  Box,
  Divider,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
  Image,
} from "@chakra-ui/react";

import { BsCurrencyBitcoin } from "react-icons/bs";
import { GiWallet } from "react-icons/gi";
import { FiMenu } from "react-icons/fi";
import { GiTwoCoins } from "react-icons/gi";
import { RiHandCoinFill, RiExchangeDollarFill } from "react-icons/ri";
import { BiAnalyse } from "react-icons/bi";
import Link from "next/link";

import { DarkModeButton, SocialMediaButton } from "../../..";
import Overview from "../../../Category/Overview";

export default function VerticalNarbar() {
  const sidebar = useDisclosure();
  const integrations = useDisclosure();
  const color = useColorModeValue("gray.600", "gray.300");
  const BoxBgColor = useColorModeValue("gray.200", "#243036");
  const BoxBorderColor = useColorModeValue("gray.200", "gray.500");

  const NavItem = (props: { [x: string]: any; icon: any; children: any }) => {
    const { icon, children, ...rest } = props;

    return (
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color={useColorModeValue("inherit", "gray.400")}
        _hover={{
          bg: useColorModeValue("gray.100", "gray.900"),
          color: useColorModeValue("gray.900", "gray.200"),
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="4"
            _groupHover={{
              color: color,
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={BoxBgColor}
      borderColor={BoxBorderColor}
      borderRightWidth="1px"
      w="45"
      borderRadius="xl"
      {...props}
    >
      <Flex justifyContent="center" my="8">
        <Image width={120} src="/multifylogo.png" alt="dexdash logo" />
      </Flex>

      <Flex
        direction="column"
        as="nav"
        fontSize="lg"
        color="gray.500"
        aria-label="Main Navigation"
        fontWeight="bold"
        textShadow="xl"
        fontStyle="revert"
      >
        <NavItem icon={BiAnalyse}>
          <Link href="/summary">
            <Text>Summary</Text>
          </Link>
        </NavItem>
        <NavItem icon={RiHandCoinFill}>
          <Link href="/token">
            <Text>Tokens</Text>
          </Link>
        </NavItem>
        <NavItem icon={GiTwoCoins}>
          <Link href="/pools">
            <Text>Pools</Text>
          </Link>
        </NavItem>
        <Box
          borderColor="gray.600"
          alignContent="space-between"
          mx={6}
          maxWidth={180}
        >
          <Divider />
        </Box>
        <NavItem icon={GiWallet}>
          <Link href="/walletanalyse">
            <Text>Transactions</Text>
          </Link>
        </NavItem>
        <NavItem icon={RiExchangeDollarFill}>
          <Link href="/swapinterface">
            <Text>Swap</Text>
          </Link>
        </NavItem>
        <NavItem icon={BsCurrencyBitcoin}>
          <Link href="/transak">
            <Text>Buy Crypto</Text>
          </Link>
        </NavItem>
      </Flex>
      <DarkModeButton />
      <SocialMediaButton />
      <Flex mx="10" bottom={10} pos="fixed">
        <Text
          mb={2}
          color={useColorModeValue("green.400", "gray.400")}
          letterSpacing={0.5}
          fontSize="xs"
          fontWeight="thin"
          decoration="lightblue"
          textTransform="uppercase"
        >
          made 🤍 by Sabelo
        </Text>
      </Flex>
    </Box>
  );

  return (
    <Box
      as="section"
      bg={useColorModeValue("#E4EFE7", "gray.900")}
      minH="100vh"
    >
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <IconButton
          aria-label="Menu"
          display={{ base: "inline-flex", md: "none" }}
          onClick={sidebar.onOpen}
          icon={<FiMenu />}
          size="sm"
        />

        <Overview />
      </Box>
    </Box>
  );
}
