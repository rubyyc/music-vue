'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

// 代理请求
const express = require('express')
var app = express()
var apiRoutes = express.Router()
var axios = require('axios')
app.use('/api', apiRoutes)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app) {
      app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1')
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
      }),
      app.get('/api/getRecommend', (req, res) => {
        // var url = 'https://u.y.qq.com/cgi-bin/musics.fcg'
        var url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

        axios.get(url, {
          headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          // 在终端可以看到
          // console.log('axios', response.data)
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      }),
      app.get('/api/getDiscList', (req, res) => {
        // var url = 'https://u.y.qq.com/cgi-bin/musics.fcg'
        var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

        axios.get(url, {
          headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
          },
          params: req.query
        }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      }),
      app.get('/api/getSingerDetail', (req, res) => {
        var url = 'https://u.y.qq.com/cgi-bin/musics.fcg'

        axios.get(url, {
          header:{
            referer: 'https://y.qq.com/',
            host: 'y.qq.com'
          },
          params: req.query
        }).then((response) => {
          // console.log('response', response)
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
        })
      }),
      app.get('/api/getSongUrlBySongmid', (req, res) => {
        // localhost
        var url = 'http://localhost:3300/song/urls'
        axios.get(url, {
          header:{
            referer: 'http://localhost:3300',
            host: 'localhost:3300'
          },
          params: req.query
        }).then((response) => {
          console.log('response', response)
          res.json(response.data)
        }).catch((e) => {
          console.log(e)
          res.json(e.data)
        })
        // https://api.qq.jsososo.com/song/urls
        // var url = 'https://api.qq.jsososo.com/song/urls'
        // axios.get(url, {
        //   header:{
        //     referer: 'https://api.qq.jsososo.com',
        //     host: 'api.qq.jsososo.com'
        //   },
        //   params: req.query
        // }).then((response) => {
        //   console.log('response', response)
        //   res.json(response.data)
        // }).catch((e) => {
        //   console.log(e)
        //   res.json(e.data)
        // })
      })
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
