import keyMirror from 'react/lib/keyMirror'

export default {
  RESET_ERROR_MESSAGE: 'RESET_ERROR_MESSAGE',
  Info: keyMirror({
    Request: null,
    Success: null,
    Failure: null,
  }),
}
