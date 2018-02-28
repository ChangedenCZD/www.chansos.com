/**
 * 文本工具类
 */
function checkLength (text, minLength, maxLength) {
  if (minLength > maxLength) {
    let min = minLength;
    minLength = maxLength;
    maxLength = min;
  } else if (minLength === maxLength) {
    maxLength = 0;
  }
  return new RegExp(`^[\\w|\\W]{${minLength}${maxLength ? `,${maxLength}` : ''}}$`).test(text);
}

function checkUrl (url) {
  let regex = /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/;
  return regex.test(url);
}

function checkEmail (email) {
  let regex = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return regex.test(email);
}

/**
 * 字符串转数字
 * */
function stringToNumber (str) {
  let num = 0;
  if (str) {
    str.split('').forEach((_, index) => {
      num += str.charCodeAt(index);
    });
  }
  return num;
}

function likeIp (str) {
  let isIp = false;
  if (str) {
    isIp = true;
    if (str !== 'localhost') {
      let hostPathList = str.split('.');
      (hostPathList || []).forEach((hostPath) => {
        if (isNaN(parseInt(hostPath))) {
          isIp = false;
        }
      });
    }
  }
  return isIp;
}

module.exports = {
  checkLength,
  checkUrl,
  checkEmail,
  stringToNumber,
  likeIp
};
