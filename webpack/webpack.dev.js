const path = require("path");
const commonConfigFile = require("./webpack.common");
const {
    merge
} = require("webpack-merge");
const  HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(commonConfigFile, {
    mode: "development",
    target:"web",
    output: {
        filename: "scripts/[name].js",
        path: path.resolve(__dirname, "../dist/"),
        assetModuleFilename: 'assets/[hash][ext][query]',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html"
        })
    ],
    module: {
        rules: [
            {
            test: /\.scss$/,
            use: [
                "style-loader", //3. Inject styles into DOM
                "css-loader", //2. Turns css into commonjs
                "sass-loader" //1. Turns sass into css
            ]
        },
      
       
    ]
    }
})