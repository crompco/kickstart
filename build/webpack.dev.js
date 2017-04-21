const options = require('./options');
const base = require('./webpack.base.js');
const serve = require('./serve');

const config = {
	watch: true,
	devtool: '#eval-source-map',

	entry: {
        'docs.bundle.js': options.paths.resolve('docs-src/index.js'),
        'docs.bundle.css': options.paths.resolve('docs-src/app.scss')
	},

	output: {
		filename: '[name]',
		path: options.paths.output.docs
	},

	resolve: base.resolve,

	devServer: {
		contentBase: options.paths.output.docs,
		host: '127.0.0.1',
		port: 9000,
		historyApiFallback: true,
		noInfo: true,
		setup: serve
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

	stats: base.stats
};

module.exports = config;
