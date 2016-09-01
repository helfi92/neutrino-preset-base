'use strict';

module.exports = {
  presets: [
    require.resolve('babel-preset-es2015')
  ],
  env: {
    test: {
      plugins: [
        // TODO: This currently breaks the coverage
        // [ require.resolve('babel-plugin-istanbul'), { exclude: ['test/**/*']} ]
      ]
    }
  }
};
