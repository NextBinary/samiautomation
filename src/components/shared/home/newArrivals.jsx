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

  return (
    <section className="mt-12 px-2 lg:mt-24 lg:px-0">
      <h2 className="mb-6 text-center font-nunito text-2xl font-light text-[#202020] sm:mb-8 sm:text-3xl md:mb-10 md:text-left md:text-4xl">
        New Arrivals
      </h2>

      <div className="grid grid-cols-4 gap-2 lg:gap-6">
        {/* First item (large) */}
        <div className="col-span-2 row-span-2 overflow-hidden rounded-lg border shadow-md transition-shadow hover:shadow-lg">
          <div className="h-full">
            <Image
              src={products.find((p) => p.serial === 1)?.image}
              alt={`Product 1`}
              className="h-full w-full object-cover"
              width={500}
              height={500}
            />
          </div>
        </div>

        {/* Second item (top right - full width) */}
        <div className="col-span-2 overflow-hidden rounded-lg border shadow-md transition-shadow hover:shadow-lg">
          <div className="h-full">
            <Image
              src={products.find((p) => p.serial === 2)?.image}
              alt={`Product 2`}
              className="h-full w-full object-cover"
              width={500}
              height={250}
            />
          </div>
        </div>

        {/* Third item (bottom right - half width) */}
        <div className="col-span-1 overflow-hidden rounded-lg border shadow-md transition-shadow hover:shadow-lg">
          <div className="h-full">
            <Image
              src={products.find((p) => p.serial === 3)?.image}
              alt={`Product 3`}
              className="h-full w-full object-cover"
              width={250}
              height={250}
            />
          </div>
        </div>

        {/* Fourth item (bottom right - half width) */}
        <div className="col-span-1 overflow-hidden rounded-lg border shadow-md transition-shadow hover:shadow-lg">
          <div className="h-full">
            <Image
              src={products.find((p) => p.serial === 4)?.image}
              alt={`Product 4`}
              className="h-full w-full object-cover"
              width={250}
              height={250}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
