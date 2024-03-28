/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "notion.so" },
      { protocol: "https", hostname: "www.notion.so" },
    ],
  },
};

export default nextConfig;
