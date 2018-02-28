const Keys = require('../secret/keys.json').taobaoApi;
const ApiClient = require('./alibaba/index.js').ApiClient;
const DbUtils = require('./DbUtils');
const Md5 = require('md5');
// 淘宝客
const TBK = {
  TYPE: 'tbk',
  LIST: {
    URL: 'taobao.tbk.item.get',
    params: (page, pageSize, keyword, cat) => {
      return {
        'format': 'json',
        'fields': 'num_iid,title,pict_url,small_images,reserve_price,zk_final_price,user_type,provcity,item_url,seller_id,volume,nick',
        'q': `${keyword || ''}`,
        'cat': `${cat || ''}`,
        'page_no': `${page || 1}`,
        'page_size': `${pageSize || 20}`
      };
    }
  }
};
// 聚划算
const JHS = {
  TYPE: 'jhs',
  LIST: {
    URL: 'taobao.ju.items.search',
    params: (page, pageSize, keyword) => {
      return {
        'param_top_item_query': `{"current_page":${page || 1},"page_size":${pageSize || 20},"word":"${keyword}"}`
      };
    }
  }
};
// 优惠券
const COUPON = {
  TYPE: 'coupon',
  LIST: {
    URL: 'taobao.tbk.dg.item.coupon.get',
    params: (page, pageSize, keyword, cat, adzone) => {
      return {
        'q': `${keyword}`,
        'adzone_id': `${adzone || ''}`,
        'cat': `${cat || ''}`,
        'page_no': `${page || 1}`,
        'page_size': `${pageSize || 20}`
      };
    }
  }
};

function appForName (name) {
  return Keys.app_list[name];
}

function ChangedenDotNetAlibabaClient () {
  return clientForAppName('changeden.net');
}

function ChansosDotComAlibabaClient () {
  return clientForAppName('chansos.com');
}

function clientForAppName (name) {
  return clientForApp(appForName(name));
}

function clientForApp (app) {
  return clientForKeyAndSecret(app.appkey, app.appsecret);
}

function clientForKeyAndSecret (key, secret) {
  return new ApiClient({
    'appkey': key,
    'appsecret': secret,
    'REST_URL': Keys.REST_URL
  });
}

const ChangedenDotNetAdZone = adZoneForAppName('changeden.net');

const ChansosDotComAdZone = adZoneForAppName('chansos.com');

function adZoneForAppName (name) {
  return adZoneListForApp(appForName(name));
}

function adZoneListForApp (app) {
  return app.adzone || [];
}

function statisticsKeyword (keyword, type) {
  type = type || 'default';
  if (keyword) {
    DbUtils.simpleExecForTaobao(`insert into keyword(md5,keyword,amount,type) values('${Md5(`${type}_${keyword}`)}','${keyword}',1,'${type}') ON DUPLICATE KEY UPDATE amount=amount+1;`);
  }
}

function statisticsTbkKeyword (keyword) {
  statisticsKeyword(keyword, TBK.TYPE);
}

function statisticsJhsKeyword (keyword) {
  statisticsKeyword(keyword, JHS.TYPE);
}

function statisticsCouponKeyword (keyword) {
  statisticsKeyword(keyword, COUPON.TYPE);
}

function getHotKeywords (type, size) {
  let sqlWhere = '';
  if (type) {
    sqlWhere = `where type='${type}'`;
  }
  return DbUtils.simpleExecForTaobao(`select k.keyword,k.amount,k.type from keyword k ${sqlWhere} GROUP BY k.keyword,k.md5 order by k.amount,k.update_at desc limit 0,${size || 10};`);
}

function getTbkHotKeywords (size) {
  return getHotKeywords(TBK.TYPE, size);
}

function getJhsHotKeywords (size) {
  return getHotKeywords(JHS.TYPE, size);
}

function getCouponHotKeywords (size) {
  return getHotKeywords(COUPON.TYPE, size);
}

module.exports = {
  ChangedenDotNetAlibabaClient,
  ChangedenDotNetAdZone,
  ChansosDotComAlibabaClient,
  ChansosDotComAdZone,
  statisticsKeyword, statisticsTbkKeyword, statisticsJhsKeyword, statisticsCouponKeyword,
  getHotKeywords, getTbkHotKeywords, getJhsHotKeywords, getCouponHotKeywords,
  TBK, JHS, COUPON
};
