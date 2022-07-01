
const path = require("path");

module.exports = {
    entry: {
        bundle: path.resolve(__dirname, '../src/js/index.js'),
    },
    target:"Web",
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(svg|png|jpg|gif)$/,
                type: 'asset/resource'
            }
        ]
    }
};