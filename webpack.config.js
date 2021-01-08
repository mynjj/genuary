const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/triple-nested-loop.js',
  devServer: {
    contentBase: './dist'
  },
  output: {
    filename: 'triple-nested-loop.js',
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
