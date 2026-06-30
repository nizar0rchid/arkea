"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

import {slideInFromLeft, slideInFromRight, slideInFromTop} from "@/lib/motion";

const MotionImg = motion.img;

export const HeroContent = () => {
    const { scrollY } = useScroll();

    const imageY = useTransform(scrollY, [0, 400], [0, 150]);
    const objectPositionY = useTransform(scrollY, [0, 170], [25, 100]);
    const objectPosition = useTransform(
        objectPositionY,
        (value) => `100% ${value}%`
    );

    return (
        <div className="relative flex flex-col items-center justify-center h-full w-full">


        <motion.div
            initial="hidden"
            animate="visible"
            className="w-full px-4 sm:px-6 md:px-10 z-20"
        >
            <motion.div
                variants={slideInFromLeft(0.5)}
                className="w-full h-[260px] sm:h-[340px] md:h-[420px] overflow-hidden relative"

            >
                {/* Background pan image */}
                <motion.div
                    style={{ y: imageY }}
                    className="absolute inset-0 h-[130%] w-full"
                >
                    <MotionImg
                        src="/home/hero/herobg.png"
                        alt="Logo"
                        draggable={false}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition,
                        }}
                    />
                </motion.div>

                {/* Overlay content */}
                <motion.div
                    variants={slideInFromTop}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 sm:gap-8 md:gap-4 z-10 text-center px-4 sm:px-6"
                >
                    <Image
                        src="/home/hero/herologo.png"
                        alt="Logo"
                        width={255}
                        height={80}
                        className=" h-auto object-contain max-w-[140px] sm:max-w-[190px] md:max-w-[255px]"
                    />
                    <Image
                        src="/home/hero/herotitle.png"
                        alt="Title"
                        width={589}
                        height={80}
                        className=" h-auto object-contain max-w-[260px] sm:max-w-[420px] md:max-w-[589px]"
                    />
                    <p className="text-white max-w-[280px] mt-4 sm:max-w-sm md:max-w-md text-xs sm:text-sm md:text-base leading-relaxed">
                        Every Element hides a Trial. Every Trial reveals a Secret. Explore
                        ArkeA, guide Pablob through elemental trials, solve ancient
                        puzzles, and uncover it's secrets!
                    </p>
                </motion.div>

                {/* Corner borders: top-left */}
                <div className="absolute top-0 left-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-t-2 border-l-2 md:border-t-3 md:border-l-3 border-border z-20 pointer-events-none" />

                {/* Corner borders: bottom-right */}
                <div className="absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border-b-2 border-r-2 md:border-b-3 md:border-r-3 border-border z-20 pointer-events-none" />
            </motion.div>
            {/* Overlapping image at the bottom of the hero */}
            <motion.div
                variants={slideInFromRight(0.5)}
                className="absolute -bottom-22 sm:-bottom-28 md:-bottom-52 left-1/2 -translate-x-1/2 z-30 pointer-events-none"

            >

                <Image
                    src="/home/hero/pablob.png"
                    alt="Floating character"
                    width={700}
                    height={666}
                    draggable={false}
                    className="h-auto object-contain max-w-[50vw] md:max-w-none"
                />

            </motion.div>
        </motion.div>
        </div>
    );
};