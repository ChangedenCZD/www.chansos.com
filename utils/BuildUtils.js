const path = require('path');
const glob = require('glob');

const distDir = path.resolve(__dirname, '../dist');

function uploadWebsiteStaticFile () {
  let staticFileList = glob.sync(`${distDir}/**/static/**/*.*`) || [];
  const OSSUtils = require('./OSSUtils');
  const FileClient = new OSSUtils.FileClient();
  staticFileList.forEach(filePath => {
    let fileName = filePath.substr(filePath.indexOf('static/'));
    FileClient.uploadFileSync(fileName, filePath);
  });
}

function fixWebsiteHtmlFile () {
  let htmlFileList = glob.sync(`${distDir}/**/*.html`) || [];
  const fs = require('fs');
  htmlFileList.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8') || '';
    content = content.replace(/=\/static\//g, '=https://file.chansos.com/static/');
    fs.writeFileSync(filePath, content, 'utf8');
  });
}

module.exports = {uploadWebsiteStaticFile, fixWebsiteHtmlFile};
