import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { matchRoutes, renderRoutes } from 'react-router-config'
import fs from 'fs'
import routes from '../../app/Routes'

const router = express.Router()

router.get('*', (req, res) => {
  const context = {}

  const loadBranchData = (location) => {
    const branch = matchRoutes(routes, location.pathname)

    const promises = branch.map(({ route, match }) => {
      return route.loadData
        ? route.loadData(match)
        : Promise.resolve(null)
    })
    return Promise.all(promises)
  }
  loadBranchData(req.url).then(data => {
    let context = {}
    const content = renderToString(
      <StaticRouter location={req.url} context={context}>
        {renderRoutes(routes)}
      </StaticRouter>
    )
    res.render('index', {title: 'Express', content})
  })
})

module.exports = router