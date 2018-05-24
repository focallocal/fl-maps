const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const meteorExternals = require('webpack-meteor-externals')
const path = require('path')

const clientConfig = {
  entry: './client/main.js',
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/main.html'
    }),
    new webpack.HotModuleReplacementPlugin()
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
      '/imports': path.resolve(__dirname, 'imports')
    }
  },
  externals: [
    meteorExternals()
  ]
}

module.exports = [clientConfig, serverConfig]
