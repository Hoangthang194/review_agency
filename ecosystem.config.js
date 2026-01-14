module.exports = {
    apps: [
      {
        name: "review-agency",
        script: "C:\\Program Files\\nodejs\\npm.cmd",
        args: "start",
        interpreter: "cmd",
        cwd: "C:\\Users\\Administrator\\Documents\\review_agency",
        autorestart: true,
        env: {
          NODE_ENV: "production",
          PORT: 3001
        }
      }
    ]
  }
  