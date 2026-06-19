"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { UnderConstructionBg } from "@/components/main/under-construction-bg";
import { UnderConstructionContent } from "@/components/main/under-construction-content";

const SVGS = ["/SVG/1.svg", "/SVG/2.svg", "/SVG/3.svg", "/SVG/4.svg"];

export const UnderConstruction = () => {
  const [bg, setBg] = useState<string | null>(null);

  useEffect(() => {
    const current = Number(sessionStorage.getItem("uc-bg")) ?? -1;
    const next = current + 1 >= SVGS.length ? 0 : current + 1;
    sessionStorage.setItem("uc-bg", String(next));
    setBg(SVGS[next]);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen gap-6 overflow-hidden select-none">
      <UnderConstructionBg bg={bg} />
      <div className="absolute top-0 left-0 w-full z-20 py-4">
        <Image
          src="/SVG/border.svg"
          alt=""
          width={1440}
          height={37}
          unoptimized
          className="w-full h-auto"
          draggable={false}
        />
      </div>
      <UnderConstructionContent bg={bg} />
      <div className="absolute bottom-0 left-0 w-full z-20 py-4 rotate-180">
        <Image
          src="/SVG/border.svg"
          alt=""
          width={1440}
          height={37}
          unoptimized
          className="w-full h-auto"
          draggable={false}
        />
      </div>
    </div>
  );
};