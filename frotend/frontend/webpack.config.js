const path = require('path');
const webpack = require('webpack'); // Import webpack here

module.exports = {
  // Other Webpack configuration options...

  plugins: [
    new webpack.DefinePlugin({
      'process.env.BASE_URL': JSON.stringify('your_actual_base_url_here'), // Replace with your actual base URL
    }),
  ],

  resolve: {
    fallback: {
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      // Add other fallbacks as needed.
    },
  },
};
