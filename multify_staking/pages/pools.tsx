import React from "react";
import { VerticalNavPool } from "../components";
import { Box } from "@chakra-ui/react";
import Head from "next/head";

export default function pools() {
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
      <Box>
        <VerticalNavPool />
      </Box>
    </>
  );
}
