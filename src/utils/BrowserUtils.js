let globalApp = null;

function stdout (message) {
  if (message instanceof Error) {
    console.error(message);
  } else if (typeof message === 'object') {
    console.info(message);
  } else {
    console.log(message);
  }
}

const os = (() => {
  const ua = navigator.userAgent;
  const isWindowsPhone = /(?:Windows Phone)/.test(ua);
  const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
  const isAndroid = /(?:Android)/.test(ua);
  const isFireFox = /(?:Firefox)/.test(ua);
  const isChrome = /(?:Chrome|CriOS)/.test(ua);
  const isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua));
  const isPhone = /(?:iPhone)/.test(ua) && !isTablet;
  const isIOS = /(?:iOS)/.test(ua);
  const isPc = !isPhone && !isAndroid && !isSymbian;
  return {
    isTablet,
    isPhone: isPhone || isIOS,
    isAndroid,
    isMobile: isPhone || isAndroid || isTablet || isIOS,
    isPc,
    isChrome
  };
})();
const cssSupports = (() => {
  let div = document.createElement('div');
  let vendors = ['Khtml', 'O', 'Moz', 'Webkit'];
  let len = vendors.length;
  return function (prop) {
    if (prop in div.style) {
      return true;
    }
    if ('-ms-' + prop in div.style) {
      return true;
    }
    prop = prop.replace(/^[a-z]/, (val) => {
      return val.toUpperCase();
    });
    while (len--) {
      if (vendors[len] + prop in div.style) {
        return true;
      }
    }
    return false;
  };
})();

function setWindowSize () {
  globalApp.$store.dispatch('setWindowSize', {
    height: window.innerHeight,
    width: window.innerWidth
  });
}

function registerGlobalApp (app) {
  globalApp = window.globalApp = app;
  isTest();
  setWindowSize();
}

function getUA () {
  return window.navigator.userAgent;
}

function initApp (app) {
  let ua = getUA();
  app.isWechat = /MicroMessenger/.test(ua);
  app.isQQ = /QQ/.test(ua);
  app.isTim = /TIM/.test(ua);
  app.isUCWeb = /UCBrowser/.test(ua);
  app.isAlipay = /AlipayClient/.test(ua);
  app.isAndroid = /Android/.test(ua);
  window.remScale = (window.fontSize = parseFloat(window.getComputedStyle(window.document.querySelector('html')).fontSize)) / 32;
}

function getValidParam (param) {
  if (typeof param === 'object') {
    param = param[param.length - 1];
  }
  return param;
}

function reload () {
  window.location.reload();
}

function back () {
  if (window.document.referrer) {
    window.history.go(-1);
  } else {
    window.opener = null;
    window.open('', '_self');
    window.close();
  }
}

function canBack () {
  let referrer = window.document.referrer;
  return referrer && referrer.length > 0;
}

function setTitle (title) {
  window.document.title = title;
}

function to (url) {
  window.location.href = url;
}

function open (url) {
  window.open(url);
}

function isTest () {
  return (window.isTest = require('../../utils/TextUtils').likeIp(window.location.hostname));
}

module.exports = {
  stdout,
  os,
  cssSupports,
  setWindowSize,
  registerGlobalApp,
  initApp,
  getValidParam,
  reload,
  back,
  canBack,
  setTitle,
  to,
  open,
  isTest
};
