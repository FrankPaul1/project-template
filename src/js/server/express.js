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
// --------------------------------------------------
app.use(express.static(path.resolve(config.app.root)))
app.use(favicon(path.resolve(config.app.root + '/images/favicon.ico')))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api/example/info', (req, res) => {
  logger.info('========')
  const info = 'information from server'
  res.send(info).end()
  // res.status(500).end()
})

app.use((req, res) => {
  render(req, res)
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
