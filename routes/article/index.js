const router = require('express').Router();
const ResponseUtils = require('../../utils/ResponseUtils');
const ArticleUtils = require('../../utils/ArticleUtils');
router.put('/:id', (req, res) => {
  let params = req.params;
  let id = params.id || '';
  let body = req.body || {};
  let sql = ``;
  for (let key in body) {
    if (key) {
      let value = body[key];
      sql += `,${key}=${typeof value === 'number' ? value : (`'${value}'`)}`;
    }
  }
  sql = sql.substr(1);
  if (sql) {
    ArticleUtils.updateArticle(id, sql).then(result => {
      if (result.affectedRows > 0) {
        ResponseUtils.call(res, new ResponseUtils.ResponseSuccess('文章内容更新成功'), {
          id, body
        });
      } else {
        ResponseUtils.call(res, new ResponseUtils.Exception.InvalidIdException(), {
          id, body
        });
      }
    }).catch(err => {
      console.error(err);
      ResponseUtils.call(res, new ResponseUtils.Exception.ServerException());
    });
  } else {
    ResponseUtils.call(res, new ResponseUtils.Exception.IllegalArgumentException(), {
      id, body
    });
  }
});
router.delete('/:id', (req, res) => {
  let params = req.params;
  let id = params.id || '';
  ArticleUtils.removeArticle(id).then(result => {
    console.log(result);
    if (result.affectedRows > 0) {
      ResponseUtils.call(res, new ResponseUtils.ResponseSuccess('文章删除成功'), {
        id
      });
    } else {
      ResponseUtils.call(res, new ResponseUtils.Exception.InvalidIdException(), {
        id
      });
    }
  }).catch(err => {
    console.error(err);
    ResponseUtils.call(res, new ResponseUtils.Exception.ServerException());
  });
});
module.exports = router;
