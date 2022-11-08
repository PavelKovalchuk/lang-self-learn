const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...nextConfig,
      env: {
        mongodb_username: 'mongoPaul',
        mongodb_password: 'dsN6kdxUS8WepQin',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'lang-self-learn',
      },
    };
  }

  return {
    ...nextConfig,
    env: {
      mongodb_username: 'mongoPaul',
      mongodb_password: 'dsN6kdxUS8WepQin',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'lang-self-learn',
    },
  };
};

// module.exports = nextConfig;
