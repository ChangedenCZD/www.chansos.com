const router = require('express').Router();
const ResponseUtils = require('../../utils/ResponseUtils');
const AlibabaUtils = require('../../utils/AlibabaUtils');
router.get('/', (req, res) => {
  let query = req.query;
  let page = query.page || 1;
  let size = query.size || 20;
  let keyword = query.query || '';
  AlibabaUtils.ChansosDotComAlibabaClient().execute(AlibabaUtils.TBK.LIST.URL,
    AlibabaUtils.TBK.LIST.params(page, size, keyword, ''),
    (error, response) => {
      if (error) {
        console.error(error);
        ResponseUtils.call(res, new ResponseUtils.Exception.ServerException(), query);
      } else {
        if (response.results) {
          let result = response.results['n_tbk_item'] || [];
          ResponseUtils.call(res, new ResponseUtils.ResponseSuccess('推荐商品列表获取成功'), {
            itemList: result
          });
        }
      }
    });
  AlibabaUtils.statisticsTbkKeyword(keyword);
});
router.get('/keywords', (req, res) => {
  let query = req.query;
  let size = query.size || 10;
  AlibabaUtils.getTbkHotKeywords(size).then(data => {
    ResponseUtils.call(res, new ResponseUtils.ResponseSuccess('推荐商品热门关键词获取成功'), {
      itemList: data
    });
  }).catch(err => {
    console.error(err);
    ResponseUtils.call(res, new ResponseUtils.Exception.ServerException());
  });
});
module.exports = router;
