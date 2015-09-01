import { createStore, combineReducers, applyMiddleware } from 'redux'
import { compose } from 'redux'
import { devTools, persistState } from 'redux-devtools'
import * as reducers from '../reducers'
import apiMiddleware from './apiMiddleware'

export default function(initialState, params) {
  let createStoreWithMiddleware
  const reducer = combineReducers(reducers)
  if (__CLIENT__ && __ENV__ === 'development') {
    const finalCreateStore = compose(
      devTools(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
      createStore
    )
    createStoreWithMiddleware = applyMiddleware(apiMiddleware(params))(finalCreateStore)
  } else {
    createStoreWithMiddleware = applyMiddleware(apiMiddleware(params))(createStore)
  }
  return createStoreWithMiddleware(reducer, initialState)
}
