/**
 * Created by acezou on 15/9/1.
 */
/* global __SERVER__ */
import request from 'superagent'
import createAPI from './createAPI'
// import config from '../../server/config/config'
import { CALL_API } from '../constants/symbol'

function actionWith(action, data) {
  const finalAction = Object.assign({}, action, data);
  delete finalAction[CALL_API];
  return finalAction;
}

function serializeCookie(cookies = {}) {
  return Object.keys(cookies).map(key => (cookie.serialize(key, cookies[key]))).join('; ')
}

export default ({dispatch, getState}) => next => action => {
  if (typeof action === 'function') {
    action = action(dispatch, getState)
  }

  const callAPI = action[CALL_API]
  if (!callAPI) {
    return next(action)
  }

  const { res, types, ...rest } = callAPI

  const [REQUEST, SUCCESS, FAILURE] = types
  next(actionWith(action, {...rest, type: REQUEST}))

  // api is a function to create a http request to fetch data or update data
  let api
  if (__SERVER__) {
    api = createAPI(
      /**
       * Server's createRequest() method
       * You can modify headers, pathname, query, body to make different request
       * from client's createRequest() method
       */
      ({ method, headers = {}, pathname = '', query = {}, body = {}}) => {
        // const url = `http://${config.app.host}:${config.app.port}${pathname}`
        const url = `http://localhost:7777${pathname}`
        return request(method, url)
          .query(query)
          // .set('Cookie', serializeCookie(req.cookies))
          .set(headers)
          .send(body)
      }
    )
  } else {
    api = createAPI(
      /**
       * Client's createRequest() method
       */
      ({ method, headers = {}, pathname, query = {}, body = {}}) => {
        const url = pathname
        return request(method, url)
          .query(query)
          .set(headers)
          .send(body)
      }
    )
  }

  return res(api).then(
    (result) => next(actionWith(action, {...rest, res: result, type: SUCCESS})),
    (error) => next(actionWith(action, {...rest, res: error, type: FAILURE}))
  )
}
