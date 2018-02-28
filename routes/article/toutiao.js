const router = require('express').Router();
const ResponseUtils = require('../../utils/ResponseUtils');
const ArticleUtils = require('../../utils/ArticleUtils');
router.get('/', (req, res) => {
  let query = req.query;
  let page = query.page || 1;
  let size = query.size || 10;
  let keyword = query.query || '';
  ArticleUtils.getToutiaoArticleList(page, size, keyword).then(result => {
    ResponseUtils.call(res, new ResponseUtils.ResponseSuccess('头条号文章列表获取成功'), {
      itemList: result || []
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
  let description = body.description || '';
  let image = body.image || '';
  let lang = body.lang || '';
  let ref = body.ref || '';
  if (title) {
    ArticleUtils.addToutiaoArticle(title, href, description, image, lang, ref).then(result => {
      ResponseUtils.call(res, new ResponseUtils.ResponseSuccess('头条号文章发布成功'), {
        id: result.insertId
      });
    }).catch(err => {
      console.error(err);
      ResponseUtils.call(res, new ResponseUtils.Exception.ServerException());
    });
  } else {
    ResponseUtils.call(res, new ResponseUtils.Exception.InvalidTitleException());
  }
});
module.exports = router;
