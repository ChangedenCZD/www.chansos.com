'use strict';
const shell = require('shelljs');
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const md5 = require('md5');
const srcDir = path.resolve(__dirname, '../src');
const entryRootPath = path.resolve(srcDir, './entry');
let entriesParser = getEntry(srcDir + '/module/**/config.json');
let entries = entriesParser[0];
let modulePageTitleList = entriesParser[1] || {};
let dirname = __dirname;

// 获取入口文件
function getEntry (globPath) {
  let entries = {}, modulePageTitleList = {};
  // 移除所有旧入口
  shell.rm('-rf', entryRootPath);
  shell.mkdir('-p', entryRootPath);
  // 根据config.json创建新入口
  glob.sync(globPath).forEach(function (filePath) {
    let config = require(filePath);
    let redirectUrl = (config['redirect-url'] || '').replace(/.html/g, '').split('/').filter((item) => {
      return !!item;
    }).join('/');
    let pageTitle = config['page-title'] || '';
    const modulePath = path.relative(entryRootPath, path.resolve(filePath, '../') + '/module.vue').replace(/\\/g, '/');
    let entryFilePath = path.resolve(entryRootPath, `./${md5(redirectUrl)}.js`);
    fs.writeFileSync(entryFilePath, `'use strict';
import {createEntry} from '../main.js';
import myComponent from '${modulePath}';
const app = createEntry(myComponent);
// Update at ${new Date()}
`, 'utf8');
    modulePageTitleList[redirectUrl] = pageTitle;
    entries[redirectUrl] = entryFilePath;
  });
  genEntriesInfoFile(entries, modulePageTitleList);
  return [entries, modulePageTitleList];
}

// 生成Html文件
function createHtml () {
  let r = [], conf;
  Object.keys(entries).forEach((key) => {
    conf = {
      filename: `${key}.html`,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency',
      inject: 'body',
      chunks: ['vendor', 'manifest', key],
      template: `${srcDir}/template/module/index.html`,
      timestamp: new Date().toLocaleString(),
      title: modulePageTitleList[key]
    };
    r.push(new HtmlWebpackPlugin(conf));
  });
  return r;
}

function genEntriesInfoFile (entries, modulePageTitleList) {
  setTimeout(() => {
    let entryArray = {};
    Object.keys(entries).forEach(key => {
      let filePath = entries[key] || '';
      if (typeof filePath === 'object') {
        filePath = filePath[filePath.length - 1];
      }
      entryArray[key] = {
        relativeUrl: `${key || ''}.html`,
        filePath: filePath,
        pageTitle: modulePageTitleList[key] || ''
      };
    });
    fs.writeFileSync(`${resolve('')}/PagesInfo.json`, JSON.stringify(entryArray), 'utf8');
  }, 1);
}

function resolve (dir) {
  return path.join(dirname, '..', dir);
}

module.exports = {
  context: path.resolve(dirname, '../'),
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [{
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: !config.dev.showEslintErrorsInOverlay
        }
      }] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: createHtml(),
};
