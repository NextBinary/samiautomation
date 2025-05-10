import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import img1 from "@/assets/images/logo.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Contact", path: "/contact" },
    { name: "About us", path: "/about" },
  ];

  return (
    <div className="sticky top-0 z-50 bg-white/70 shadow-sm backdrop-blur-md">
      <nav className="container mx-auto flex items-center justify-between py-4">
        <div className="flex w-[20%] items-center">
          <Link href="/">
            <Image src={img1} alt="Logo" className="pl-4" width={100} height={40} priority />
          </Link>
        </div>
        <div className="hidden w-[60%] justify-center md:flex">
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
          <form className="hidden items-center rounded-md border bg-[#7676801F] md:flex">
            <input
              type="text"
              className="border-none bg-[#7676801F] px-4 py-2 text-gray-900 placeholder:text-[#3C3C4399] focus:outline-none"
              placeholder="Search..."
            />
            <button className="bg-[#7676801F] px-4 py-2">🔍</button>
          </form>
          <div className="md:hidden">
            <Sheet className>
              <SheetTrigger asChild>
                <button className="p-2 pr-4">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col space-y-4 p-4">
                  <Link href="/" className="mb-4">
                    <Image src={img1} alt="Logo" width={100} height={40} priority />
                  </Link>
                  <ul className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <li
                        key={link.name}
                        className={`font-nunito text-lg font-normal ${
                          pathname === link.path
                            ? "text-[#0060B7]"
                            : "text-gray-700 hover:text-[#0060B7]"
                        }`}
                      >
                        <Link href={link.path}>{link.name}</Link>
                      </li>
                    ))}
                  </ul>
                  <form className="mt-4 flex items-center rounded-md border bg-[#7676801F]">
                    <input
                      type="text"
                      className="border-none bg-[#7676801F] px-4 py-2 text-gray-900 placeholder:text-[#3C3C4399] focus:outline-none"
                      placeholder="Search..."
                    />
                    <button className="bg-[#7676801F] px-4 py-2">🔍</button>
                  </form>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </div>
  );
}
