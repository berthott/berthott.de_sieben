/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_BACKEND_URL.match(/^[^:]+/)[0],
        hostname: process.env.NEXT_PUBLIC_BACKEND_URL.match(/([^\/]+$)/)[0],
        pathname: '/assets/**',
      },
    ],
  },
};

export default nextConfig;
