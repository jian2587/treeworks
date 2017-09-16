const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'treeworks.bundle.js',
    path: path.resolve(__dirname, 'bin')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  plugins: [
    new UglifyJSPlugin({
      parallel: {
        cache: true,
        workers: 2
      },
      sourceMap: true
    })
  ],
  devtool: 'source-map'
};

