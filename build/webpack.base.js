const options = require('./options');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	resolve: {
		modules: [
			options.paths.root,
			options.paths.resolve('node_modules')
		],

		alias: {
			src: 'src',
			helpers: 'src/helpers',
			components: 'src/components',
			styles: 'src/styles',
			vue$: 'vue/dist/vue.common.js'
		},

		extensions: ['.js', '.json', '.vue', '.scss']
	},

	module: {
		rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        svg: 'svg-inline-loader',
                        scss: ExtractTextPlugin.extract({
                            use: ['css-loader', 'sass-loader'],
                            fallback: 'style-loader'
                        })
                    },
					postcss: [
						autoprefixer({
							browsers: ['last 3 versions', 'ie > 8', 'Firefox ESR']
						})
					]
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
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

	// Stats is used to customize Webpack's console output
	// https://webpack.js.org/configuration/stats/
	stats: {
		hash: false,
		colors: true,
		chunks: false,
		version: false,
		children: false,
		timings: true
	}
};
