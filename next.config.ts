import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: {
    unoptimized: true, // ✅ Tắt tối ưu ảnh
  },
  reactStrictMode: true,
};

export default nextConfig;
