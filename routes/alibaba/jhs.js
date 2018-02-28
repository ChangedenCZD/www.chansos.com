const router = require('express').Router();
const ResponseUtils = require('../../utils/ResponseUtils');
const AlibabaUtils = require('../../utils/AlibabaUtils');
router.get('/', (req, res) => {
  let query = req.query;
  let page = query.page || 1;
  let size = query.size || 20;
  let keyword = query.query || '';
  AlibabaUtils.ChansosDotComAlibabaClient().execute(AlibabaUtils.JHS.LIST.URL,
    AlibabaUtils.JHS.LIST.params(page, size, keyword), (error, response) => {
      if (error) {
        console.error(error);
        ResponseUtils.call(res, new ResponseUtils.Exception.ServerException(), query);
      } else {
        let result = response.result['model_list'].items || [];
        ResponseUtils.call(res, new ResponseUtils.ResponseSuccess('聚划算列表获取成功'), {
          itemList: result
        });
      }
    });
  AlibabaUtils.statisticsJhsKeyword(keyword);
});

router.get('/keywords', (req, res) => {
  let query = req.query;
  let size = query.size || 10;
  AlibabaUtils.getJhsHotKeywords(size).then(data => {
    ResponseUtils.call(res, new ResponseUtils.ResponseSuccess('聚划算热门关键词获取成功'), {
      itemList: data
    });
  }).catch(err => {
    console.error(err);
    ResponseUtils.call(res, new ResponseUtils.Exception.ServerException());
  });
});
module.exports = router;
