"use client";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import Image from "next/image";

export default function Testimonials() {
  const swiperRef = useRef(null);
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
            image:
              item.image && item.image !== "null"
                ? `${process.env.NEXT_PUBLIC_SPACE_URL}${item.image}`
                : null,
            text: item.description || item.text,
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
    <div className="testi_background_Image container-fluid relative my-12 w-full overflow-hidden py-14 sm:my-16 sm:py-16 md:my-20 lg:my-24 lg:py-24">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Section header + nav arrows */}
        <div className="mb-8 flex items-end justify-between sm:mb-10 md:mb-12">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="h-[3px] w-8 rounded-full bg-[#0060B7]" />
              <span className="font-nunito text-xs font-semibold uppercase tracking-[0.2em] text-[#0060B7] sm:text-sm">
                Testimonials
              </span>
            </div>
            <h2 className="font-nunito text-2xl font-bold text-[#191D23] sm:text-3xl md:text-4xl">
              Customer Feedback
              <span className="block font-light text-[#555] sm:inline sm:pl-2">What They Say</span>
            </h2>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="group flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#E2E8F0] bg-white transition-all duration-300 hover:border-[#0060B7] hover:bg-[#0060B7] sm:h-11 sm:w-11"
              aria-label="Previous slide"
            >
              <svg
                className="h-4 w-4 text-[#475569] transition-colors duration-300 group-hover:text-white sm:h-5 sm:w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
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
              className="group flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#E2E8F0] bg-white transition-all duration-300 hover:border-[#0060B7] hover:bg-[#0060B7] sm:h-11 sm:w-11"
              aria-label="Next slide"
            >
              <svg
                className="h-4 w-4 text-[#475569] transition-colors duration-300 group-hover:text-white sm:h-5 sm:w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".testimonial-pagination",
            bulletClass: "testimonial-dot",
            bulletActiveClass: "testimonial-dot-active",
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          modules={[Autoplay, Pagination]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="testimonial-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="flex h-full flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5 transition-all duration-300 hover:border-[#0060B7]/20 hover:shadow-[0_8px_30px_rgba(0,96,183,0.08)] sm:p-6">
                {/* Quote icon */}
                <svg
                  className="mb-4 h-8 w-8 text-[#0060B7]/15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>

                {/* Testimonial text */}
                <p className="mb-5 flex-grow font-nunito text-sm leading-relaxed text-[#64748B] sm:text-[15px]">
                  {testimonial.text}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-[#F1F5F9] pt-4">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#0060B7]/10 ring-2 ring-[#0060B7]/10">
                    {testimonial.image ? (
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={44}
                        height={44}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="font-nunito text-sm font-bold text-[#0060B7]">
                        {testimonial.name?.charAt(0)?.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-nunito text-sm font-semibold text-[#191D23]">
                      {testimonial.name}
                    </h4>
                    <p className="font-nunito text-xs text-[#94A3B8]">Verified Customer</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination dots */}
        <div className="testimonial-pagination mt-8 flex items-center justify-center gap-1.5"></div>

        <style jsx global>{`
          .testimonial-dot {
            width: 8px;
            height: 8px;
            display: inline-block;
            border-radius: 9999px;
            background: #cbd5e1;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .testimonial-dot-active {
            background: #0060b7;
            width: 24px;
          }
        `}</style>
      </div>
    </div>
  );
}
