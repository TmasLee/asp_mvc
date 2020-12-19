const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
      client: "./src/Client/index.js",
      building: "./src/Building/index.js"
    },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
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