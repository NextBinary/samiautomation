"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function NewArrivals() {
  const [products, setProducts] = useState([]);

  const fetchArrivalsData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/arrivals`, {
        cache: "no-store",
      });
      const result = await response.json();

      if (result.data && result.data.length > 0) {
        const activeArrivals = result.data
          .filter((item) => item.isActive)
          .map((item) => ({
            id: item._id,
            serial: item.serial,
            image: `${process.env.NEXT_PUBLIC_SPACE_URL}${item.image}`,
          }))
          .sort((a, b) => a.serial - b.serial);

        setProducts(activeArrivals);
      }
    } catch (error) {
      console.error("Failed to fetch arrivals data:", error);
    }
  };

  useEffect(() => {
    fetchArrivalsData();
  }, []);

  if (products.length === 0) {
    return null;
  }

  const getImage = (serial) => products.find((p) => p.serial === serial)?.image;

  return (
    <section className="my-12 sm:my-16 md:my-20 lg:my-24">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Section header */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <div className="mb-2 flex items-center gap-2">
            <div className="h-[3px] w-8 rounded-full bg-[#0060B7]" />
            <span className="font-nunito text-xs font-semibold uppercase tracking-[0.2em] text-[#0060B7] sm:text-sm">
              Just In
            </span>
          </div>
          <h2 className="font-nunito text-2xl font-bold text-[#202020] sm:text-3xl md:text-4xl">
            New Arrivals
            <span className="block font-light text-[#555] sm:inline sm:pl-2">Collection</span>
          </h2>
        </div>

        <div className="grid grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {/* First item (large) */}
          {getImage(1) && (
            <div className="group col-span-2 row-span-2 cursor-pointer overflow-hidden rounded-2xl">
              <div className="relative h-full">
                <Image
                  src={getImage(1)}
                  alt="Product 1"
                  className="h-full w-full object-fill transition-transform duration-500 ease-out group-hover:scale-110"
                  width={500}
                  height={500}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                  <span className="font-nunito text-sm font-semibold text-white drop-shadow-md">
                    View Product
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Second item (top right - full width) */}
          {getImage(2) && (
            <div className="group col-span-2 cursor-pointer overflow-hidden rounded-2xl">
              <div className="relative h-full">
                <Image
                  src={getImage(2)}
                  alt="Product 2"
                  className="h-full w-full object-fill transition-transform duration-500 ease-out group-hover:scale-110"
                  width={500}
                  height={250}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                  <span className="font-nunito text-sm font-semibold text-white drop-shadow-md">
                    View Product
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Third item (bottom right - half width) */}
          {getImage(3) && (
            <div className="group col-span-1 cursor-pointer overflow-hidden rounded-2xl">
              <div className="relative h-full">
                <Image
                  src={getImage(3)}
                  alt="Product 3"
                  className="h-full w-full object-fill transition-transform duration-500 ease-out group-hover:scale-110"
                  width={250}
                  height={250}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                  <span className="font-nunito text-sm font-semibold text-white drop-shadow-md">
                    View Product
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Fourth item (bottom right - half width) */}
          {getImage(4) && (
            <div className="group col-span-1 cursor-pointer overflow-hidden rounded-2xl">
              <div className="relative h-full">
                <Image
                  src={getImage(4)}
                  alt="Product 4"
                  className="h-full w-full object-fill transition-transform duration-500 ease-out group-hover:scale-110"
                  width={250}
                  height={250}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
                  <span className="font-nunito text-sm font-semibold text-white drop-shadow-md">
                    View Product
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
