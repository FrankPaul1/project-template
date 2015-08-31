/**
 * Created by acezou on 15/8/24.
 */
import initWs from '../shared/utils/initWebsocket'
/* global __CLIENT__, __ENV__ */
export default function createLogger() {
  let logger

  // only use for development client
  if (__CLIENT__ && __ENV__ !== 'production' && window.WebSocket) {
    const ws = initWs(`ws://${window.location.host}/ws/logger`, '__LOGGER__')
    logger = {
      debug: (msg) => {
        console.debug(msg)
        ws.pushMsg(JSON.stringify({type: 'DEBUG', msg}))
      },
      info: (msg) => {
        console.info(msg)
        ws.pushMsg(JSON.stringify({type: 'INFO', msg}))
      },
      error: (msg) => {
        console.error(msg)
        ws.pushMsg(JSON.stringify({type: 'ERROR', msg}))
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
