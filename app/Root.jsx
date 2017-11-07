import React from 'react'
import { withRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import Navigation from './components/Navigation'
import { Switch } from 'react-router'

const Root = ({ route }) => (
  <div>
      <Navigation />
      <Switch>
        {renderRoutes(route.routes)}
      </Switch>
  </div>
)

export default Root