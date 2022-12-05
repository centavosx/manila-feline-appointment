/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix:
    process.env.NODE_ENV === 'development'
      ? undefined
      : 'https://manila-feline.netlify.app',
  reactStrictMode: true,
  swcMinify: true,
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
  trailingSlash: true,
  experimental: {
    urlImports: [
      'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js',
    ],
  },
}

module.exports = nextConfig
