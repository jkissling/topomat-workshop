const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");
const webpack = require("webpack");
const fs = require("fs");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")


if (!fs.existsSync("../certificate.pfx")) {
  console.log("=========================================")
  console.log("=========================================")
  console.error("There is no certificate.pfx file.");
  console.error("Please follow the steps in certificate.md to create it");
  console.log("=========================================")
  console.log("=========================================")
}

module.exports = (env, options) => {
  var isDevelop = options.mode === 'development'
  console.log(`This is the Webpack 'mode': ${options.mode}`);
  return {
    entry: {
      index: ["./src/css/main.scss","./src/index.ts"]
    },
    output: {
      filename: "[name].[chunkhash].js",
      publicPath: "",
      libraryTarget: "amd-require"
    },
    devServer: {
      disableHostCheck: true
    },
    devtool: "source-map",
    optimization: isDevelop ? {} : {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            sourceMap: false,
            compress: {
              drop_console: true,

            },
            output: {
              comments: false,
            },
          },
          extractComments: false
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: { discardComments: { removeAll: true } },
          canPrint: true
        })
      ]
    },
    module: {
      noParse: /assets\/libs\/widgets/,
      rules: [
        {
          test: /\.html$/i,
          loader: 'raw-loader',
          options: {
            esModule: false
          }
        },
        {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "resolve-url-loader",
              options: {
                includeRoot: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ],
          exclude: /src\/assets/
        },
        {
          test: /\.tsx?$/,
          use: [{
            loader: "ts-loader",
            options: {
              transpileOnly: true
            }
          }]
        },
        {
          test: /\.(jpe?g|png|gif|webp)$/,
          loader: "url-loader",
          options: {
            // Inline files smaller than 10 kB (10240 bytes)
            limit: 10 * 1024,
          }
        },
        {
          test: /\.(wsv|ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          use: [{
            loader: "file-loader",
            options: {
              name: "build/[name].[ext]"
            }
          }]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: ['dist']
      }),
      new HtmlWebPackPlugin({
        title: "Sample Application",
        template: "./src/index.html",
        filename: "./index.html",
        chunksSortMode: "none",
        inlineSource: ".(css)$"
      }),
      new webpack.HotModuleReplacementPlugin(),

      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),

      new CopyWebpackPlugin({
        patterns: [{
          from: "assets/**/*",
          context: "src",
          noErrorOnMissing: true
        }]
      })
    ],
    resolve: {
      modules: [
        path.resolve(__dirname, "/src"),
        path.resolve(__dirname, "node_modules/")
      ],
      alias: {
        "ttwidgets": path.resolve(__dirname, './src/assets/libs/widgets')
      },
      extensions: [".ts", ".tsx", ".js", ".scss", ".css"]
    },
    node: {
      global: false
    },
    externals: [
      (context, request, callback) => {
        if (/^dojo/.test(request) ||
          /^dojox/.test(request) ||
          /^dijit/.test(request) ||
          /^esri\//.test(request)
        ) {
          return callback(null, "amd " + request);
        }
        callback();
      }
    ]
  }
};