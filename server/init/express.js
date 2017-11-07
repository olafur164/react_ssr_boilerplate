import express from 'express'
import path from 'path'
import logger from 'morgan'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import gzip from 'compression'
import helmet from 'helmet'
import flash from 'connect-flash'
import session from 'express-session'
import unsupportedMessage from '../db/unsupportedMessage'
import { sessionSecret } from '../../config/secrets'
import { DB_TYPE, ENV } from '../../config/env'
import { session as dbSession } from '../db'

module.exports = (app) => {
  app.set('port', (process.env.PORT || 3000));
  const env = process.env.NODE_ENV || 'development'

  if (ENV === 'production') {
    app.use(gzip());
    // Secure your Express apps by setting various HTTP headers. Documentation: https://github.com/helmetjs/helmet
    app.use(helmet());
  }
  
  if (ENV === 'development') {
   app.use(logger('dev'))
  }
  
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(cookieParser())
  app.use(methodOverride())

  app.set('trust proxy', 'loopback')

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
