import React from "react";
import Head from "next/head";
import { HorizontalNarbar } from "../components";
import BuyCrypto from "../components/DefiInterfaces/BuyCrypto";
import styles from "../styles/Home.module.css";
import { Box, useColorModeValue } from "@chakra-ui/react";

export default function Swapinterface() {
  const BoxBgColor = useColorModeValue("#E4EFE7", "#F1F4F6");

  return (
    <>
      <Head>
        <title>Multify - Analytics DashDex </title>
        <meta
          name="description"
          content="Multi-Chain Analytics Defi Dex Dashbord powered by Covalent Api: Bulit with Nextjs and Chakra UI"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={styles.container} bgColor={BoxBgColor} minHeight="100vh">
        <HorizontalNarbar />
        <BuyCrypto />
      </Box>
    </>
  );
}
