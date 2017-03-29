let matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

/**
 *
 * @param str
 * @returns {*|string|void|XML}
 */
export function escapeRegExp(str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
}

/**
 *
 * @param str
 * @returns {string}
 */
export function ucwords(str) {
	return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
		return $1.toUpperCase();
	});
}

/**
 *
 * @param str
 * @returns {string}
 */
export function posesses(str) {
	let posesses_name = str;
	if ( str[str.length -1] == 's' ) {
		return posesses_name + "'";
	}

	return posesses_name + "'s";
}

/**
 *
 * @param str
 * @returns {string}
 */
export function currency(str) {
	return '$' + parseFloat(str).toFixed(2).replace(/./g, function(c, i, a) {
			return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
		});
}

/**
 * Pads a string
 * @param str
 * @param pad_with
 * @param pad_length
 * @return {string}
 */
export function pad_left(str, pad_with, pad_length) {
	return String(pad_with + String(str)).slice(pad_length*-1);
}


export default {
	escapeRegExp,
	ucwords,
	posesses,
	currency,
	pad_left,
}
