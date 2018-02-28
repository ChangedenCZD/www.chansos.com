const Class = require('./Class');
const axios = require('axios');

class ApiOptions extends Class {
  constructor (url, data, method) {
    super();
    this.globalApp = null;
    this.isSilence = false;
    this.options = {
      url,
      data,
      method,
      timeout: 60000,
      maxContentLength: 3145728
    };
  }

  /**
   * 添加params
   * */
  setParams (params) {
    this.options.params = params || {};
    return this;
  }

  /**
   * 设置为静默模式，不显示加载动画
   * */
  setSilence (isSilence) {
    this.isSilence = isSilence || false;
    return this;
  }

  showLoading () {
    let globalApp = this.globalApp;
    if (globalApp) {
      globalApp.$store.dispatch('showLoading', {
        duration: 60000
      });
    }
  }

  hideLoading () {
    let globalApp = this.globalApp;
    if (globalApp) {
      globalApp.$store.dispatch('hideLoading');
    }
  }

  getGlobalApp () {
    if (!this.globalApp) {
      this.globalApp = window.globalApp;
    }
  }

  request () {
    let self = this;
    self.getGlobalApp();
    let isSilence = self.isSilence;
    if (!isSilence) {
      self.showLoading();
    }
    return new Promise((resolve, reject) => {
      axios.request(self.options).then(response => {
        if (!isSilence) {
          self.hideLoading();
        }
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(response);
        }
      }).catch(err => {
        if (!isSilence) {
          self.hideLoading();
        }
        reject(err);
      });
    });
  }
}

module.exports = ApiOptions;
