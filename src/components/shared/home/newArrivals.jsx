import img1 from "@/assets/images/grid-item-1.png";
import img2 from "@/assets/images/grid-item-2.png";
import img3 from "@/assets/images/grid-item-3.png";
import img4 from "@/assets/images/grid-item-4.png";
import Image from "next/image";

export default function NewArrivals() {
  // Products array with serial numbers for sorting
  const products = [
    {
      id: 1,
      serial: 1,
      image: img1,
    },
    {
      id: 2,
      serial: 2,
      image: img2,
    },
    {
      id: 3,
      serial: 3,
      image: img3,
    },
    {
      id: 4,
      serial: 4,
      image: img4,
    },
  ];

  return (
    <section className="mt-24">
      <h2 className="mb-8 font-nunito text-3xl font-light text-[#202020] md:text-4xl">
        New Arrivals
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* First item (large) */}
        <div className="overflow-hidden rounded-lg border shadow-md transition-shadow hover:shadow-lg md:col-span-2 md:row-span-2">
          <div className="h-full">
            <Image src={img1} alt={`Product 1`} className="h-full w-full object-cover" />
          </div>
        </div>

        {/* Second item (top right - full width) */}
        <div className="overflow-hidden rounded-lg border shadow-md transition-shadow hover:shadow-lg md:col-span-2">
          <div className="h-full">
            <Image
              src={products.find((p) => p.serial === 2)?.image}
              alt={`Product 2`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Third item (bottom right - half width) */}
        <div className="overflow-hidden rounded-lg border shadow-md transition-shadow hover:shadow-lg md:col-span-1">
          <div className="h-full">
            <Image
              src={products.find((p) => p.serial === 3)?.image}
              alt={`Product 3`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Fourth item (bottom right - half width) */}
        <div className="overflow-hidden rounded-lg border shadow-md transition-shadow hover:shadow-lg md:col-span-1">
          <div className="h-full">
            <Image
              src={products.find((p) => p.serial === 4)?.image}
              alt={`Product 4`}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
