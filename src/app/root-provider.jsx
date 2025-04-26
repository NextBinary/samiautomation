"use client";

import Navbar from "@/components/shared/navbar";

const RootWrapper = ({ children }) => {
  return (
    <div className="container-fluid">
      <Navbar />
      <div className="container mx-auto"> {children}</div>
    </div>
  );
};

export default RootWrapper;
