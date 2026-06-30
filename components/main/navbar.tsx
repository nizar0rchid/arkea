'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LINKS, NAV_LINKS, SOCIALS } from "@/constants";

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="w-full h-[65px] fixed top-0 bg-background z-50 px-10">
            {/* Navbar Container */}
            <div className="w-full h-full grid grid-cols-3 items-center">
                {/* Logo + Name (left) */}
                <Link href="/" className="flex items-center justify-self-start">
                    <div className="cursor-pointer">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            loading="eager"
                            width={658}
                            height={231}
                            draggable={false}
                            className="relative z-10 w-[130px] h-auto"
                        />
                    </div>
                </Link>

                {/* Web Navbar (center) */}
                <div className="hidden md:flex justify-self-center">
                    <div className="flex items-center justify-center gap-6 border-[rgba(112,66,248,0.38)] bg-[rgba(3,0,20,0.37)] px-6 py-[10px] rounded-full text-gray-200 whitespace-nowrap">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.title}
                                href={link.link}
                                className="cursor-pointer hover:text-[rgb(112,66,248)] transition font-bold"
                            >
                                {link.title}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Social Icons (Web, right) */}
                <div className="hidden md:flex flex-row gap-5 justify-self-end">
                    {SOCIALS.map(({ link, name, icon: Icon }) => (
                        <Link
                            href={link}
                            target="_blank"
                            rel="noreferrer noopener"
                            key={name}
                        >
                            <Icon className="h-9 w-9 text-white border border-white rounded-full p-2" />
                        </Link>
                    ))}
                </div>

                {/* Hamburger Menu (mobile only) */}
                <button
                    className="md:hidden col-start-3 justify-self-end text-white focus:outline-none text-4xl"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-[65px] left-0 w-full bg-background p-5 flex flex-col items-center -300 md:hidden">
                    {/* Links */}
                    <div className="flex flex-col items-center gap-4">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.title}
                                href={link.link}
                                className="cursor-pointer hover:text-[rgb(112,66,248)] transition text-center font-bold"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.title}
                            </Link>
                        ))}

                    </div>

                    {/* Social Icons */}
                    <div className="flex justify-center gap-6 mt-6">
                        {SOCIALS.map(({ link, name, icon: Icon }) => (
                            <Link
                                href={link}
                                target="_blank"
                                rel="noreferrer noopener"
                                key={name}
                            >
                                <Icon className="h-9 w-9 text-white border border-white rounded-full p-2" />
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};