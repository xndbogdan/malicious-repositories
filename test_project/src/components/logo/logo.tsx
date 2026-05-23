import React from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const StyledLogo = styled("img")({
  height: "120px"
});

export const Logo = () => {
  const navigate = useNavigate();
  return (
    <StyledLogo
      src="/images/lock-logo.png"
      alt="logo"
      onClick={() => navigate("/")}
      sx={{ cursor: "pointer" }}
    />
  );
};
