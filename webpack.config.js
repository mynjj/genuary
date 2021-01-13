const _ = require('lodash/fp');
const path = require('path');
const HandlebarsPlugin = require('handlebars-webpack-plugin');

const sketches = [
  'triple-nested-loop',
  'rule-30',
  'curve-only'
];

const toEntryPoint = v=>path.resolve('src', v, 'code.js');
const getEntries = _.flow(
  _.keyBy(_.identity),
  _.mapValues(toEntryPoint)
);

module.exports = {
  mode: 'development',
  entry: getEntries(sketches),
  devServer: {
    contentBase: './dist'
  },
  output: {
    filename: '[name]/code.js',
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
  },
  plugins: [
    new HandlebarsPlugin({
      entry: path.resolve(__dirname, 'src', '**', '*.hbs'),
      output: path.resolve(__dirname, 'dist', '[path]', '[name].html'),
      helpers: {
        toCode: name=>`https://github.com/mynjj/genuary/blob/main/src/${name}/code.js`
      }
    })
  ]
};
