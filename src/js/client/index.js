window.__CLIENT__ = true
window.__SERVER__ = false

import React from 'react'
import History from 'react-router/lib/BrowserHistory'
import { Provider } from 'react-redux'
import request from 'superagent'
import qs from 'qs'
import HideableDebugPanel from './HideableDebugPanel'
import createStore from '../shared/lib/createStore'
import createAPI from '../shared/lib/createAPI'
import Router from '../shared/AppRouter'
import createLogger from './createLogger'

// import css
import '../../css/foundation-apps.css'
import '../../css/global.css'

// create global logger, use logger.debug && logger.info && logger.log && logger.error everywhere
window.logger = createLogger()

const history = new History()

const store = createStore((window.__INITIAL_STATE__ || {}))

if (window.__ENV__ === 'development') {
  React.render(
    <div>
      <div style={{marginRight: '300px'}}>
        <Provider {...{store}}>
          {() => <Router {...{history}} />}
        </Provider>
      </div>
      <HideableDebugPanel store={store} />
    </div>,
    document.getElementById('main')
  )
} else {
  React.render(
    <Provider {...{store}}>
      {() => <Router {...{history}} />}
    </Provider>,
    document.getElementById('main')
  )
}