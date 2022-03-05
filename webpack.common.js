const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
module.exports = {
  entry: {
    popup: path.resolve("src/popup/popup.tsx"),
    options: path.resolve("src/options/options.tsx"),
    background: path.resolve("src/background/background.ts"),
    contentScript: path.resolve("src/contentScript/contentScript.ts"),
  },
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.tsx?$/,
        exclude: /node_modules/,
      },
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/i,
      },
      {
        type: "asset/resource",
        test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve("src/static"),
          to: path.resolve("dist"),
        },
      ],
    }),
    ...getHTMLPlugin(["popup", "options"]),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve("dist"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
}
function getHTMLPlugin(chunks) {
  return chunks.map(
    (chunk) =>
      new HTMLWebpackPlugin({
        title: "React Extension",
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  )
}
