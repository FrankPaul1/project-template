/**
 * Created by acezou on 15/8/24.
 */
import initWs from '../shared/lib/initWebsocket'
/* global __CLIENT__, __ENV__ */

function stringify(type, _msg) {
  let msg = `"${_msg}"`
  try {
    msg = JSON.stringify(msg)
  } catch (e) {
    // pass
  }
  return `{"type": "${type}", "msg": ${msg}}`
}

export default function createLogger() {
  let logger

  // only use for development client
  if (__CLIENT__ && __ENV__ !== 'production' && window.WebSocket) {
    const ws = initWs(`ws://${window.location.host}/ws/logger`, '__LOGGER__')
    logger = {
      debug: (msg) => {
        console.debug(msg)
        ws.pushMsg(stringify('DEBUG', msg))
      },
      info: (msg) => {
        console.info(msg)
        ws.pushMsg(stringify('INFO', msg))
      },
      error: (msg) => {
        console.error(msg)
        ws.pushMsg(stringify('ERROR', msg))
      },
    }
  } else if (__ENV__ === 'production') {
    // if production, do nothing
    logger = {
      debug: () => {},
      info: () => {},
      error: () => {},
    }
  } else {
    logger = console
  }

  return logger
}
