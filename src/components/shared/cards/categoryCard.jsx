"use client";
import { useRouter } from "next/navigation";

export default function CardCategory({ id, image, title }) {
  const router = useRouter();
  return (
    <div
      className="group relative h-[240px] cursor-pointer overflow-hidden rounded-2xl sm:h-[280px] md:h-[320px] lg:h-[300px] xl:h-[380px]"
      onClick={() => {
        router.push(`products/${id}`);
      }}
      title={title}
    >
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-500 group-hover:from-[#0060B7]/80 group-hover:via-[#0060B7]/20 group-hover:to-transparent" />

      {/* Title */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <h3 className="truncate font-nunito text-sm font-semibold text-white drop-shadow-md sm:text-base md:text-lg">
          {title}
        </h3>
        <div className="mt-1.5 flex items-center gap-1 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <span className="font-nunito text-xs font-medium text-white/90 sm:text-sm">Explore</span>
          <svg
            className="h-3.5 w-3.5 translate-x-0 text-white/90 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
