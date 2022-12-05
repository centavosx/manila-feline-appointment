/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix:
    process.env.NODE_ENV === 'production'
      ? 'https://manila-feline.netlify.app'
      : undefined,
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
