"use client";
import CardCategory from "@/components/shared/cards/categoryCard";
import React, { useState, useEffect } from "react";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  if (loading) {
    return (
      <div className="my-12 sm:my-16 md:my-20">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex h-96 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#E2E8F0] border-t-[#0060B7]" />
              <p className="mt-3 font-nunito text-sm text-[#64748B]">Loading categories...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="my-12 sm:my-16 md:my-20">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex h-[50dvh] items-center justify-center">
            <div className="text-center">
              <h2 className="mb-3 font-nunito text-2xl font-bold text-[#202020] sm:text-3xl">
                No Categories Found
              </h2>
              <p className="font-nunito text-[#64748B]">No categories available at the moment.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-12 sm:my-16 md:my-20">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Section header */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <div className="mb-2 flex items-center gap-2">
            <div className="h-[3px] w-8 rounded-full bg-[#0060B7]" />
            <span className="font-nunito text-xs font-semibold uppercase tracking-[0.2em] text-[#0060B7] sm:text-sm">
              Browse
            </span>
          </div>
          <h1 className="font-nunito text-2xl font-bold text-[#202020] sm:text-3xl md:text-4xl">
            All Categories
            <span className="ml-3 font-nunito text-lg font-normal text-[#94A3B8]">
              ({categories.length})
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
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
    </div>
  );
}
