import React from "react";
import Head from "next/head";
import { VerticalNavToken } from "../components";

export default function token() {
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
      <VerticalNavToken />
    </>
  );
}
