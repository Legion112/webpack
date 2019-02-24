const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const useVersioning = true;
const useDevServer = false;
const publicPath = useDevServer ? 'http://localhost:8080/build/' : '/build/';
const isProduction = process.env.NODE_ENV === 'production';
console.log(isProduction);
const useSourcemaps = !isProduction;

const styleLoader = {
    loader: 'style-loader',
    options: {
        sourceMap: useSourcemaps,
        minimize: isProduction
    }
};


const cssLoader = {
    loader: 'css-loader',
    options: {
        sourceMap: useSourcemaps,
    }
};
const sassLoader = {
    loader: 'sass-loader',
    options: {
        sourceMap: true,
    }
};
const resolveUrlLoader = {
    loader: 'resolve-url-loader',
    options: {
        sourceMap: useSourcemaps,
    }
};

const webpackConfig = {
    // mode: "development", // (or "production")
    entry: {
        rep_log: './assets/js/rep_log.js',
        login: './assets/js/login.js',
        layout: './assets/js/layout.js'
    },
    output: {
        path:  path.resolve(__dirname, 'web', 'build'),
        filename: useVersioning ? "[name].[chunkhash:6].js" : "[name].js",
        publicPath: publicPath
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        cssLoader
                    ],
                    // use this if isn't extracted
                    fallback: styleLoader
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        cssLoader,
                        resolveUrlLoader,
                        sassLoader,
                    ],
                    fallback: styleLoader,
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash:6].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash:6].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            'window.jQuery': 'jquery',
        }),
        new CopyWebpackPlugin([
            // copies to {output}/static
            {
                from: './assets/static',
                to: 'static',
            },
        ]),
        new webpack.optimize.CommonsChunkPlugin({
            name: [
                // layout is an entry file
                // anything including in layout, is not included in
                'layout',
                // dumps the manifest in a separate file
                'manifest',
            ],
            minChunks: Infinity
        }),
        new ExtractTextPlugin(
            useVersioning ? '[name].[contenthash:6].css' : '[name].css'
        ),
        new ManifestPlugin({
            writeToFileEmit: true,
            basePath: 'build/'
        }),
        // allows for [chunkhash]
        new WebpackChunkHash(),
        isProduction ? new webpack.HashedModuleIdsPlugin() : new webpack.NamedModulesPlugin(),
        new CleanWebpackPlugin('web/build/**/*.*')
    ],
    devtool: useSourcemaps ? 'inline-source-map' : false,
    devServer: {
        contentBase: './web',
        headers: { 'Access-Control-Allow-Origin': '*' }
    },
    // performance: {
    //     hints: 'warning'
    // }
};
if (isProduction) {
    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );

    webpackConfig.plugins.push(
        // passes there options to all loaders
        // but we should really pass these ourselves
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        })
    );

    webpackConfig.plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    );

}
module.exports = webpackConfig;