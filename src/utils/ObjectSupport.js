function clone (target) {
  let obj = {};
  Object.keys(target).forEach(key => {
    obj[key] = target[key];
  });
  return obj;
}

module.exports = {clone};
