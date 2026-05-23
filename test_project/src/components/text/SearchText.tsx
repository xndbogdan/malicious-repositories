import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  // "&:hover": {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
  background: "linear-gradient(to right, #64aeb8, #64bdb7)",
  borderRadius: "5px",
  height: "57px",
  width: "100%"
  // background: "white",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& svg": {
    color: "white",
    width: "38px",
    height: "38px"
  }
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",
  width: "100%",
  height: "100%",
  fontSize: "24px",
  fontWeight: 400,
  lineHeight: "48px",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: "80px",
    transition: theme.transitions.create("width"),
    width: "100%"
  },
  "& .MuiInputBase-input::-webkit-input-placeholder": {
    color: "white",
    fontSize: "24px",
    fontWeight: 400,
    lineHeight: "48px"
  },
  "& .MuiInputBase-input.Mui-disabled::-webkit-input-placeholder": {
    color: "white",
    fontSize: "24px",
    fontWeight: 400,
    lineHeight: "48px"
  }
}));

interface Props {
  search: string;
  handleSearch: (str: string) => void;
  handleKeyDown: (evt: any) => void;
}

const SearchBar = ({ search, handleSearch, handleKeyDown }: Props) => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search for articles…"
        inputProps={{ "aria-label": "search" }}
        value={search}
        onChange={(e: any) => handleSearch(e.target.value)}
        onKeyDown={(evt: any) => handleKeyDown(evt)}
      />
    </Search>
  );
};

export default SearchBar;
