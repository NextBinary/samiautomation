import CardCategory from "@/components/shared/cards/categoryCard";
import { categories } from "@/components/shared/home/topCategories";
import React from "react";

export default function Categories() {
  return (
    <div className="bg-[#F6F6F6] px-4 py-10">
      <h2 className="mb-8 font-nunito text-3xl font-light text-[#202020] md:text-4xl">
        All Categories store Section
      </h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {categories.map((category) => (
          <CardCategory
            key={category.id}
            title={category.title}
            image={category.image}
            id={category.id}
          />
        ))}
      </div>
      <div className="my-6 grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {categories.map((category) => (
          <CardCategory key={category.id} title={category.title} image={category.image} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {categories.map((category) => (
          <CardCategory key={category.id} title={category.title} image={category.image} />
        ))}
      </div>
    </div>
  );
}
