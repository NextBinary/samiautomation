"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ButtonBlue from "../button";
import { formatPrice } from "@/utils/formatPrice";

export default function ProductCard({ product }) {
  const router = useRouter();
  const { image, title = "Super Shop Store Solution", price = "", colors = 4 } = product || {};

  return (
    <div
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-[#E2E8F0] bg-white transition-all duration-300 hover:border-[#0060B7]/20 hover:shadow-[0_8px_30px_rgba(0,96,183,0.08)]"
      onClick={() => router.push(`/product/${product.id}`)}
    >
      {/* Image container */}
      <div className="relative overflow-hidden">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#F8FAFC]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {/* Colors */}
        {colors > 0 && (
          <p className="mb-1 font-nunito text-[10px] font-medium uppercase tracking-wider text-[#94A3B8] sm:text-[11px]">
            {colors} {colors === 1 ? "variant" : "variants"} available
          </p>
        )}

        {/* Title */}
        <h3
          className="mb-2 truncate font-nunito text-sm font-semibold text-[#191D23] sm:mb-3 sm:text-base"
          title={title}
        >
          {title}
        </h3>

        {/* Price & CTA — stacked, because a range like "৳9,999 – ৳12,500" cannot
            share a row with the button at card width without both wrapping. */}
        <div className="mt-auto">
          <div className="mb-2.5 whitespace-nowrap font-nunito text-base font-bold text-[#191D23] sm:text-lg">
            {formatPrice(price)}
          </div>
          <ButtonBlue
            title="Book Now"
            handler={`/product/${product.id}`}
            className="!w-full !whitespace-nowrap !rounded-lg !px-3 !py-1.5 !text-xs sm:!text-sm"
          />
        </div>
      </div>
    </div>
  );
}
