"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function WhySamiAutomation() {
  const [features, setFeatures] = useState([]);

  const fetchWhySamiAutomationData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/whysamiautomation`, {
        cache: "no-store",
      });
      const result = await response.json();

      if (result.data && result.data.length > 0) {
        const activeFeatures = result.data
          .filter((item) => item.isActive)
          .map((item) => ({
            icon: `${process.env.NEXT_PUBLIC_SPACE_URL}${item.image}`,
            title: item.title,
            description: item.description,
          }));

        setFeatures(activeFeatures);
      }
    } catch (error) {
      console.error("Failed to fetch whySamiAutomation data:", error);
    }
  };

  useEffect(() => {
    fetchWhySamiAutomationData();
  }, []);

  if (features.length === 0) {
    return null;
  }

  return (
    <section className="my-12 px-4 lg:my-24 lg:px-0">
      <h2 className="mb-6 text-center font-nunito text-2xl font-light text-[#202020] sm:mb-8 sm:text-3xl md:mb-10 md:text-left md:text-4xl">
        Why Sami Automation
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <div key={index} className="group flex flex-col items-center text-center">
            <div className="flex items-center justify-center rounded-full p-3">
              <Image
                src={feature.icon}
                alt={feature.title}
                width={40}
                height={40}
                className="size-16 object-contain transition duration-300 ease-in-out group-hover:scale-125"
              />
            </div>
            <h3 className="mb-2 font-nunito text-xl font-normal leading-7 text-[#141414]">
              {feature.title}
            </h3>
            <p className="font-nunito text-lg font-light leading-7 text-[#133240]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
