// ecosystem.config.js
module.exports = {
    apps: [{
      name: "csv-update-service",
      script: "./src/scripts/scheduleCSV.js",
      watch: false,
      instances: 1,
      autorestart: true,
      max_memory_restart: '200M',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        NODE_ENV: "production",
      }
    }]
  };