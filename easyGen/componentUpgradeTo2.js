const fs = require('fs');
const path = require('path');
const glob = require('glob');
const srcDir = path.resolve(__dirname, '../src');
const entryFileName = 'index.js';
glob.sync(srcDir + '/components/**/index.vue').forEach(entry => {
  const parentDir = path.resolve(entry, '../');
  let files = fs.readdirSync(parentDir);
  if (files.length && files.indexOf('component.js') < 0) {
    console.log(parentDir);
    files.forEach(file => {
      let filePath = path.resolve(parentDir, file);
      if (file.endsWith('.vue')) {
        let content = fs.readFileSync(filePath, 'utf8');
        fs.writeFileSync(filePath, content.replace(/\.\/index/g, './component'), 'utf8');
      }
      fs.renameSync(filePath, `${parentDir}/component.${file.split('.')[1]}`);
    });
    let entryFilePath = path.resolve(parentDir, entryFileName);
    fs.writeFileSync(entryFilePath, 'module.exports = require(\'./component.vue\');', 'utf8');
  }
});
