/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: 'https://manila-feline.netlify.app',
  reactStrictMode: true,
  swcMinify: true,
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  trailingSlash: true,
}

module.exports = nextConfig
