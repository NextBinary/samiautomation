"use client";

import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import WhatsAppButton from "@/components/shared/ui/WhatsAppButton";

const RootWrapper = ({ children }) => {
  return (
    <div className="container-fluid">
      <Navbar />
      <div className="container mx-auto"> {children}</div>
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default RootWrapper;
