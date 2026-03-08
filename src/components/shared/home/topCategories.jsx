"use client";
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import CardCategory from "../cards/categoryCard";

export default function TopCategories() {
  const [categories, setCategories] = useState([]);
  const swiperRef = useRef(null);

  const fetchCategoriesData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories?all=true`, {
        cache: "no-store",
      });
      const result = await response.json();

      if (result.data && result.data.length > 0) {
        const activeCategories = result.data
          .filter((item) => item.isActive)
          .map((item) => ({
            id: item._id,
            title: item.name,
            image: `${process.env.NEXT_PUBLIC_SPACE_URL}${item.image}`,
            slug: item.slug,
          }));

        setCategories(activeCategories);
      }
    } catch (error) {
      console.error("Failed to fetch categories data:", error);
    }
  };

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="my-12 sm:my-16 md:my-20 lg:my-24">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Section header */}
        <div className="mb-6 flex items-end justify-between sm:mb-8 md:mb-10">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="h-[3px] w-8 rounded-full bg-[#0060B7]" />
              <span className="font-nunito text-xs font-semibold uppercase tracking-[0.2em] text-[#0060B7] sm:text-sm">
                Explore
              </span>
            </div>
            <h2 className="font-nunito text-2xl font-bold text-[#202020] sm:text-3xl md:text-4xl">
              Top Categories
              <span className="block font-light text-[#555] sm:inline sm:pl-2">Store Solution</span>
            </h2>
          </div>

          {/* Navigation arrows */}
          <div className="flex gap-2">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="group/btn flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0060B7]/20 bg-white transition-all duration-300 hover:border-[#0060B7] hover:bg-[#0060B7] sm:h-12 sm:w-12"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4 text-[#0060B7] transition-colors duration-300 group-hover/btn:text-white sm:h-5 sm:w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="group/btn flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#0060B7]/20 bg-white transition-all duration-300 hover:border-[#0060B7] hover:bg-[#0060B7] sm:h-12 sm:w-12"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4 text-[#0060B7] transition-colors duration-300 group-hover/btn:text-white sm:h-5 sm:w-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Slider */}
        <Swiper
          spaceBetween={12}
          slidesPerView={1.3}
          loop={categories.length > 4}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 14 },
            768: { slidesPerView: 3, spaceBetween: 18 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
          modules={[Autoplay, Navigation]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="categories-swiper"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <CardCategory id={category.id} title={category.title} image={category.image} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
