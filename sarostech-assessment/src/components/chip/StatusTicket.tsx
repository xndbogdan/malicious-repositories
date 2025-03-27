import React from "react";
import { Chip } from "@mui/material";

interface Props {
  type: number;
}

export const StatusTicket = ({ type }: Props) => {
  return (
    <Chip
      sx={{
        px: "4px",
        backgroundColor:
          type === 2
            ? "primary.light"
            : type === 1
            ? "secondary.main"
            : type === 0
            ? "error.main"
            : "",
        color: "#fff",
      }}
      size="small"
      label={
        type === 2
          ? "Open"
          : type === 1
          ? "Suspended"
          : type === 0
          ? "Closed"
          : ""
      }
    ></Chip>
  );
};
