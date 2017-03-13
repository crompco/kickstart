'use strict';

const path = require('path');
const version = require('../package.json').version;

const banner =
	'/*!\n' +
	' * Kickstart v' + version + ' \n' +
	' * (c) ' + new Date().getFullYear() + ' Crompco LLC\n' +
	' */';

module.exports = {
	banner,

	isProduction: process.env.NODE_ENV === 'production',

	paths: {
		root: path.join(__dirname, '..'),

		src: {
			main: path.join(__dirname, '..', 'src'),
            docs: path.join(__dirname, '..', 'docs-src')
		},

		output: {
			main: path.join(__dirname, '..', 'dist'),
			docs: path.join(__dirname, '..', 'docs')
		},

		resolve(location) {
			return path.join(__dirname, '..', location);
		}
	}
};
