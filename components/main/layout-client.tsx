'use client';

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { StarsCanvas } from "@/components/main/star-background";
import { Navbar } from "@/components/main/navbar";
import { Footer } from "@/components/main/footer";

interface LayoutClientProps {
    children: React.ReactNode;
}

export const LayoutClient = ({ children }: LayoutClientProps) => {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const isStandaloneGame = pathname?.startsWith("/standalone-game");

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <>
            {!isStandaloneGame && <StarsCanvas />}
            {!isStandaloneGame && <Navbar />}
            {children}
            {!isStandaloneGame && <Footer />}
        </>
    );
};