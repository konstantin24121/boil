module.exports = {
  apps: [
    {
      name: 'server',
      script: './implements/servers/ssr-server.js',
      instances: 1,
      autorestart: true,
      max_memory_restart: '1G',
      env: {
        PORT: 8080,
        NODE_ENV: 'production',
      },
    },
  ],
};
