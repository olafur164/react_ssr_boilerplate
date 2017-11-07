import express from 'express'
import { connect } from './db'
import initPassport from './init/passport'
import initExpress from './init/express'
import initRoutes from './init/routes'
import renderMiddleware from './render/middleware'

const app = express()

connect()

initPassport()

initExpress(app)

initRoutes(app)

app.use('/', renderMiddleware)

app.listen(app.get('port'));