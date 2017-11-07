import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config'
import BrowserRouter from 'react-router-dom/BrowserRouter';
import createRoutes from './Routes';
import * as types from './types';
import configureStore from './store/configureStore';

// Grab the state from a global injected into
// server-generated HTML
const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState);
const routes = createRoutes(store);


// Router converts <Route> element hierarchy to a route config:
// Read more https://github.com/rackt/react-router/blob/latest/docs/Glossary.md#routeconfig
render(
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>, 
  document.getElementById('app')
);