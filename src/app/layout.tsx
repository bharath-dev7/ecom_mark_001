import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/Toast";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZEYANA | Sarees & Royal Ethnic Collection",
  description:
    "Discover India's finest handloom sarees — Kanjivaram, Banarasi, Silk, Chiffon & Festive Collections. Curated for royal elegance.",
  keywords: [
    "sarees",
    "handloom",
    "silk sarees",
    "Indian sarees",
    "Kanjivaram",
    "Banarasi",
    "Zeyana sarees",
    "festive collection",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF6EE] text-[#241416]">
        <ToastProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
