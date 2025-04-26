"use client";
import React, { useState, useEffect } from "react";
import hero from "@/assets/images/hero.png";
import hero2 from "@/assets/images/hero2.png";
import Image from "next/image";

export default function Hero() {
  const heroTexts = [
    {
      topHeading: "NEW ARRIVALS",
      titlePart1: "BEST SLOTTED",
      titlePart2: "ANGLE RACK",
      description: "Sturdy, Customizable & Cost-Effective Solutions for Every Space.",
    },
    {
      topHeading: "FEATURED PRODUCTS",
      titlePart1: "HEAVY DUTY",
      titlePart2: "PALLET RACK",
      description: "Best Slotted Angle Racks in the market.",
    },
    {
      topHeading: "TOP SELLING",
      titlePart1: "STORAGE",
      titlePart2: "SOLUTIONS",
      description: "Our team is here to help you succeed.",
    },
    {
      topHeading: "SPECIAL OFFER",
      titlePart1: "QUALITY",
      titlePart2: "SHELVING",
      description: "Excellence in every interaction.",
    },
  ];

  const heroImages = [hero, hero2, hero, hero2];

  const [fade, setFade] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade out
      setFade(false);

      // Wait for fade out, then change content and fade in
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % heroTexts.length);
        setFade(true);
      }, 500); // Half of transition time
    }, 4000); // Total time for each slide

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#F6F6F6] py-10 sm:h-[70dvh] sm:py-0">
      <div className="grid h-full w-full grid-cols-1 items-center justify-between gap-4 md:grid-cols-12">
        {/* Left side - Animated Text */}
        <div className="min-w-full pl-4 text-left md:col-span-6 md:pl-10">
          <div
            className="transition-all duration-1000 ease-in-out"
            style={{
              opacity: fade ? 1 : 0,
            }}
          >
            <p className="mb-2 text-left text-base font-medium text-[#0060B7]">
              {heroTexts[currentIndex].topHeading}
            </p>
            <div className="mb-4 text-left text-3xl font-normal sm:text-4xl md:text-5xl">
              <span className="text-black">{heroTexts[currentIndex].titlePart1} </span>
              <br className="md:hidden" />
              <span className="text-[#0060B7]">{heroTexts[currentIndex].titlePart2}</span>
            </div>
            <p className="mx-0 max-w-lg text-left text-base font-light text-gray-700 sm:text-lg">
              {heroTexts[currentIndex].description}
            </p>
            <button className="mt-6 border border-[#0060B7] bg-white px-8 py-2 text-sm font-medium text-[#0060B7] transition duration-300 hover:bg-[#0060B7] hover:text-white">
              SHOP NOW
            </button>
          </div>
        </div>

        {/* Right side - Animated Image */}
        <div className="flex items-center justify-center md:col-span-6">
          <div
            className="transition-all duration-1000 ease-in-out"
            style={{ opacity: fade ? 1 : 0 }}
          >
            <Image
              src={heroImages[currentIndex]}
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
