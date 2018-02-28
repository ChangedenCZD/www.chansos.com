'use strict';
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
// const portfinder = require('portfinder');
// const path = require('path');
// const srcDir = path.resolve(__dirname, '../src');
// const pagePlugins = baseWebpackConfig.plugins;
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name]);
});
const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap, usePostCSS: true})
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: process.env.HOST || config.dev.host,
    port: process.env.PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? {
      warnings: false,
      errors: true,
    } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
  ]
});
// Object.keys(baseWebpackConfig.entry).forEach(name => {
//   console.log(name, modulePageTitleList[name]);
//   let absPath = baseWebpackConfig.entry[name];
//   let startIndex = absPath.indexOf('src/module');
//   let templatePath = absPath.substring(startIndex, absPath.lastIndexOf('.'));
//   devWebpackConfig.plugins.push(new HtmlWebpackPlugin({
//     filename: `${name}.html`,
//     template: `${templatePath}.html`,
//     chunks: ['vendor', 'manifest', name],
//     inject: true,
//     timestamp: new Date().toLocaleString()
//   }));
// });
// Object.keys(baseWebpackConfig.entry).forEach(key => {
//   devWebpackConfig.plugins.push(new HtmlWebpackPlugin({
//     filename: `${key}.html`,
//     inject: true,
//     chunks: ['vendor', 'manifest', key],
//     template: `${srcDir}/template/module/index.html`,
//     timestamp: new Date().toLocaleString()
//   }));
// });
// pagePlugins.forEach((plugin) => {
//   devWebpackConfig.plugins.push(plugin);
// });
module.exports = devWebpackConfig;
// module.exports = new Promise((resolve, reject) => {
//   portfinder.basePort = process.env.PORT || config.dev.port;
//   portfinder.getPort((err, port) => {
//     if (err) {
//       reject(err);
//     } else {
//       // publish the new Port, necessary for e2e tests
//       process.env.PORT = port;
//       // add port to devServer config
//       devWebpackConfig.devServer.port = port;
//       // Add FriendlyErrorsPlugin
//       devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
//         compilationSuccessInfo: {
//           messages: [`Your application is running here: http://${config.dev.host}:${port}`],
//         },
//         onErrors: config.dev.notifyOnErrors
//           ? utils.createNotifierCallback()
//           : undefined
//       }));
//       resolve(devWebpackConfig);
//     }
//   });
// });
