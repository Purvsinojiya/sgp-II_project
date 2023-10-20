const path = require("path");

module.exports = function override(config, env) {
  // Add the Webpack fallback configuration here
  config.resolve.fallback = {
    "os": require.resolve("os-browserify/browser"),
    "crypto": require.resolve("crypto-browserify"),
    "buffer": require.resolve("buffer"),
    "process": require.resolve("process/browser"),
    "path": require.resolve('path-browserify'),
    "stream": require.resolve('stream-browserify'),

  };
  
  return config;
};
