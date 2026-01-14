import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "www.topstep.com",
      },
      {
        protocol: "https",
        hostname: "topstep.com",
      },
    ],
  },
  // Turbopack config for Next.js 16
  turbopack: {},
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@lexical-playground": path.resolve(__dirname, "public/lexical-playground/src"),
      "@lexical-playground/": path.resolve(__dirname, "public/lexical-playground/src/"),
    };
    return config;
  },
};

export default nextConfig;
