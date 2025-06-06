"use client";
import { useRouter } from "next/navigation";

export default function ButtonBlue({ title, className = "", handler }) {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(handler);
      }}
      className={`relative z-30 overflow-hidden rounded-md border border-[#0060B7] px-6 py-1.5 font-nunito text-[14px] font-light text-[#0060B7] transition-all duration-700 after:absolute after:bottom-0 after:left-1/2 after:-z-20 after:h-1 after:w-1 after:-translate-x-1/2 after:translate-y-full after:rounded-md after:bg-[#0060B7] after:transition-all after:duration-700 hover:text-white after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 ${className}`}
    >
      {title}
    </button>
  );
}
