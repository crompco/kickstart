const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const options = require('./options');
const base = require('./webpack.base.js');

const config = {
    mode: 'production',

    entry: {
        // Components
        KsAccordion: ['./src/components/KsAccordion.vue'],
        KsAccordionRow: ['./src/components/KsAccordionRow.vue'],
        KsActionMenu: ['./src/components/KsActionMenu.vue'],
        KsAutocomplete: ['./src/components/KsAutocomplete.vue'],
        KsButton: ['./src/components/KsButton.vue'],
        KsCalendar: ['./src/components/KsCalendar.vue'],
        KsCheckbox: ['./src/components/KsCheckbox.vue'],
        KsCheckboxGroup: ['./src/components/KsCheckboxGroup.vue'],
        KsDatepicker: ['./src/components/KsDatepicker.vue'],
        KsDraggable: ['./src/components/KsDraggable.vue'],
        KsDroppable: ['./src/components/KsDroppable.vue'],
        KsLoaderLine: ['./src/components/KsLoaderLine.vue'],
        KsLoaderSpin: ['./src/components/KsLoaderSpin.vue'],
        KsModal: ['./src/components/KsModal.vue'],
        KsPaginator: ['./src/components/KsPaginator.vue'],
        KsRadio: ['./src/components/KsRadio.vue'],
        KsRadioGroup: ['./src/components/KsRadioGroup.vue'],
        KsSelect: ['./src/components/KsSelect.vue'],
        KsSideNav: ['./src/components/KsSideNav.vue'],
        KsSimplePaginator: ['./src/components/KsSimplePaginator.vue'],
        KsStepThrough: ['./src/components/KsStepThrough.vue'],
        KsTab: ['./src/components/KsTab.vue'],
        KsTabs: ['./src/components/KsTabs.vue'],
        KsTimepicker: ['./src/components/KsTimepicker.vue'],
        KsToast: ['./src/components/KsToast.vue'],
        KsTooltip: ['./src/components/KsTooltip.vue'],
        KsTopNav: ['./src/components/KsTopNav.vue'],
        // Helpers
        api: ['./src/helpers/api.js'],
        strings: ['./src/helpers/strings.js'],
        objects: ['./src/helpers/objects.js'],
        dates: ['./src/helpers/dates.js'],
        events: ['./src/helpers/events.js'],
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
            filename: '[name]'
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

        // Set the production environment
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'process.env.BUILD': JSON.stringify('production')
        }),

        new VueLoaderPlugin(),
    ],

    stats: base.stats
};

module.exports = config;
