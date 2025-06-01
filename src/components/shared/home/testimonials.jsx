"use client";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import required modules
import { Autoplay, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import Image from "next/image";

export default function Testimonials() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);

  const fetchTestimonialsData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`, {
        cache: "no-store",
      });
      const result = await response.json();

      if (result.data && result.data.length > 0) {
        const activeTestimonials = result.data
          .filter((item) => item.isActive)
          .map((item) => ({
            id: item._id,
            name: item.name,
            image: `${process.env.NEXT_PUBLIC_SPACE_URL}${item.image}`,
            text: item.text || item.description,
          }));

        setTestimonials(activeTestimonials);
      }
    } catch (error) {
      console.error("Failed to fetch testimonials data:", error);
    }
  };

  useEffect(() => {
    fetchTestimonialsData();
  }, []);

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div className="testi_background_Image container-fluid relative my-20 w-full overflow-hidden py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 block items-center justify-between lg:flex">
            <div className="mb-10">
              <h2 className="mb-2 font-nunito text-3xl font-normal text-[#133240] md:text-5xl">
                Our Customer Feedback
              </h2>
              <p className="font-nunito text-lg font-normal text-[#133240]">
                Don't take our word for it. Trust our customers
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-100"
                aria-label="Previous slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
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
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-100"
                aria-label="Next slide"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="relative">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                el: ".swiper-pagination",
                bulletClass: "swiper-pagination-bullet custom-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active custom-bullet-active",
              }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              modules={[Autoplay, Pagination]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className="testimonial-swiper"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="flex h-full flex-col rounded-lg bg-white p-6 shadow-md">
                    <div className="mb-4">
                      <div className="h-16 w-16 overflow-hidden rounded-full">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="text-[#133240]font-bold mb-2 font-nunito text-xl">
                      {testimonial.name}
                    </h3>
                    <p className="flex-grow font-nunito text-[#133240]">{testimonial.text}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom pagination */}
            <div className="swiper-pagination mt-8 flex items-center justify-center space-x-2"></div>

            <style jsx global>{`
              .swiper-pagination {
                position: relative;
                bottom: 0;
                margin-top: 30px;
              }
              .custom-bullet {
                width: 12px;
                height: 12px;
                display: inline-block;
                border-radius: 50%;
                background: gray;
                margin: 0 4px;
                cursor: pointer;
                transition: all 0.3s ease;
              }
              .custom-bullet-active {
                background: #0060b7;
                width: 14px;
                height: 14px;
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  );
}
