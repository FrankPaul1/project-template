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
const api = createAPI(
  /**
   * Client's createRequest() method
   */
  ({ method, headers = {}, pathname, query = {}, body = {}}) => {
    // when use different api server need to config this
    // pathname = pathname.replace(new RegExp(`^${apiServer.urlPrefix}`), '')
    // var url = `${apiServer.urlPrefix}${pathname}`
    const url = pathname

    return request(method, url)
      .query(qs.stringify(query))
      .set(headers)
      .send(body)
  }
)

let __INITIAL_STATE__ = window.__INITIAL_STATE__
/* global __INITIAL_STATE__:true */
if (!__INITIAL_STATE__) {
  __INITIAL_STATE__ = {}
}
const store = createStore(api, __INITIAL_STATE__)

if (__ENV__ && __ENV__ === 'development') {
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
