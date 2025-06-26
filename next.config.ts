import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'evara.vn',
        port: '',
        pathname: '/uploads/plugin/product_items/**',
      },
    ],
  },
};

export default nextConfig;
