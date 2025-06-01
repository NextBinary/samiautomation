"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ButtonBlue from "@/components/shared/button";
import ContactModal from "@/components/shared/ui/ContactModal";
import { useParams } from "next/navigation";

export default function Product() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/getSingleItem/${params.id}`,
        {
          cache: "no-store",
        },
      );
      const result = await response.json();

      if (result.data) {
        const productData = result.data;

        // Prepare images array
        const images = [
          productData.thumbnail,
          productData.image1,
          productData.image2,
          productData.image3,
          productData.image4,
          productData.image5,
        ]
          .filter((img) => img && img.trim() !== "")
          .map((img) => `${process.env.NEXT_PUBLIC_SPACE_URL}${img}`);

        setProduct({
          id: productData._id,
          name: productData.name,
          currentPrice: productData.currentPrice,
          originalPrice: productData.originalPrice,
          images: images,
          features: productData.features,
          specifications: productData.specifications,
          descriptionText: productData.description,
        });
      }
    } catch (error) {
      console.error("Failed to fetch product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex h-96 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-[#0060B7]"></div>
            <p className="mt-2 text-[#0060B7]">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-[#0060B7]">Product not found</p>
        </div>
      </div>
    );
  }

  const { name, currentPrice, originalPrice, images, features, specifications, descriptionText } =
    product;

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
            <div
              className="font-nunito text-[#202020]"
              dangerouslySetInnerHTML={{ __html: features }}
            />
          </div>

          {/* Specifications */}
          <div>
            <h2 className="mb-3 font-nunito text-xl font-medium text-[#202020]">Specifications:</h2>
            <div
              className="font-nunito text-[#202020]"
              dangerouslySetInnerHTML={{ __html: specifications }}
            />
          </div>

          {/* Description */}
          <div>
            <h2 className="mb-3 font-nunito text-xl font-medium text-[#202020]">Description:</h2>
            <div
              className="font-nunito text-[#202020]"
              dangerouslySetInnerHTML={{ __html: descriptionText }}
            />
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
            <div
              className="font-nunito text-[#202020]"
              dangerouslySetInnerHTML={{ __html: features }}
            />
          </div>

          {/* Specifications */}
          <div>
            <h2 className="mb-3 font-nunito text-xl font-medium text-[#202020]">Specifications:</h2>
            <div
              className="font-nunito text-[#202020]"
              dangerouslySetInnerHTML={{ __html: specifications }}
            />
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
        <div
          className="font-nunito text-[#202020]"
          dangerouslySetInnerHTML={{ __html: descriptionText }}
        />
      </div>

      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </div>
  );
}
