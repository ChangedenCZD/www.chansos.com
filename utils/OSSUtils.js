const OSS = require('ali-oss');
const co = require('co');
const ALI_OSS_CONFIGS = require('../secret/keys')['ali-oss'];

class OSSClient {
  constructor (config) {
    this.client = new OSS(config);
  }

  uploadFile (remoteFilePath, localFilePath) {
    return this.client.put(remoteFilePath, localFilePath);
  }

  uploadFileSync (remoteFilePath, localFilePath) {
    co(function* () {
      let result = yield uploadFile(remoteFilePath, localFilePath);
      if (result.res.status === 200) {
        console.log(`${remoteFilePath} upload success.`);
      } else {
        throw new Error(`${remoteFilePath} upload fail.`);
      }
    }).catch(function (err) {
      console.log(err);
    });
  }

}

class FileClient extends OSSClient {
  constructor () {
    super(ALI_OSS_CONFIGS['file']);
  }
}

class ImageClient extends OSSClient {
  constructor () {
    super(ALI_OSS_CONFIGS['image']);
  }
}

function uploadFile (remoteFilePath, localFilePath) {
  const client = new OSS({
    region: 'oss-cn-shenzhen',
    accessKeyId: 'LTAIFAqWV5iLdPS1',
    accessKeySecret: 'QANuZIw5rppequqt9RgCM9AjLxzqEB',
    bucket: 'official-file'
  });
  return client.put(remoteFilePath, localFilePath);
}

function uploadFileSync (remoteFilePath, localFilePath) {
  co(function* () {
    let result = yield uploadFile(remoteFilePath, localFilePath);
    if (result.res.status === 200) {
      console.log(`${remoteFilePath} upload success.`);
    } else {
      throw new Error(`${remoteFilePath} upload fail.`);
    }
  }).catch(function (err) {
    console.log(err);
  });
}

module.exports = {FileClient, ImageClient};
