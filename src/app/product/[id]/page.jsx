"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import ButtonBlue from "@/components/shared/button";
// import ContactModal from "@/components/shared/ui/ContactModal";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function Product() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
    address: "",
  });

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

  const fetchContactInfo = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contactinfo`, {
        cache: "no-store",
      });
      const result = await response.json();

      if (result.data && result.data.length > 0) {
        const contact = result.data.find((item) => item.isActive);
        if (contact) {
          setContactInfo({
            email: contact.email,
            phone: contact.phone,
            address: contact.address,
          });
        }
      }
    } catch (error) {
      console.error("Failed to fetch contact info:", error);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
    fetchContactInfo();
  }, [params.id]);

  // Add booking form submission function
  const submitBookingForm = async (formData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking/insertFormData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          product: product.name,
          isBooking: true,
          recipients: contactInfo.email,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Booking submitted successfully! We will contact you soon.");
        setIsBookingFormOpen(false);
      } else {
        toast.error(result.message || "Failed to submit booking. Please try again.");
      }
    } catch (error) {
      console.error("Booking submission error:", error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openBookingForm = () => setIsBookingFormOpen(true);
  const closeBookingForm = () => setIsBookingFormOpen(false);

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
              onClick={openBookingForm}
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
              onClick={openBookingForm}
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

      {/* Booking Form Modal */}
      {isBookingFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="mx-4 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#202020]">Book Product: {product.name}</h2>
              <button onClick={closeBookingForm} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            <BookingForm
              onSubmit={submitBookingForm}
              isSubmitting={isSubmitting}
              onClose={closeBookingForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Booking Form Component
function BookingForm({ onSubmit, isSubmitting, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0060B7]"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0060B7]"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0060B7]"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows="3"
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your requirements..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0060B7]"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-md bg-[#0060B7] px-4 py-2 text-white hover:bg-[#03539d] disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Booking"}
        </button>
      </div>
    </form>
  );
}
