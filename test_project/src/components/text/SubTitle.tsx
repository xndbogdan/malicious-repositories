import { Typography } from "@mui/material";

interface Props {
  text: string;
}

const SubTitle = ({ text }: Props) => {
  return (
    <Typography component="h2" variant="h2" sx={{ mb: 2 }}>
      {text}
    </Typography>
  );
};

export default SubTitle;
