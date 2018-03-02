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
    let self = this;
    co(function* () {
      let result = yield self.uploadFile(remoteFilePath, localFilePath);
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

module.exports = {FileClient, ImageClient};
