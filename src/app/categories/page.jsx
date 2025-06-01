"use client";
import CardCategory from "@/components/shared/cards/categoryCard";
import React, { useState, useEffect } from "react";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  const fetchCategoriesData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        cache: "no-store",
      });
      const result = await response.json();

      if (result.data && result.data.length > 0) {
        const allCategories = result.data.map((item) => ({
          id: item._id,
          title: item.name,
          image: `${process.env.NEXT_PUBLIC_SPACE_URL}${item.image}`,
          slug: item.slug,
        }));

        setCategories(allCategories);
      }
    } catch (error) {
      console.error("Failed to fetch categories data:", error);
    }
  };

  useEffect(() => {
    fetchCategoriesData();
  }, []);

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
    </div>
  );
}
