import { Game } from "@/components/main/game";
import { PWAInstallBanner } from "@/components/main/pwa-install-banner";

export default function GamePage() {
    return (
        <main className="h-full w-full pb-20">
            <div className="flex flex-col gap-20">
                <Game />
            </div>
            <PWAInstallBanner />
        </main>
    );
}
