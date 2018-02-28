const router = require('express').Router();
const ResponseUtils = require('../../utils/ResponseUtils');
const WebsiteUtils = require('../../utils/WebsiteUtils');
router.get('/', (req, res) => {
  WebsiteUtils.getType().then(result => {
    ResponseUtils.call(res, new ResponseUtils.ResponseSuccess('推荐网站分类列表获取成功'), {
      itemList: result
    });
  }).catch(err => {
    console.error(err);
    ResponseUtils.call(res, new ResponseUtils.Exception.ServerException());
  });
});
module.exports = router;
