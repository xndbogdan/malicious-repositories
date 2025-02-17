import React from "react";
import Lottie from "lottie-react";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardCompany from "./CardCompany";

export default function TopCompanies(props: any) {
  var settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: props?.companies?.length < 2 ? props?.companies?.length : 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 1524,
        settings: {
          slidesToShow: props?.companies?.length < 3 ? props?.companies?.length : 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <section className="py-4 w-full overflow-hidden">
      <Slider {...settings}>
        {props?.companies?.map((company: any, index: any) => {
          return <CardCompany key={index} company={company} />;
        })}
      </Slider>
    </section>
  );
}
