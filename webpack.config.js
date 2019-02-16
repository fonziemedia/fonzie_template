const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin'); // Required to generate html/php build file using src templates
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  performance: {
    hints: false
  },
  devtool: 'source-map',
  context: path.resolve(__dirname, './src/js'), //__dirname refers to the directory where this webpack.config.js lives
  entry: {
    app: './app.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './build'),
    publicPath: '', // path that will be set on link href and script src html tags
  },
  // devServer: {
  //   contentBase: path.resolve(__dirname, './src/js'),
  //   watchContentBase: true,
  // },
  plugins: [
    // new HtmlWebpackPlugin({
    //   title: 'Wildfire Template',
    //   filename: 'index.php', // default value is index.html
    //   // minify: {
    //   //   collapseWhitespace: true
    //   // },
    //   hash: true,
    //   template: 'index.php',
    // }),
    // new HtmlWebpackPlugin({
    //   title: 'Wildfire Template - About',
    //   filename: 'about.php',
    //   // minify: {
    //   //   collapseWhitespace: true
    //   // },
    //   hash: true,
    //   template: 'about.php',
    // }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].bundle.css',
      chunkFilename: "[id].css"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Popper: ['popper.js', 'default'],
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/], //add any legacy code here (optional for speed)
        use: [{
          loader: 'babel-loader', //babel compiles es2015/6/7 (new) javascript to 'old' javascript for old browsers
          options: {
            presets: ['@babel/preset-env'] //read more about presets, should we be using 'es2015'?
          },
        }],
      },
      {
        test: /\.scss$/,
        // To run css from js files use settings below:
        // use: [  // NOTE: these are loaded in reverse array order
        //   'style-loader', //style-loader adds CSS to the DOM by injecting a <style> tag
        //   'css-loader', //css-loader interprets @import and url() like requires
        //   'sass-loader', // enables @import of .scss or .sass files
        // ],

        // To run css from a separate <link> CSS file:
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../'
            }
          },
          'css-loader', 'sass-loader'
        ]
      },
      // Loaders for other file types can go here
    ],
  }
};
