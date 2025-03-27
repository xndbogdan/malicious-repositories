import React from "react";
import { Link } from "react-router-dom";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";
import Title from "../../components/text/Title";
import LoginField from "./LoginField";

const Login = () => {
  return (
    <Box pb={"110px"}>
      <Title title="Login"></Title>
      <Box>
        <Grid container spacing={0} justifyContent="center">
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            lg={6}
            xl={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
            >
              <LoginField />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
