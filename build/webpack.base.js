const options = require('./options');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');

module.exports = {
	resolve: {
		modules: [
			options.paths.root,
			options.paths.resolve('node_modules')
		],

		alias: {
			src: 'src',
			// directives: 'src/directives',
			helpers: 'src/helpers',
			components: 'src/components',
			// mixins: 'src/mixins',
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
						// configured in the script specific webpack configs
					},
					postcss: [
						autoprefixer({
							browsers: ['last 2 versions', 'ie > 9', 'Firefox ESR']
						})
					]
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
                // use: ExtractTextPlugin.extract({
				// 	fallback: 'style-loader',
				// 	use: [
				// 		'css-loader',
				// 		'sass-loader',
				// 		{
				// 			loader: 'postcss-loader',
				// 			options:  {
				// 				plugins: function () {
				// 					return [
                 //                        autoprefixer({
                 //                            browsers: ['last 2 versions', 'ie > 9', 'Firefox ESR']
                 //                        })
				// 					]
				// 				}
				// 			}
				// 		}
				// 	]
				// })
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
