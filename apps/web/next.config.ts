import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/core'],
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
};

export default nextConfig;
