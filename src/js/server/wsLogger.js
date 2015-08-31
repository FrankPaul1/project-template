/**
 * Created by acezou on 15/8/24.
 */
/*global __CLIENT__, __ENV__ */
import { Server } from 'ws'
import Immutable from 'immutable'
let container = Immutable.fromJS([])

function ping(socket) {
  try {
    socket.send('PING')
  } catch (e) {
    // pass
  }
}
function pong(socket) {
  try {
    socket.send('PONG')
  } catch (e) {
    // pass
  }
}

export default function wsLogger(server) {
  const wss = new Server({server, path: '/ws/logger'})
  wss.on('connection', socket => {
    container = container.filter(s => (socket !== s)).push(socket)
    logger.debug(`****** a new client connect ******* ${container.size}`)

    socket.on('close', () => {
      container = container.filter(s => (socket !== s))
    })

    socket.on('message', message => {
      if (message === 'PING' || message === 'PONG') return
      try {
        const {type, msg} = JSON.parse(message)
        switch (type) {
          case 'DEBUG':
            logger.debug(`MSG FROM CLIENT( DEBUG ): ${msg}`)
            break
          case 'ERROR':
            logger.error(`MSG FROM CLIENT( ERROR ): ${msg}`)
            break
          case 'INFO':
            logger.info(`MSG FROM CLIENT( INFO ): ${msg}`)
            break
          default:
            logger.info(`MSG FROM CLIENT( UNKNOW TYPE ): ${message}`)
        }
      } catch (e) {
        logger.info(`MSG FROM CLIENT( UNKNOW TYPE ): ${message}`)
      }
    })
  })

  // send ping or pong every 30s
  setInterval(() => {
    container.map(socket => {
      pong(socket)
    })
  }, 30000)
}