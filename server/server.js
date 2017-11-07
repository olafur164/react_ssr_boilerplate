import express from 'express'
import webpack from 'webpack'
import path from 'path'
import { isDebug } from '../config/app';
import { connect } from './db'
import initPassport from './init/passport'
import initExpress from './init/express'
import initRoutes from './init/routes'
import renderMiddleware from './render/middleware'

const app = express()

connect()

initPassport()
/*
if (isDebug) {
  // enable webpack hot module replacement
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack/webpack.config.client');
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler));
  app.use(webpackHotMiddleware(compiler));
}
*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '..', 'public')));

initExpress(app)

initRoutes(app)

app.use('/', renderMiddleware)

app.listen(app.get('port'));