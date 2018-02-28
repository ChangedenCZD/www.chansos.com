const Class = require('./Class');
const Api = require('../api');

class BaseClass extends Class {
  constructor () {
    super();
    this.context = {
      Api: Api
    };
  }

  get Api () {
    return this.context.Api;
  }
}

module.exports = BaseClass;
