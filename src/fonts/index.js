import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

// provide you all fonts, make sure to add variable properly and add that on tailwindcss.config. to use on  tailwindcss.config.js: inter: 'var(--font-inter)', (line no: 12)
const fontList = [nunito];

export const fontVariables = fontList.map((font) => font.variable).join(" ");
