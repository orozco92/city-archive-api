module.exports = {
  apps: [
    {
      name: "city-archive-api",
      script: "./src/bin/www",
    },
  ],
  env: {
    NODE_ENV: "production",
  },
};
