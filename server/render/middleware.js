import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux';
import { matchRoutes, renderRoutes } from 'react-router-config'
import fs from 'fs'
import createRoutes from '../../app/Routes'
import configureStore from '../../app/store/configureStore'

const router = express.Router()

router.get('*', (req, res) => {
  const authenticated = req.isAuthenticated()
  const store = configureStore({
    user: {
      authenticated,
      isWaiting: false,
      message: '',
      isLogin: true
    }
  })
  const routes = createRoutes(store)
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
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    )
    res.render('index', {title: 'Express', data: store.getState(), content})
  })
})

module.exports = router