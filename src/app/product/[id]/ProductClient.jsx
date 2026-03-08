"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

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
      <div className="my-12 sm:my-16 md:my-20">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex h-[50vh] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#E2E8F0] border-t-[#0060B7]" />
              <p className="mt-3 font-nunito text-sm text-[#64748B]">Loading product...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="my-12 sm:my-16 md:my-20">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex h-[50vh] items-center justify-center">
            <div className="text-center">
              <h2 className="mb-2 font-nunito text-2xl font-bold text-[#191D23]">
                Product Not Found
              </h2>
              <p className="mb-6 font-nunito text-[#64748B]">
                The product you're looking for doesn't exist.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-lg bg-[#0060B7] px-6 py-2.5 font-nunito text-sm font-semibold text-white transition-colors hover:bg-[#004d93]"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { name, currentPrice, originalPrice, images, features, specifications, descriptionText } =
    product;

  const discountPercent =
    originalPrice && originalPrice > currentPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : 0;

  return (
    <div className="my-8 sm:my-10 md:my-12">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 font-nunito text-sm text-[#94A3B8] sm:mb-8">
          <Link href="/" className="transition-colors hover:text-[#0060B7]">
            Home
          </Link>
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <Link href="/products" className="transition-colors hover:text-[#0060B7]">
            Products
          </Link>
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <span className="truncate text-[#191D23]">{name}</span>
        </nav>

        {/* Product layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left — Images */}
          <div className="lg:col-span-7">
            {/* Main image with inline zoom */}
            <div
              ref={imageContainerRef}
              className="relative aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <Image
                src={images[selectedImage]}
                alt={name}
                fill
                className={`object-fill transition-opacity duration-200 ${isZoomed ? "lg:opacity-0" : ""}`}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Zoomed view — inline magnification */}
              <div
                className={`absolute inset-0 z-10 hidden transition-opacity duration-200 lg:block ${isZoomed ? "opacity-100" : "pointer-events-none opacity-0"}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={images[selectedImage]}
                  alt=""
                  className="absolute h-full w-full max-w-none object-none"
                  draggable={false}
                  style={{
                    objectPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    transform: "scale(1.5)",
                  }}
                />
              </div>

              {discountPercent > 0 && (
                <div className="absolute right-3 top-3 z-20 rounded-lg bg-[#0060B7] px-2.5 py-1 font-nunito text-xs font-bold text-white">
                  -{discountPercent}%
                </div>
              )}

              {/* Zoom hint */}
              <div
                className="pointer-events-none absolute bottom-3 left-3 z-20 hidden items-center gap-1.5 rounded-lg bg-black/50 px-2.5 py-1 font-nunito text-[11px] text-white/80 backdrop-blur-sm transition-opacity duration-300 lg:flex"
                style={{ opacity: isZoomed ? 0 : 1 }}
              >
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6"
                  />
                </svg>
                Hover to zoom
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 0 && (
              <div className="mt-3 flex gap-2 overflow-x-auto p-1 sm:mt-4 sm:gap-3">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative flex-shrink-0 overflow-hidden rounded-lg transition-all duration-200 ${
                      selectedImage === index
                        ? "ring-2 ring-[#0060B7] ring-offset-2"
                        : "border border-[#E2E8F0] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="relative h-16 w-16 sm:h-20 sm:w-20">
                      <Image
                        src={image}
                        alt={`${name} view ${index + 1}`}
                        fill
                        className="object-fill"
                        sizes="80px"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right — Product info */}
          <div className="flex flex-col lg:col-span-5">
            {/* Product name */}
            <h1 className="mb-4 font-nunito text-2xl font-bold leading-tight text-[#191D23] sm:text-3xl lg:text-[34px]">
              {name}
            </h1>

            {/* Price section */}
            <div className="mb-6 flex items-baseline gap-3">
              <span className="font-nunito text-3xl font-bold text-[#191D23] sm:text-4xl">
                ৳{currentPrice?.toLocaleString()}
              </span>
              {originalPrice && originalPrice > currentPrice && (
                <span className="font-nunito text-lg text-[#94A3B8] line-through">
                  ৳{originalPrice?.toLocaleString()}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="rounded-md bg-[#0060B7]/10 px-2 py-0.5 font-nunito text-sm font-semibold text-[#0060B7]">
                  Save {discountPercent}%
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="mb-6 h-px bg-[#E2E8F0]" />

            {/* Key Features */}
            {features && (
              <div className="mb-5">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0060B7]/10">
                    <svg
                      className="h-4 w-4 text-[#0060B7]"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="font-nunito text-base font-semibold text-[#191D23]">
                    Key Features
                  </h2>
                </div>
                <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                  <div
                    className="prose-sm font-nunito text-sm leading-relaxed text-[#475569] [&_li]:mb-1 [&_ul]:list-disc [&_ul]:pl-4"
                    dangerouslySetInnerHTML={{ __html: features }}
                  />
                </div>
              </div>
            )}

            {/* Specifications */}
            {specifications && (
              <div className="mb-6">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0060B7]/10">
                    <svg
                      className="h-4 w-4 text-[#0060B7]"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                      />
                    </svg>
                  </div>
                  <h2 className="font-nunito text-base font-semibold text-[#191D23]">
                    Specifications
                  </h2>
                </div>
                <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
                  <div
                    className="prose-sm font-nunito text-sm leading-relaxed text-[#475569] [&_li]:mb-1 [&_ul]:list-disc [&_ul]:pl-4"
                    dangerouslySetInnerHTML={{ __html: specifications }}
                  />
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-auto pt-4">
              <button
                onClick={openBookingForm}
                className="group relative w-full overflow-hidden rounded-xl bg-[#0060B7] px-8 py-3.5 font-nunito text-base font-semibold text-white shadow-lg shadow-[#0060B7]/20 transition-all duration-300 hover:bg-[#004d93] hover:shadow-xl hover:shadow-[#0060B7]/25"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Free Booking
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
              </button>

              {/* Contact info */}
              {contactInfo.phone && (
                <p className="mt-3 text-center font-nunito text-xs text-[#94A3B8]">
                  Or call us at{" "}
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="font-medium text-[#0060B7] hover:underline"
                  >
                    {contactInfo.phone}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Description — full width below */}
        {descriptionText && (
          <div className="mt-10 sm:mt-14">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-[3px] w-8 rounded-full bg-[#0060B7]" />
              <h2 className="font-nunito text-xl font-bold text-[#191D23] sm:text-2xl">
                Product Description
              </h2>
            </div>
            <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 sm:p-8">
              <div
                className="prose max-w-none font-nunito text-[15px] leading-relaxed text-[#475569] [&_h1]:text-[#191D23] [&_h2]:text-[#191D23] [&_h3]:text-[#191D23] [&_li]:mb-1 [&_strong]:text-[#191D23] [&_ul]:list-disc [&_ul]:pl-5"
                dangerouslySetInnerHTML={{ __html: descriptionText }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Booking Form Modal */}
      {isBookingFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1628]/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && closeBookingForm()}
        >
          <div className="mx-4 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal header */}
            <div className="border-b border-[#E2E8F0] bg-[#F8FAFC] px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-nunito text-lg font-bold text-[#191D23]">
                    Book This Product
                  </h2>
                  <p className="font-nunito text-xs text-[#94A3B8]">{product.name}</p>
                </div>
                <button
                  onClick={closeBookingForm}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#94A3B8] transition-colors hover:bg-[#E2E8F0] hover:text-[#191D23]"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal body */}
            <div className="max-h-[70vh] overflow-y-auto p-6">
              <BookingForm
                onSubmit={submitBookingForm}
                isSubmitting={isSubmitting}
                onClose={closeBookingForm}
              />
            </div>
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

  const inputClass =
    "w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 font-nunito text-sm text-[#191D23] placeholder:text-[#94A3B8] transition-all duration-200 focus:border-[#0060B7]/30 focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-[#0060B7]/10";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block font-nunito text-sm font-medium text-[#191D23]"
        >
          Full Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block font-nunito text-sm font-medium text-[#191D23]"
        >
          Email Address <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-1.5 block font-nunito text-sm font-medium text-[#191D23]"
        >
          Phone Number <span className="text-red-400">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          placeholder="01XXXXXXXXX"
          value={formData.phone}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block font-nunito text-sm font-medium text-[#191D23]"
        >
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows="3"
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your requirements..."
          className={inputClass + " resize-none"}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-xl border-2 border-[#E2E8F0] px-4 py-2.5 font-nunito text-sm font-semibold text-[#475569] transition-all duration-200 hover:border-[#94A3B8] hover:bg-[#F8FAFC]"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-xl bg-[#0060B7] px-4 py-2.5 font-nunito text-sm font-semibold text-white shadow-lg shadow-[#0060B7]/20 transition-all duration-200 hover:bg-[#004d93] disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Submitting...
            </span>
          ) : (
            "Submit Booking"
          )}
        </button>
      </div>
    </form>
  );
}
