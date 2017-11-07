import React from 'react'
import { render } from 'react-dom'
import App from './components/App'

process.APP_STATE = window.APP_STATE || {}

render(
  <App />,
  document.getElementById('root')
);