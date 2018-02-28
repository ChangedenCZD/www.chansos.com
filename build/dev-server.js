const config = require('../config');
if (!process.env.NODE_ENV) process.env.NODE_ENV = config.dev.env;
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const webpackConfig = require('./webpack.dev.conf');
const port = process.env.PORT || config.dev.port;
const proxyTable = config.dev.proxyTable;
const app = express();
const compiler = webpack(webpackConfig);
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
});
const hotMiddleware = require('webpack-hot-middleware')(compiler);
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'});
    cb();
  });
});
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context];
  if (typeof options === 'string') {
    options = {target: options};
  }
  app.use(proxyMiddleware(context, options));
});
app.use(require('connect-history-api-fallback')());
app.use(devMiddleware);
app.use(hotMiddleware);
let staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));
module.exports = app.listen(port, '192.168.1.36', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Start website.');
  }
});

