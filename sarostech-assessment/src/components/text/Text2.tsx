import React from "react";
import { Typography } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const Text2 = ({ children }: Props) => {
  return (
    <Typography
      sx={{
        fontSize: "19px",
        lineHeight: "48px",
        color: "#173039",
        fontWeight: 400
      }}
    >
      {children}
    </Typography>
  );
};

export default Text2;
