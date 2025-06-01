"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ButtonBlue from "../button";

export default function Hero() {
  const [carouselData, setCarouselData] = useState([]);
  const [fade, setFade] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchCarouselData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/carousel`, {
        cache: "no-store",
      });
      const result = await response.json();

      if (result.data && result.data.length > 0) {
        const activeCarousels = result.data
          .filter((item) => item.isActive)
          .map((item) => ({
            heading: item.heading,
            title1: item.title1,
            title2: item.title2,
            description: item.description,
            image: `${process.env.NEXT_PUBLIC_SPACE_URL}${item.image}`,
          }));

        setCarouselData(activeCarousels);
      }
    } catch (error) {
      console.error("Failed to fetch carousel data:", error);
    }
  };

  useEffect(() => {
    fetchCarouselData();
  }, []);

  useEffect(() => {
    if (carouselData.length === 0) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
        setFade(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, [carouselData.length]);

  if (carouselData.length === 0) {
    return null;
  }

  const currentCarousel = carouselData[currentIndex];

  return (
    <div className="bg-[rgb(213,232,255)] py-10 sm:h-[70dvh] sm:py-0">
      <div className="grid h-full w-full grid-cols-1 items-center justify-between gap-4 md:grid-cols-12">
        <div className="min-w-full pl-4 text-left md:col-span-6 md:pl-10">
          <div
            className="transition-all duration-1000 ease-in-out"
            style={{
              opacity: fade ? 1 : 0,
            }}
          >
            <p className="mb-2 text-center font-nunito text-base font-medium text-[#0060B7] md:text-left">
              {currentCarousel.heading}
            </p>
            <div className="mb-4 text-center font-nunito text-3xl font-normal sm:text-4xl md:text-left md:text-5xl">
              <span className="text-black">{currentCarousel.title1} </span>
              <br className="md:hidden" />
              <span className="font-nunito text-[#0060B7]">{currentCarousel.title2}</span>
            </div>
            <p className="mx-0 mb-5 max-w-lg text-center font-nunito text-base font-light text-gray-700 sm:text-lg md:text-left">
              {currentCarousel.description}
            </p>
            <div className="text-center md:text-left">
              <ButtonBlue title={"Shop Now"} />
            </div>
          </div>
        </div>
        {/* Right side - Animated Image */}
        <div className="flex items-center justify-center md:col-span-6">
          <div
            className="transition-all duration-1000 ease-in-out"
            style={{ opacity: fade ? 1 : 0 }}
          >
            <Image
              src={currentCarousel.image}
              alt="Hero"
              width={500}
              height={500}
              className="w-full max-w-[350px] object-contain sm:max-w-[450px] md:w-[130%]"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
