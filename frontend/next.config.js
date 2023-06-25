/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  staticPageGenerationTimeout: 5000,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
