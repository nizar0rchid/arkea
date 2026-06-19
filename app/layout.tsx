import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { Footer } from "@/components/main/footer";
import {Navbar} from "@/components/main/navbar";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#030014",
};

export const metadata: Metadata = {
  title: "Arkea",
  description: "Arkea",
  openGraph: {
    title: "Arkea",
    description: "Arkea",
    url: "https://arkeaspace.com",
    siteName: "Arkea",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arkea",
    description: "Arkea",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#212121] ">
      {/*< Navbar />*/}
        {children}
{/*
      <Footer />
*/}
      </body>
    </html>
  );
}