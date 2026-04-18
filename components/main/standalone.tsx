'use client';
import { useState, useRef, useEffect } from "react";

export const Standalone = () => {
    const [showContent, setShowContent] = useState(false);

    return (
        <div className="relative flex flex-col h-screen w-full">
            {showContent && <StandaloneContent onReady={() => setShowContent(true)} />}
            <InstallPromptHint 
                showContent={showContent} 
                onShowContent={() => setShowContent(true)} 
            />
            {!showContent && (
                <LoadingOverlay />
            )}
        </div>
    );
};

const LoadingOverlay = () => {
    return (
        <div className="fixed inset-0 z-40 bg-[#030014] flex items-center justify-center">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-white text-sm">Preparing game...</p>
            </div>
        </div>
    );
};

interface InstallPromptHintProps {
    showContent: boolean;
    onShowContent: () => void;
}

const InstallPromptHint = ({ showContent, onShowContent }: InstallPromptHintProps) => {
    const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
    const [isIOS, setIsIOS] = useState(false);
    const [isInstalling, setIsInstalling] = useState(false);

    useEffect(() => {
        const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
        setIsIOS(iOS);

        if (iOS) return;

        let handler: ((e: Event) => void) | null = null;

        handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as any);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            if (handler) window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstall = async () => {
        setIsInstalling(true);
        
        if (deferredPrompt) {
            try {
                (deferredPrompt as any).prompt();
                const { outcome } = await (deferredPrompt as any).userChoice;
                if (outcome !== 'accepted') {
                    setIsInstalling(false);
                    return;
                }
            } catch {
                // continue anyway
            }
        }
        onShowContent();
    };

    const handleSkip = () => {
        onShowContent();
    };

    if (showContent) return null;

    const btnStyle = "px-4 py-2 bg-white text-purple-700 font-medium rounded-lg hover:bg-purple-50 transition-colors";

    return (
        <div className="fixed inset-0 z-50 bg-[#030014]/95 flex justify-center items-center p-4">
            <div className=" items-center justify-center text-center max-w-sm">
                <h2 className="text-2xl font-bold text-white mb-2">ArkeA</h2>
                <p className="text-purple-200 text-sm mb-6">
                    {isIOS 
                        ? "Tap Share → Add to Home Screen to install"
                        : "Install to play offline as a native app"
                    }
                </p>
                {!isIOS && (
                    <button onClick={handleInstall} className={btnStyle}>
                        {isInstalling ? "Installing..." : "Install App"}
                    </button>
                )}
                {isIOS && (
                    <div className="mt-4 text-purple-300 text-xs">
                        1. Tap the Share button<br/>
                        2. Scroll down and tap "Add to Home Screen"
                    </div>
                )}
                <button 
                    onClick={handleSkip}
                    className="block mt-4 mx-auto text-purple-400 text-sm hover:text-white transition-colors"
                >Continue without installing
                </button>
            </div>
        </div>
    );
};

interface StandaloneContentProps {
    onReady?: () => void;
}

const StandaloneContent = ({ onReady }: StandaloneContentProps) => {
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