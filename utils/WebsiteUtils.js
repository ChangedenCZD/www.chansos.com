const DbUtils = require('./DbUtils');
const md5 = require('md5');

function fixHref (href) {
  href = href || '';
  return href.endsWith('/') ? href.substr(0, href.lastIndexOf('/')) : href;
}

function hrefToMd5 (href) {
  return md5(href);
}

function fixType (type) {
  return type || 0;
}

function add (title, href, email, type) {
  href = fixHref(href);
  return DbUtils.simpleExecForOfficial(`insert into website(id,title,href,contact_email,type) values('${hrefToMd5(href)}','${title}','${href}','${email}',${fixType(type)});`);
}

function remove (href, email) {
  return DbUtils.simpleExecForOfficial(`delete from website where id = '${hrefToMd5(fixHref(href))}' and contact_email = '${email}';`);
}

function get (href, title, type) {
  return new Promise((resolve, reject) => {
    const RedisUtils = require('./RedisUtils');
    href = fixHref(href);
    title = title || '';
    const KEY = `website-list-${href}-${title}-${isNaN(parseInt(type)) ? '' : type}`;
    console.log(KEY);
    RedisUtils.get(KEY).then(result => {
      if (result && JSON.parse(result).length) {
        resolve(JSON.parse(result));
      } else {
        throw new Error();
      }
    }).catch(() => {
      let sql = `select w.title,w.href,w.contact_email email,w.update_at,t.type,t.name typeName from website w LEFT JOIN website_type t on w.type = t.type `;
      if (href) {
        sql += ` where id = ${hrefToMd5(href)} `;
      } else if (title) {
        sql += ` where title like '%${title}%' `;
      }
      if (!isNaN(parseInt(type))) {
        if (sql.indexOf(' where ') < 0) {
          sql += ' where ';
        } else {
          sql += ' and ';
        }
        sql += ` w.type=${type} `;
      }
      DbUtils.simpleExecForOfficial(sql + ` order by update_at desc;`).then(result => {
        RedisUtils.set(KEY, JSON.stringify(result), 4);
        resolve(result);
      }).catch(err => {
        reject(err);
      });
    });
  });
}

function update (title, href, type, oEmail, nEmail) {
  href = fixHref(href);
  let id = hrefToMd5(href);
  return DbUtils.simpleExecForOfficial(`update website set id='${id}'${title ? `,title='${title}'` : ''}${nEmail ? `,contact_email='${nEmail}'` : ''}${isNaN(parseInt(type)) ? '' : `,type=${fixType(type)}`} where id = '${id}' and contact_email = '${oEmail}';`);
}

function getType () {
  return new Promise((resolve, reject) => {
    const RedisUtils = require('./RedisUtils');
    const KEY = 'website-type';
    RedisUtils.get(KEY).then(result => {
      if (result && JSON.parse(result).length) {
        resolve(JSON.parse(result));
      } else {
        throw new Error();
      }
    }).catch(() => {
      DbUtils.simpleExecForOfficial(`select * from website_type order by type asc;`).then(result => {
        RedisUtils.set(KEY, JSON.stringify(result), 4);
        resolve(result);
      }).catch(err => {
        reject(err);
      });
    });
  });
}

module.exports = {
  add, remove, get, update, getType
};
