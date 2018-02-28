const DbUtils = require('./DbUtils');
const TYPE = {
  Project: 'project',
  Toutiao: 'toutiao',
  Gongzhonghao: 'gongzhonghao'
};

function fixValue (value) {
  return value.replace(/'/g, '\\\'');
}

function addArticle (title, href, description, image, lang, ref, type) {
  return DbUtils.simpleExecForOfficial(`insert into article(title,href,description,image,lang,ref,type) values('${fixValue(title) || ''}','${fixValue(href) || ''}','${fixValue(description) || ''}','${fixValue(image) || ''}','${fixValue(lang) || ''}','${fixValue(ref) || ''}','${fixValue(type) || 'default'}');`);
}

function addProjectArticle (title, href, description, image, lang, ref) {
  return addArticle(title, href, description, image, lang, ref, TYPE.Project);

}

function addToutiaoArticle (title, href, description, image, lang, ref) {
  return addArticle(title, href, description, image, lang, ref, TYPE.Toutiao);

}

function addGongzhonghaoArticle (title, href, description, image, lang, ref) {
  return addArticle(title, href, description, image, lang, ref, TYPE.Gongzhonghao);

}

function updateArticle (id, sql) {
  return DbUtils.simpleExecForOfficial(`update article set ${sql} where id=${id}`);
}

function updateArticleStringKey (id, key, value) {
  return updateArticle(id, `${key}='${value}'`);
}

function updateArticleTitle (id, title) {
  return updateArticleStringKey(id, 'title', title);
}

function updateArticleHref (id, href) {
  return updateArticleStringKey(id, 'href', href);
}

function updateArticleDescription (id, description) {
  return updateArticleStringKey(id, 'description', description);
}

function updateArticleImage (id, image) {
  return updateArticleStringKey(id, 'image', image);
}

function updateArticleLang (id, lang) {
  return updateArticleStringKey(id, 'lang', lang);
}

function updateArticleRef (id, ref) {
  return updateArticleStringKey(id, 'ref', ref);
}

function updateArticleType (id, type) {
  return updateArticleStringKey(id, 'type', type);
}

function getArticleList (type, page, size, keyword) {
  let sqlWhere = ' where ';
  if (type) {
    sqlWhere += ` type='${type}' and `;
  }
  keyword = keyword || '';
  let filterSql = '';
  if (keyword) {
    let keyList = ['title', 'description', 'href', 'image', 'lang', 'ref', 'type'];
    keyList.forEach(key => {
      filterSql += ` or ${key} like '%${keyword}%' `;
    });
    filterSql = filterSql.substr(filterSql.indexOf('or') + 2);
  } else {
    filterSql = ' id != -1 ';
  }
  sqlWhere += ` (${filterSql}) `;
  page = page || 1;
  size = size || 20;
  return DbUtils.simpleExecForOfficial(`select * from article ${sqlWhere} order by update_at desc limit ${(page - 1) * size},${size};`);
}

function getProjectArticleList (page, size, keyword) {
  return getArticleList(TYPE.Project, page, size, keyword);
}

function getToutiaoArticleList (page, size, keyword) {
  return getArticleList(TYPE.Toutiao, page, size, keyword);
}

function getGongzhonghaoArticleList (page, size, keyword) {
  return getArticleList(TYPE.Gongzhonghao, page, size, keyword);
}

function removeArticle (id) {
  return DbUtils.simpleExecForOfficial(`delete from article where id = ${id};`);
}

module.exports = {
  addArticle,
  addProjectArticle,
  addToutiaoArticle,
  addGongzhonghaoArticle,
  getArticleList,
  getProjectArticleList,
  getToutiaoArticleList,
  getGongzhonghaoArticleList,
  removeArticle,
  updateArticle,
  updateArticleTitle,
  updateArticleHref,
  updateArticleDescription,
  updateArticleImage,
  updateArticleLang,
  updateArticleRef,
  updateArticleType
};
