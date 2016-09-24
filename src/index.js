'use strict';

const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const CWD = process.cwd();
const BUILD = path.join(CWD, 'build');
const PROJECT_MODULES = path.join(CWD, 'node_modules');
const BASE_MODULES = path.join(__dirname, '../node_modules');
const SRC = path.join(CWD, 'src');
const TEST = path.join(CWD, 'test');

const config = {
  context: CWD,
  entry: {
    index: [path.join(SRC, 'index.js')]
  },
  output: {
    path: BUILD,
    filename: '[name].js'
  },
  plugins: [
    // Copy all files except JS files, since they will be Babel-compiled to the output directory
    new CopyPlugin([{ from: `${SRC}/**/*` }], { ignore: '*.js*' })
  ],
  resolve: {
    fallback: [PROJECT_MODULES, BASE_MODULES],
    extensions: ['', '.js', '.json', '.jsx']
  },
  resolveLoader: {
    fallback: [PROJECT_MODULES, BASE_MODULES]
  },
  eslint: {
    configFile: path.join(__dirname, 'eslint.js'),
    quiet: false,
    emitWarning: true,
    emitError: true,
    failOnWarning: false,
    failOnError: true,
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        include: [SRC],
        loader: require.resolve('eslint-loader')
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        include: [SRC, TEST],
        loader: require.resolve('babel-loader'),
        query: {
          presets: [
            require.resolve('babel-preset-es2015')
          ],
          env: {
            test: {
              plugins: [
                // FIXME: This currently breaks the coverage
                // [ require.resolve('babel-plugin-istanbul'), { exclude: ['test/**/*']} ]
              ]
            }
          }
        }
      },
      {
        test: /\.json$/,
        loader: require.resolve('json-loader')
      }
    ]
  }
};

if (process.env.NODE_ENV === 'development') {
  config.devtool = 'eval';
  config.eslint.quiet = true;
  config.eslint.emitWarning = false;
} else {
  config.plugins.push(new CleanPlugin([BUILD], { root: CWD }))
}

module.exports = config;
