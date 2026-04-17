import { Hero } from "@/components/main/hero";
import {Game} from "@/components/main/game";

export default function GamePage() {
    return (
        <main className="h-full w-full">
            <div className="flex flex-col gap-20">
                <Game />
                {/*<Skills />*/}
                {/*  <Encryption />*/}
                {/*  <Projects />*/}
            </div>
        </main>
    );
}
