"use client";
import ProductCard from "@/components/shared/cards/productCard";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function Products() {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProductsByCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/getByReference?refField=category&refValue=${params.id}`,
        {
          cache: "no-store",
        },
      );
      const result = await response.json();

      if (result.data && result.data.length > 0) {
        const categoryProducts = result.data
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

        setProducts(categoryProducts);
        if (categoryProducts.length > 0 && result.data[0].category) {
          setCategoryName(result.data[0].category.name);
        }
      }
    } catch (error) {
      console.error("Failed to fetch products by category:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchProductsByCategory();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="mt-10 px-2 lg:px-0">
        <div className="flex h-96 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-[#0060B7]"></div>
            <p className="mt-2 text-[#0060B7]">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="mt-10 px-2 lg:px-0">
        <div className="text-center">
          <h2 className="mb-4 font-nunito text-3xl font-light text-[#202020] md:text-4xl">
            No Products Found
          </h2>
          <p className="text-gray-600">No products available in this category.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 px-2 lg:px-0">
      <h2 className="mb-8 text-center font-nunito text-3xl font-light text-[#202020] md:text-4xl">
        {categoryName} Products
      </h2>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
