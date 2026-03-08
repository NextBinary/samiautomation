import ProductsClient from "./ProductsClient";

export const metadata = {
  title: "All Products",
  description:
    "Browse the complete range of SAMI Automation products — server racks, network cabinets, electrical panels, and industrial automation equipment at competitive prices.",
  openGraph: {
    title: "All Products | SAMI Automation",
    description:
      "Browse the complete range of server racks, network cabinets, and industrial automation products.",
  },
};

export default function ProductsPage() {
  return <ProductsClient />;
}
