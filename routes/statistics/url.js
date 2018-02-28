const router = require('express').Router();
const ResponseUtils = require('../../utils/ResponseUtils');
const TextUtils = require('../../utils/TextUtils');
const Url = require('url');
router.get('/add', (req, res) => {
  let url = decodeURIComponent(req.query.url || '');
  if (url) {
    let uri = Url.parse(url);
    let hostname = uri.hostname || '';
    if (!TextUtils.likeIp(hostname)) {
      let sql = `insert into url_statistics(href,pathname,query,hash,hostname,port,protocol,user_agent) values('${uri.href || ''}','${uri.pathname || ''}','${uri.query || ''}','${uri.hash || ''}','${hostname}','${uri.port || ''}','${uri.protocol || ''}','${req.headers['user-agent'] || ''}');`;
      require('../../utils/DbUtils').simpleExecForOfficial(sql).then(() => {
      }).catch((err) => {
        console.error(err);
      });
    }
  }
  ResponseUtils.call(res, new ResponseUtils.ResponseSuccess('提交成功'), url);
});
module.exports = router;
