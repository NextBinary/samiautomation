import React from "react";
import CardCategory from "../cards/categoryCard";
// Sample category data
export const categories = [
  {
    id: 1,
    title: "Clothing Store",
    image:
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Pharmacy Store",
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Shoe Store",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Gadget Store",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

export default function TopCategories() {
  return (
    <div className="my-12 sm:my-16 md:my-20 lg:my-24">
      <div className="container mx-auto bg-[#F6F6F6] px-3 py-4 sm:px-4 sm:py-5 md:py-6">
        <div className="mb-3 flex items-center justify-center sm:mb-4 md:justify-start">
          <span className="mr-1.5 text-lg font-bold sm:mr-2 sm:text-xl">▶</span>
          <span className="font-nunito text-sm font-light uppercase text-[#222222] sm:text-base">
            EXPLORE
          </span>
        </div>

        <h2 className="mb-6 text-center font-nunito text-2xl font-light text-[#202020] sm:mb-8 sm:text-3xl md:mb-10 md:text-left md:text-4xl">
          Top Categories Store Solution
        </h2>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:gap-6">
          {categories.map((category) => (
            <CardCategory
              key={category.id}
              id={category.id}
              title={category.title}
              image={category.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
