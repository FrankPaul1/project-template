/**
 * Created by acezou on 15/9/1.
 */
import ActionTypes from '../constants/ActionTypes'
import { CALL_API } from '../constants/symbol'

export default {
  getInfo() {
    return {
      clientInfo: 'this is info from client',
      /**
       * if want to fetch data by http request, return an object includes key [CALL_API]
       *   |- types and res is needed,
       *       |- types is an array contains 3 types: request, http request success, http request failure
       *       |- res is a function which params is api that can call http interface
       *              by using like api('/example/url', 'POST', params),
       *              the second and third params is not needed
       */
      [CALL_API]: {
        types: [ActionTypes.Info.Request, ActionTypes.Info.Success, ActionTypes.Info.Failure],
        res: api => api('/api/example/info'),
        restInfo: 'rest info',
      },
    }
  },
}
