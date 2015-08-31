import _ from 'lodash'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { compose } from 'redux'
import { devTools, persistState } from 'redux-devtools'
import * as reducers from '../reducers'

function promiseMiddleware(api, { getState }) {
  return next =>
    function _r(action) {
      if (action && _.isFunction(action.then)) {
        return action.then(_r)
      }

      if (_.isFunction(action)) {
        return _r(action(api, getState))
      }

      return next(action)
    }
}

export default function(api, initialState) {
  let createStoreWithMiddleware
  const reducer = combineReducers(reducers)
  if (__CLIENT__ === true && __ENV__ && __ENV__ === 'development') {
    const finalCreateStore = compose(
      devTools(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
      createStore
    )
    createStoreWithMiddleware = applyMiddleware(promiseMiddleware.bind(null,
      api))(finalCreateStore)
  } else {
    createStoreWithMiddleware = applyMiddleware(promiseMiddleware.bind(null,
      api))(createStore)
  }
  return createStoreWithMiddleware(reducer, initialState)
}
