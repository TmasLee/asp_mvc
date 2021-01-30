const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
        client: "./Client/src/index.js"
        },
    devtool: 'source-map',
    mode: "development",
    module: {
        rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            loader: "babel-loader",
            options: {
                presets: ["@babel/env", "@babel/preset-react"],
                plugins: ["@babel/plugin-proposal-class-properties"]
            }
        },
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        },
        {
            test: /\.(jpg|png)$/,
            use: {
                loader: 'url-loader',
            }
        }
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/dist/",
        filename: "[name].bundle.js"
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};