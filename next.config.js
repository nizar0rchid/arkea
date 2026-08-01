const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
    workboxOptions: {
        runtimeCaching: [
            {
                urlPattern: /^https:\/\/.*(youtube\.com|youtu\.be|googlevideo\.com)\/.*$/i,
                handler: "NetworkOnly",
            },
            {
                urlPattern: /^https:\/\/.*game-content\/.*$/i,
                handler: "NetworkFirst",
                options: {
                    cacheName: "game-content-cache",
                    networkTimeoutSeconds: 10,
                    expiration: {
                        maxEntries: 50,
                        maxAgeSeconds: 60 * 60 * 24 * 30,
                    },
                },
            },
        ],
    },
});

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

function computeGameVersion() {
    const pckPath = path.join(process.cwd(), "public", "game-content", "index.pck");
    try {
        const hash = crypto
            .createHash("md5")
            .update(fs.readFileSync(pckPath))
            .digest("hex")
            .slice(0, 8);
        return "v" + hash;
    } catch {
        return "v0";
    }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: {},
    env: {
        NEXT_PUBLIC_GAME_VERSION: computeGameVersion(),
    },
    async headers() {
        return [
            {
                source: "/standalone-game/:path*",
                headers: [
                    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
                    { key: "Cross-Origin-Embedder-Policy", value: "credentialless" },
                ],
            },
            {
                source: "/game-content/:path*",
                headers: [
                    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
                    { key: "Cross-Origin-Embedder-Policy", value: "credentialless" },
                ],
            },
        ];
    },
    allowedDevOrigins: ["10.186.146.33"],
};

module.exports = withPWA(nextConfig);