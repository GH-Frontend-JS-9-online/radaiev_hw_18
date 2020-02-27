// development config
const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: [
    'webpack-dev-server/client?http://localhost:7777',// bundle the client for webpack-dev-server and connect to the provided endpoint
    './index.tsx' // the entry point of our app
  ],
  devServer: {
 // enable HMR on the server
    inline: true,
    port: 7777,
    compress: true,
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
  ],
});
