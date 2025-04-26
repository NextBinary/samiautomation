import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import img1 from "@/assets/images/logo.png";
export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Contact", path: "/contact" },
    { name: "About us", path: "/about" },
  ];

  return (
    <nav className="container mx-auto flex items-center justify-between py-4">
      <div className="flex w-[20%] items-center">
        <Link href="/">
          <Image src={img1} alt="Logo" width={100} height={40} priority />
        </Link>
      </div>
      <div className="flex w-[60%] justify-center">
        <ul className="flex space-x-12">
          {navLinks.map((link) => (
            <li
              key={link.name}
              className={`font-nunito text-lg font-normal ${
                pathname === link.path
                  ? "border-b-2 border-blue-500 text-[#0060B7]"
                  : "text-gray-700 hover:text-[#0060B7]"
              }`}
            >
              <Link href={link.path}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex w-[20%] justify-end">
        <form className="flex items-center rounded-md border bg-[#7676801F]">
          <input
            type="text"
            className="border-none bg-[#7676801F] px-4 py-2 text-gray-900 placeholder:text-[#3C3C4399] focus:outline-none"
            placeholder="Search..."
          />
          <button className="bg-[#7676801F] px-4 py-2">🔍</button>
        </form>
      </div>
    </nav>
  );
}
