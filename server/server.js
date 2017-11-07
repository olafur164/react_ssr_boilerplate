import express from 'express'
import initExpress from './init/express'
import renderMiddleware from './render/middleware'

const app = express()

initExpress(app)

app.use('/', renderMiddleware)

app.listen(app.get('port'));