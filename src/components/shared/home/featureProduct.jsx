"use client";
import { useState, useEffect } from "react";
import ProductCard from "../cards/productCard";

export default function FeatureProduct() {
  const [products, setProducts] = useState([]);

  const fetchProductsData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
        cache: "no-store",
      });
      const result = await response.json();

      if (result.data && result.data.length > 0) {
        const featuredProducts = result.data
          .filter((item) => item.isActive && item.isFeatured)
          .map((item) => ({
            id: item._id,
            image: `${process.env.NEXT_PUBLIC_SPACE_URL}${item.thumbnail}`,
            title: item.name,
            price: item.currentPrice,
            colors: 1, // Default value since not provided in API
            hasDiscount: item.originalPrice && item.originalPrice > 0,
            discountPrice:
              item.originalPrice && item.originalPrice > 0 ? item.originalPrice : undefined,
          }));

        setProducts(featuredProducts);
      }
    } catch (error) {
      console.error("Failed to fetch products data:", error);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="">
      <h2 className="mb-6 text-center font-nunito text-2xl font-light text-[#202020] sm:mb-8 sm:text-3xl md:mb-10 md:text-left md:text-4xl">
        Best Selling Products
      </h2>

      <div className="grid grid-cols-2 gap-2 px-2 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
