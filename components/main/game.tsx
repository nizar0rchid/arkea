'use client';
import { useState, useRef, useEffect } from "react";

const isMobile = () => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const Game = () => {
    return (
        <div className="relative flex flex-col h-full w-full cente py-20">
            {/*  <video
        autoPlay
        muted
        loop
        className="rotate-180 absolute top-[-340px] left-0 w-full h-full object-cover -z-20 opacity-35"
      >
        <source src="/videos/blackhole.webm" type="video/webm" />
      </video>*/}

            <GameContent />
        </div>
    );
};


const GameContent = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [orientationLocked, setOrientationLocked] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const mobile = isMobile();

    useEffect(() => {
        const handleFullscreenChange = () => {
            const fs = !!document.fullscreenElement;
            setIsFullscreen(fs);
            
            if (!fs && orientationLocked) {
                setOrientationLocked(false);
                if (screen.orientation && screen.orientation.unlock) {
                    screen.orientation.unlock();
                }
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, [orientationLocked]);

    const toggleFullscreen = async () => {
        if (!document.fullscreenElement) {
            try {
                await iframeRef.current?.requestFullscreen();
                setIsFullscreen(true);

                if (mobile && screen.orientation && 'lock' in screen.orientation) {
                    try {
                        await screen.orientation.lock('landscape');
                        setOrientationLocked(true);
                    } catch (e) {
                        console.log('Orientation lock not supported or denied: ', e);
                    }
                }
            } catch (e) {
                console.error('Fullscreen failed:', e);
            }
        } else {
            if (orientationLocked && screen.orientation && 'unlock' in screen.orientation) {
                screen.orientation.unlock();
            }
            await document.exitFullscreen();
            setIsFullscreen(false);
            setOrientationLocked(false);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center h-full w-full px-4 gap-4">
            <iframe
                ref={iframeRef}
                src="/game-content/index.html"
                className="w-full max-w-5xl aspect-video"
                style={{ height: 'auto' }}
                allow="fullscreen; orientation=landscape"
            />
            <button
                onClick={toggleFullscreen}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
                {isFullscreen ? (
                    <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                        </svg>
                        Exit Fullscreen
                    </>
                ) : (
                    <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                        Enter Fullscreen
                    </>
                )}
            </button>
        </div>
    );
};