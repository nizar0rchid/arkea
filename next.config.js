const withPWA = require('next-pwa')({
  dest: 'public',
  disable: false,
  register: true,
  scope: '/standalone-game',
  startUrl: '/standalone-game',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  webpack: (config) => {
    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
        ],
      },
    ];
  },
};

module.exports = withPWA(nextConfig);