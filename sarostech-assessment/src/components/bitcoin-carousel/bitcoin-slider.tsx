import React, { FC } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Slider, { Settings } from "react-slick";
import Container from "@mui/material/Container";
import { useTheme, styled } from "@mui/material/styles";
import { IconButton, useMediaQuery } from "@mui/material";
import IconArrowBack from "@mui/icons-material/ArrowBack";
import IconArrowForward from "@mui/icons-material/ArrowForward";
import { data } from "./bitcoin-slider.data";
import { CourseCardItem } from "../course";

interface SliderArrowArrow {
  onClick?: () => void;
  type: "next" | "prev";
  className?: "string";
}

const SliderArrow: FC<SliderArrowArrow> = (props) => {
  const { onClick, type, className } = props;
  return (
    <IconButton
      sx={{
        backgroundColor: "background.paper",
        color: "primary.main",
        "&:hover": {
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        },
        bottom: { xs: "-70px !important", md: "-28px !important" },
        left: "unset !important",
        right: type === "prev" ? "60px !important" : "0 !important",
        zIndex: 10,
        boxShadow: 1,
      }}
      disableRipple
      color="inherit"
      onClick={onClick}
      className={className}
    >
      {type === "next" ? (
        <IconArrowForward sx={{ fontSize: 22 }} />
      ) : (
        <IconArrowBack sx={{ fontSize: 22 }} />
      )}
    </IconButton>
  );
};

const StyledDots = styled("ul")(({ theme }) => ({
  "&.slick-dots": {
    position: "absolute",
    left: 0,
    bottom: -20,
    paddingLeft: theme.spacing(1),
    textAlign: "left",
    "& li": {
      marginRight: theme.spacing(2),
      "&.slick-active>div": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}));

const BitcoinSlider: FC = () => {
  const { breakpoints } = useTheme();
  const matchMobileView = useMediaQuery(breakpoints.down("md"));

  const sliderConfig: Settings = {
    infinite: true,
    autoplay: false,
    speed: 300,
    slidesToShow: matchMobileView ? 1 : 4,
    slidesToScroll: 1,
    prevArrow: <SliderArrow type="prev" />,
    nextArrow: <SliderArrow type="next" />,
    dots: true,
    appendDots: (dots) => <StyledDots>{dots}</StyledDots>,
    customPaging: () => (
      <Box
        sx={{
          height: 8,
          width: 30,
          backgroundColor: "divider",
          display: "inline-block",
          borderRadius: 4,
        }}
      />
    ),
  };

  return (
    <Box
      id="popular-course"
      sx={{
        pt: {
          xs: 6,
          md: 8,
        },
        pb: 14,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Slider {...sliderConfig}>
              {data.map((item, index) => (
                <CourseCardItem key={String(item.id)} item={item} />
              ))}
            </Slider>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BitcoinSlider;
