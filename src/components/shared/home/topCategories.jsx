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
    <div className="my-24">
      <div className="container mx-auto bg-[#F6F6F6] px-4 py-6">
        <div className="mb-4 flex items-center">
          <span className="mr-2 text-xl font-bold">▶</span>
          <span className="font-nunito font-light uppercase text-[#222222]">EXPLORE</span>
        </div>

        <h2 className="mb-10 font-nunito text-3xl font-light text-[#202020] md:text-4xl">
          Top Categories Store Solution
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CardCategory key={category.id} title={category.title} image={category.image} />
          ))}
        </div>
      </div>
    </div>
  );
}
