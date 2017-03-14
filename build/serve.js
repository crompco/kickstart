
const countries = require('../docs/countries.json');



let matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
function escapeRegExp(str) {
	return str.replace(matchOperatorsRe, '\\$&');
}

module.exports = (app) => {

	app.get('/countries', function(req, res) {
		let name_regex = new RegExp('^.*' + escapeRegExp(req.query.q) + '.*', 'i');
		let limit = 10;
		let page = parseInt(typeof req.query.page != 'undefined' ? req.query.page : 1);
		let slice_start = (page - 1) * limit;

		let i = 0;
		res.json(
			countries.filter((o) => {
				return o.name.match(name_regex) ? true : false;
			}).slice(slice_start, slice_start + limit)
		);
	});
}
