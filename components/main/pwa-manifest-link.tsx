'use client';

import { useEffect } from 'react';

export const PwaManifestLink = () => {
    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'manifest';
        link.href = '/game-content/index.manifest.json';
        document.head.appendChild(link);
        
        const metaApple = document.createElement('meta');
        metaApple.name = 'apple-mobile-web-app-capable';
        metaApple.content = 'yes';
        document.head.appendChild(metaApple);
        
        const metaAppleStatus = document.createElement('meta');
        metaAppleStatus.name = 'apple-mobile-web-app-status-bar-style';
        metaAppleStatus.content = 'black-translucent';
        document.head.appendChild(metaAppleStatus);
        
        const metaAppleTitle = document.createElement('meta');
        metaAppleTitle.name = 'apple-mobile-web-app-title';
        metaAppleTitle.content = 'ArkeA';
        document.head.appendChild(metaAppleTitle);
        
        return () => {
            document.head.removeChild(link);
            document.head.removeChild(metaApple);
            document.head.removeChild(metaAppleStatus);
            document.head.removeChild(metaAppleTitle);
        };
    }, []);

    return null;
};