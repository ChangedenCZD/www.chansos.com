let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let sassMiddleware = require('node-sass-middleware');
let lessMiddleware = require('less-middleware');
let glob = require('glob');
let dirname = __dirname;

let app = express();

// view engine setup
app.set('views', path.join(dirname, 'views'));
app.set('view engine', 'ejs');
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Origin', 'https://changeden.net');
  res.header('Access-Control-Allow-Origin', 'https://www.changeden.net');
  res.header('Access-Control-Allow-Origin', 'https://hk.changeden.net');
  res.header('Access-Control-Allow-Origin', 'https://chansos.com');
  res.header('Access-Control-Allow-Origin', 'https://www.chansos.com');
  next();
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
  extended: false,
  keepExtensions: true,
  parameterLimit: 1000000,
  limit: '50mb',
  uploadDir: dirname + '/upload'
}));
app.use(cookieParser());
app.use(lessMiddleware(path.join(dirname, 'public')));
app.use(express.static(path.join(dirname, 'public')));

// 动态添加路由
const routeRootDir = (path.resolve(dirname, './routes') || '').replace(/\\/g, '/');
glob.sync(`${routeRootDir}/**/*.js`).forEach(entry => {
  let routePath = entry.replace(new RegExp(routeRootDir), '').replace(new RegExp('.js'), '');
  if (routePath.endsWith('/index')) {
    routePath = routePath.substr(0, routePath.lastIndexOf('/') + 1);
  }
  app.use((routePath === '/' ? '' : '/api') + routePath, require(entry));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // let err = new Error('Not Found');
  // err.status = 404;
  // next(err);
  res.redirect('/404.html?url=' + encodeURIComponent(req.originalUrl));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

global.memory = {};
module.exports = app;
