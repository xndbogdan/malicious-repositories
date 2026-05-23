import React, { FC, useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import IconButton, { iconButtonClasses } from "@mui/material/IconButton";
import ArrowForward from "@mui/icons-material/ArrowForward";
import BitcoinBuyModal from "../modal/BitcoinBuyModal";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import "../../assets/css/fontawesome-all.min.css";

interface Props {
  item: any;
}

const CourseCardItem: FC<Props> = ({ item }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Box
        sx={{
          px: 1,
          py: 4,
          cursor: "pointer",
          position: "relative",
          transition: (theme) => theme.transitions.create(["box-shadow"]),
          "&:hover": {
            "& .method-logo": {
              background: "#127C71",
              boxShadow: 2,
              transition: "all 0.5s",
            },
            "& .method-icon": {
              color: "white",
              transition: "all 0.5s",
            },
            "& .method-card-container": {
              background: "#127C71",
              color: "white",
              boxShadow: 2,
              backgroundImage: "url(/images/btc-bag-opacity20.png)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "contain, cover",
              transition: "all 0.5s",
            },
            "& .card-list-dot": {
              background: "white",
            },
          },
        }}
        onClick={() => handleModal()}
      >
        <Box
          sx={{
            border: "10px solid white",
            width: "130px",
            height: "130px",
            borderRadius: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#f2f5f5",
            margin: "auto",
            position: "relative",
          }}
          className="method-logo"
        >
          <Box
            sx={{
              fontSize: "50px",
              color: "primary.main",
              "& i": {
                verticalAlign: "middle",
              },
            }}
            className="method-icon"
          >
            <i className={item.icon}></i>
          </Box>
        </Box>
        <Box
          sx={{
            borderRadius: 4,
            border: "1px solid rgb(229, 234, 242)",
            padding: "50px 20px 30px",
            marginTop: "-50px",
            background: "#f2f5f5",
          }}
          className="method-card-container"
        >
          <Box
            sx={{
              lineHeight: 0,
              overflow: "hidden",
              borderRadius: 3,
              mb: 5,
            }}
          ></Box>
          <Box sx={{ mb: 2 }}>
            <Typography
              component="h2"
              variant="h5"
              sx={{ mb: 2, height: 56, overflow: "hidden", fontSize: "20px" }}
            >
              {item.title}
            </Typography>
          </Box>
          <Box
            sx={{
              textAlign: "left",
              fontSize: "16px",
              fontWeight: "400",
              minHeight: "130px",
            }}
          >
            {item.advantages.map((adv: string, index: number) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                }}
              >
                <span className="card-list-dot"></span> {adv}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <BitcoinBuyModal
        title={item.title}
        links={item.links}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default CourseCardItem;
