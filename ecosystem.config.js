module.exports = {
  apps: [{
    name: "csv-update-service",
    script: "./src/scripts/scheduleCSV.js",
    watch: false,
    instances: 1,
    exec_mode: "fork",
    exp_backoff_restart_delay: 100,
    max_memory_restart: "200M",
    env: {
      NODE_ENV: "production"
    },
    output: './logs/csv-service-out.log',
    error: './logs/csv-service-error.log'
  }]
}