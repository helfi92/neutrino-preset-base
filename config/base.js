'use strict';

const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const CWD = process.cwd();
const BUILD = path.join(CWD, 'build');
const TEST = path.join(CWD, 'test');
const PROJECT_MODULES = path.join(CWD, 'node_modules');
const BASE_MODULES = path.join(__dirname, '../node_modules');
const NEUTRINO_MODULES = path.join(require.resolve('neutrino'), '../../node_modules');
const PROJECT_PKG = require(path.join(CWD, 'package.json'));
const ENTRY = path.join(CWD, PROJECT_PKG.config && PROJECT_PKG.config.entry ?
  PROJECT_PKG.config.entry :
  'src/index.js'
);
const SRC = path.dirname(ENTRY);
const JS_LOADER = {
  test: /\.js$/,
  include: [SRC, TEST],
  loader: 'babel',
  query: require('./babel')
};

const config = {
  entry: [ENTRY],
  output: {
    path: BUILD
  },
  plugins: [
    // Copy all files except JS files, since they will be Babel-compiled to the output directory
    new CopyPlugin([{ from: `${SRC}/**/*` }], { ignore: '*.js' })
  ],
  resolve: {
    root: [PROJECT_MODULES, NEUTRINO_MODULES, BASE_MODULES],
    fallback: PROJECT_MODULES,
    extensions: ['', '.js', '.json']
  },
  resolveLoader: {
    root: [PROJECT_MODULES, NEUTRINO_MODULES, BASE_MODULES],
    fallback: PROJECT_MODULES
  },
  eslint: {
    configFile: path.join(__dirname, 'eslint.js'),
    useEslintrc: false
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        include: [SRC],
        loader: 'eslint'
      },
      JS_LOADER
    ],
    loaders: [
      {
        test: /\.json$/,
        include: [SRC, TEST],
        loader: 'json'
      },
      JS_LOADER
    ]
  }
};

module.exports = config;
module.exports.CWD = CWD;
module.exports.PROJECT_PKG = PROJECT_PKG;
module.exports.SRC = SRC;
