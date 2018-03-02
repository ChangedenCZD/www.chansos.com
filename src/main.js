import 'es6-promise/auto';
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/index';
import Context from './lib/Context';
import BrowserUtils from './utils/BrowserUtils';

// const MOBILE_KEY = '/m';
Vue.use(VueRouter);
const router = new VueRouter({mode: 'history'});
require('./assets/css/reset.css');

function beforeCreate(app, api) {
  // const os = window.os = BrowserUtils.os;
  // const pathname = window.location.pathname;
  // if (os.isMobile && pathname.indexOf(MOBILE_KEY) !== 0) { // 切换为移动版
  //   window.location.pathname = MOBILE_KEY + pathname;
  // } else if (os.isPc && pathname.indexOf(MOBILE_KEY + '/') === 0) { // 切换为PC版
  //   window.location.pathname = pathname.substr(MOBILE_KEY.length);
  // } else {
  BrowserUtils.registerGlobalApp(app);
  if (!window.isTest) {
    api.addUrlStatistics();
    for (let key in console) {
      if (typeof console[key] === 'function') {
        console[key] = () => {
        };
      }
    }
  }
  // }
}

class Entry extends Context {
  constructor(myComponent) {
    super();
    let api = this.Api;
    this.components = {
      'myComponent': myComponent
    };
    this.el = '#app';
    this.store = store;
    this.router = router;
    this.created = function () {
      let self = this;
      Vue.nextTick(() => {
        beforeCreate(self, api);
      });
    };
    this.template = '<myComponent></myComponent>';
  }
}

function createEntry(myComponent) {
  return new Vue(new Entry(myComponent));
}

module.exports = {
  store: store,
  router: router,
  beforeCreate: beforeCreate,
  Vue: Vue,
  createEntry: createEntry
};
