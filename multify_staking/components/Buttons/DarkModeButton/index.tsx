import React from "react";
import { useColorMode, Switch } from "@chakra-ui/react";

export default function DarkModeButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Switch
      position="fixed"
      bottom="10rem"
      left="1rem"
      color="green"
      size="lg"
      isChecked={isDark}
      onChange={toggleColorMode}
    />
  );
}
