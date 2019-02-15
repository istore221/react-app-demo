const webpack = require('webpack'),
path = require('path'),
CleanWebpackPlugin = require('clean-webpack-plugin'),
HtmlWebpackPlugin = require('html-webpack-plugin');





module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname,'dist')
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'assets/images/',
          name: "[hash].[ext]"
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          outputPath: 'assets/fonts/',
          name: "[hash].[ext]"
        }
      }

    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      favicon: './src/assets/images/favicon.ico',
      filename: 'index.html'
    })


  ]
}
