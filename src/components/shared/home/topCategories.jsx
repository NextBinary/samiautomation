"use client";
import React, { useState, useEffect } from "react";
import CardCategory from "../cards/categoryCard";

export default function TopCategories() {
  const [categories, setCategories] = useState([]);

  const fetchCategoriesData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories?all=true`, {
        cache: "no-store",
      });
      const result = await response.json();

      if (result.data && result.data.length > 0) {
        const activeCategories = result.data
          .filter((item) => item.isActive && item.isFeatured)
          .map((item) => ({
            id: item._id,
            title: item.name,
            image: `${process.env.NEXT_PUBLIC_SPACE_URL}${item.image}`,
            slug: item.slug,
          }));

        setCategories(activeCategories);
      }
    } catch (error) {
      console.error("Failed to fetch categories data:", error);
    }
  };

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  if (categories.length === 0) {
    return null;
  }

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
