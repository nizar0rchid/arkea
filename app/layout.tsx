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