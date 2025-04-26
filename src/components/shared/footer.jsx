import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import {
  Facebook,
  Instagram,
  Linkedin,
  Locate,
  MailIcon,
  MarsStroke,
  PhoneCall,
  Youtube,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8">
      <div className="mx-auto w-[70%] border-t border-blue-200 py-6"></div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <div className="w-40">
              <Image src={logo} alt="SAMI AUTOMATION" width={150} height={80} layout="responsive" />
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-10 md:justify-start">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <PhoneCall className="text-[#0060B7]" />
                <span className="font-nunito text-lg font-light text-[#000000]">01905888766</span>
              </div>

              <div className="flex items-center justify-center gap-2 md:justify-start">
                <MailIcon className="text-[#0060B7]" />
                <span className="font-nunito text-lg font-light text-[#000000]">
                  samiautomationltd@gmail.com
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 md:justify-start">
              <Locate className="text-[#0060B7]" />
              <span className="font-nunito text-lg font-light text-[#000000]">
                Nawabpur Complex, Nawabpur Rd, Dhaka -1100
              </span>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="mb-3 text-center font-nunito text-lg font-medium text-[#000000] md:text-left">
                Social Media
              </h3>
              <div className="flex justify-center gap-3 md:justify-start">
                <Link
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white"
                >
                  <Facebook />
                </Link>
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
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white"
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
            Copyright © 2025 • Sami Automation
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
