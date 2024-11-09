/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/api/:path*",
      },
    ];
  },

  images: {
    domains: ["localhost"],
  },

  i18n: {
    locales: ["fa", "en", "fr", "es", "ar"],
    defaultLocale: "fa",
    localeDetection: false,
  },

  trailingSlash: true,

  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
