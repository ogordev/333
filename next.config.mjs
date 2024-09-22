/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ['vercel.com'], // Add any domains you're loading images from
    },
    // Uncomment the following if you're using rewrites or redirects
    // async rewrites() {
    //   return []
    // },
    // async redirects() {
    //   return []
    // },
    poweredByHeader: false,
    // Uncomment if you need to use WebAssembly
    // experimental: { webAssembly: true },
  };
  
  module.exports = nextConfig;