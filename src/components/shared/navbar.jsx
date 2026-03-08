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
  const mobileSearchRef = useRef(null);
  const debounceRef = useRef(null);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
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

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

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
    if (mobileSearchRef.current && !mobileSearchRef.current.contains(event.target)) {
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

  const SearchDropdown = () =>
    showResults && (
      <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-[#E2E8F0] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.id)}
              className="flex cursor-pointer items-center gap-3 border-b border-[#F1F5F9] px-4 py-3 transition-colors duration-150 last:border-b-0 hover:bg-[#F8FAFC]"
            >
              <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-[#F1F5F9]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <p className="truncate font-nunito text-sm font-medium text-[#191D23]">
                {product.name}
              </p>
            </div>
          ))
        ) : (
          <div className="px-4 py-6 text-center">
            <p className="font-nunito text-sm text-[#94A3B8]">No products found</p>
          </div>
        )}
      </div>
    );

  return (
    <>
      {/* Mobile Navbar */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-[#0060B7] md:hidden">
        <nav className="px-4 py-3">
          <div className="mb-3 flex items-center justify-between">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] border-r-0 bg-white p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex h-full flex-col">
                  <div className="border-b border-[#F1F5F9] px-5 py-5">
                    <Link href="/" onClick={handleLinkClick}>
                      <Image src={img1} alt="Logo" width={110} height={44} priority />
                    </Link>
                  </div>
                  <ul className="flex-1 px-3 py-4">
                    {navLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.path}
                          onClick={handleLinkClick}
                          className={`flex items-center rounded-lg px-3 py-2.5 font-nunito text-[15px] font-medium transition-colors ${
                            pathname === link.path
                              ? "bg-[#0060B7]/5 text-[#0060B7]"
                              : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0060B7]"
                          }`}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </SheetContent>
            </Sheet>

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

            <div className="w-9" />
          </div>

          {/* Mobile search */}
          <div className="relative" ref={mobileSearchRef}>
            <div className="flex items-center overflow-hidden rounded-xl bg-white/95 backdrop-blur-sm">
              <svg
                className="ml-3 h-4 w-4 flex-shrink-0 text-[#94A3B8]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="flex-1 bg-transparent px-3 py-2.5 font-nunito text-sm text-[#191D23] placeholder:text-[#94A3B8] focus:outline-none"
                placeholder="Search products..."
              />
              {loading && (
                <div className="mr-3 h-4 w-4 animate-spin rounded-full border-2 border-[#0060B7]/20 border-t-[#0060B7]" />
              )}
            </div>
            <SearchDropdown />
          </div>
        </nav>
      </div>

      {/* Desktop Navbar */}
      <div className="sticky top-0 z-50 hidden border-b border-[#E2E8F0]/60 bg-white/80 backdrop-blur-xl md:block">
        <nav className="container relative mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex-shrink-0">
            <Image src={img1} alt="Logo" width={110} height={44} priority />
          </Link>

          {/* Nav links - absolutely centered */}
          <ul className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.path}
                  className={`relative whitespace-nowrap rounded-lg px-4 py-2 font-nunito text-[15px] font-medium transition-all duration-200 ${
                    pathname === link.path
                      ? "text-[#0060B7]"
                      : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0060B7]"
                  }`}
                >
                  {link.name}
                  {pathname === link.path && (
                    <span className="absolute bottom-0 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-[#0060B7]" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Search */}
          <div className="relative z-10" ref={searchRef}>
            <div className="flex items-center overflow-hidden rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] transition-all duration-200 focus-within:border-[#0060B7]/30 focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(0,96,183,0.06)]">
              <svg
                className="ml-3 h-4 w-4 flex-shrink-0 text-[#94A3B8]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-44 bg-transparent px-3 py-2 font-nunito text-sm text-[#191D23] placeholder:text-[#94A3B8] focus:outline-none lg:w-52"
                placeholder="Search products..."
              />
              {loading && (
                <div className="mr-3 h-4 w-4 animate-spin rounded-full border-2 border-[#0060B7]/20 border-t-[#0060B7]" />
              )}
            </div>
            <SearchDropdown />
          </div>
        </nav>
      </div>
    </>
  );
}
