let isTest = require('../utils/BrowserUtils').isTest();
const Network = require('../../secret/network');

function absoluteUrl (path) {
  let local = window.location;
  return `${local.protocol}//${local.hostname}${isTest ? `:${Network.port}` : ''}${path}`;
}

function apiUrl (path) {
  return absoluteUrl(`/api/${path}`);
}

function alibabaUrl (path) {
  return `${apiUrl('alibaba/')}${path}`;
}

function websiteUrl (path) {
  return `${apiUrl('website/')}${path}`;
}

function articleUrl (path) {
  return `${apiUrl('article/')}${path}`;
}

module.exports = {
  DEMO: 'https://api.github.com/repos/axios/axios/issues',
  ALIBABA_KEYWORDS: alibabaUrl('keywords'),
  ALIBABA_TBK_KEYWORDS: alibabaUrl('tbk/keywords'),
  ALIBABA_TBK_PRODUCT_LIST: alibabaUrl('tbk/'),
  ALIBABA_JHS_KEYWORDS: alibabaUrl('jhs/keywords'),
  ALIBABA_JHS_PRODUCT_LIST: alibabaUrl('jhs/'),
  ALIBABA_COUPON_KEYWORDS: alibabaUrl('coupon/keywords'),
  ALIBABA_COUPON_LIST: alibabaUrl('coupon/'),
  WEBSITE: websiteUrl(''),
  WEBSITE_TYPE: websiteUrl('type'),
  ARTICLE: articleUrl(''),
  ARTICLE_PROJECT: articleUrl('project/'),
  ARTICLE_TOU_TIAO: articleUrl('toutiao/'),
  ARTICLE_GONG_ZHONG_HAO: articleUrl('gongzhonghao/')
};
