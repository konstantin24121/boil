module.exports = {
  apps: [
    {
      name: 'server',
      script: './implements/servers/ssr-server.js',
      instances: 1,
      autorestart: true,
      watch: ['./dist/server.js'],
      max_memory_restart: '1G',
      env: {
        IS_SERVER_BUNDLE: true,
        NODE_ENV: 'development',
      },
    },
    {
      name: 'hmr-server',
      script: './implements/servers/hmr-server.js',
      env: {
        IS_SERVER_BUNDLE: false,
        NODE_ENV: 'development',
        HMR: true,
      },
    },
    {
      name: 'dev:ssr-server',
      script: './implements/ecosystem/dev-ssr-server.js',
      env: {
        IS_SERVER_BUNDLE: true,
        NODE_ENV: 'development',
      },
    },
  ],
};
