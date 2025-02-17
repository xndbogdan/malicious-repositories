import React from "react";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

export default function SearchInput() {
  return (
    <InputGroup w="96" display={{ base: "none", md: "flex" }}>
      <InputLeftElement color="gray.500">
        <FiSearch />
      </InputLeftElement>
      <Input placeholder="Search for articles..." />
    </InputGroup>
  );
}
