'use strict';

const Clean = require('clean-webpack-plugin');
const base = require('./base');
const merge = require('webpack-merge');
const path = require('path');

const CWD = process.cwd();
const BUILD = path.join(CWD, 'build');

module.exports = merge(base, {
  plugins: [
    new Clean([BUILD], { root: CWD })
  ]
});
