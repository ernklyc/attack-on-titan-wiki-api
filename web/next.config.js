/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  eslint: {
    // ESLint kontrollerini derleme sırasında atla
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TypeScript kontrollerini derleme sırasında atla
    ignoreBuildErrors: true,
  },
  experimental: {
    // Ön derleme hatalarını atla
    skipTrailingSlashRedirect: true,
    skipMiddlewareUrlNormalize: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wikia.nocookie.net',
        pathname: '/**',
      }
    ],
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true
  },
};

module.exports = nextConfig;
