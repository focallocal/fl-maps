const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const meteorExternals = require('webpack-meteor-externals')
const path = require('path')
const devMode = process.env.NODE_ENV !== 'production'

const clientConfig = {
  entry: './client/main.js',
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        type: 'javascript/auto',
        test: /\.mjs$/,
        use: []
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/main.html'
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    })
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      '/imports': path.resolve(__dirname, 'imports')
    }
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  externals: [
    meteorExternals()
  ]
}

const serverConfig = {
  entry: [
    './server/main.js'
  ],
  target: 'node',
  resolve: {
    alias: {
      '/imports': path.resolve(__dirname, 'imports'),
      '/server': path.resolve(__dirname, 'server')
    }
  },
  externals: [
    meteorExternals()
  ]
}

if (!devMode) {
  clientConfig.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
} else {
  clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = [clientConfig, serverConfig]
