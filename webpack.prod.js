const webpack = require('webpack'),
      merge = require('webpack-merge'),
      UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      CompressionPlugin = require('compression-webpack-plugin'),
      BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
      ExtractTextPlugin = require("extract-text-webpack-plugin"),
      common = require('./webpack.common.js');

const GLOBALS = {
        'process.env.NODE_ENV': JSON.stringify('production')
      };

const extractSass = new ExtractTextPlugin({
                filename: "[name].[contenthash].css",
                disable: process.env.NODE_ENV === "development"
            });



module.exports = merge(common, {

  output: {
    filename: '[name].[chunkhash].bundle.min.js'
  },
  module: {
    rules: [
      {
        test:  /\.(sass|scss)$/,
        exclude:  /(node_modules|bower_components)/,
        use: extractSass.extract({
                fallback: 'style-loader',
                use: [{
                    loader: "css-loader",
                    options: {
                        minimize: true
                     }
                },{
                    loader: "postcss-loader",
                    options: {
                      autoprefixer: require('autoprefixer')()
                    }
                },{
                    loader: "sass-loader"
                }]

            })


      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new UglifyJSPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
     name: 'vendor',
     filename: 'vendor.[chunkhash].min.js',
     minChunks (module) {
       return module.context &&
              module.context.indexOf('node_modules') >= 0;
     }
   }),
   new HtmlWebpackPlugin({
     template: './src/index.ejs',
     filename: 'index.html',
     excludeChunks: ['base'],
     minify: {
       collapseWhitespace: true,
       collapseInlineTagWhitespace: true,
       removeComments: true,
       removeRedundantAttributes: true
     }
   }),
   new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    extractSass,
    //new BundleAnalyzerPlugin()



  ]

});
