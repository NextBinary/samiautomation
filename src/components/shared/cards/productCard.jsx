import Image from "next/image";
import { Heart } from "lucide-react";
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
      <div className="p-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-md">
          <Image
            src={image}
            alt={title}
            fill
            className="rounded-md object-cover transition-transform duration-300 ease-in-out hover:scale-125 group-hover:scale-125"
          />
        </div>
        <p className="pt-2 font-nunito text-xs font-light text-[#64748B]">
          Color {colors} available
        </p>
        <h3 className="my-1 font-nunito text-xl font-medium text-[#191D23]">
          {title.length > 25 ? `${title.slice(0, 25)} ...` : title}
        </h3>
        <div className="my-3 flex items-center justify-between">
          <p>
            <span className="text-xl font-semibold text-[#191D23]">৳{price.toFixed(1)}</span>
            {hasDiscount && discountPrice && (
              <span className="ml-4 text-base font-light text-[#191D23] line-through">
                ${discountPrice.toFixed(1)}
              </span>
            )}
          </p>

          <ButtonBlue title={"Book Now"} className="w-24 whitespace-nowrap px-2" />
        </div>
      </div>
    </div>
  );
}
