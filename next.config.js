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
        domain: 'http://localhost:3000',
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
      domain: 'https://candid-halva-9c890c.netlify.app',
    },
  };
};

// module.exports = nextConfig;
