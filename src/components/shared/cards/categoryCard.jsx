"use client";
import { useRouter } from "next/navigation";

export default function CardCategory({ id, image, title }) {
  const router = useRouter();
  return (
    <div
      className="group relative overflow-hidden rounded-lg bg-white shadow-md hover:cursor-pointer"
      onClick={() => {
        router.push(`products/${id}`);
      }}
    >
      <div className="h-[200px] overflow-hidden sm:h-[250px] md:h-[300px] lg:h-[250px] xl:h-[370px]">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 transform rounded-lg bg-white px-4 py-1.5 shadow-md sm:bottom-4 sm:px-6 sm:py-2 md:bottom-5 md:px-8">
        <h3 className="whitespace-nowrap text-center font-nunito text-sm font-medium text-[#090A0A] transition-all duration-300 group-hover:text-[#0060B7] sm:text-base md:text-lg">
          {title}
        </h3>
      </div>
    </div>
  );
}
