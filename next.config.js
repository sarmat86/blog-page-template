module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      require('./src/utils/generate-sitemap');
    }
    return config;
  },
};