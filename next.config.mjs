import path from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? "/combat" : "";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  basePath,
  outputFileTracingRoot: __dirname,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(vert|frag)$/,
      type: 'asset/source',
    });
    return config;
  },
};

export default nextConfig;
