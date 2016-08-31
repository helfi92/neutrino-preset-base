'use strict';

const eslint = {
  root: true,
  failOnWarning: false,
  failOnError: true,
  plugins: ['mocha'],
  extends: ['eslint:recommended'],
  env: {
    commonjs: true,
    es6: true,
    browser: true,
    node: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      generators: true,
      impliedStrict: true
    }
  },
  globals: {
    process: true
  }
};

if (process.env.NODE_ENV === 'development') {
  eslint.rules = {
    'no-console': 0,
    'no-unused-vars': 1
  };
}

module.exports = eslint;
