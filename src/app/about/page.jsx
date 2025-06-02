"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ButtonBlue from "@/components/shared/button";

// Import assets
import heroImage from "@/assets/images/hero2.png";
import logoImage from "@/assets/images/logo.png";
import worldImage from "@/assets/images/world.png";
import boxImage from "@/assets/images/box.png";
import carImage from "@/assets/images/car.png";

export default function About() {
  // State for dynamic content
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
        icon: "💡",
      },
      {
        title: "Quality",
        description:
          "Delivering excellence in every product and service we provide to our clients.",
        icon: "⭐",
      },
      {
        title: "Reliability",
        description: "Building trust through consistent performance and dependable solutions.",
        icon: "🛡️",
      },
      {
        title: "Customer Focus",
        description: "Putting our customers' needs at the center of everything we do.",
        icon: "🎯",
      },
    ],

    story:
      "Founded in 2020, SAMI Automation began as a vision to transform the industrial landscape through intelligent automation. Our journey started with a small team of passionate engineers who believed that technology could solve complex industrial challenges. Today, we have grown into a trusted partner for businesses across multiple industries, delivering innovative solutions that drive efficiency and growth.",

    team: [
      {
        name: "SAMI Automation Team",
        position: "Our Dedicated Professionals",
        description:
          "Our team consists of experienced engineers, technicians, and support staff dedicated to delivering exceptional automation solutions.",
      },
    ],
  });

  const [isLoading, setIsLoading] = useState(true);

  // Fetch dynamic about data from API
  const fetchAboutData = async () => {
    try {
      // This is where you'll integrate with your API later
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
      // Continue with default data if API fails
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-[#0060B7]"></div>
          <p className="font-nunito text-[#202020]">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="mb-4">
                <span className="inline-block rounded-full bg-[#0060B7]/10 px-4 py-2 text-sm font-medium text-[#0060B7]">
                  About Us
                </span>
              </div>
              <h1 className="mb-6 font-nunito text-4xl font-bold text-[#202020] lg:text-5xl xl:text-6xl">
                {aboutData.heroTitle}
              </h1>
              <h2 className="mb-6 font-nunito text-xl font-normal text-[#0060B7] lg:text-2xl">
                {aboutData.heroSubtitle}
              </h2>
              <p className="mb-8 font-nunito text-lg font-light leading-relaxed text-gray-600">
                {aboutData.heroDescription}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <ButtonBlue title="Explore Our Services" handler="/categories" />
                <ButtonBlue title="Contact Us" handler="/contact" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-4 rounded-lg bg-gradient-to-r from-[#0060B7]/20 to-blue-400/20 blur-lg"></div>
                <Image
                  src={heroImage}
                  alt="SAMI Automation"
                  className="relative rounded-lg object-cover shadow-2xl"
                  width={600}
                  height={200}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="bg-[#0060B7] py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 font-nunito text-3xl font-bold text-white lg:text-4xl">
                {aboutData.companyInfo.founded}
              </div>
              <div className="font-nunito text-sm font-light text-blue-100 lg:text-base">
                Established
              </div>
            </div>
            <div className="text-center">
              <div className="mb-2 font-nunito text-3xl font-bold text-white lg:text-4xl">
                {aboutData.companyInfo.employees}
              </div>
              <div className="font-nunito text-sm font-light text-blue-100 lg:text-base">
                Team Members
              </div>
            </div>
            <div className="text-center">
              <div className="mb-2 font-nunito text-3xl font-bold text-white lg:text-4xl">
                {aboutData.companyInfo.projects}
              </div>
              <div className="font-nunito text-sm font-light text-blue-100 lg:text-base">
                Projects Completed
              </div>
            </div>
            <div className="text-center">
              <div className="mb-2 font-nunito text-3xl font-bold text-white lg:text-4xl">
                {aboutData.companyInfo.countries}
              </div>
              <div className="font-nunito text-sm font-light text-blue-100 lg:text-base">
                Countries Served
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 font-nunito text-3xl font-bold text-[#202020] lg:text-4xl">
              Our Story
            </h2>
            <p className="font-nunito text-lg font-light leading-relaxed text-gray-600">
              {aboutData.story}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <div className="mb-6 flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0060B7]">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="font-nunito text-2xl font-bold text-[#202020]">Our Mission</h3>
              </div>
              <p className="font-nunito text-lg font-light leading-relaxed text-gray-600">
                {aboutData.mission}
              </p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <div className="mb-6 flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0060B7]">
                  <span className="text-2xl">👁️</span>
                </div>
                <h3 className="font-nunito text-2xl font-bold text-[#202020]">Our Vision</h3>
              </div>
              <p className="font-nunito text-lg font-light leading-relaxed text-gray-600">
                {aboutData.vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-nunito text-3xl font-bold text-[#202020] lg:text-4xl">
              Our Core Values
            </h2>
            <p className="mx-auto max-w-2xl font-nunito text-lg font-light text-gray-600">
              These values guide everything we do and shape our approach to business and
              relationships.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {aboutData.values.map((value, index) => (
              <div
                key={index}
                className="group rounded-lg border border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:border-[#0060B7] hover:shadow-lg"
              >
                <div className="mb-4 text-4xl">{value.icon}</div>
                <h3 className="mb-3 font-nunito text-xl font-bold text-[#202020]">{value.title}</h3>
                <p className="font-nunito text-sm font-light leading-relaxed text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gradient-to-br from-[#0060B7] to-blue-700 py-16 text-white lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 font-nunito text-3xl font-bold lg:text-4xl">
                Why Choose SAMI Automation?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <span className="text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="mb-2 font-nunito text-lg font-semibold">
                      Expert Engineering Team
                    </h4>
                    <p className="font-nunito text-sm font-light leading-relaxed text-blue-100">
                      Our skilled engineers bring years of experience in automation and industrial
                      solutions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <span className="text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="mb-2 font-nunito text-lg font-semibold">
                      Cutting-Edge Technology
                    </h4>
                    <p className="font-nunito text-sm font-light leading-relaxed text-blue-100">
                      We utilize the latest automation technologies to provide state-of-the-art
                      solutions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <span className="text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="mb-2 font-nunito text-lg font-semibold">24/7 Support</h4>
                    <p className="font-nunito text-sm font-light leading-relaxed text-blue-100">
                      Round-the-clock technical support to ensure your operations never stop.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <span className="text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="mb-2 font-nunito text-lg font-semibold">Custom Solutions</h4>
                    <p className="font-nunito text-sm font-light leading-relaxed text-blue-100">
                      Tailored automation solutions designed specifically for your business needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Image
                  src={boxImage}
                  alt="Automation Solution"
                  className="rounded-lg object-cover"
                  width={200}
                  height={200}
                />
                <Image
                  src={worldImage}
                  alt="Global Reach"
                  className="rounded-lg object-cover"
                  width={200}
                  height={150}
                />
              </div>
              <div className="mt-8 space-y-4">
                <Image
                  src={carImage}
                  alt="Industrial Automation"
                  className="rounded-lg object-cover"
                  width={200}
                  height={150}
                />
                <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                  <h4 className="mb-2 font-nunito text-lg font-semibold">Global Presence</h4>
                  <p className="font-nunito text-sm font-light">
                    Serving clients across multiple countries with world-class automation solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl bg-gradient-to-r from-gray-50 to-blue-50 p-8 text-center lg:p-12">
            <h2 className="mb-4 font-nunito text-3xl font-bold text-[#202020] lg:text-4xl">
              Ready to Transform Your Business?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl font-nunito text-lg font-light text-gray-600">
              Let's discuss how SAMI Automation can help you achieve your automation goals and drive
              your business forward.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <ButtonBlue title="Get Started Today" handler="/contact" />
              <ButtonBlue title="View Our Products" handler="/categories" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
