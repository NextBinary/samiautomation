import { fontVariables } from "@/fonts/index";
import "./globals.css";
import RootWrapper from "./root-provider";
import { Toaster } from "sonner";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://samiautomationbd.com/";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "SAMI Automation — Server Racks, Network Cabinets & Industrial Automation in Bangladesh",
    template: "%s | SAMI Automation",
  },
  description:
    "SAMI Automation is your trusted source for server racks, network cabinets, electrical panels, and industrial automation solutions in Bangladesh. Quality products at competitive prices.",
  keywords: [
    "server rack",
    "network cabinet",
    "electrical panel",
    "industrial automation",
    "rack mount",
    "server cabinet",
    "network rack",
    "data center rack",
    "power distribution",
    "cable management",
    "Bangladesh",
    "Dhaka",
    "SAMI Automation",
  ],
  openGraph: {
    type: "website",
    siteName: "SAMI Automation",
    locale: "en_US",
    url: siteUrl,
    title: "SAMI Automation — Server Racks & Industrial Automation Solutions",
    description:
      "Your trusted source for server racks, network cabinets, electrical panels, and industrial automation solutions in Bangladesh.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "SAMI Automation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SAMI Automation — Server Racks & Industrial Automation Solutions",
    description:
      "Your trusted source for server racks, network cabinets, electrical panels, and industrial automation solutions in Bangladesh.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={fontVariables}>
        <Toaster position="bottom-right" richColors />
        <RootWrapper>{children}</RootWrapper>
      </body>
    </html>
  );
}
