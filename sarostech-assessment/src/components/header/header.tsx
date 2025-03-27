import React, { FC, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Navigation } from "../navigation";
import { useTheme, useThemeProps } from "@mui/material/styles";
import { Menu, Close } from "@mui/icons-material";
import { Logo } from "../logo/logo";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectLoginUser } from "../../store/auth/selectors";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StyledLogoLeaked = styled("img")({
  marginLeft: "20px",
  width: "200px"
});

const Header: FC = () => {
  const [visibleMenu, setVisibleMenu] = useState<boolean>(false);
  const { breakpoints } = useTheme();
  const dispatch = useAppDispatch();
  const username = useAppSelector(selectLoginUser);
  const navigate = useNavigate();

  const matchMobileView = useMediaQuery(breakpoints.down("lg"));
  return (
    <Box sx={{ backgroundColor: "#173039" }}>
      <Container
        sx={{
          [breakpoints.up("sm")]: {
            maxWidth: "1400px"
          },
          pt: "30px",
          pb: "8px"
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <Logo />
          <Box sx={{ ml: "auto", display: { md: "inline-flex", lg: "none" } }}>
            <IconButton onClick={() => setVisibleMenu(!visibleMenu)}>
              <Menu />
            </IconButton>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: { xs: "column", lg: "row" },
              transition: theme => theme.transitions.create(["top"]),
              ...matchMobileView && {
                py: 6,
                backgroundColor: "background.paper",
                zIndex: "appBar",
                position: "fixed",
                height: { xs: "100vh", lg: "auto" },
                top: visibleMenu ? 0 : "-120vh",
                left: 0
              }
            }}
          >
            <Box />
            <Navigation />
            {visibleMenu &&
              matchMobileView &&
              <IconButton
                sx={{
                  position: "fixed",
                  top: 10,
                  right: 10
                }}
                onClick={() => setVisibleMenu(!visibleMenu)}
              >
                <Close />
              </IconButton>}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
