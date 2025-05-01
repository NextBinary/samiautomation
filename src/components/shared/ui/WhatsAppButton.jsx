"use client";
import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    // Replace with your WhatsApp number (international format without '+')
    const phoneNumber = "8801905888766"; // Using the phone number from the footer
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-32 right-20 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </button>
    </div>
  );
}
