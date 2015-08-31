require('babel/register')
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var appConfig = require('../src/js/server/config/config')
var HOST = process.env.HOST || 'localhost';
var PORT = appConfig.app.port
var WEBPACK_PORT = parseInt(process.env.PORT) || 8080;

new WebpackDevServer(webpack(config), {
  // contentBase: "./dist",
  contentBase: 'http://' + HOST + ':' + PORT + '/',
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  // noInfo: true, //  --no-info option
  inline: true,
  headers: {"Access-Control-Allow-Origin": "*"},
  hot: true,
  stats: {
    colors: true
  }
}).listen(WEBPACK_PORT, HOST, function (err) {
  if (err) console.log(err);
  console.log('Listening at ' + HOST + ':' + WEBPACK_PORT);
});
