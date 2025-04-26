"use client";

import Navbar from "@/components/shared/navbar";

const RootWrapper = ({ children }) => {
  return (
    <div className="container mx-auto">
      <Navbar />
      {children}
    </div>
  );
};

export default RootWrapper;
