import React from "react";
import { Box, CircularProgress } from "@mui/material";

export const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "200px",
        width: "100%"
      }}
    >
      <CircularProgress />
    </Box>
  );
};
