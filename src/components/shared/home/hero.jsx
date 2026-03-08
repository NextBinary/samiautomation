"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Hero() {
  const [carouselData, setCarouselData] = useState([]);
  const [fade, setFade] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

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
    return (
      <div className="bg-gradient-to-br from-[#EBF3FC] via-[#D5E8FF] to-[#BDDBFA]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center gap-6 py-8 sm:py-10 md:flex-row md:gap-8 md:py-14 lg:py-16">
            <div className="flex-1 space-y-4">
              <div className="h-3 w-20 animate-pulse rounded-full bg-[#0060B7]/10" />
              <div className="bg-[#0060B7]/8 h-10 w-3/4 animate-pulse rounded-lg" />
              <div className="bg-[#0060B7]/8 h-10 w-1/2 animate-pulse rounded-lg" />
              <div className="h-4 w-full animate-pulse rounded bg-[#0060B7]/5" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-[#0060B7]/5" />
              <div className="flex gap-3 pt-2">
                <div className="h-11 w-32 animate-pulse rounded-lg bg-[#0060B7]/10" />
                <div className="h-11 w-28 animate-pulse rounded-lg bg-[#0060B7]/5" />
              </div>
            </div>
            <div className="hidden h-[350px] flex-1 animate-pulse rounded-2xl bg-[#0060B7]/5 md:block lg:h-[400px]" />
          </div>
        </div>
      </div>
    );
  }

  const currentCarousel = carouselData[currentIndex];

  const goToSlide = (index) => {
    if (index === currentIndex) return;
    setFade(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setFade(true);
    }, 300);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#EBF3FC] via-[#D5E8FF] to-[#BDDBFA]">
      {/* Decorative elements */}
      <div className="absolute -right-32 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#0060B7]/[0.03] blur-3xl" />
      <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-[#0060B7]/[0.04] blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-[#0060B7]/[0.06] blur-2xl" />

      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-6 py-8 sm:py-10 md:flex-row md:gap-8 md:py-14 lg:py-16">
          {/* Left - Text */}
          <div className="relative z-10 flex-1">
            <div
              className="duration-600 transition-all ease-out"
              style={{
                opacity: fade ? 1 : 0,
                transform: fade ? "translateY(0)" : "translateY(12px)",
              }}
            >
              <div className="mb-3 flex items-center justify-center gap-2 md:justify-start">
                <div className="h-[3px] w-6 rounded-full bg-[#0060B7] sm:w-8" />
                <span className="font-nunito text-[11px] font-bold uppercase tracking-[0.2em] text-[#0060B7] sm:text-xs">
                  {currentCarousel.heading}
                </span>
              </div>

              <h1 className="mb-3 text-center font-nunito text-[28px] font-extrabold leading-tight text-[#1A2B3C] sm:mb-4 sm:text-4xl md:text-left lg:text-5xl xl:text-[56px]">
                {currentCarousel.title1}
                <br />
                <span className="bg-gradient-to-r from-[#0060B7] to-[#0088FF] bg-clip-text text-transparent">
                  {currentCarousel.title2}
                </span>
              </h1>

              <p className="mx-auto mb-6 max-w-md text-center font-nunito text-sm leading-relaxed text-[#5A6B7B] sm:mb-8 sm:text-base md:mx-0 md:text-left lg:text-lg">
                {currentCarousel.description}
              </p>

              <div className="flex items-center justify-center gap-4 md:justify-start">
                <button
                  onClick={() => router.push("/categories")}
                  className="group relative overflow-hidden rounded-lg bg-[#0060B7] px-6 py-2.5 font-nunito text-sm font-semibold text-white shadow-lg shadow-[#0060B7]/25 transition-all duration-300 hover:bg-[#004d93] hover:shadow-xl hover:shadow-[#0060B7]/30 sm:px-8 sm:py-3 sm:text-base"
                >
                  Shop Now
                  <svg
                    className="ml-2 inline-block h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => router.push("/contact")}
                  className="rounded-lg border-2 border-[#0060B7]/20 bg-white/60 px-5 py-2 font-nunito text-sm font-semibold text-[#0060B7] backdrop-blur-sm transition-all duration-300 hover:border-[#0060B7]/40 hover:bg-white sm:px-7 sm:py-2.5 sm:text-base"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative z-10 flex flex-1 items-center justify-center">
            <div
              className="duration-600 h-[250px] w-full transition-all ease-out sm:h-[300px] md:h-[350px] lg:h-[400px]"
              style={{
                opacity: fade ? 1 : 0,
                transform: fade ? "scale(1) translateY(0)" : "scale(0.97) translateY(8px)",
              }}
            >
              <Image
                src={currentCarousel.image}
                alt={currentCarousel.title1 || "Hero"}
                width={650}
                height={650}
                className="h-full w-full object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>

        {/* Carousel dots */}
        {carouselData.length > 1 && (
          <div className="relative z-10 flex items-center justify-center gap-2 pb-4 sm:pb-6">
            {carouselData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-[#0060B7]"
                    : "w-2 bg-[#0060B7]/25 hover:bg-[#0060B7]/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
