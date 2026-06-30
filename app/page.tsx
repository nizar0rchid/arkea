import {RootBackground} from "@/components/home/rootBackground";
import {Hero} from "@/components/main/hero";

export default function Home() {
    return (
        <main className="relative   min-h-screen overflow-hidden">
            <RootBackground />
            <div className="  flex mt-20  items-start justify-center min-h-screen">
                <Hero/>
            </div>
        </main>

    );
}


