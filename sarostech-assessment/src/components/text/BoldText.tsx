import { Typography } from "@mui/material";

interface Props {
  text: string;
}

const BoldText = ({ text }: Props) => {
  return (
    <Typography
      component="h2"
      variant="h5"
      sx={{ textAlign: "left", mt: 2, mb: 1 }}
    >
      {text}
    </Typography>
  );
};

export default BoldText;
