import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: {
    unoptimized: true, // ✅ Tắt tối ưu ảnh
  },
  reactStrictMode: true,
  assetPrefix: isProd ? "./" : undefined,
};

export default nextConfig;
