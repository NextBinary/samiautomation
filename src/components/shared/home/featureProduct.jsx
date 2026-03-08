"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductCard from "../cards/productCard";

export default function FeatureProduct() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const fetchProductsData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product?all=true`, {
        cache: "no-store",
      });
      const result = await response.json();

      if (result.data && result.data.length > 0) {
        const featuredProducts = result.data
          .filter((item) => item.isActive && item.isFeatured)
          .slice(0, 8)
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
    <section className="my-12 sm:my-16 md:my-20 lg:my-24">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Section header */}
        <div className="mb-6 flex items-end justify-between sm:mb-8 md:mb-10">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="h-[3px] w-8 rounded-full bg-[#0060B7]" />
              <span className="font-nunito text-xs font-semibold uppercase tracking-[0.2em] text-[#0060B7] sm:text-sm">
                Best Sellers
              </span>
            </div>
            <h2 className="font-nunito text-2xl font-bold text-[#202020] sm:text-3xl md:text-4xl">
              Best Selling
              <span className="block font-light text-[#555] sm:inline sm:pl-2">Products</span>
            </h2>
          </div>

          {/* View All button */}
          <button
            onClick={() => router.push("/products")}
            className="group/btn flex items-center gap-1.5 rounded-full border-2 border-[#0060B7]/20 bg-white px-4 py-2 font-nunito text-xs font-semibold text-[#0060B7] transition-all duration-300 hover:border-[#0060B7] hover:bg-[#0060B7] hover:text-white sm:gap-2 sm:px-6 sm:py-2.5 sm:text-sm"
          >
            View All
            <svg
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 sm:h-4 sm:w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
