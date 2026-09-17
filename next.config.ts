import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ottimizzazione per Vercel Edge & Serverless
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // Vercel Image Optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400, // 24 ore di cache su Vercel CDN
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.ebayimg.com",
      },
      {
        protocol: "https",
        hostname: "**.ebayimg.com",
      },
    ],
  },
};

export default nextConfig;
