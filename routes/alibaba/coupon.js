const router = require('express').Router();
const ResponseUtils = require('../../utils/ResponseUtils');
const AlibabaUtils = require('../../utils/AlibabaUtils');
router.get('/', (req, res) => {
  let query = req.query;
  let page = query.page || 1;
  let size = query.size || 20;
  let keyword = query.query || '';
  AlibabaUtils.ChansosDotComAlibabaClient().execute(AlibabaUtils.COUPON.LIST.URL,
    AlibabaUtils.COUPON.LIST.params(page, size, keyword, '', AlibabaUtils.ChansosDotComAdZone[0])
    , (error, response) => {
      if (error) {
        console.error(error);
        ResponseUtils.call(res, new ResponseUtils.Exception.ServerException(), query);
      } else {
        if (response.results) {
          let result = response.results['tbk_coupon'] || [];
          ResponseUtils.call(res, new ResponseUtils.ResponseSuccess('优惠券列表获取成功'), {
            itemList: result
          });
        }
      }
    });
  AlibabaUtils.statisticsCouponKeyword(keyword);
});

router.get('/keywords', (req, res) => {
  let query = req.query;
  let size = query.size || 10;
  AlibabaUtils.getCouponHotKeywords(size).then(data => {
    ResponseUtils.call(res, new ResponseUtils.ResponseSuccess('优惠券热门关键词获取成功'), {
      itemList: data
    });
  }).catch(err => {
    console.error(err);
    ResponseUtils.call(res, new ResponseUtils.Exception.ServerException());
  });
});
module.exports = router;
