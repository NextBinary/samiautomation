import ProductsByCategoryClient from "./ProductsByCategoryClient";
import JsonLd from "@/components/shared/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://samiautomationbd.com/";

async function getCategoryData(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/getByReference?refField=category&refValue=${id}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    const result = await res.json();
    return result.data || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const data = await getCategoryData(id);
  const categoryName = data?.[0]?.category?.name;

  if (!categoryName) {
    return { title: "Category Products" };
  }

  return {
    title: `${categoryName}`,
    description: `Browse ${categoryName} products from SAMI Automation — server racks, network cabinets, electrical panels, and industrial automation solutions in Bangladesh.`,
    openGraph: {
      title: `${categoryName} | SAMI Automation`,
      description: `Explore our range of ${categoryName} products at SAMI Automation.`,
    },
  };
}

export default async function ProductsByCategoryPage({ params }) {
  const { id } = await params;
  const data = await getCategoryData(id);
  const categoryName = data?.[0]?.category?.name;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Categories", item: `${siteUrl}categories` },
      ...(categoryName ? [{ "@type": "ListItem", position: 3, name: categoryName }] : []),
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <ProductsByCategoryClient />
    </>
  );
}
