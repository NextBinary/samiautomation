import ProductCard from "@/components/shared/cards/productCard";
import { products } from "@/components/shared/home/featureProduct";
import React from "react";

export default function Products() {
  return (
    <div className="mt-10 px-2 lg:px-0">
      <h2 className="mb-8 text-center font-nunito text-3xl font-light text-[#202020] md:text-4xl">
        Clothing store Display solution
      </h2>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
