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
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="mx-auto mb-4 w-48 h-48 object-contain"
                />

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
                        1. Tap the Share button in the browser's address bar<br/>
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
    const [isIOS, setIsIOS] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [recordingError, setRecordingError] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
        setIsIOS(iOS);
        console.log('Device iOS:', iOS, 'UA:', navigator.userAgent);
    }, []);

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

        const handleMessage = (e: MessageEvent) => {
            if (e.data?.type === 'recording-status') {
                switch (e.data.status) {
                    case 'started':
                        setIsRecording(true);
                        setRecordingTime(0);
                        setRecordingError(null);
                        break;
                    case 'stopped':
                        setIsRecording(false);
                        setRecordingTime(0);
                        break;
                    case 'timeupdate':
                        setRecordingTime(e.data.data);
                        break;
                    case 'download':
                        const a = document.createElement('a');
                        a.href = e.data.data;
                        a.download = `game-recording-${Date.now()}.webm`;
                        a.click();
                        break;
                    case 'error':
                        setRecordingError(e.data.data);
                        setIsRecording(false);
                        setRecordingTime(0);
                        break;
                    case 'status':
                        if (!e.data.data?.supported) {
                            setRecordingError('Canvas recording not supported');
                        } else if (!e.data.data?.hasCaptureStream) {
                            setRecordingError('Screen capture not available');
                        } else {
                            setRecordingError(null);
                        }
                        break;
                }
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        window.addEventListener('message', handleMessage);

        setTimeout(() => {
            iframeRef.current?.contentWindow?.postMessage({ type: 'recording-command', command: 'status' }, '*');
        }, 2000);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    const toggleFullscreen = async () => {
        const container = containerRef.current;
        
        if (isIOS && container) {
            console.log('iOS fullscreen toggle, current state:', isFullscreen);
            if (!isFullscreen) {
                container.style.setProperty('position', 'fixed');
                container.style.setProperty('top', '0');
                container.style.setProperty('left', '0');
                container.style.setProperty('width', '100vw');
                container.style.setProperty('height', '100vh');
                container.style.setProperty('zIndex', '2147483647');
                document.body.style.setProperty('overflow', 'hidden');
                setIsFullscreen(true);
                if (iframeRef.current?.contentWindow) {
                    iframeRef.current.contentWindow.postMessage({ type: 'fullscreen-enter' }, '*');
                }
            } else {
                container.style.removeProperty('position');
                container.style.removeProperty('top');
                container.style.removeProperty('left');
                container.style.removeProperty('width');
                container.style.removeProperty('height');
                container.style.removeProperty('zIndex');
                document.body.style.removeProperty('overflow');
                setIsFullscreen(false);
                if (iframeRef.current?.contentWindow) {
                    iframeRef.current.contentWindow.postMessage({ type: 'fullscreen-exit' }, '*');
                }
            }
            return;
        }
        
        if (!document.fullscreenElement) {
            try {
                await container?.requestFullscreen();
            } catch (e) {
                try {
                    await (container as any)?.webkitRequestFullscreen();
                } catch (e2) {
                    console.error('Fullscreen failed:', e2);
                }
            }
        } else {
            await document.exitFullscreen();
        }
    };

    const toggleRecording = () => {
        if (!iframeRef.current?.contentWindow) return;

        if (isRecording) {
            iframeRef.current.contentWindow.postMessage({ type: 'recording-command', command: 'stop' }, '*');
        } else {
            iframeRef.current.contentWindow.postMessage({ type: 'recording-command', command: 'start' }, '*');
        }
    };

    return (
        <div className="relative w-full h-screen">
            <div
                className="relative w-full h-full"
                ref={containerRef}
            >
                <iframe
                    ref={iframeRef}
                    src="/game-content/index.html"
                    className="w-full h-full"
                    allow="fullscreen"
                />
                <button
                    onClick={toggleFullscreen}
                    className="absolute top-2 left-2 sm:top-4 sm:left-4 p-2 sm:p-3 bg-purple-600/80 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 backdrop-blur-sm z-10"
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
                <button
                    onClick={toggleRecording}
                    className={`absolute top-2 right-2 sm:top-4 sm:right-4 p-2 sm:p-3 rounded-lg transition-colors duration-200 backdrop-blur-sm z-10 flex items-center gap-1 sm:gap-2 ${
                        isRecording
                            ? 'bg-red-600/80 hover:bg-red-700 animate-pulse'
                            : 'bg-gray-600/80 hover:bg-gray-700'
                    } text-white`}
                    title={isRecording ? "Stop Recording" : "Start Recording"}
                >
                    {isRecording ? (
                        <>
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                                <rect x="6" y="6" width="12" height="12" rx="2" />
                            </svg>
                            <span className="text-xs sm:text-sm font-mono">{Math.floor(recordingTime / 60)}:{String(recordingTime % 60).padStart(2, '0')}</span>
                        </>
                    ) : (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="8" />
                        </svg>
                    )}
                </button>
                {recordingError && (
                    <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 bg-red-600/90 text-white text-sm px-4 py-2 rounded-lg z-20">
                        {recordingError}
                    </div>
                )}
            </div>
        </div>
    );
};