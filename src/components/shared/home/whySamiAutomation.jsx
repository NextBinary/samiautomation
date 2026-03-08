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
    return (
      <section className="my-12 sm:my-16 md:my-20 lg:my-24">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="mb-6 sm:mb-8 md:mb-10">
            <div className="h-3 w-20 animate-pulse rounded-full bg-[#E2E8F0]" />
            <div className="mt-3 h-8 w-48 animate-pulse rounded-lg bg-[#E2E8F0]" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex animate-pulse flex-col items-center rounded-2xl border border-[#E2E8F0] bg-white p-6 sm:p-8"
              >
                <div className="mb-4 h-16 w-16 rounded-full bg-[#F1F5F9] sm:h-20 sm:w-20" />
                <div className="mb-2 h-5 w-32 rounded bg-[#E2E8F0]" />
                <div className="h-4 w-full rounded bg-[#F1F5F9]" />
                <div className="mt-1.5 h-4 w-2/3 rounded bg-[#F1F5F9]" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="my-12 sm:my-16 md:my-20 lg:my-24">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Section header */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <div className="mb-2 flex items-center gap-2">
            <div className="h-[3px] w-8 rounded-full bg-[#0060B7]" />
            <span className="font-nunito text-xs font-semibold uppercase tracking-[0.2em] text-[#0060B7] sm:text-sm">
              Our Promise
            </span>
          </div>
          <h2 className="font-nunito text-2xl font-bold text-[#202020] sm:text-3xl md:text-4xl">
            Why Sami
            <span className="block font-light text-[#555] sm:inline sm:pl-2">Automation</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex flex-col items-center rounded-2xl border border-[#E2E8F0] bg-white p-6 text-center transition-all duration-300 hover:border-[#0060B7]/20 hover:shadow-[0_8px_30px_rgba(0,96,183,0.08)] sm:p-8"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0060B7]/5 transition-colors duration-300 group-hover:bg-[#0060B7]/10 sm:h-20 sm:w-20">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={48}
                  height={48}
                  className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110 sm:h-10 sm:w-10"
                />
              </div>
              <h3 className="mb-2 font-nunito text-lg font-semibold text-[#191D23] sm:text-xl">
                {feature.title}
              </h3>
              <p className="font-nunito text-sm font-normal leading-relaxed text-[#64748B] sm:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
