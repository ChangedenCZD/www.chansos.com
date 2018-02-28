const ApiOptions = require('../lib/ApiOptions');
const config = require('./config');

const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const DELETE = 'DELETE';
const UPDATE = 'UPDATE';
module.exports = {
  demo: (page) => {
    return new ApiOptions(config.DEMO, {per_page: page}, GET).request();
  },
  /**
   * 淘宝联盟-关键词
   * */
  alibabaKeywordList: (size) => {
    return new ApiOptions(config.ALIBABA_KEYWORDS, {}, GET).setSilence(true).setParams({size}).request();
  },
  /**
   * 淘宝联盟-淘宝客-关键词
   * */
  alibabaTbkKeywordList: (size) => {
    return new ApiOptions(config.ALIBABA_TBK_KEYWORDS, {}, GET).setSilence(true).setParams({size}).request();
  },
  /**
   * 淘宝联盟-聚划算-关键词
   * */
  alibabaJhsKeywordList: (size) => {
    return new ApiOptions(config.ALIBABA_JHS_KEYWORDS, {}, GET).setSilence(true).setParams({size}).request();
  },
  /**
   * 淘宝联盟-优惠券-关键词
   * */
  alibabaCouponKeywordList: (size) => {
    return new ApiOptions(config.ALIBABA_COUPON_KEYWORDS, {}, GET).setSilence(true).setParams({size}).request();
  },
  /**
   * 淘宝联盟-淘宝客-商品-列表
   * */
  alibabaTbkProductList: (page, size, query) => {
    return new ApiOptions(config.ALIBABA_TBK_PRODUCT_LIST, {}, GET).setParams({page, size, query}).request();
  },
  /**
   * 淘宝联盟-聚划算-商品-列表
   * */
  alibabaJhsProductList: (page, size, query) => {
    return new ApiOptions(config.ALIBABA_JHS_PRODUCT_LIST, {}, GET).setParams({page, size, query}).request();
  },
  /**
   * 淘宝联盟-优惠券-列表
   * */
  alibabaCouponList: (page, size, query) => {
    return new ApiOptions(config.ALIBABA_COUPON_LIST, {}, GET).setParams({page, size, query}).request();
  },
  /**
   * 推荐网站-列表
   * */
  websiteList: (type, title, href) => {
    return new ApiOptions(config.WEBSITE, {}, GET).setParams({type, title, href}).request();
  },
  /**
   * 推荐网站-添加-记录
   * */
  addWebsite: (title, href, email, type) => {
    return new ApiOptions(config.WEBSITE, {title, href, email, type}, POST).request();
  },
  /**
   * 推荐网站-更新-记录
   * */
  updateWebsite: (title, href, type, email, nEmail) => {
    return new ApiOptions(config.WEBSITE, {title, href, type, email, nEmail}, PUT).request();
  },
  /**
   * 推荐网站-删除-记录
   * */
  removeWebsite: (href, email) => {
    return new ApiOptions(config.WEBSITE, {href, email}, DELETE).request();
  },
  /**
   * 推荐网站-类型-列表
   * */
  websiteTypeList: () => {
    return new ApiOptions(config.WEBSITE_TYPE, {}, GET).request();
  },
  /**
   * 文章-更新-记录
   * */
  updateArticle: (id, title, href, description, image, lang, ref, type) => {
    return new ApiOptions(`${config.ARTICLE}${id}`, {title, href, description, image, lang, ref, type}, PUT).request();
  },
  /**
   * 文章-删除-记录
   * */
  RemoveArticle: (id) => {
    return new ApiOptions(`${config.ARTICLE}${id}`, {}, DELETE).request();
  },
  /**
   * 文章-项目文章-列表
   * */
  getProjectArticleList: (page, size, query) => {
    return new ApiOptions(config.ARTICLE_PROJECT, {}, GET).setParams({page, size, query}).request();
  },
  /**
   * 文章-项目文章-添加-记录
   * */
  addProjectArticle: (title, href, description, image, lang, ref) => {
    return new ApiOptions(config.ARTICLE_PROJECT, {title, href, description, image, lang, ref}, POST).request();
  },
  /**
   * 文章-头条号-列表
   * */
  getToutiaoArticleList: (page, size, query) => {
    return new ApiOptions(config.ARTICLE_TOU_TIAO, {}, GET).setParams({page, size, query}).request();
  },
  /**
   * 文章-头条号-添加-记录
   * */
  addToutiaoArticle: (title, href, description, image, lang, ref) => {
    return new ApiOptions(config.ARTICLE_TOU_TIAO, {title, href, description, image, lang, ref}, POST).request();
  },
  /**
   * 文章-公众号-列表
   * */
  getGongzhonghaoArticleList: (page, size, query) => {
    return new ApiOptions(config.ARTICLE_GONG_ZHONG_HAO, {}, GET).setParams({page, size, query}).request();
  },
  /**
   * 文章-公众号-添加-记录
   * */
  addGongzhonghaoArticle: (title, href, description, image, lang, ref) => {
    return new ApiOptions(config.ARTICLE_GONG_ZHONG_HAO, {title, href, description, image, lang, ref}, POST).request();
  },
  /**
   * 添加Url统计记录
   * */
  addUrlStatistics: () => {
    return new ApiOptions(config.ADD_URL_STATISTICS, {}, GET).setParams({url: window.location.href}).setSilence(true).request();
  }
};
