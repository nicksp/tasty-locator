const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

const javascript = {
  test: /\.js$/,
  use: [{
    loader: 'babel-loader',
    options: { presets: ['env'] }
  }]
}

const postcss = {
  loader: 'postcss-loader',
  options: {
    plugins() {
      return [autoprefixer({ browsers: 'last 3 versions' })]
    },
    sourceMap: true
  }
}

const styles = {
  test: /\.scss$/,
  use: ExtractTextPlugin.extract(['css-loader?sourceMap', postcss, 'sass-loader?sourceMap'])
}

module.exports = {
  entry: {
    app: './public/javascripts/tasty-locator.js'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [javascript, styles]
  },

  // plugins: [uglify]
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.UglifyJsPlugin({ // eslint-disable-line
      compress: { warnings: false }
    })
  ]
}

// Webpack is cranky about some packages using a soon to be deprecated API
process.noDeprecation = true
