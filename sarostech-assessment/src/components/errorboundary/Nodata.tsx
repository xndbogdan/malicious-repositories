import { Box, Typography } from "@mui/material";

export const Nodata = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "200px",
        width: "100%",
      }}
    >
      <Typography variant="h4" color="text.secondary">
        There is no data.
      </Typography>
    </Box>
  );
};
