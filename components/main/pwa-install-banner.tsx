'use client';

import { useState } from 'react';
import Link from 'next/link';

export const PWAInstallBanner = () => {
    const [dismissed, setDismissed] = useState(false);

    if (dismissed) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-purple-900/90 to-purple-800/80 backdrop-blur-sm border-t border-purple-500/30">
            <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-purple-700 flex items-center justify-center flex-shrink-0">
                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L2 12h3v8h14v-8h3L12 2zm0 2.84L18.84 12H17v8H7v-8H5.16L12 4.84z"/>
                            <path d="M10 14v-2h4v2h-4z"/>
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white font-semibold text-sm">Install ArkeA</span>
                        <span className="text-purple-200 text-xs">Play offline as a native app</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Link
                        href="/standalone-game"
                        className="px-4 py-2 bg-white text-purple-700 font-medium rounded-lg text-sm hover:bg-purple-50 transition-colors"
                    >
                        Install
                    </Link>
                    <button
                        onClick={() => setDismissed(true)}
                        className="p-2 text-purple-300 hover:text-white transition-colors"
                        aria-label="Dismiss"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};