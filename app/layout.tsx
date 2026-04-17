import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";
import { headers } from "next/headers";

import { Footer } from "@/components/main/footer";
import { Navbar } from "@/components/main/navbar";
import { StarsCanvas } from "@/components/main/star-background";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#030014",
};

export const metadata: Metadata = siteConfig;

export default async function RootLayout({ children }: PropsWithChildren) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  console.log(pathname)
  
  const isStandaloneGame = pathname.startsWith("/standalone-game");
  console.log(isStandaloneGame)

  return (
    <html lang="en">
      <body
        className={cn(
          "bg-[#030014]",
          isStandaloneGame ? "overflow-hidden" : "overflow-y-scroll overflow-x-hidden",
          inter.className
        )}
      >
        {!isStandaloneGame && <StarsCanvas />}
        {!isStandaloneGame && <Navbar />}
        {children}
        {!isStandaloneGame && <Footer />}
      </body>
    </html>
  );
}
