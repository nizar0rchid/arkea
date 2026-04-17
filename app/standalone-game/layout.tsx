import type { Metadata } from "next";

export const metadata: Metadata = {
    manifest: "/game-content/index.manifest.json",
};

export default function StandaloneGameLayout({ children }: { children: React.ReactNode }) {
    return children;
}