'use client';
import { useState, useRef, useEffect } from "react";

export const Game = () => {
    return (
        <div className="relative flex flex-col h-full w-full cente py-20">
            <GameContent />
        </div>
    );
};


const GameContent = () => {
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
        
        if (isIOS) {
            if (container) {
                if (!isFullscreen) {
                    container.style.position = 'fixed';
                    container.style.top = '0';
                    container.style.left = '0';
                    container.style.right = '0';
                    container.style.bottom = '0';
                    container.style.zIndex = '9999';
                    setIsFullscreen(true);
                } else {
                    container.style.position = '';
                    container.style.top = '';
                    container.style.left = '';
                    container.style.right = '';
                    container.style.bottom = '';
                    container.style.zIndex = '';
                    setIsFullscreen(false);
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
        <div className="relative flex justify-center w-full px-4">
            <div className="relative w-full max-w-5xl">
                <div
                    className="relative w-full"
                    ref={containerRef}
                >
                    <iframe
                        ref={iframeRef}
                        src="/game-content/index.html"
                        className="w-full aspect-video relative z-0"
                        style={{ height: 'auto' }}
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
        </div>
    );
};