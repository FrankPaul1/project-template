/**
 * Created by acezou on 15/9/8.
 */
import createReducer from '../lib/createReducer'
import { Load } from '../constants/ActionTypes'
import Immutable from 'immutable'
import Qs from 'qs'
import { LOADING_KEY, LOADING_URL } from '../constants/symbol'

// handler load status
export default createReducer(Immutable.fromJS({}), {
  [Load.clear](state, params) {
    const url = params[LOADING_URL]
    // const status = state.get(key)
    return state.merge({
      [url]: {},
    })
  },
  [Load.loading](state, params) {
    const key = params[LOADING_KEY]
    const url = params[LOADING_URL]
    if (url) {
      let urlStatus = state.get(url)
      urlStatus = urlStatus.merge({[key]: true})
      return state.merge({[url]: urlStatus})
    }
    // const status = state.get(key)
    return state.merge({
      [key]: true,
    })
  },
  [Load.loaded](state, params) {
    const key = params[LOADING_KEY]
    const url = params[LOADING_URL]
    if (url) {
      let urlStatus = state.get(url)
      urlStatus = urlStatus.merge({[key]: false})
      return state.merge({[url]: urlStatus})
    }
    // const status = state.get(key)
    return state.merge({
      [key]: false,
    })
  },
})

export const generateLoadingUrl = (location = {}) => {
  return `URL_${location.pathname}?${Qs.stringify(location.query)}`
}

export const isLoading = (LoadState, key, location) => {
  if (!key && !location) return false
  if (!location) return !!LoadState.get(key)

  const loadingUrl = generateLoadingUrl(location)
  const urlStatus = LoadState.get(loadingUrl)
  if (!urlStatus) return false
  if (key) return !!urlStatus.get(key)

  // check page loading success
  let loading = false
  urlStatus.map(item => {
    if (item) loading = true
  })
  return loading
}
