/* eslint-disable no-undef */
require('shelljs/global');
const fs = require('fs-extra');

let targetDir = 'public';
let list = fs.readdirSync('dist');
list.forEach((item) => {
  let src = './dist/' + item;
  let target = targetDir + '/' + item;
  rm('-rf', target);
  if (fs.statSync(src).isDirectory()) {
    mkdir('-p', target);
  }
  fs.copy(src, target, err => {
    if (err) {
      rm('-rf', target);
      console.error(err);
    } else {
    }
  });
});
return {};
