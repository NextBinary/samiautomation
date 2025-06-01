/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "pub-e807a8ec22c247d58b3cc37fa87221e8.r2.dev",
      },
    ],
  },
};

export default nextConfig;
