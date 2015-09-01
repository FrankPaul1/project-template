/**
 * Created by acezou on 15/8/28.
 */

export default function initWs(url, key, cb = {}) {
  let ws = window[key] || new WebSocket(url)
  ws.msgQuene = ws.msgQuene || []
  ws.readySend = false
  ws.retry = () => {
    if (!window[`${key}_REFRESH_INTER`]) {
      console.log('start retry connect ws')
      delete window[key]
      window[`${key}_REFRESH_INTER`] = window.setInterval(() => {
        ws = initWs(url, key, cb)
      }, 1000)
    }
  }

  ws.onmessage = (e) => {
    try {
      console.log(`RECEIVED: ${e.data}`, e)
      if (e.data === 'PING') {
        // handler ping pong auto
        ws.readySend = true
        ws.pushMsg('PONG')
      } else if (e.data === 'PONG') {
        ws.readySend = true
        ws.pushMsg('PING')
      } else {
        if (cb.onmessage) cb.onmessage(ws, e)
      }
    } catch (err) {
      console.error(err)
    }
  }

  ws.onopen = (e) => {
    try {
      console.log(`Connected to WebSocket server ${key} -> `, e)

      window[key] = ws
      if (window[`${key}_REFRESH_INTER`]) {
        window.clearInterval(window[`${key}_REFRESH_INTER`])
        delete window[`${key}_REFRESH_INTER`]
      }

      if (cb.onopen) cb.onopen(ws, e)
    } catch (err) {
      console.error(err)
    }
  }

  ws.onclose = (e) => {
    try {
      console.log('Disconnected', e)
      if (cb.onclose) cb.onclose(ws, e)
      ws.retry()
    } catch (err) {
      console.error(err)
    }
  }

  ws.onerror = (e) => {
    try {
      // console.error(`Error occured: ${e.data}, ${e}`)
      if (cb.onerror) cb.onerror(ws, e)
      ws.retry()
    } catch (err) {
      console.error(err)
    }
  }

  ws.pushMsg = (_msg) => {
    ws.msgQuene.push(_msg)
    if (ws.readyState === 1 && ws.readySend) {
      while (ws.msgQuene.length > 0) {
        const msg = ws.msgQuene.shift()
        console.info(` send message: ${msg}`)
        ws.send(msg)
      }
    }
  }
  return ws
}
