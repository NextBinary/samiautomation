import FeatureProduct from "@/components/shared/home/featureProduct";
import Hero from "@/components/shared/home/hero";
import NewArrivals from "@/components/shared/home/newArrivals";
import Testimonials from "@/components/shared/home/testimonials";
import TopCategories from "@/components/shared/home/topCategories";
import WhySamiAutomation from "@/components/shared/home/whySamiAutomation";
import JsonLd from "@/components/shared/JsonLd";

const Page = () => {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "SAMI Automation",
          url: process.env.NEXT_PUBLIC_SITE_URL || "https://samiautomationbd.com/",
          logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://samiautomationbd.com/"}og.jpg`,
          description:
            "Your trusted source for server racks, network cabinets, electrical panels, and industrial automation solutions in Bangladesh.",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Nawabpur Complex",
            addressLocality: "Dhaka",
            addressCountry: "BD",
          },
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
          },
        }}
      />
      <main className="overflow-hidden">
        <Hero />
        <TopCategories />
        <FeatureProduct />
        <NewArrivals />
        <WhySamiAutomation />
        <Testimonials />
      </main>
    </>
  );
};

export default Page;
