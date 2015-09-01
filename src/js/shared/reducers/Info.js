/**
 * Created by acezou on 15/9/1.
 */
import Immutable from 'immutable'
import ActionTypes from '../constants/ActionTypes'
import createReducer from '../lib/createReducer'

const initialState = Immutable.fromJS({})

export default createReducer(initialState, {
  [ActionTypes.Info.Request](state, { clientInfo }) {
    return state.merge({
      clientInfo,
    })
  },
  [ActionTypes.Info.Success](state, { res, restInfo }) {
    return state.merge({
      serverInfo: res.text,
      restInfo,
    })
  },
  [ActionTypes.Info.Failure](state, { error }) {
    return state.merge({
      serverInfo: undefined,
      errorInfo: error,
    })
  },
})