'use strict';

module.exports = {
  presets: [
    require.resolve('babel-preset-es2015')
  ],
  env: {
    test: {
      plugins: [
        [ require.resolve('babel-plugin-istanbul'), { exclude: ['**/*_test.js']} ]
      ]
    }
  }
};
