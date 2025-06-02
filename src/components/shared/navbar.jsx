"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import img1 from "@/assets/images/logo.png";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Contact", path: "/contact" },
    { name: "About us", path: "/about" },
  ];

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  const searchProducts = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/search?query=${encodeURIComponent(query)}`,
        {
          cache: "no-store",
        },
      );
      const result = await response.json();

      if (result.data && result.data.length > 0) {
        const products = result.data.map((item) => ({
          id: item._id,
          name: item.name,
          image: `${process.env.NEXT_PUBLIC_SPACE_URL}${item.thumbnail}`,
          slug: item.slug,
        }));
        setSearchResults(products);
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
      setShowResults(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Clear previous debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Debounce search
    debounceRef.current = setTimeout(() => {
      searchProducts(query);
    }, 300);
  };

  const handleProductClick = (productId) => {
    setShowResults(false);
    setSearchQuery("");
    router.push(`/product/${productId}`);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Mobile Navbar */}
      <div className="sticky top-0 z-50 bg-[#0060B7] shadow-sm md:hidden">
        <nav className="px-4 py-3">
          {/* Top row with menu and logo */}
          <div className="mb-3 flex items-center justify-between">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button className="p-2 text-white">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col space-y-4 p-4">
                  <Link href="/" className="mb-4" onClick={handleLinkClick}>
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
                        <Link href={link.path} onClick={handleLinkClick}>
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </SheetContent>
            </Sheet>
            <div className="flex justify-center">
              <Link href="/">
                <Image
                  src={img1}
                  alt="Logo"
                  width={80}
                  height={32}
                  priority
                  className="brightness-0 invert"
                />
              </Link>
            </div>
            <div className="w-10"></div> {/* Spacer to balance the layout */}
          </div>

          {/* Search bar */}
          <div className="relative" ref={searchRef}>
            <form className="flex items-center rounded-full border bg-white">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="flex-1 rounded-full border-none bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 focus:outline-none"
                placeholder="Search products..."
              />
              <button type="button" className="rounded-r-full bg-white px-4 py-3">
                {loading ? "..." : "🔍"}
              </button>
            </form>

            {/* Search Results Dropdown for Mobile */}
            {showResults && (
              <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-80 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="flex cursor-pointer items-center border-b border-gray-100 p-3 hover:bg-gray-50"
                    >
                      <div className="relative mr-3 h-12 w-12 flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="rounded object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-nunito text-sm font-medium text-gray-900">
                          {product.name}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-center text-gray-500">
                    <p className="font-nunito text-sm">No products found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Desktop Navbar */}
      <div className="sticky top-0 z-50 hidden bg-white/70 shadow-sm backdrop-blur-md md:block">
        <nav className="container mx-auto flex items-center justify-between py-4">
          <div className="flex w-[20%] items-center">
            <Link href="/">
              <Image
                src={img1}
                alt="Logo"
                className="pl-4 lg:pl-0"
                width={100}
                height={40}
                priority
              />
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
            <div className="relative hidden md:block" ref={searchRef}>
              <form className="flex items-center rounded-md border bg-[rgb(213,232,255)]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="border-none bg-[rgb(213,232,255)] px-4 py-2 text-gray-900 placeholder:text-[#3C3C4399] focus:outline-none"
                  placeholder="Search products..."
                />
                <button type="button" className="bg-[rgb(213,232,255)] px-4 py-2">
                  {loading ? "..." : "🔍"}
                </button>
              </form>

              {/* Search Results Dropdown */}
              {showResults && (
                <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-80 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                        className="flex cursor-pointer items-center border-b border-gray-100 p-3 hover:bg-gray-50"
                      >
                        <div className="relative mr-3 h-12 w-12 flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="rounded object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-nunito text-sm font-medium text-gray-900">
                            {product.name}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-center text-gray-500">
                      <p className="font-nunito text-sm">No products found</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
