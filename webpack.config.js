const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    'triple-nested-loop': './src/triple-nested-loop.js',
    'rule-30': './src/rule-30.js'
  },
  devServer: {
    contentBase: './dist'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
};
