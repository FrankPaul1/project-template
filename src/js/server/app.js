// to support es6 in node
require('babel/register')({
  stage: 0,
  plugins: ['typecheck']
})

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false
global.__SERVER__ = true
global.logger = require('./config/logger')

require('./express')
