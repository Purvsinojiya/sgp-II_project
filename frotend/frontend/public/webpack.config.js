const path = require('path');

module.exports = {
  entry: './src/index.js',  // Your entry file
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js',  // Output filename
  },
  module: {
    rules: [
      // Add loaders for handling different file types (e.g., Babel for JavaScript)
    ],
  },
  // Add additional plugins and configurations as needed
};
