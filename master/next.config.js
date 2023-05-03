// const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // webpack(config, options) {
  //   const { isServer } = options;
  //   config.plugins.push(
  //     new NextFederationPlugin({
  //       name: "master",
  //       filename: "static/chunks/remoteEntry.js",
  //       exposes: {
  //         "./Header": "./src/components/Header.tsx",
  //       },
  //     })
  //   );
  //   return config;
  // },
};

module.exports = nextConfig;
