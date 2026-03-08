"use client";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
    address: "",
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact request/insertFormData`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            recipients: contactInfo.email,
          }),
        },
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully! We will contact you soon.");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error(result.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const inputClass =
    "w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5 font-nunito text-sm text-[#191D23] placeholder:text-[#94A3B8] transition-all duration-200 focus:border-[#0060B7]/30 focus:bg-white focus:outline-none focus:ring-[3px] focus:ring-[#0060B7]/10";

  return (
    <div className="my-12 sm:my-16 md:my-20">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Section header */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <div className="mb-2 flex items-center gap-2">
            <div className="h-[3px] w-8 rounded-full bg-[#0060B7]" />
            <span className="font-nunito text-xs font-semibold uppercase tracking-[0.2em] text-[#0060B7] sm:text-sm">
              Get In Touch
            </span>
          </div>
          <h1 className="font-nunito text-2xl font-bold text-[#191D23] sm:text-3xl md:text-4xl">
            Contact Us
          </h1>
          <p className="mt-2 max-w-lg font-nunito text-sm text-[#64748B] sm:text-base">
            Have a question or want to learn more? Send us a message and we'll get back to you
            shortly.
          </p>
        </div>

        {/* 2-column layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left — Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 sm:p-8">
              <h2 className="mb-6 font-nunito text-lg font-semibold text-[#191D23]">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-1.5 block font-nunito text-sm font-medium text-[#191D23]"
                    >
                      First Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-1.5 block font-nunito text-sm font-medium text-[#191D23]"
                    >
                      Last Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                      placeholder="+880 1XXX XXXXXX"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
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
                    rows="4"
                    required
                    placeholder="Write your message..."
                    value={formData.message}
                    onChange={handleChange}
                    className={inputClass + " resize-none"}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full overflow-hidden rounded-xl bg-[#0060B7] px-8 py-3.5 font-nunito text-base font-semibold text-white shadow-lg shadow-[#0060B7]/20 transition-all duration-300 hover:bg-[#004d93] hover:shadow-xl hover:shadow-[#0060B7]/25 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Send Message
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
                          d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right — Contact Info + Map */}
          <div className="space-y-4 lg:col-span-5">
            {/* Email card */}
            <div className="group rounded-2xl border border-[#E2E8F0] bg-white p-5 transition-all duration-300 hover:border-[#0060B7]/20 hover:shadow-[0_8px_30px_rgba(0,96,183,0.08)]">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#0060B7]/10 transition-colors duration-300 group-hover:bg-[#0060B7]/15">
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
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div>
                  <p className="mb-0.5 font-nunito text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                    Email
                  </p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="font-nunito text-sm font-semibold text-[#191D23] transition-colors hover:text-[#0060B7]"
                  >
                    {contactInfo.email || "Loading..."}
                  </a>
                </div>
              </div>
            </div>

            {/* Phone card */}
            <div className="group rounded-2xl border border-[#E2E8F0] bg-white p-5 transition-all duration-300 hover:border-[#0060B7]/20 hover:shadow-[0_8px_30px_rgba(0,96,183,0.08)]">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#0060B7]/10 transition-colors duration-300 group-hover:bg-[#0060B7]/15">
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
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="mb-0.5 font-nunito text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                    Phone
                  </p>
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="font-nunito text-sm font-semibold text-[#191D23] transition-colors hover:text-[#0060B7]"
                  >
                    {contactInfo.phone || "Loading..."}
                  </a>
                </div>
              </div>
            </div>

            {/* Address card */}
            <div className="group rounded-2xl border border-[#E2E8F0] bg-white p-5 transition-all duration-300 hover:border-[#0060B7]/20 hover:shadow-[0_8px_30px_rgba(0,96,183,0.08)]">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#0060B7]/10 transition-colors duration-300 group-hover:bg-[#0060B7]/15">
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
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="mb-0.5 font-nunito text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                    Address
                  </p>
                  <p className="font-nunito text-sm font-semibold leading-relaxed text-[#191D23]">
                    {contactInfo.address || "Loading..."}
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="overflow-hidden rounded-2xl border border-[#E2E8F0]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29226.08587046777!2d90.40499302784065!3d23.70238133697383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b900730dd8bf%3A0xc63e89f4bfca8097!2sNAWABPUR%20COMPLEX!5e0!3m2!1sen!2sbd!4v1746101574907!5m2!1sen!2sbd"
                width="100%"
                height="260"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sami Automation Location"
                className="h-[260px] w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
