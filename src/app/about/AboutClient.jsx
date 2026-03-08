"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ButtonBlue from "@/components/shared/button";
import heroImage from "@/assets/images/hero2.png";

export default function About() {
  const [aboutData, setAboutData] = useState({
    heroTitle: "About SAMI Automation",
    heroSubtitle: "Leading the Future of Industrial Automation",
    heroDescription:
      "We are dedicated to providing cutting-edge automation solutions that transform industries and drive innovation forward.",

    companyInfo: {
      founded: "2020",
      employees: "50+",
      projects: "200+",
      countries: "3+",
    },

    mission:
      "To revolutionize industrial processes through innovative automation technologies, making businesses more efficient, productive, and sustainable.",

    vision:
      "To be the leading automation solutions provider in the region, setting new standards for quality, innovation, and customer satisfaction.",

    values: [
      {
        title: "Innovation",
        description:
          "Constantly pushing boundaries with cutting-edge technology and creative solutions.",
      },
      {
        title: "Quality",
        description:
          "Delivering excellence in every product and service we provide to our clients.",
      },
      {
        title: "Reliability",
        description: "Building trust through consistent performance and dependable solutions.",
      },
      {
        title: "Customer Focus",
        description: "Putting our customers' needs at the center of everything we do.",
      },
    ],

    story:
      "Founded in 2020, SAMI Automation began as a vision to transform the industrial landscape through intelligent automation. Our journey started with a small team of passionate engineers who believed that technology could solve complex industrial challenges. Today, we have grown into a trusted partner for businesses across multiple industries, delivering innovative solutions that drive efficiency and growth.",
  });

  const [isLoading, setIsLoading] = useState(true);

  const fetchAboutData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/about`, {
        cache: "no-store",
      });

      if (response.ok) {
        const result = await response.json();
        if (result.data) {
          setAboutData((prevData) => ({
            ...prevData,
            ...result.data,
          }));
        }
      }
    } catch (error) {
      console.error("Failed to fetch about data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  if (isLoading) {
    return (
      <div className="my-12 sm:my-16 md:my-20">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex h-96 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#E2E8F0] border-t-[#0060B7]" />
              <p className="mt-3 font-nunito text-sm text-[#64748B]">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const valueIcons = [
    // Innovation — lightbulb
    <svg
      key="innovation"
      className="h-5 w-5 text-[#0060B7]"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
      />
    </svg>,
    // Quality — star
    <svg
      key="quality"
      className="h-5 w-5 text-[#0060B7]"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>,
    // Reliability — shield
    <svg
      key="reliability"
      className="h-5 w-5 text-[#0060B7]"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>,
    // Customer Focus — target/crosshair
    <svg
      key="focus"
      className="h-5 w-5 text-[#0060B7]"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>,
  ];

  const statItems = [
    {
      value: aboutData.companyInfo.founded,
      label: "Established",
      icon: (
        <svg
          className="h-5 w-5 text-[#0060B7]"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
          />
        </svg>
      ),
    },
    {
      value: aboutData.companyInfo.employees,
      label: "Team Members",
      icon: (
        <svg
          className="h-5 w-5 text-[#0060B7]"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          />
        </svg>
      ),
    },
    {
      value: aboutData.companyInfo.projects,
      label: "Projects Completed",
      icon: (
        <svg
          className="h-5 w-5 text-[#0060B7]"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      value: aboutData.companyInfo.countries,
      label: "Countries Served",
      icon: (
        <svg
          className="h-5 w-5 text-[#0060B7]"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
      ),
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="my-12 sm:my-16 md:my-20">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="h-[3px] w-8 rounded-full bg-[#0060B7]" />
                <span className="font-nunito text-xs font-semibold uppercase tracking-[0.2em] text-[#0060B7] sm:text-sm">
                  About Us
                </span>
              </div>
              <h1 className="mb-4 font-nunito text-2xl font-bold text-[#191D23] sm:text-3xl md:text-4xl lg:text-[42px] lg:leading-tight">
                {aboutData.heroTitle}
              </h1>
              <p className="mb-2 font-nunito text-base font-medium text-[#0060B7] sm:text-lg">
                {aboutData.heroSubtitle}
              </p>
              <p className="mb-8 max-w-lg font-nunito text-sm leading-relaxed text-[#64748B] sm:text-base">
                {aboutData.heroDescription}
              </p>
              <ButtonBlue title="Explore Products" handler="/categories" />
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC]">
              <Image
                src={heroImage}
                alt="SAMI Automation"
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-12 sm:mb-16 md:mb-20">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
            {statItems.map((stat, index) => (
              <div
                key={index}
                className="rounded-2xl border border-[#E2E8F0] bg-white p-5 text-center transition-all duration-300 hover:border-[#0060B7]/20 hover:shadow-[0_8px_30px_rgba(0,96,183,0.08)] sm:p-6"
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0060B7]/10">
                  {stat.icon}
                </div>
                <div className="mb-1 font-nunito text-2xl font-bold text-[#191D23] sm:text-3xl">
                  {stat.value}
                </div>
                <div className="font-nunito text-xs font-medium text-[#94A3B8] sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="my-12 sm:my-16 md:my-20">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center justify-center gap-2">
              <div className="h-[3px] w-8 rounded-full bg-[#0060B7]" />
              <span className="font-nunito text-xs font-semibold uppercase tracking-[0.2em] text-[#0060B7] sm:text-sm">
                Our Journey
              </span>
              <div className="h-[3px] w-8 rounded-full bg-[#0060B7]" />
            </div>
            <h2 className="mb-6 text-center font-nunito text-2xl font-bold text-[#191D23] sm:text-3xl md:text-4xl">
              Our Story
            </h2>
            <p className="text-center font-nunito text-sm leading-relaxed text-[#64748B] sm:text-base sm:leading-loose">
              {aboutData.story}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="my-12 sm:my-16 md:my-20">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="mb-8 sm:mb-10">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-[3px] w-8 rounded-full bg-[#0060B7]" />
              <span className="font-nunito text-xs font-semibold uppercase tracking-[0.2em] text-[#0060B7] sm:text-sm">
                What Drives Us
              </span>
            </div>
            <h2 className="font-nunito text-2xl font-bold text-[#191D23] sm:text-3xl md:text-4xl">
              Mission & Vision
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
            {/* Mission */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 transition-all duration-300 hover:border-[#0060B7]/20 hover:shadow-[0_8px_30px_rgba(0,96,183,0.08)] sm:p-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#0060B7]/10">
                  <svg
                    className="h-5 w-5 text-[#0060B7]"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.841m2.699-2.702a6 6 0 01-.88 6.88 6 6 0 01-6.88.88"
                    />
                  </svg>
                </div>
                <h3 className="font-nunito text-xl font-bold text-[#191D23]">Our Mission</h3>
              </div>
              <p className="font-nunito text-sm leading-relaxed text-[#64748B] sm:text-[15px]">
                {aboutData.mission}
              </p>
            </div>

            {/* Vision */}
            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 transition-all duration-300 hover:border-[#0060B7]/20 hover:shadow-[0_8px_30px_rgba(0,96,183,0.08)] sm:p-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#0060B7]/10">
                  <svg
                    className="h-5 w-5 text-[#0060B7]"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-nunito text-xl font-bold text-[#191D23]">Our Vision</h3>
              </div>
              <p className="font-nunito text-sm leading-relaxed text-[#64748B] sm:text-[15px]">
                {aboutData.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="my-12 sm:my-16 md:my-20">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="mb-8 sm:mb-10">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-[3px] w-8 rounded-full bg-[#0060B7]" />
              <span className="font-nunito text-xs font-semibold uppercase tracking-[0.2em] text-[#0060B7] sm:text-sm">
                Our Principles
              </span>
            </div>
            <h2 className="font-nunito text-2xl font-bold text-[#191D23] sm:text-3xl md:text-4xl">
              Core Values
            </h2>
            <p className="mt-2 max-w-lg font-nunito text-sm text-[#64748B] sm:text-base">
              These values guide everything we do and shape our approach to business.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {aboutData.values.map((value, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-[#E2E8F0] bg-white p-5 transition-all duration-300 hover:border-[#0060B7]/20 hover:shadow-[0_8px_30px_rgba(0,96,183,0.08)] sm:p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0060B7]/10 transition-colors duration-300 group-hover:bg-[#0060B7]/15">
                  {valueIcons[index]}
                </div>
                <h3 className="mb-2 font-nunito text-base font-semibold text-[#191D23]">
                  {value.title}
                </h3>
                <p className="font-nunito text-sm leading-relaxed text-[#64748B]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="my-12 sm:my-16 md:my-20">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-8 text-center sm:p-12">
            <h2 className="mb-3 font-nunito text-2xl font-bold text-[#191D23] sm:text-3xl">
              Ready to Transform Your Business?
            </h2>
            <p className="mx-auto mb-8 max-w-xl font-nunito text-sm text-[#64748B] sm:text-base">
              Let's discuss how SAMI Automation can help you achieve your automation goals and drive
              your business forward.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <ButtonBlue title="Get Started Today" handler="/contact" />
              <ButtonBlue title="View Our Products" handler="/categories" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
