const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const options = require('./options');
const base = require('./webpack.base.js');

const config = {
    entry: {
    	// Components
	    KsAutocomplete: ['./src/components/KsAutocomplete.vue'],
	    KsDatepicker: ['./src/components/KsDatepicker.vue'],
	    KsModal: ['./src/components/KsModal.vue'],
	    // Helpers
	    api: ['./src/helpers/api.js'],
	    strings: ['./src/helpers/strings.js'],
	    objects: ['./src/helpers/objects.js'],
	    dates: ['./src/helpers/dates.js'],
    },

    output: {
        path: options.paths.output.lib,
        filename: options.isProduction ? '[name].min.js' : '[name].js',
        library: ['KickstartUI', '[name]'],
        libraryTarget: 'umd'
    },

    resolve: base.resolve,

    module: {
        rules: base.module.rules
    },

    plugins: [
        new ExtractTextPlugin({
            filename: '[name]'
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

        // Set the production environment
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),

        // Minify with dead-code elimination
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],

    stats: base.stats
};

module.exports = config;
