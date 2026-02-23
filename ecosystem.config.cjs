// pm2 ecosystem config — run from repo root
// Usage: pm2 start ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: "ccc-gateway",
      cwd: "./apps/gateway",
      script: "node_modules/.bin/next",
      args: "start --port 3002",
      interpreter: "none",
      env: {
        NODE_ENV: "production",
        PORT: "3002",
      },
      max_memory_restart: "400M",
      restart_delay: 3000,
      watch: false,
    },
    {
      name: "ccc-web",
      cwd: "./apps/web",
      script: "node_modules/.bin/next",
      args: "start --port 3001",
      interpreter: "none",
      env: {
        NODE_ENV: "production",
        PORT: "3001",
      },
      max_memory_restart: "400M",
      restart_delay: 3000,
      watch: false,
    },
  ],
};
