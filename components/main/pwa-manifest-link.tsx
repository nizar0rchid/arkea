'use client';

import { useEffect } from 'react';

export const PwaManifestLink = () => {
    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'manifest';
        link.href = '/game-content/index.manifest.json';
        document.head.appendChild(link);
        return () => {
            document.head.removeChild(link);
        };
    }, []);
    return null;
};