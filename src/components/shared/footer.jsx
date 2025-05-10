import React from "react";
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
                  href="tel:+8801905888766"
                  className="font-nunito text-lg font-light text-[#000000] hover:underline"
                >
                  01905888766
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 md:justify-start">
                <MailIcon className="text-[#0060B7]" />
                <a
                  href="mailto:samiautomationltd@gmail.com"
                  className="font-nunito text-lg font-light text-[#000000] hover:underline"
                >
                  samiautomationltd@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start justify-start gap-2">
              <MapPin className="text-[#0060B7]" />
              <span className="font-nunito text-lg font-light text-[#000000]">
                Shop no: (01,02), level-4, Nawabpur Complex,
                <span className="hidden md:inline">
                  <br />
                </span>
                Nawabpur Road, Dhaka -1100
              </span>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="mb-3 text-left font-nunito text-lg font-medium text-[#000000]">
                Social Media
              </h3>
              <div className="flex justify-start gap-3">
                <Link
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white"
                >
                  <Linkedin />
                </Link>
                <Link
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white"
                >
                  <Facebook />
                </Link>
                <Link
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white"
                >
                  <Youtube />
                </Link>

                <Link
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-600 text-white"
                >
                  <Instagram />
                </Link>
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
