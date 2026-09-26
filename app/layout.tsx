import type { Metadata, Viewport } from "next";
import { Figtree, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

/** Koppen, tekst, cijfers en UI: de hele site, net als de hero. */
const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});

/** Mono-labels in kapitalen. */
const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

// TODO: definitieve title en meta description laten vaststellen
export const metadata: Metadata = {
  title: "Get your company into Google's AI Overview",
  description:
    "There's a new number 1 spot on Google, above the ads and every blue link. Buyers stop scrolling there. We make sure it names you.",
  openGraph: {
    title: "Get your company into Google's AI Overview",
    description:
      "There's a new number 1 spot on Google, above the ads and every blue link. We make sure it names you.",
    locale: "en_GB",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
