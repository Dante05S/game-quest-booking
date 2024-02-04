/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'e00-elmundo.uecdn.es'
      }
    ]
  }
};

export default nextConfig;
