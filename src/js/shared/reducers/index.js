import ActionTypes from '../constants/ActionTypes'

// Updates error message to notify about the failed fetches.
export function errorMessage(state = null, { type, error }) {
  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return error
  }

  return state
}

export { default as Info } from './Info'
