import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://профижкх.рф/api/v1/:path*',
      },
    ];
  },
};

export default nextConfig;
