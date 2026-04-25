/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? "/combat" : "";

const nextConfig = {
  basePath,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(vert|frag)$/,
      type: 'asset/source',
    });
    return config;
  },
};

export default nextConfig;
