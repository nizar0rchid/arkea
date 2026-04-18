import { Encryption } from "@/components/main/encryption";
import { Hero } from "@/components/main/hero";
import { LayoutClient } from "@/components/main/layout-client";
import { Projects } from "@/components/main/projects";
import { Skills } from "@/components/main/skills";

export default function Home() {
  return (
    <LayoutClient>
      <main className="h-full w-full">
        <div className="flex flex-col gap-20">
          <Hero />
          {/*<Skills />*/}
        {/*  <Encryption />*/}
        {/*  <Projects />*/}
        </div>
      </main>
    </LayoutClient>
  );
}
