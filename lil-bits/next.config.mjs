/** @type {import('next').NextConfig} */

// Used chatGPT to make sure this file is the same as next.config.js
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.thecocktaildb.com",
        port: "",
        pathname: "/images/media/drink/**",
      },
      {
        protocol: "https",
        hostname: "www.themealdb.com",
        port: "",
        pathname: "/images/media/meals/**",
      },
    ],
  },
};

export default nextConfig;
