import express from 'express'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

module.exports = (app) => {
  app.set('port', (process.env.PORT || 3000));
  const env = process.env.NODE_ENV || 'development'

  // view engine setup
  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view engine', 'pug');


  app.use(logger('dev'))
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser())

  app.use(express.static(path.join(__dirname, '../../', 'public')));
  
  console.log('--------------------------');
  console.log('===> 😊  Starting Server . . .');
  console.log(`===>  Environment: ${env}`);
  console.log(`===>  Listening on port: ${app.get('port')}`);
  if (env === 'production') {
    console.log('===> 🚦  Note: In order for authentication to work in production');
    console.log('===>           you will need a secure HTTPS connection');
  }
  console.log('--------------------------');
}
