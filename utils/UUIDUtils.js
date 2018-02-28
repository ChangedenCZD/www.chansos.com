/**
 * uuid工具类
 */
const UUID = require('uuid');

function v1 () {
  return UUID.v1().toString().replace(/-/g, '');
}

function v4 () {
  return UUID.v4().toString().replace(/-/g, '');
}

module.exports = {
  v1,
  v4
};
