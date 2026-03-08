"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ButtonBlue from "../button";

export default function ProductCard({ product }) {
  const router = useRouter();
  const {
    image,
    title = "Super Shop Store Solution",
    price = 1045.3,
    colors = 4,
    hasDiscount = true,
    discountPrice,
  } = product || {};

  const discountPercent =
    hasDiscount && discountPrice && discountPrice > price
      ? Math.round(((discountPrice - price) / discountPrice) * 100)
      : 0;

  return (
    <div
      className="group cursor-pointer overflow-hidden rounded-xl border border-[#E2E8F0] bg-white transition-all duration-300 hover:border-[#0060B7]/20 hover:shadow-[0_8px_30px_rgba(0,96,183,0.08)]"
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

        {/* Discount badge */}
        {discountPercent > 0 && (
          <div className="absolute right-2.5 top-2.5 rounded-md bg-[#0060B7] px-2 py-0.5 font-nunito text-[10px] font-bold text-white sm:text-xs">
            -{discountPercent}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
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

        {/* Price & CTA */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="font-nunito text-base font-bold text-[#191D23] sm:text-lg lg:text-xl">
              ৳{price.toFixed(0)}
            </span>
            {hasDiscount && discountPrice && (
              <span className="font-nunito text-[11px] font-medium text-[#94A3B8] line-through sm:text-xs">
                ৳{discountPrice.toFixed(0)}
              </span>
            )}
          </div>
          <ButtonBlue
            title="Book Now"
            handler={`/product/${product.id}`}
            className="!rounded-lg !px-2.5 !py-1 !text-[11px] sm:!px-4 sm:!py-1.5 sm:!text-xs"
          />
        </div>
      </div>
    </div>
  );
}
