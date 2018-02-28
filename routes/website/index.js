const router = require('express').Router();
const ResponseUtils = require('../../utils/ResponseUtils');
const WebsiteUtils = require('../../utils/WebsiteUtils');
const TextUtils = require('../../utils/TextUtils');
router.get('/', (req, res) => {
  let query = req.query;
  WebsiteUtils.get(query.href, query.title, query.type).then(result => {
    ResponseUtils.call(res, new ResponseUtils.ResponseSuccess('推荐网站列表获取成功'), {
      itemList: result
    });
  }).catch(err => {
    console.error(err);
    ResponseUtils.call(res, new ResponseUtils.Exception.ServerException());
  });
});
router.post('/', (req, res) => {
  let body = req.body || {};
  let title = body.title || '';
  let href = body.href || '';
  let email = body.email || '';
  let type = body.type || 0;
  if (!TextUtils.checkLength(title, 2, 14)) {
    ResponseUtils.call(res, new ResponseUtils.Exception.InvalidTitleException('标题应为2～14位'));
  } else if (!TextUtils.checkUrl(href)) {
    ResponseUtils.call(res, new ResponseUtils.Exception.InvalidUrlException());
  } else if (!TextUtils.checkEmail(email)) {
    ResponseUtils.call(res, new ResponseUtils.Exception.InvalidEmailException());
  } else {
    WebsiteUtils.add(title, href, email, type).then(() => {
      ResponseUtils.call(res, new ResponseUtils.ResponseSuccess('推荐网站添加成功'), body);
    }).catch(err => {
      if (err.message.indexOf('Duplicate entry') >= 0) {
        ResponseUtils.call(res, new ResponseUtils.Exception.DuplicateEntryException(), body);
      } else {
        ResponseUtils.call(res, new ResponseUtils.Exception.ServerException(), body);
      }
    });
  }
});
router.put('/', (req, res) => {
  let body = req.body || {};
  let title = body.title || '';
  let href = body.href || '';
  let email = body.email || '';
  let nEmail = body.nEmail || '';
  let type = body.type || 0;
  if (!TextUtils.checkLength(title, 2, 14)) {
    ResponseUtils.call(res, new ResponseUtils.Exception.InvalidTitleException('标题应为2～14位'));
  } else if (!TextUtils.checkUrl(href)) {
    ResponseUtils.call(res, new ResponseUtils.Exception.InvalidUrlException());
  } else if (!TextUtils.checkEmail(email)) {
    ResponseUtils.call(res, new ResponseUtils.Exception.InvalidEmailException());
  } else if (nEmail && !TextUtils.checkEmail(nEmail)) {
    ResponseUtils.call(res, new ResponseUtils.Exception.InvalidEmailException('请输入正确的联系邮箱'));
  } else {
    WebsiteUtils.update(title, href, type, email, nEmail).then(result => {
      if (result.affectedRows > 0) {
        ResponseUtils.call(res, new ResponseUtils.ResponseSuccess('推荐网站修改成功'), body);
      } else {
        ResponseUtils.call(res, new ResponseUtils.Exception.IllegalArgumentException(), body);
      }
    }).catch(err => {
      console.error(err);
      ResponseUtils.call(res, new ResponseUtils.Exception.ServerException(), body);
    });
  }
});
router.delete('/', (req, res) => {
  let body = req.body || {};
  let href = body.href || '';
  let email = body.email || '';
  if (!TextUtils.checkUrl(href)) {
    ResponseUtils.call(res, new ResponseUtils.Exception.InvalidUrlException());
  } else if (!TextUtils.checkEmail(email)) {
    ResponseUtils.call(res, new ResponseUtils.Exception.InvalidEmailException());
  } else {
    WebsiteUtils.remove(href, email).then(result => {
      if (result.affectedRows > 0) {
        ResponseUtils.call(res, new ResponseUtils.ResponseSuccess('推荐网站删除成功'), body);
      } else {
        ResponseUtils.call(res, new ResponseUtils.Exception.IllegalArgumentException(), body);
      }
    }).catch(err => {
      console.error(err);
      ResponseUtils.call(res, new ResponseUtils.Exception.ServerException(), body);
    });
  }
});
module.exports = router;
