'use client';
import { useState, useRef, useEffect } from "react";

export const Standalone = () => {
    return (
        <div className="relative flex flex-col h-screen w-full">
            <StandaloneContent />
            <InstallPromptHint />
        </div>
    );
};

const InstallPromptHint = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowHint(true);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    if (!showHint) return null;

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-purple-600/90 backdrop-blur-sm rounded-lg">
            <div className="flex items-center gap-3">
                <span className="text-white text-sm">Tap below to install ArkeA</span>
                <button
                    onClick={async () => {
                        if (deferredPrompt) {
                            (deferredPrompt as any).prompt();
                            const { outcome } = await (deferredPrompt as any).userChoice;
                            if (outcome === 'accepted') {
                                setShowHint(false);
                            }
                            setDeferredPrompt(null);
                        }
                    }}
                    className="px-3 py-1 bg-white text-purple-700 text-sm font-medium rounded hover:bg-purple-50 transition-colors"
                >
                    Install
                </button>
            </div>
        </div>
    );
};

const StandaloneContent = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const handleFullscreenChange = () => {
            const fs = !!document.fullscreenElement;
            setIsFullscreen(fs);

            if (iframeRef.current?.contentWindow) {
                iframeRef.current.contentWindow.postMessage(
                    fs ? 'fullscreen-enter' : 'fullscreen-exit',
                    '*'
                );
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleFullscreen = async () => {
        if (!document.fullscreenElement) {
            try {
                await iframeRef.current?.requestFullscreen();
            } catch (e) {
                console.error('Fullscreen failed:', e);
            }
        } else {
            await document.exitFullscreen();
        }
    };

    return (
        <div className="relative w-full h-screen">
            <iframe
                ref={iframeRef}
                src="/game-content/index.html"
                className="w-full h-full"
                allow="fullscreen"
            />
            <button
                onClick={toggleFullscreen}
                className="absolute top-2 left-2 sm:top-4 sm:left-4 p-2 sm:p-3 bg-purple-600/80 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 backdrop-blur-sm"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
                {isFullscreen ? (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                    </svg>
                ) : (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                )}
            </button>
        </div>
    );
};