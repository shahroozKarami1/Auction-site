/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  async rewrites() {
    return [
      {
        source: "/api/:path*", // Capture all /api routes
        destination: "http://localhost:8000/api/:path*", // Forward to backend
      },
    ];
  },

  images: {
    domains: ["localhost"],
  },

  i18n: {
    locales: ["fa", "en"],
    defaultLocale: "fa",
    localeDetection: false,
  },

  trailingSlash: true,
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
