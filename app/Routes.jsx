import React from 'react'

import Root from './Root'
import App from './components/App'

const routes = [
  { component: Root,
    routes: [
      { path: '/',
        exact: true,
        component: App
      }
    ]
  }
]
export default routes
