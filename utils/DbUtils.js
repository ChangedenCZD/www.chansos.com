/**
 * 数据库工具类
 */
const mysql = require('mysql');
const config = require('../secret/database');
const MAX_THREAD = Math.max(require('os').cpus().length * 2 + 1, 3);

class MysqlConfig {
  constructor (mysqlConfig) {
    this.connectionLimit = MAX_THREAD;
    this.multipleStatements = true;
    this.hostChecked = false;
    this.$host = this.host = mysqlConfig.host;
    this.user = mysqlConfig.u;
    this.password = mysqlConfig.p;
    this.database = mysqlConfig.db;
    this._host = mysqlConfig._host;
    this.id = mysqlConfig.id;
    this.pool = null;
  }

  convert () {
    if (this.host === this.$host) {
      this.host = this._host;
    } else {
      this.host = this.$host;
    }
    return this;
  }

  setCheck (toggle) {
    this.hostChecked = toggle || false;
    return this;
  }

  isCheck () {
    if (!this.hostChecked) {
      this.createPool();
    }
    return this.hostChecked;
  }

  createPool () {
    let ctx = this;
    ctx.pool = mysql.createPool(ctx);
    ctx.pool.getConnection((err, connection) => {
      if (err && err.message.indexOf('connect ECONNREFUSED 127.0.0.1') >= 0) {
        ctx.pool = mysql.createPool(ctx.convert());
      }
      ctx.setCheck(true);
      destroy(connection);
    });
  }

  createClient (resolve) {
    let ctx = this;
    ctx.pool.getConnection((err, connection) => {
      if (err) {
        if (err.message.indexOf('connect ECONNREFUSED 127.0.0.1') >= 0) {
          ctx.pool = mysql.createPool(ctx.convert());
        }
        connection = mysql.createConnection(ctx);
      }
      typeof resolve === 'function' && resolve(connection);
    });
  }
}

const OFFICIAL_CONFIG = new MysqlConfig(config.official);
const TAOBAO_CONFIG = new MysqlConfig(config.taobao);

/**
 * 连接数据库
 * */

function clientForConfig (mysqlConfig) {
  return new Promise((resolve) => {
    let id = setInterval(() => {
      if (mysqlConfig.isCheck()) {
        clearInterval(id);
        mysqlConfig.createClient(resolve);
      }
    }, 100);
  });
}

function officialClient () {
  return clientForConfig(OFFICIAL_CONFIG);
}

function taobaoClient () {
  return clientForConfig(TAOBAO_CONFIG);
}

function destroy (client) {
  if (client) {
    if (client.release && typeof client.release === 'function') {
      client.release();
      console.log(`Database connect is release in ${new Date()}.`);
    } else if (client.end && typeof client.end === 'function') {
      client.end();
      console.log(`Database connect is end in ${new Date()}.`);
    }
  }
  client = null;
}

function simpleExec (clientPromiseObject, sql) {
  return new Promise((resolve, reject) => {
    clientPromiseObject.then(client => {
      client.query(sql, [], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
        destroy(client);
      });
    });
  });
}

function simpleExecForOfficial (sql) {
  return simpleExec(officialClient(), sql);
}

function simpleExecForTaobao (sql) {
  return simpleExec(taobaoClient(), sql);
}

module.exports = mysql;
module.exports.officialMysqlClient = officialClient;
module.exports.taobaoMysqlClient = taobaoClient;
module.exports.destroy = destroy;
module.exports.simpleExecForOfficial = simpleExecForOfficial;
module.exports.simpleExecForTaobao = simpleExecForTaobao;
