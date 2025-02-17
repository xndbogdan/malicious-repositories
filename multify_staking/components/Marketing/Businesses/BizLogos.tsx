import React from "react";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

function UserRightArrow(props: { className: any; style: any; onClick: any; }) {
    const { className, style, onClick } = props;
    return (
      <div
        className={"CustomArrow UserRightArrow mr-7 md:mr-0 opacity-60 hover:opacity-100 transition-opacity duation-200"}
        // style={{ ...style, right: "0", "background-image": "url('/Marketing/imgs/userRightArrow.svg')" }}
        onClick={onClick}
      />
    );
}
  
function UserLeftArrow(props: { className: any; style: any; onClick: any; }) {
    const { className, style, onClick } = props;
    return (
      <div
        className={"CustomArrow UserLeftArrow ml-7 md:ml-0 opacity-60 hover:opacity-100 transition-opacity duation-200"}
        // style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
}

export default function BizLogos() {
    var settings = {
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 3000,
        infinite: true,
        arrows: false,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        cssEase: "linear",
        // nextArrow: <UserRightArrow />,
        // prevArrow: <UserLeftArrow />,
        responsive: [
            {
                breakpoint: 640,
                    settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 1
                },
            },
            {
                breakpoint: 1024,
                    settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 1524,
                    settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ]
    };
    return (
        <section className="flex justify-between w-full py-16 md:py-24">
            <div className="max-w-6xl mx-auto">
                <Slider {...settings}>
                    <Image className="motion-safe:animate-pulse w-auto h-[28px]" src="/Marketing/imgs/logos/logo-legros.svg" width="134" height="28" alt="Business logo"/>
                    <Image className="motion-safe:animate-pulse w-auto h-[28px]" src="/Marketing/imgs/logos/logo-wolff.svg" width="134" height="28" alt="Business logo"/>
                    <Image className="motion-safe:animate-pulse w-auto h-[28px]" src="/Marketing/imgs/logos/logo-raynor.svg" width="134" height="28" alt="Business logo"/>
                    <Image className="motion-safe:animate-pulse w-auto h-[28px]" src="/Marketing/imgs/logos/logo-placeholder.svg" width="134" height="28" alt="Business logo"/>
                    <Image className="motion-safe:animate-pulse w-auto h-[28px]" src="/Marketing/imgs/logos/logo-donnely.svg" width="134" height="28" alt="Business logo"/>
                    <Image className="motion-safe:animate-pulse w-auto h-[28px]" src="/Marketing/imgs/logos/logo-legros.svg" width="134" height="28" alt="Business logo"/>
                    <Image className="motion-safe:animate-pulse w-auto h-[28px]" src="/Marketing/imgs/logos/logo-wolff.svg" width="134" height="28" alt="Business logo"/>
                    <Image className="motion-safe:animate-pulse w-auto h-[28px]" src="/Marketing/imgs/logos/logo-raynor.svg" width="134" height="28" alt="Business logo"/>
                    <Image className="motion-safe:animate-pulse w-auto h-[28px]" src="/Marketing/imgs/logos/logo-placeholder.svg" width="134" height="28" alt="Business logo"/>
                    <Image className="motion-safe:animate-pulse w-auto h-[28px]" src="/Marketing/imgs/logos/logo-donnely.svg" width="134" height="28" alt="Business logo"/>
                </Slider>
            </div>
        </section>
    )
}