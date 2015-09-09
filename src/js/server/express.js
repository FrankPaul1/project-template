import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import render from './render'
import { config } from './config'
import session from 'express-session'
import favicon from 'serve-favicon'
import wsLogger from './wsLogger'

const app = express()

app.on('error', function (err) {
  logger.error('found a error %s', err.message)
  logger.error(err)
})

// Serve static files
app.use(express.static(path.resolve(config.app.root)))
app.use(favicon(path.resolve(config.app.root + '/images/favicon.ico')))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api/example/info', (req, res) => {
  const info = `information from server, ${Date.now()}`
  setTimeout(() => (res.send(info).end()), 10000)
  // res.send(info).end()
  // res.status(500).end()
})

app.use((req, res) => {
  render(req, res)
})

// Catch server error
app.use((err, req, res, next) => {
  console.error(`Error on request ${req.method}, ${req.path}`)
  console.error(err.stack)
  res.status(500).send('Server error')
})

const server = app.listen(config.app.port, (err) => {
  if (err) logger.error(err)
  const { address: host, port } = server.address()
  logger.info(`Front-End server is running at ${host}:${port}`)
})

// add wsLogger
if (config.app.env !== 'production') {
  wsLogger(server)
}
