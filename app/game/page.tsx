import { Game } from "@/components/main/game";
import { LayoutClient } from "@/components/main/layout-client";
import { PWAInstallBanner } from "@/components/main/pwa-install-banner";

export default function GamePage() {
    return (
        <LayoutClient>
            <main className="h-full w-full pb-20">
                <div className="flex flex-col gap-20">
                    <Game />
                </div>
                <PWAInstallBanner />
            </main>
        </LayoutClient>
    );
}
