import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { HorizontalNarbar, WalletInterface } from "../components";

export default function Walletanalyse() {
  const BoxBgColor = useColorModeValue("#E4EFE7", "gray.800");

  return (
    <>
      <Head>
        <title>Multify - Analytics DashDex </title>
        <meta
          name="description"
          content="Multi-Chain Analytics Defi Dex Dashbord powered by Covalent Api: Built with Nextjs and Chakra UI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={styles.container} bgColor={BoxBgColor} minHeight="100vh">
        <HorizontalNarbar />
        <WalletInterface />
      </Box>
    </>
  );
}
