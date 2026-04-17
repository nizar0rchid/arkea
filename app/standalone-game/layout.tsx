import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
    themeColor: "#030014",
};

export const metadata: Metadata = {
  ...siteConfig,
  manifest: '/standalone-game-manifest.json',
};

export default function StandaloneGameLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
        <body
            className={cn(
                "bg-[#030014] overflow-y-scroll overflow-x-hidden",
                inter.className
            )}
        >

        {children}
        </body>
        </html>
    );
}
