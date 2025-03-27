import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Typography, Grid, Button } from "@mui/material";
import SubTitle from "../text/SubTitle";
import { Link } from "react-router-dom";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

interface Props {
  text: string;
  openModal: boolean;
  handleAction: (status: boolean) => void;
}

const ConfirmModal = ({ text, openModal, handleAction }: Props) => {
  return (
    <div>
      <Modal
        keepMounted
        open={openModal}
        onClose={() => handleAction(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <SubTitle text="Confirmation" />
          <Box textAlign={"center"} my={5}>
            <Typography variant="h5">{text}</Typography>
          </Box>
          <Box sx={{ gap: "20px", display: "flex", justifyContent: "center" }}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              sx={{ maxWidth: "150px", width: "100%" }}
              onClick={() => handleAction(true)}
            >
              Yes
            </Button>
            <Button
              color="error"
              variant="contained"
              size="large"
              sx={{ maxWidth: "150px", width: "100%" }}
              onClick={() => handleAction(false)}
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
