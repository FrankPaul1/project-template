/**
 * Created by acezou on 15/9/1.
 */
import { Info } from '../constants/ActionTypes'
import { CALL_API } from '../constants/symbol'

export default {
  getInfo() {
    return {
      clientInfo: 'this is info from client',
      /**
       * if wanna fetch data by http request, the returned object must includes key named [CALL_API]
       *   |- types and res is needed,
       *       |- types is an array contains 3 types: request, http request success, http request failure
       *       |- res is a function which params is api that can call http interface
       *              by using like api('/example/url', 'POST', params),
       *              the second and third params is not needed for api function
       */
      [CALL_API]: {
        types: [Info.Request, Info.Success, Info.Failure],
        res: api => api('/api/example/info'),
        restInfo: 'rest info',
      },
    }
  },
}
