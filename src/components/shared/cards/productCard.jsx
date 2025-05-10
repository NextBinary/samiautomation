"use client";
import Image from "next/image";
import ButtonBlue from "../button";

export default function ProductCard({ product }) {
  const {
    image,
    title = "Super Shop Store Solution",
    price = 1045.3,
    colors = 4,
    hasDiscount = true,
    discountPrice,
  } = product || {};

  return (
    <div className="overflow-hidden rounded-lg border border-[#B4B4B4]">
      <div className="p-1 lg:p-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-md">
          <Image
            src={image}
            alt={title}
            fill
            className="rounded-md object-cover transition-transform duration-300 ease-in-out hover:scale-125 group-hover:scale-125"
          />
        </div>
        <p className="pt-2 font-nunito text-[10px] font-light text-[#64748B] md:text-xs">
          Color {colors} available
        </p>
        <h3 className="my-1 font-nunito text-base font-medium text-[#191D23] md:text-xl">
          {title.length > 20 ? `${title.slice(0, 20)}...` : title}
        </h3>
        <div className="my-1 flex items-center justify-between lg:my-3">
          <p>
            <span className="text-sm font-semibold text-[#191D23] md:text-base lg:text-xl">
              ৳{price.toFixed(1)}
            </span>
            {hasDiscount && discountPrice && (
              <span className="ml-1 text-xs font-light text-[#191D23] line-through md:ml-4 md:text-base">
                ৳{discountPrice.toFixed(1)}
              </span>
            )}
          </p>
          <ButtonBlue
            title={"Book Now"}
            handler={`/product/${product.id}`}
            className="w-20 whitespace-nowrap px-1 py-1 lg:w-28 lg:px-4 lg:py-2"
          />
        </div>
      </div>
    </div>
  );
}
