const router = require('express').Router();
const ResponseUtils = require('../../utils/ResponseUtils');
const AlibabaUtils = require('../../utils/AlibabaUtils');
router.get('/keywords', (req, res) => {
  let query = req.query;
  let size = query.size || 10;
  AlibabaUtils.getHotKeywords('', size).then(data => {
    ResponseUtils.call(res, new ResponseUtils.ResponseSuccess('热门关键词获取成功'), {
      itemList: data
    });
  }).catch(err => {
    console.error(err);
    ResponseUtils.call(res, new ResponseUtils.Exception.ServerException());
  });
});
module.exports = router;
