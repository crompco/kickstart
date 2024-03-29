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
    return dateModify(date, 'day', -1 * days);
}

/**
*
* @param date
* @param months
*/
export function subMonths(date, months = 1) {
	return dateModify(date, 'month', -1 * months)
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
	return dateModify(date, 'day', days)
}

/**
 *
 * @param date
 * @param months
 */
export function addMonths(date, months = 1) {
	return dateModify(date, 'month', months)
}

/**
 * Formats date
 * replace Y, m, and d chars
 *
 * @param date
 * @return {string}
 */
export function formatDate(date, format = 'Y-m-d', parse_format = format, locale = defaultLocale) {
	if ( !(date instanceof Date) ) {
		date = parseDate(date, parse_format);
	}
	let year = date.getUTCFullYear();
	let month = date.getUTCMonth() + 1;
	let cal_day = date.getUTCDate();
	let day = date.getUTCDay()

    let day_abbrev = locale.days.abbreviations[day];
    let day_long = locale.days.names[day];

	month = pad_left(month, '0', 2);
	cal_day = pad_left(cal_day, '0', 2);

	return format
        .replace('Y', year)
        .replace('y', String(year).substring(2, 4))
        .replace(/m/i, month)
        .replace('d', cal_day)
        .replace('D', day_abbrev)
        .replace('l', day_long);
}

/**
 *
 * @param time
 * @param to_format
 * @return {string}
 */
export function formatTime(time, to_format = 'h:i a') {
    let time_info = parseTime(time);

    if ( !time_info ) {
    	return '';
    }

    return to_format.replace('H', String(time_info.full_hour).padStart(2, '0'))
        .replace('h', String(time_info.hour).padStart(2, '0'))
        .replace('i', String(time_info.minute).padStart(2, '0'))
        .replace('a', time_info.meridiem.toLowerCase())
        .replace('A', time_info.meridiem.toUpperCase());
}

/**
 *
 * @param date
 * @param format
 * @return {Date|*}
 */
export function parseDate(date, format = 'Y-m-d') {
	// Pad the format so we can easily replace the string
	format = format.replace('Y', 'YYYY')
		.replace('m', 'mm')
		.replace('d', 'dd');

	// Pull out the index of each format
	let y_index = format.indexOf('Y'),
		m_index = format.indexOf('m'),
		d_index = format.indexOf('d');


	// Slice the date up based on our indexes
	let year = parseInt(date.slice(y_index, y_index+4)),
		month = parseInt(date.slice(m_index, m_index+2)) -1,
		day = parseInt(date.slice(d_index, d_index+2));

	// Build the new date
	return new Date(year, month, day);
}

export function dateModify(d, increment, val) {
	d = cloneDate(d);
	val = parseInt(val);

	switch (increment) {
		case 'day':
			d = dateModify(d, 'hour', val * 24);
			break;
		case 'hour':
			d = dateModify(d, 'minute', val * 60);
			break;
		case 'week':
			d = dateModify(d, 'day', val * 7);
			break;
		case 'minute':
			d = dateModify(d, 'second', val * 60);
			break;
		case 'second':
			d = dateModify(d, 'millisecond', val * 1000);
			break;
		case 'month':
			let original_day = d.getUTCDate();
			val = val + d.getUTCMonth();
			if (val/12>0) {
				d = dateModify(d, 'year', val/12);
				val = val % 12;
			}
			// If the date is greater than 28 then we need to make sure the month supports that date
			if ( original_day > 28 ) {
				// First set the day to 1 to avoid the month setting failure
				d.setUTCDate(1);
				d.setUTCMonth(val);
				let last_day = (new Date(d.getUTCFullYear(), d.getUTCMonth()+1, 0)).getDate();
				d.setUTCDate(original_day > last_day ? last_day : original_day);
			} else {
				d.setUTCMonth(val);
			}
			break;
		case 'millisecond':
			d.setTime(d.getTime() + val);
			break;
		case 'year':
			d.setFullYear(d.getUTCFullYear() + val);
			break;
		default:
			console.error('Invalid date increment passed');
			break;
	}
	return d;
}

/**
 * Parses a time for hour, minutes, meridiem, 24hr_hour (full_hour)
 *
 * @param String time
 * @param mixed default_value a value to use when the time can not be parsed
 * @returns Boolean|{hour, minute, meridiem, full_hour}
 */
export function parseTime(time, default_value = false) {
    let time_parts = time.match(/([0-9]{1,2})\:([0-9]{1,2})\:*[0-9]*\s*(am|pm)/i);
    if ( !time_parts ) {
        time_parts = time.match(/([0-9]{1,2})\:([0-9]{1,2})/i);
        if ( !time_parts ) {
            console.error('Could not parse time');
            return default_value;
        }
    }

    // Setup the time parts
    let hour = parseInt(time_parts[1] || '00');
    let minute = parseInt(time_parts[2] || '00');
    let meridiem = (time_parts[3] || '').toLowerCase();
    let full_hour = parseInt(meridiem == 'pm' && hour != 12 ? hour + 12 : meridiem == 'am' && hour == 12 ? 0 : hour);

    // If we can't parse a meridiem value then we can only assume one and hope they don't expect that format
    meridiem = meridiem ? meridiem : (hour < 12 ? 'am' : 'pm')

    // Adjust plain hour for 12 hour format
    hour = hour > 12 ? hour - 12 : (hour == 0 ? 12 : hour);

    return {
        hour, minute, meridiem, full_hour
    };
}

export function diffInDays(date1, date2, format = 'Y-m-d') {
	date1 = date1 instanceof Date ? date1 : parseDate(date1, format);
	date2 = date2 instanceof Date ? date2 : parseDate(date2, format);

	// Use the Time difference to determine days diff
	let diffTime = date2.getTime() - date1.getTime();
	return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export default {
	defaultLocale,
	getDaysInMonth,
	cloneDate,
	subDays,
	subMonths,
	subYears,
	addDays,
	addMonths,
	formatDate,
    formatTime,
	parseDate,
	parseTime,
	diffInDays
}
