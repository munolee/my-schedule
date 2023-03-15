/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  i18n,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  env: {
    API_DOMAIN: process.env.API_DOMAIN,
    GUEST_ID: process.env.GUEST_ID,
    GUEST_PW: process.env.GUEST_PW,
  },
};

module.exports = nextConfig;
