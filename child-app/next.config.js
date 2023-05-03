const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "/child",
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: "child",
        remotes: {
          master: `master@http://localhost:3000/_next/static/${
            isServer ? "ssr" : "chunks"
          }/remoteEntry.js`,
        },
        filename: "static/chunks/remoteEntry.js",
      })
    );

    return config;
  },
};

module.exports = nextConfig;
