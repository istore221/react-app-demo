const webpack = require('webpack'),
      merge = require('webpack-merge'),
      common = require('./webpack.common.js');

const GLOBALS = {
              'process.env.NODE_ENV': JSON.stringify('development')
            };

module.exports = merge(common, {

  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test:  /\.(sass|scss)$/,
        exclude:  /(node_modules|bower_components)/,
        use: [{
                loader: "style-loader"
            },{
                loader: "css-loader",
                options: {
                  sourceMap: true
                }
            },{
                loader: "postcss-loader",
                options: {
                  autoprefixer: require('autoprefixer')()
                }
            },{
                loader: "sass-loader"
            }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.HashedModuleIdsPlugin()
  ]


});
