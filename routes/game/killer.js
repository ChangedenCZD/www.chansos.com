const router = require('express').Router();
const ResponseUtils = require('../../utils/ResponseUtils');
router.get('/', (req, res) => {
  ResponseUtils.call(res, new ResponseUtils.ResponseSuccess('房间列表获取成功'), {});
});
module.exports = router;
