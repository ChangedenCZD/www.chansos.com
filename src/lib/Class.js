const BrowserUtils = require('../utils/BrowserUtils');
const ObjectSupport = require('../utils/ObjectSupport');

class Class {
  static to (url) {
    BrowserUtils.to(url);
  }

  static open (url) {
    BrowserUtils.open(url);
  }

  static back () {
    BrowserUtils.back();
  }

  static canBack () {
    return BrowserUtils.canBack();
  }

  static getValidParam (param) {
    return BrowserUtils.getValidParam(param);
  }

  static reload () {
    BrowserUtils.reload();
  }

  static setTitle (title) {
    BrowserUtils.setTitle(title);
  }

  static isSupportCss () {
    return BrowserUtils.cssSupports;
  }

  static clone (object) {
    return ObjectSupport.clone(object);
  }

  static stdout (message) {
    BrowserUtils.stdout(message);
  }
}

module.exports = Class;
