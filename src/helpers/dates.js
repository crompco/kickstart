import {pad_left} from './strings';

export const defaultLocale = {
	months: {
		names: [
			"January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		],
		abbreviations: [
			'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
			'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
		]
	},
	days: {
		names: [
			"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
		],
		abbreviations: [
			"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
		]
	}
};

export function getMonthRange(date) {
	let year = date.getFulllYear();
	let month = date.getMonth();
	return {
		first: new Date(y, m, 1),
		last: new Date(y, m + 1, 0)
	}
}

/**
 * @param {int} The month number, 0 based
 * @param {int} The year, not zero based, required to account for leap years
 * @return {Date[]} List with date objects for each day of the month
 */
export function getDaysInMonth(month, year) {
	var date = new Date(year, month, 1);
	var days = [];
	while (date.getMonth() === month) {
		days.push(new Date(date));
		date.setDate(date.getDate() + 1);
	}
	return days;
}

/**
 *
 * @param date
 * @return {Date}
 */
export function cloneDate(date) {
	return new Date(date.getTime())
}

/**
 *
 * @param date
 * @param days
 */
export function subDays(date, days = 1) {
	let d = cloneDate(date);
	d.setDate(date.getDate() - days);
	if ( d.getDate() > date.getDate() ) {
		d.setMonth(date.getMonth() - 1);
		if ( d.getMonth() > date.getMonth() ) {
			d.setFullYear(date.getFullYear() - 1);
		}
	}
	return d;
}

/**
*
* @param date
* @param months
*/
export function subMonths(date, months = 1) {
	let d = cloneDate(date);
	d.setMonth(date.getMonth() - months);
	if ( d.getMonth() > date.getMonth() ) {
		d.setFullYear(date.getFullYear() - 1);
	}
	return d;
}

/**
 *
 * @param date
 * @param years
 */
export function subYears(date, years = 1) {
	let d = cloneDate(date);
	d.setFullYear(date.getFullYear() - years);
	return d;
}

/**
 *
 * @param date
 * @param days
 */
export function addDays(date, days = 1) {
	let d = cloneDate(date);
	d.setDate(date.getDate() + days);
	if ( d.getDate() < date.getDate() ) {
		d.setMonth(date.getMonth() + 1);
		if ( d.getMonth() < date.getMonth() ) {
			d.setFullYear(date.getFullYear() + 1);
		}
	}
	return d;
}

/**
 * Formats date
 * replace Y, m, and d chars
 *
 * @param date
 * @return {string}
 */
export function formatDate(date, format = 'Y-m-d') {
	if ( !(date instanceof Date) ) {
		date = parseDate(date, format);
	}
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getUTCDate();

	month = pad_left(month, '0', 2);
	day = pad_left(day, '0', 2);

	return format.toLowerCase().replace('y', year).replace('m', month).replace('d', day);
}

/**
 *
 * @param date
 * @param format
 * @return {Date|*}
 */
export function parseDate(date, format = 'Y-m-d') {
	// TODO handle different formats
	let d = date.split('-');
	date = (new Date());
	date.setFullYear(d[0]);
	date.setMonth(d[1]-1);
	date.setDate(d[2]);

	return date;
}

export default {
	defaultLocale
}
