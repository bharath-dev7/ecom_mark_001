import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "सारी Collection | Premium Handloom Sarees from India",
  description:
    "Discover India's finest handloom sarees — Kanjivaram, Banarasi, Chanderi, and more. Curated from master weavers across the country. Shop now and order via WhatsApp.",
  keywords: [
    "sarees",
    "handloom",
    "silk sarees",
    "Indian sarees",
    "Kanjivaram",
    "Banarasi",
    "online saree store",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16 sm:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
