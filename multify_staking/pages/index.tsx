import type { NextPage } from "next";
import Head from "next/head";
//import styles from "../styles/Home.module.css";
import { Box } from "@chakra-ui/react";
import Summary from "./summary";

const Home: NextPage = () => {
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
        <Summary />
      </Box>
    </>
  );
};

export default Home;
