const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
    runtimeCaching: [
        {
            urlPattern: /^https:\/\/.*game-content\/.*$/i,
            handler: "CacheFirst",
            options: {
                cacheName: "game-content-cache",
                expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 60 * 60 * 24 * 30,
                },
            },
        },
    ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: {},
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
                    { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
                ],
            },
        ];
    },
    allowedDevOrigins: ["10.186.146.33"],
};

module.exports = withPWA(nextConfig);