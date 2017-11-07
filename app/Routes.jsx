import React from 'react'

import Root from './Root'
import App from './components/App'
import Login from './components/Login'
import Register from './components/Register'

const routes = (store) => [
  { component: Root,
    routes: [
      { path: '/',
        exact: true,
        component: App
      },
      { path: '/login',
        component: Login
      },
      { path: '/register',
        component: Register
      }
    ]
  }
]
export default routes
