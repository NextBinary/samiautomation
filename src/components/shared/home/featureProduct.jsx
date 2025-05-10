import ProductCard from "../cards/productCard";
// Sample product data with Unsplash images in consistent format
export const products = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Super Shop Store Solution",
    price: 1045.3,
    colors: 4,
    hasDiscount: true,
    discountPrice: 899.9,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Modern POS System",
    price: 1245.5,
    colors: 3,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1581092787765-e3feb951d987?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Inventory Management System",
    price: 899.9,
    colors: 2,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1563770660941-20978e870e26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Smart Checkout System",
    price: 1145.0,
    colors: 5,
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Digital Display Solution",
    price: 795.8,
    colors: 4,
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Customer Analytics Tool",
    price: 1299.0,
    colors: 1,
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Self-Service Kiosk",
    price: 2045.3,
    colors: 3,
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Retail Management System",
    price: 1845.0,
    colors: 2,
  },
];

export default function FeatureProduct() {
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
