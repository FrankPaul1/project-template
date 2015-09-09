/**
 * Created by acezou on 15/7/17.
 */
import React, { PropTypes } from 'react'
import { Load } from '../constants/ActionTypes'
import { LOADING_URL, CALL_API } from '../constants/symbol'
import { generateLoadingUrl } from '../reducers/Load'

export default function prepareRoute(prepareFn) {
  return DecoratedComponent => class PrepareRouteDecorator extends React.Component {
    static prepareRoute = prepareFn

    static contextTypes = {
      store: PropTypes.object.isRequired,
    }

    render() {
      return (
        <DecoratedComponent {...this.props} />
      )
    }

    componentDidMount() {
      const {
        context: { store },
        props: { params, location },
      } = this

      const _dispatch = store.dispatch
      const loadingUrl = generateLoadingUrl(location)
      _dispatch({type: Load.clear, [LOADING_URL]: loadingUrl})
      const dispatch = async (action) => {
        if (action[CALL_API]) action[LOADING_URL] = loadingUrl
        await _dispatch(action)
      }

      prepareFn({store, params, location, dispatch})
    }
  }
}
