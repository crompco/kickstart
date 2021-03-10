const options = require('./options');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
					postcss: [
						autoprefixer({
							browsers: ['last 3 versions', 'ie > 8', 'Firefox ESR']
						})
					]
                }
            },
            {
                test: /\.scss$/,
                use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				],
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
