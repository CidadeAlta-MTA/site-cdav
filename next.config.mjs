/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        pathname: "/avatars/**",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        pathname: "/embed/avatars/**",
      },
    ],
  },
  webpack(config) {
    config.output.chunkFilename = "static/chunks/[name].[contenthash].js";
    return config;
  },
};

export default nextConfig;