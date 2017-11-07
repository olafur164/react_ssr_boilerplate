'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _template = require('lodash/template');
var baseTemplate = _fs2.default.readFileSync('./public/index.html');
var template = _template(baseTemplate);

var App = process.env.NODE_ENV === 'production' ? require('../../client/components/App').default : require('../../app/components/App').default;

var router = _express2.default.Router();

router.get('*', function (req, res) {
  var context = {};
  var body = (0, _server.renderToString)(_react2.default.createElement(App, null));
  res.send(template({ body: body }));
});

module.exports = router;