import keyMirror from 'react/lib/keyMirror'

export default {
  RESET_ERROR_MESSAGE: 'RESET_ERROR_MESSAGE',
  Load: keyMirror({
    clear: null,
    loading: null,
    loaded: null,
  }),
  Info: keyMirror({
    Request: null,
    Success: null,
    Failure: null,
  }),
}
