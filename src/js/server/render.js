/**
 * Created by acezou on 15/7/13.
 */
import React from 'react'
import { Router as ReactRouter } from 'react-router'
import Location from 'react-router/lib/Location'
import History from 'react-router/lib/MemoryHistory'
import request from 'superagent'
import qs from 'qs'
import createStore from '../shared/lib/createStore'
import createAPI from '../shared/lib/createAPI'
import routes from '../shared/routes'
import Router from '../shared/AppRouter'
import { Provider } from 'react-redux'
import { config } from './config'

function generateCssRef(webpackStats) {
  let cssRef = ''
  webpackStats.css.map(_style => {
    let style = (config.app.env === 'development') ? _style : '/css/' + _style
    cssRef += `<link href="${style}" media="screen" rel="stylesheet" type="text/css"/>`
  })
  return cssRef
}

function generateJsRef(webpackStats) {
  let jsRef = ''
  webpackStats.script.map(_script => {
    let script = (config.app.env === 'development') ? _script : '/js/client/' + _script
    jsRef += `<script src='${script}'></script>`
  })
  return jsRef
}

export default function render(req, res) {
  const { path, query } = req
  const location = new Location(path, query)
  const history = new History(path)

  const store = createStore({}, {cookies: req.cookies})

  ReactRouter.run(routes, location, async (err, routerState) => {
    try {
      if (err) {
        logger.error(err)
        throw err
      }

      const { params, location } = routerState

      const prepareRouteMethods = routerState.components.map(component => {
        return component.prepareRoute
      })

      for (let prepareRoute of prepareRouteMethods) {
        if (!prepareRoute) {
          continue;
        }
        await prepareRoute({store, params, location});
      }

      const body = React.renderToStaticMarkup(
        //const body = React.renderToString(
        <Provider {...{store}}>
          {() => <Router {...{...routerState, location, history}} />}
        </Provider>
      )

      const initialState = store.getState()

      // get js path with hash
      const webpackStatsPath = './webpack-stats.json'
      let webpackStats
      if (config.app.env === 'production') {
        webpackStats = require(webpackStatsPath)
      } else {
        webpackStats = require(webpackStatsPath)
        // Do not cache webpack stats: the script file would change since
        // hot module replacement is enabled in the development env
        delete require.cache[require.resolve(webpackStatsPath)]
      }

      res.send(`
				<!DOCTYPE html>
				<html>
				<head>
			    <title>杏树林后台</title>
			    ${generateCssRef(webpackStats)}
				</head>
				<body>
				<div id="main">${body}</div>
				<script>
				  __INITIAL_STATE__ = ${JSON.stringify(initialState)}
				  __ENV__ = '${config.app.env}'
				</script>
				${generateJsRef(webpackStats)}
				</body>
				</html>
			`)

    } catch (err) {
      res.status(500).send(err.stack)
    }
  })
}


