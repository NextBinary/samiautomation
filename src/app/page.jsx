import FeatureProduct from "@/components/shared/home/featureProduct";
import Hero from "@/components/shared/home/hero";
import NewArrivals from "@/components/shared/home/newArrivals";
import Testimonials from "@/components/shared/home/testimonials";
import TopCategories from "@/components/shared/home/topCategories";
import WhySamiAutomation from "@/components/shared/home/whySamiAutomation";

const Page = () => {
  return (
    <div>
      <Hero />
      <TopCategories />
      <FeatureProduct />
      <NewArrivals />
      <WhySamiAutomation />
      <Testimonials />
    </div>
  );
};

export default Page;
