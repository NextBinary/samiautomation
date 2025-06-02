import { fontVariables } from "@/fonts/index";
import { Env } from "@/utils/env";
import "./globals.css";
import RootWrapper from "./root-provider";
import { Toaster } from "sonner";

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

export const metadata = {
  title: {
    default: "SAMI Automation",
    template: "%s | Next Starter",
  },
  description: "Starter Templates",
  openGraph: {
    url: Env.site_url,
    images: [{ url: `${Env.site_url}og.jpg`, alt: "Next Starter" }],
  },
};
