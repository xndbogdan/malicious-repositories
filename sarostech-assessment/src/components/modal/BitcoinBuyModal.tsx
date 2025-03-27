import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Typography, Grid, Button, useTheme } from "@mui/material";
import SubTitle from "../text/SubTitle";
import { Link } from "react-router-dom";

interface Props {
  title: any;
  links: any;
  openModal: boolean;
  handleCloseModal: () => void;
}

const BitcoinBuyModal = ({
  title,
  links,
  openModal,
  handleCloseModal,
}: Props) => {
  const theme = useTheme();
  return (
    <div>
      <Modal
        keepMounted
        open={openModal}
        onClose={() => handleCloseModal()}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            [theme.breakpoints.up("sm")]: {
              width: 610,
            },
            width: "90%",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "10px",
            p: 4,
          }}
        >
          <SubTitle text={title} />
          <Grid
            container
            spacing={2}
            sx={{
              maxHeight: "80vh",
              overflow: "auto",
            }}
          >
            {links.map((link: any, index: number) => (
              <Grid item xs={6} sm={4} key={index}>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  component={Link}
                  target="_blank"
                  to={link.link}
                  fullWidth
                >
                  {link.agen}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default BitcoinBuyModal;
