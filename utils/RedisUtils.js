/**
 * Created by changeden on 2017/7/18.
 * Redis 工具类
 */
const redis = require('redis');
const RedisInfo = require('../secret/keys').redis;
let client = null;
let lastUpdate = null;

function createClient () {
  lastUpdate = Date.now();
  return redis.createClient(RedisInfo.port, RedisInfo.host, {
    password: RedisInfo.password
  });
}

function getClient () {
  if (!lastUpdate || lastUpdate < (Date.now() - 4000)) {
    quit();
    client = createClient();
  }
  return client;
}

function quit () {
  if (client) {
    client.quit();
  }
  client = null;
}

function set (key, value, expire) {
  const client = getClient();
  client.set(key, value || '', 'EX', expire || 86400);
}

function get (key) {
  return new Promise((resolve, reject) => {
    const client = getClient();
    client.get(key, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function remove (key) {
  set(key, null, 1);
}

module.exports = {
  set,
  get,
  remove
};
