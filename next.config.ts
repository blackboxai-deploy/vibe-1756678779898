import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/wikipedia/commons/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'blogdobagada.com.br',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['@/components/ui'],
  },
}

export default nextConfig