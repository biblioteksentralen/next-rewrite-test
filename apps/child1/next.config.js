/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "/child1",
  experimental: {
    externalMiddlewareRewritesResolve: true
  }
}

module.exports = nextConfig
