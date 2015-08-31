var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer-core');
var csswring = require('csswring');
var fs = require('fs');
var ASSERTPATH = path.join(__dirname, '../dist/');
var HOST = process.env.HOST || 'localhost';
var WEBPACK_PORT = parseInt(process.env.PORT) || 8080;
var _ = require('lodash');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var writeStats = require('./writeStats');

var baseConfig = {
  output: {
    path: ASSERTPATH,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js']
  },
  postcss: [autoprefixer, csswring],
  eslint: {
    configFile: './.eslintrc'
  }

};

var devConfig = {
  output: {
    // publicPath: 'http://localhost:8080'
    publicPath: 'http://' + HOST + ':' + WEBPACK_PORT + '/'
  },
  module: {
    loaders: [
      {test: /\.(gif|jpe?g|png|woff|woff2|eot|ttf|svg)$/, loader: 'url?limit=100000'},
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel!eslint'
      },
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss')}
    ]
  },
  // csswring is used to zip css, no need to use when dev
  postcss: [autoprefixer],
  plugins: [
    // hot reload
    new webpack.HotModuleReplacementPlugin()
    // no need uglify when develop
  ]
}

var prodConfig = {
  devtool: 'source-map',
  entry: {
    /**
     *  *************** this need to config when you want to add more entry js ***************
     */
    'index': './src/js/client/index.js'
  },
  module: {
    loaders: [
      {test: /\.(gif|jpe?g|png|woff|woff2|eot|ttf|svg)$/, loader: 'url?limit=100000'},
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel!eslint'
      },
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss')}
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}

// operate plugins
var commonPlugins = [
  new ExtractTextPlugin('[name]-[chunkhash].css'),
  // optimizations
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin(),
  // status
  function () {
    this.plugin('done', writeStats);
  }
]

/*htmlWebpackPlugins = (function () {
 var _templateHtml = ['index.html'];

 return _templateHtml.map(function (htmlFileName) {
 return new HtmlWebpackPlugin({
 title: 'xsl Project Template',
 filename: htmlFileName,
 template: './src/html/' + htmlFileName,
 favicon: './favicon.ico'
 });
 });
 })()*/

devConfig.plugins = _.union(devConfig.plugins, commonPlugins);
prodConfig.plugins = _.union(prodConfig.plugins, commonPlugins);

// operate entry
var devEntrys = (function () {
  var entrys = {}
  _.forOwn(prodConfig.entry, function(value, key){
    // webpack-dev-server need config "webpack/hot/dev-server"
    entrys[key]=['webpack-dev-server/client?http://' + HOST + ':' + WEBPACK_PORT, 'webpack/hot/dev-server', value];
  });
  return entrys;
})()
devConfig.entry = devEntrys;

// override the base configuration with the platform specific values
module.exports = _.merge(baseConfig, ((process.env.NODE_ENV==='production' || process.env.NODE_ENV==='test')?prodConfig:devConfig))