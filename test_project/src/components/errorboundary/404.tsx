import { Box, Typography } from "@mui/material";

const Notfound = () => {
  return (
    <Box sx={{
      minHeight: "calc(100vh - 390px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Typography variant="h2" color="text.secondary">
        Not Found Page.
      </Typography>
    </Box>
  );
};

export default Notfound