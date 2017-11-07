import React from 'react'
import { withRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

const Root = ({ route }) => (
  <div>
      {renderRoutes(route.routes)}
  </div>
)

export default withRouter(Root)