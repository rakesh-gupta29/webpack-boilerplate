const path = require("path");
const commonConfigFile  = require("./webpack.common");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { merge } = require("webpack-merge")
const  HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = merge(commonConfigFile,{
    mode: "production",
    output: {
        filename: "[name]-[hash].js",
        path: path.resolve(__dirname, "../dist/"),
        assetModuleFilename: 'assets/[fullhash][ext][query]',
    },
    optimization: {
        minimizer: [
          new OptimizeCssAssetsPlugin(),
          new TerserPlugin(),
          new HtmlWebpackPlugin({
            template: "./src/index.html",
            minify: {
              removeAttributeQuotes: true,
              collapseWhitespace: true,
              removeComments: true
            }
          })
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "styles/[name].[fullhash].css" }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              }
          },
          {
            test: /\.scss$/,
            use: [
              MiniCssExtractPlugin.loader, //3. Extract css into files
              "css-loader",
              'postcss-loader', //2. Turns css into commonjs
              "sass-loader" //1. Turns sass into css
            ]
          }
        ]
    }


})