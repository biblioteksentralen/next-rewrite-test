/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    externalMiddlewareRewritesResolve: true
  }
}

module.exports = nextConfig
