const path = require('path');
const webpack = require("webpack");

module.exports = {
  entry: './client/app.jsx',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'static/build')
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js|jsx$/,
        include: [path.resolve(__dirname, 'client')],
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({ minimize: true })
  ],
  node: {
    net: 'empty',
    tls: 'empty',
    fs: 'empty',
  }
};