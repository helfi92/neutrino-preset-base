'use strict';

const base = require('./base');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = merge(base, {
  devtool: 'hidden-source-map',
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
});
