import type { NextConfig } from "next";
const isProd = process.env.NODE_ENV === "production";
const nextConfig: NextConfig = {
  /* config options here */
  assetPrefix: isProd ? "/authTest/" : "",
  output: "export",
};

export default nextConfig;
