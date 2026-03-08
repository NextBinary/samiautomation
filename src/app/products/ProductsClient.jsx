"use client";
import ProductCard from "@/components/shared/cards/productCard";
import React, { useState, useEffect } from "react";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product?all=true`, {
        cache: "no-store",
      });
      const result = await response.json();

      if (result.data && result.data.length > 0) {
        const allProducts = result.data
          .filter((item) => item.isActive)
          .map((item) => ({
            id: item._id,
            image: `${process.env.NEXT_PUBLIC_SPACE_URL}${item.thumbnail}`,
            title: item.name,
            price: item.currentPrice,
            colors: 1,
            hasDiscount: item.originalPrice && item.originalPrice > 0,
            discountPrice:
              item.originalPrice && item.originalPrice > 0 ? item.originalPrice : undefined,
          }));

        setProducts(allProducts);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  if (loading) {
    return (
      <div className="my-12 sm:my-16 md:my-20">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex h-96 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-[#0060B7]"></div>
              <p className="mt-3 font-nunito text-sm text-[#64748B]">Loading products...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="my-12 sm:my-16 md:my-20">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex h-[50dvh] items-center justify-center">
            <div className="text-center">
              <h2 className="mb-3 font-nunito text-2xl font-bold text-[#202020] sm:text-3xl">
                No Products Found
              </h2>
              <p className="font-nunito text-[#64748B]">No products available at the moment.</p>
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
              Our Collection
            </span>
          </div>
          <h1 className="font-nunito text-2xl font-bold text-[#202020] sm:text-3xl md:text-4xl">
            All Products
            <span className="ml-3 font-nunito text-lg font-normal text-[#94A3B8]">
              ({products.length})
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
