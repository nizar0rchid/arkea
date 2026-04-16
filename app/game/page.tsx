'use client';

import { useState, useEffect } from 'react';
import {Game} from "@/components/main/game";

export default function GamePage() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    });

    window.addEventListener('appinstalled', () => {
      setShowInstallButton(false);
      setDeferredPrompt(null);
    });
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      (deferredPrompt as any).prompt();
      const { outcome } = await (deferredPrompt as any).userChoice;
      if (outcome === 'accepted') {
        setShowInstallButton(false);
      }
      setDeferredPrompt(null);
    }
  };

  return (
    <main className="h-full w-full">
      {showInstallButton && (
        <button
          onClick={handleInstall}
          className="fixed bottom-4 right-4 z-50 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium shadow-lg"
        >
          Install Game
        </button>
      )}
      <div className="flex flex-col gap-20">
        <Game />
      </div>
    </main>
  );
}