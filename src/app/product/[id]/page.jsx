import ProductClient from "./ProductClient";
import JsonLd from "@/components/shared/JsonLd";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://samiautomationbd.com/";
const spaceUrl = process.env.NEXT_PUBLIC_SPACE_URL;

async function getProduct(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/getSingleItem/${id}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const result = await res.json();
    return result.data || null;
  } catch {
    return null;
  }
}

function stripHtml(html) {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const imageUrl = product.thumbnail ? `${spaceUrl}${product.thumbnail}` : `${siteUrl}og.jpg`;

  const plainDescription =
    stripHtml(product.description).slice(0, 160) ||
    `Buy ${product.name} from SAMI Automation. Industrial automation products in Bangladesh.`;

  return {
    title: product.name,
    description: plainDescription,
    openGraph: {
      title: `${product.name} | SAMI Automation`,
      description: plainDescription,
      images: [{ url: imageUrl, alt: product.name }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: plainDescription,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  const productJsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: stripHtml(product.description).slice(0, 500),
        image: product.thumbnail ? `${spaceUrl}${product.thumbnail}` : undefined,
        offers: {
          "@type": "Offer",
          price: product.currentPrice,
          priceCurrency: "BDT",
          availability: "https://schema.org/InStock",
        },
      }
    : null;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Products", item: `${siteUrl}products` },
      ...(product ? [{ "@type": "ListItem", position: 3, name: product.name }] : []),
    ],
  };

  return (
    <>
      {productJsonLd && <JsonLd data={productJsonLd} />}
      <JsonLd data={breadcrumbJsonLd} />
      <ProductClient />
    </>
  );
}
