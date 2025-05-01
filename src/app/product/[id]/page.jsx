"use client";
import React, { useState } from "react";
import Image from "next/image";
import ButtonBlue from "@/components/shared/button";
import ContactModal from "@/components/shared/ui/ContactModal";

export default function Product() {
  // Product data object with all the details
  const product = {
    id: 1,
    name: "Clotting Store Solution",
    currentPrice: 49,
    originalPrice: 99,
    images: [
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Main product image
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    features: [
      "Heavy-duty steel construction with corrosion-resistant powder coating",
      "Adjustable shelves with high load-bearing capacity",
      "Easy bolt-nut assembly and disassembly",
      "Versatile for industrial, commercial, or domestic use",
    ],
    specifications: {
      sizeOptions: ['72" (H) x 36" (W) x 15" (D)', '72" (H) x 48" (W) x 18" (D)'],
      customSizes: "Custom sizes available on request",
      shelfLevels: "4-6 (adjustable spacing)",
      loadCapacity: "Up to 100 kg per shelf",
    },
    // Description stored as a string for future text editor integration
    descriptionText:
      "Optimize Your Storage Space With Our Heavy-Duty Slotted Angle Rack, Designed For Maximum Strength, Flexibility, And Durability. Perfect For Warehouses, Workshops, Retail Stores, And Home Storage, This Rack System Offers Customizable Shelving To Accommodate A Variety Of Items — From Light Tools To Heavy Equipment.",
  };

  // State for selected main image
  const [selectedImage, setSelectedImage] = useState(0);
  // State for contact modal visibility
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Extract data from the product object
  const { name, currentPrice, originalPrice, images, features, specifications, descriptionText } =
    product;

  // Modal handlers
  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Mobile layout (stacked) */}
      <div className="block lg:hidden">
        <div className="mb-6">
          <div className="relative aspect-square w-full overflow-hidden rounded-md">
            <Image
              src={images[selectedImage]}
              alt={name}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <div
              key={index}
              className={`cursor-pointer overflow-hidden rounded-md ${
                selectedImage === index ? "border-2 border-blue-500" : "border border-gray-200"
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <div className="relative h-16 w-16">
                <Image
                  src={image}
                  alt={`${name} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Product details for mobile */}
        <div className="flex flex-col space-y-6">
          <h1 className="font-nunito text-3xl font-bold text-[#202020]">{name}</h1>

          <div className="flex items-center">
            <span className="font-nunito text-3xl font-bold text-[#202020]">৳{currentPrice}</span>
            <span className="ml-4 font-nunito text-xl text-gray-500 line-through">
              ৳{originalPrice}
            </span>
          </div>

          {/* Key Features */}
          <div>
            <h2 className="mb-3 font-nunito text-xl font-medium text-[#202020]">Key Features:</h2>
            <ul className="list-inside space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-lg">•</span>
                  <span className="font-nunito text-[#202020]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div>
            <h2 className="mb-3 font-nunito text-xl font-medium text-[#202020]">Specifications:</h2>
            <ul className="list-inside space-y-2">
              <li className="flex flex-col">
                <span className="font-nunito font-medium">Size Options:</span>
                <ul className="ml-4 list-inside">
                  {specifications.sizeOptions.map((size, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-lg">•</span>
                      <span className="font-nunito text-[#202020]">{size}</span>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-lg">•</span>
                <span className="font-nunito text-[#202020]">
                  <span className="font-medium">Custom sizes:</span> {specifications.customSizes}
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-lg">•</span>
                <span className="font-nunito text-[#202020]">
                  <span className="font-medium">Shelf Levels:</span> {specifications.shelfLevels}
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-lg">•</span>
                <span className="font-nunito text-[#202020]">
                  <span className="font-medium">Load Capacity:</span> {specifications.loadCapacity}
                </span>
              </li>
            </ul>
          </div>

          {/* Call to action */}
          <div className="pt-2">
            <button
              onClick={openContactModal}
              className="w-full rounded-md bg-[#0060B7] py-3 text-center font-nunito text-lg font-medium text-white hover:bg-blue-600"
            >
              Free Booking
            </button>
          </div>
        </div>
      </div>

      {/* Desktop 3-column layout */}
      <div className="hidden grid-cols-12 gap-6 lg:grid">
        {/* Left column - Thumbnails */}
        <div className="col-span-1">
          <div className="flex flex-col space-y-3">
            {images.map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer overflow-hidden rounded-md ${
                  selectedImage === index ? "border-2 border-[#0060B7]" : "border border-gray-200"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <div className="relative aspect-square">
                  <Image
                    src={image}
                    alt={`${name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle column - Main image */}
        <div className="col-span-6">
          <div className="relative aspect-square w-full overflow-hidden rounded-md">
            <Image
              src={images[selectedImage]}
              alt={name}
              fill
              className="object-cover"
              sizes="50vw"
              priority
            />
          </div>
        </div>

        {/* Right column - Product details */}
        <div className="col-span-5 flex flex-col space-y-6">
          <h1 className="font-nunito text-4xl font-bold text-[#202020]">{name}</h1>

          {/* Pricing */}
          <div className="flex items-center">
            <span className="font-nunito text-4xl font-bold text-[#202020]">৳{currentPrice}</span>
            <span className="ml-4 font-nunito text-xl text-gray-500 line-through">
              ৳{originalPrice}
            </span>
          </div>

          {/* Key Features */}
          <div>
            <h2 className="mb-3 font-nunito text-xl font-medium text-[#202020]">Key Features:</h2>
            <ul className="list-inside space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 text-lg">•</span>
                  <span className="font-nunito text-[#202020]">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div>
            <h2 className="mb-3 font-nunito text-xl font-medium text-[#202020]">Specifications:</h2>
            <ul className="list-inside space-y-2">
              <li className="flex flex-col">
                <span className="font-nunito font-medium">Size Options:</span>
                <ul className="ml-4 list-inside">
                  {specifications.sizeOptions.map((size, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-lg">•</span>
                      <span className="font-nunito text-[#202020]">{size}</span>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-lg">•</span>
                <span className="font-nunito text-[#202020]">
                  <span className="font-nunito font-medium">Custom sizes:</span>{" "}
                  {specifications.customSizes}
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-lg">•</span>
                <span className="font-nunito text-[#202020]">
                  <span className="font-nunito font-medium">Shelf Levels:</span>{" "}
                  {specifications.shelfLevels}
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-lg">•</span>
                <span className="font-nunito text-[#202020]">
                  <span className="font-nunito font-medium">Load Capacity:</span>{" "}
                  {specifications.loadCapacity}
                </span>
              </li>
            </ul>
          </div>

          {/* Call to action */}
          <div className="pt-2">
            <button
              onClick={openContactModal}
              className="w-full rounded-md bg-[#0060B7] py-3 text-center font-nunito text-lg font-medium text-white hover:bg-[#03539d]"
            >
              Free Booking
            </button>
          </div>
        </div>
      </div>

      {/* Description section at the bottom */}
      <div className="mt-10 border-t pt-6">
        <h2 className="mb-3 font-nunito text-2xl font-medium text-[#202020]">Description</h2>
        <p className="font-nunito text-[#202020]">{descriptionText}</p>
      </div>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </div>
  );
}
