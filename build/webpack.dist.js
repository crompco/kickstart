const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const options = require('./options');
const base = require('./webpack.base.js');

const config = {
    mode: 'production',

    entry: {
        'kickstart-ui.min.js': options.paths.resolve('src/index.js'),
    },

    output: {
        filename: '[name]',
        path: options.paths.output.main,
        library: 'KickstartUI',
        libraryTarget: 'umd'
    },

    module: {
        rules: base.module.rules
    },

    externals: {
        vue: 'vue',
        tether: 'tether'
    },

    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                    warnings: false,
                },
                extractComments: false,
            })
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'kickstart-ui.min.css'
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

        // Set the production environment
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.BUILD': JSON.stringify('production')
        }),

        new webpack.BannerPlugin({
            banner: options.banner,
            raw: true,
            entryOnly: true
        }),

        new VueLoaderPlugin(),
    ]
};

module.exports = config;