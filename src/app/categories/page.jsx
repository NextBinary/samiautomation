import CategoriesClient from "./CategoriesClient";

export const metadata = {
  title: "Product Categories",
  description:
    "Browse all product categories at SAMI Automation — server racks, network cabinets, electrical panels, cable management, and more industrial automation solutions.",
  openGraph: {
    title: "Product Categories | SAMI Automation",
    description:
      "Browse all product categories — server racks, network cabinets, electrical panels, and industrial automation solutions.",
  },
};

export default function CategoriesPage() {
  return <CategoriesClient />;
}
