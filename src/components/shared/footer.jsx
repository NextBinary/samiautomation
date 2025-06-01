"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import {
  Facebook,
  Instagram,
  Linkedin,
  MailIcon,
  MapPin,
  MarsStroke,
  PhoneCall,
  Youtube,
} from "lucide-react";

export default function Footer() {
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
    address: "",
  });
  const [socialMedia, setSocialMedia] = useState([]);

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

  const fetchSocialMedia = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/social`, {
        cache: "no-store",
      });
      const result = await response.json();

      if (result.data && result.data.length > 0) {
        const activeSocial = result.data
          .filter((item) => item.isActive)
          .map((item) => ({
            id: item._id,
            name: item.name,
            url: item.url,
            logo: `${process.env.NEXT_PUBLIC_SPACE_URL}${item.logo}`,
            slug: item.slug,
          }));
        setSocialMedia(activeSocial);
      }
    } catch (error) {
      console.error("Failed to fetch social media:", error);
    }
  };

  useEffect(() => {
    fetchContactInfo();
    fetchSocialMedia();
  }, []);

  const formatAddress = (address) => {
    return address.replace("Nawabpur Road", "\nNawabpur Road");
  };

  return (
    <footer className="px-4 py-8 lg:px-0">
      <div className="mx-auto w-[70%] border-t border-blue-200 py-6"></div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
          <div className="w-28 lg:w-36">
            <Image src={logo} alt="SAMI AUTOMATION" width={150} height={80} layout="responsive" />
          </div>

          <div className="space-y-6">
            <div className="flex flex-col items-start justify-start gap-3 md:flex-row lg:gap-10">
              <div className="flex items-start justify-start gap-2">
                <PhoneCall className="text-[#0060B7]" />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="font-nunito text-lg font-light text-[#000000] hover:underline"
                >
                  {contactInfo.phone}
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 md:justify-start">
                <MailIcon className="text-[#0060B7]" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="font-nunito text-lg font-light text-[#000000] hover:underline"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-start justify-start gap-2">
              <MapPin className="text-[#0060B7]" />
              <span className="font-nunito text-lg font-light text-[#000000]">
                {contactInfo.address.split("Nawabpur Road")[0]}
                <span className="hidden md:inline">
                  <br />
                </span>
                Nawabpur Road{contactInfo.address.split("Nawabpur Road")[1]}
              </span>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="mb-3 text-left font-nunito text-lg font-medium text-[#000000]">
                Social Media
              </h3>
              <div className="flex justify-start gap-3">
                {socialMedia.map((social) => (
                  <Link
                    key={social.id}
                    href={social.url.startsWith("http") ? social.url : `https://${social.url}`}
                    className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-md"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={social.logo}
                      alt={social.name}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 flex flex-col items-center justify-between pt-4 md:flex-row">
          <div className="mb-4 flex gap-6 md:mb-0">
            <Link href="/contact" className="font-nunito font-light text-[#000000]">
              CONTACT US
            </Link>
            <Link href="/privacy-policy" className="font-nunito font-light text-[#000000]">
              PRIVACY POLICY
            </Link>
          </div>
          <div className="font-nunito font-light text-[#000000]">
            Copyright © 2025 • Sami Automation ltd.
          </div>

          <div>
            <p className="font-nunito">
              Made with 💙 by{" "}
              <span className="font-semibold text-[#0060B7] underline hover:cursor-pointer hover:underline-offset-2">
                NextBinary.io
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
