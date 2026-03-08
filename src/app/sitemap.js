export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://samiautomationbd.com/";
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const staticPages = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteUrl}about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${siteUrl}contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  let productPages = [];
  try {
    const res = await fetch(`${apiUrl}/product?all=true`, { next: { revalidate: 3600 } });
    const result = await res.json();
    if (result.data) {
      productPages = result.data
        .filter((item) => item.isActive)
        .map((item) => ({
          url: `${siteUrl}product/${item._id}`,
          lastModified: new Date(item.updatedAt || item.createdAt || Date.now()),
          changeFrequency: "weekly",
          priority: 0.9,
        }));
    }
  } catch {
    // Fail silently — sitemap will still include static pages
  }

  let categoryPages = [];
  try {
    const res = await fetch(`${apiUrl}/categories`, { next: { revalidate: 3600 } });
    const result = await res.json();
    if (result.data) {
      categoryPages = result.data.map((item) => ({
        url: `${siteUrl}products/${item._id}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      }));
    }
  } catch {
    // Fail silently
  }

  return [...staticPages, ...productPages, ...categoryPages];
}
