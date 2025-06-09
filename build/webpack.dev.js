const options = require('./options');
const base = require('./webpack.base.js');
const {VueLoaderPlugin} = require('vue-loader');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ContentRoutePlugin = require('./ContentRoutePlugin');

const serve = require('./serve');

const config = {
    watch: true,
    devtool: 'eval-source-map',

    entry: {
        'docs.bundle.js': options.paths.resolve('docs-src/index.js'),
        'docs.bundle.css': options.paths.resolve('docs-src/assets/sass/docs.scss')
    },

    output: {
        filename: '[name]',
        path: options.paths.output.docs
    },

    resolve: base.resolve,

    devServer: {
        static: {
            directory: options.paths.output.docs
        },
        client: {
            overlay: false,
        },
        host: '127.0.0.1',
        port: 9000,
        historyApiFallback: true,
        devMiddleware: {
            stats: 'none'
        },
        setupMiddlewares: serve
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        svg: 'svg-inline-loader',
                        scss: 'vue-style-loader!css-loader!sass-loader',
                        js: 'babel-loader'
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.svg$/,
                loader: 'vue-svg-loader'
            }
        ]
    },

    plugins: [
        // Set the production environment
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('dev'),
            'process.env.BUILD': JSON.stringify('dev')
        }),

        new MiniCssExtractPlugin({
            filename: 'docs.styles.bundle.css'
        }),

        new VueLoaderPlugin(),

        new ContentRoutePlugin()
    ],

    stats: base.stats
};

module.exports = config;