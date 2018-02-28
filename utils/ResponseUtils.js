/**
 * 接口响应工具类
 */
class ResponseBody {
  constructor (exception, result) {
    this.code = exception.code;
    this.message = exception.message;
    this.result = result;
    this.timeStamp = Date.now();
  }
}

function call (res, exception, result) {
  res.json(new ResponseBody(exception, result));
}

class ResponseException {
  constructor (code, message) {
    this.code = code;
    this.message = message || '突如其来的异常';
  }
}

class ResponseSuccess extends ResponseException {
  constructor (message) {
    super(0, message || '接口调用成功');
  }
}

class IllegalArgumentException extends ResponseException {
  constructor (message) {
    super(1001, message || '非法参数');
  }
}

class InvalidIdException extends ResponseException {
  constructor (message) {
    super(2002, message || '无效的Id');
  }
}

class InvalidTitleException extends ResponseException {
  constructor (message) {
    super(2003, message || '无效的标题');
  }
}

class InvalidUrlException extends ResponseException {
  constructor (message) {
    super(2004, message || '无效的链接');
  }
}

class InvalidEmailException extends ResponseException {
  constructor (message) {
    super(2005, message || '无效的Email');
  }
}

class DuplicateEntryException extends ResponseException {
  constructor (message) {
    super(3001, message || '已有重复的内容');
  }
}

class ServerException extends ResponseException {
  constructor (message) {
    super(-1, message || '服务器异常');
  }
}

const Exception = {
  ResponseException,
  IllegalArgumentException,
  InvalidIdException, InvalidTitleException, InvalidUrlException, InvalidEmailException,
  DuplicateEntryException,
  ServerException
};
module.exports = {
  Exception, ResponseSuccess, call
};
