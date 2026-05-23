import { Box, Typography } from "@mui/material";

interface Props {
  title: string;
}

const Title = ({ title }: Props) => {
  return (
    <Box
      sx={{
        height: "100%",
        width: { xs: "100%", md: "100%" },
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "center", md: "flex-start" },
      }}
    >
      <Typography
        variant="h1"
        sx={{ mb: { xs: 2, md: 5 }, fontSize: { xs: 30, md: 48 } }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Title;
