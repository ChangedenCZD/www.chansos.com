const router = require('express').Router();
const ResponseUtils = require('../utils/ResponseUtils');
router.get('/', (req, res) => {
  res.redirect('/index.html');
});
router.get('/error/:message', (req, res) => {
  ResponseUtils.call(res, new ResponseUtils.ResponseSuccess(req.params.message), {});
});
module.exports = router;
