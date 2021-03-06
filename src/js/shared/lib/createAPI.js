import _ from 'lodash'
import qs from 'qs'
import URL from 'url'

/**
 * return api function base on createRequest function
 * Usage:
 *   api('/users/facebook')
 *   api('/users/facebook/repos')
 *   ...
 *
 * createRequest() may different from client and server sides
 * You can see createRequest() at:
 * Client: ../index.js
 * Server: ../../server/render.js
 */
export default function createAPI(createRequest) {
  return async function api(path, _method = 'GET', _params = {}) {
    let params = _params
    let method = _method
    const { pathname, query: queryStr } = URL.parse(path)
    let query
    let headers
    let body

    if (_.isObject(method)) {
      params = method
      method = 'GET'
    }

    query = qs.parse(queryStr)

    if (method === 'GET') {
      if (_.isObject(params)) {
        _.assign(query, params)
      }
    } else {
      body = params
    }

    return await new Promise((resolve, reject) => {
      createRequest({method, headers, pathname, query, body})
        .end((err, res) => {
          if (err) {
            return reject(err)
          }

          return resolve(res)
        })
    })
  }
}
