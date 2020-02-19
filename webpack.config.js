const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./config');

module.exports = {
    entry: './client/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public'),
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                includePaths: [
                                    path.resolve(__dirname, 'node_modules/foundation-sites/scss'),
                                ]
                            }
                        },
                    }
                ],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        hot: true,
        liveReload: true,
        watchContentBase: true,
        historyApiFallback: true,
        port: 9000,
        proxy: {
            '/api': 'http://localhost:3000'
        }
    },
    plugins: [
        new webpack.DefinePlugin(config),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new HtmlWebpackPlugin({
            title: 'Dogos React',
            template: './client/template.html'
        })
    ],
};
