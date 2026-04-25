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
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

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
        const container = iframeRef.current?.parentElement;
        if (!document.fullscreenElement) {
            try {
                await container?.requestFullscreen();
            } catch (e) {
                console.error('Fullscreen failed:', e);
            }
        } else {
            await document.exitFullscreen();
        }
    };

    const toggleRecording = async () => {
        if (isRecording) {
            mediaRecorderRef.current?.stop();
            setIsRecording(false);
            if (recordingTimerRef.current) {
                clearInterval(recordingTimerRef.current);
                setRecordingTime(0);
            }
            return;
        }

        if (!navigator.mediaDevices?.getDisplayMedia) {
            alert('Screen recording is not supported in this browser. Please use Chrome, Edge, or Safari.');
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: { cursor: "always" } as MediaTrackConstraints,
                audio: false,
                preferCurrentTab: true
            } as DisplayMediaStreamOptions);

            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'video/webm;codecs=vp9'
            });

            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `game-recording-${Date.now()}.webm`;
                a.click();
                URL.revokeObjectURL(url);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start(1000);
            mediaRecorderRef.current = mediaRecorder;
            setIsRecording(true);
            setRecordingTime(0);
            recordingTimerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);

            stream.getVideoTracks()[0].onended = () => {
                if (isRecording) {
                    mediaRecorder.stop();
                    setIsRecording(false);
                    if (recordingTimerRef.current) {
                        clearInterval(recordingTimerRef.current);
                        setRecordingTime(0);
                    }
                }
            };
        } catch (e) {
            console.error('Recording failed:', e);
        }
    };

    return (
        <div className="relative flex justify-center w-full px-4">
            <div className="relative w-full max-w-5xl">
                <div
                    className="relative w-full"
                    ref={iframeRef as any}
                >
                    <iframe
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
                    title={isRecording ? "Stop Recording" : "Start Recording (go fullscreen first for best experience)"}
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
            </div>
        </div>
        </div>
    );
};