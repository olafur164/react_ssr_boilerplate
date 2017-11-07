import React from 'react'
import { withRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import Navigation from './components/Navigation'
import { Switch } from 'react-router'

const Root = ({ route }) => (
  <div>
      <Navigation />
      {renderRoutes(route.routes)}
  </div>
)

export default Root