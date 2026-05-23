import React from "react";
import { Typography } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const Text1 = ({ children }: Props) => {
  return (
    <Typography
      sx={{
        fontSize: "24px",
        lineHeight: "48px",
        color: "#173039",
        fontWeight: 400
      }}
    >
      {children}
    </Typography>
  );
};

export default Text1;
