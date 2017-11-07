'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 8000;

var app = (0, _express2.default)();

var renderMiddleware = require('./render/middleware');

app.use('*', renderMiddleware);

app.listen(port, function () {
  console.log('--------------------------');
  console.log('===> 😊  Starting Server . . .');
  console.log('===>  Environment: ' + env);
  console.log('===>  Listening on port: ' + port);
  console.log('--------------------------');
});