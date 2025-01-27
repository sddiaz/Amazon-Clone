"use client";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NewDealsAd from "../../../../../public/new-deals-ad.jpg";
import RyzeAd from "../../../../../public/ryze-ad.jpg";
import RankedAd from "../../../../../public/ranked-ad.jpg"; 

import Image from "next/image";

export default function AmazonCarousel() {

  //#region Variables

  const images = [RankedAd, NewDealsAd, RyzeAd];

  //#endregion

  return (
    <div className="relative">
      <Carousel
        autoPlay
        infiniteLoop
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        {images.map((image) => {
          return (
            <div key={image.blurDataURL}>
              <Image
                src={image}
                alt={image.src}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-40% to-[var(--amazonGrey)]" />
            </div>
          );
        })}
      </Carousel>
    </div>
  );

  //#endregion
}
