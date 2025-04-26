"use client";

import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";

const RootWrapper = ({ children }) => {
  return (
    <div className="container-fluid">
      <Navbar />
      <div className="container mx-auto"> {children}</div>
      <Footer />
    </div>
  );
};

export default RootWrapper;
