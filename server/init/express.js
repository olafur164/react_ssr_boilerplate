import express from 'express'
import path from 'path'
import logger from 'morgan'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import flash from 'connect-flash'
import session from 'express-session';
import unsupportedMessage from '../db/unsupportedMessage';
import { sessionSecret } from '../../config/secrets';
import { DB_TYPE, ENV } from '../../config/env';
import { session as dbSession } from '../db';

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

  let sessionStore = null;
  if (!dbSession) {
    console.warn(unsupportedMessage('session'));
  } else {
    sessionStore = dbSession();
  }

  const sess = {
    resave: false,
    saveUninitialized: false,
    secret: sessionSecret,
    proxy: true, // The "X-Forwarded-Proto" header will be used.
    name: 'sessionId',
    // Add HTTPOnly, Secure attributes on Session Cookie
    // If secure is set, and you access your site over HTTP, the cookie will not be set
    cookie: {
      httpOnly: true,
      secure: false,
    },
    store: sessionStore
  };
  

  app.use(session(sess));
  
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(flash());

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
