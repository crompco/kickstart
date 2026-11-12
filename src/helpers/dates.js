import { pad_left } from './strings';

/**
 * Time zone values accepted by the date helpers: 'UTC', 'local' (the browser
 * time zone) or any IANA name such as 'America/New_York'.
 */
export const UTC = 'UTC';
export const LOCAL = 'local';

const DAY_MS = 864e5;

export const defaultLocale = {
    months: {
        names: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December',
        ],
        abbreviations: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ],
    },
    days: {
        names: [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
        ],
        abbreviations: [
            'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
        ],
    },
};

const zone_formatters = {};

function zoneFormatter(timezone) {
    if ( !zone_formatters[timezone] ) {
        zone_formatters[timezone] = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hourCycle: 'h23',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        });
    }

    return zone_formatters[timezone];
}

/**
 * Offset of the time zone from UTC at the given instant, in milliseconds
 */
function zoneOffset(time, timezone) {
    const parts = {};
    for ( const { type, value } of zoneFormatter(timezone).formatToParts(new Date(time)) ) {
        parts[type] = parseInt(value);
    }

    const wall_time = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
    const whole_seconds = time - (((time % 1000) + 1000) % 1000);

    return wall_time - whole_seconds;
}

/**
 * The calendar and clock values of a date as seen in the given time zone
 *
 * @param {Date} date
 * @param {string} timezone
 * @return {{year: number, month: number, day: number, weekday: number, hour: number, minute: number, second: number, millisecond: number}}
 */
export function dateParts(date, timezone = UTC) {
    if ( timezone === LOCAL ) {
        return {
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDate(),
            weekday: date.getDay(),
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
            millisecond: date.getMilliseconds(),
        };
    }

    const shifted = timezone === UTC ? date : new Date(date.getTime() + zoneOffset(date.getTime(), timezone));

    return {
        year: shifted.getUTCFullYear(),
        month: shifted.getUTCMonth(),
        day: shifted.getUTCDate(),
        weekday: shifted.getUTCDay(),
        hour: shifted.getUTCHours(),
        minute: shifted.getUTCMinutes(),
        second: shifted.getUTCSeconds(),
        millisecond: shifted.getUTCMilliseconds(),
    };
}

/**
 * Builds the date for a wall clock time in the given time zone. Values out of
 * range roll over (month 12 is January of the next year, day 0 is the last
 * day of the previous month).
 *
 * @param {{year: number, month?: number, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number}} parts
 * @param {string} timezone
 * @return {Date}
 */
export function makeDate(parts, timezone = UTC) {
    const { year, month = 0, day = 1, hour = 0, minute = 0, second = 0, millisecond = 0 } = parts;

    if ( timezone === LOCAL ) {
        const date = new Date(year, month, day, hour, minute, second, millisecond);
        date.setFullYear(year, month, day);

        return date;
    }

    const utc = new Date(Date.UTC(year, month, day, hour, minute, second, millisecond));
    utc.setUTCFullYear(year, month, day);

    if ( timezone === UTC ) {
        return utc;
    }

    // The offset can differ on each side of a DST change, so check it at the result
    const wall_time = utc.getTime();
    let time = wall_time - zoneOffset(wall_time, timezone);
    time = wall_time - zoneOffset(time, timezone);

    return new Date(time);
}

/**
 * Number of days in a month (month is 0 based)
 */
function daysInMonth(year, month) {
    return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

/**
 * @param {number} month The month number, 0 based
 * @param {number} year The full year, needed for leap years
 * @param {string} timezone Defaults to the browser time zone
 * @return {Date[]} The midnight of each day of the month
 */
export function getDaysInMonth(month, year, timezone = LOCAL) {
    const days = [];
    const count = daysInMonth(year, month);

    for ( let day = 1; day <= count; day++ ) {
        days.push(makeDate({ year, month, day }, timezone));
    }

    return days;
}

/**
 * @param {Date} date
 * @return {Date}
 */
export function cloneDate(date) {
    return new Date(date.getTime());
}

export function subDays(date, days = 1, timezone = UTC) {
    return dateModify(date, 'day', -1 * days, timezone);
}

export function subMonths(date, months = 1, timezone = UTC) {
    return dateModify(date, 'month', -1 * months, timezone);
}

export function subYears(date, years = 1, timezone = UTC) {
    return dateModify(date, 'year', -1 * years, timezone);
}

export function addDays(date, days = 1, timezone = UTC) {
    return dateModify(date, 'day', days, timezone);
}

export function addMonths(date, months = 1, timezone = UTC) {
    return dateModify(date, 'month', months, timezone);
}

export function addYears(date, years = 1, timezone = UTC) {
    return dateModify(date, 'year', years, timezone);
}

/**
 * Formats a date. Tokens: Y (2017), y (17), m or M (01), d (31), D (Tue), l (Tuesday).
 * A string date is parsed with parse_format in the same time zone.
 *
 * @param {Date|string} date
 * @param {string} format
 * @param {string} parse_format
 * @param {object} locale
 * @param {string} timezone
 * @return {string}
 */
export function formatDate(date, format = 'Y-m-d', parse_format = format, locale = defaultLocale, timezone = UTC) {
    if ( !(date instanceof Date) ) {
        date = parseDate(date, parse_format, timezone);
    }

    if ( isNaN(date.getTime()) ) {
        return '';
    }

    const { year, month, day, weekday } = dateParts(date, timezone);

    return format.replace(/[YymMdDl]/g, (token) => {
        switch ( token ) {
            case 'Y':
                return String(year);
            case 'y':
                return String(year).substring(2, 4);
            case 'm':
            case 'M':
                return pad_left(month + 1, '0', 2);
            case 'd':
                return pad_left(day, '0', 2);
            case 'D':
                return locale.days.abbreviations[weekday];
            case 'l':
                return locale.days.names[weekday];
        }
    });
}

/**
 * Formats a time string. Tokens: H (13), h (01), i (05), a (pm), A (PM).
 *
 * @param {string} time
 * @param {string} to_format
 * @return {string}
 */
export function formatTime(time, to_format = 'h:i a') {
    const time_info = parseTime(time);

    if ( !time_info ) {
        return '';
    }

    return to_format.replace(/[HhiaA]/g, (token) => {
        switch ( token ) {
            case 'H':
                return pad_left(time_info.full_hour, '0', 2);
            case 'h':
                return pad_left(time_info.hour, '0', 2);
            case 'i':
                return pad_left(time_info.minute, '0', 2);
            case 'a':
                return time_info.meridiem.toLowerCase();
            case 'A':
                return time_info.meridiem.toUpperCase();
        }
    });
}

/**
 * Parses a date string by the Y, m and d positions in the format
 *
 * @param {string|Date} date
 * @param {string} format
 * @param {string} timezone Defaults to the browser time zone
 * @return {Date} An invalid date when the string has no date
 */
export function parseDate(date, format = 'Y-m-d', timezone = LOCAL) {
    if ( date instanceof Date ) {
        return cloneDate(date);
    }

    if ( typeof date !== 'string' || !date ) {
        return new Date(NaN);
    }

    // Pad the format so each index lines up with the string
    format = format.replace('Y', 'YYYY')
        .replace('m', 'mm')
        .replace('d', 'dd');

    const y_index = format.indexOf('Y');
    const m_index = format.indexOf('m');
    const d_index = format.indexOf('d');

    const year = parseInt(date.slice(y_index, y_index + 4));
    const month = parseInt(date.slice(m_index, m_index + 2)) - 1;
    const day = parseInt(date.slice(d_index, d_index + 2));

    if ( isNaN(year) || isNaN(month) || isNaN(day) ) {
        return new Date(NaN);
    }

    return makeDate({ year, month, day }, timezone);
}

/**
 * Moves a date by an amount of the increment. Day, week, month and year
 * changes are calendar changes in the time zone, so they keep the clock time
 * across DST. Months and years keep the day, clamped to the end of the month.
 *
 * @param {Date} d
 * @param {string} increment millisecond, second, minute, hour, day, week, month or year
 * @param {number} val
 * @param {string} timezone
 * @return {Date}
 */
export function dateModify(d, increment, val, timezone = UTC) {
    val = parseInt(val);

    switch ( increment ) {
        case 'millisecond':
            return new Date(d.getTime() + val);
        case 'second':
            return new Date(d.getTime() + val * 1000);
        case 'minute':
            return new Date(d.getTime() + val * 60000);
        case 'hour':
            return new Date(d.getTime() + val * 3600000);
    }

    const parts = dateParts(d, timezone);

    switch ( increment ) {
        case 'day':
            parts.day += val;
            break;
        case 'week':
            parts.day += val * 7;
            break;
        case 'month':
        case 'year': {
            const months = parts.month + (increment === 'month' ? val : val * 12);
            parts.year += Math.floor(months / 12);
            parts.month = ((months % 12) + 12) % 12;
            parts.day = Math.min(parts.day, daysInMonth(parts.year, parts.month));
            break;
        }
        default:
            console.error('Invalid date increment passed');
            return cloneDate(d);
    }

    return makeDate(parts, timezone);
}

/**
 * Parses a time such as "1:30 pm", "13:30", "13:30:00", "1330", "930" or "2pm"
 *
 * @param {string} time
 * @param {*} default_value Returned when the time can not be parsed
 * @returns {*|{hour: number, minute: number, meridiem: string, full_hour: number}}
 */
export function parseTime(time, default_value = false) {
    if ( typeof time !== 'string' ) {
        return default_value;
    }

    const time_parts = time.match(/(\d{1,2}):(\d{1,2})(?::\d+)?\s*(am|pm)?/i)
        || time.match(/^\s*(\d{1,2})(\d{2})\s*(am|pm)?\s*$/i)
        || time.match(/^\s*(\d{1,2})()\s*(am|pm)\s*$/i);

    if ( !time_parts ) {
        return default_value;
    }

    let hour = parseInt(time_parts[1]);
    const minute = parseInt(time_parts[2] || '0');
    let meridiem = (time_parts[3] || '').toLowerCase();

    if ( minute > 59 || hour > 24 ) {
        return default_value;
    }

    // A 24 hour value with a meridiem ("13:30 pm", "00:15 am") keeps the 24 hour value
    if ( hour === 0 || hour > 12 ) {
        meridiem = '';
    }

    const full_hour = meridiem === 'pm' && hour !== 12 ? hour + 12 : (meridiem === 'am' && hour === 12 ? 0 : hour);

    // Without a meridiem the hour is a 24 hour value; 24:00 is the midnight at the end of the day
    meridiem = meridiem || (hour < 12 || hour === 24 ? 'am' : 'pm');

    hour = hour % 12 || 12;

    return {
        hour,
        minute,
        meridiem,
        full_hour,
    };
}

/**
 * Number of calendar days from date1 to date2 in the time zone
 *
 * @param {Date|string} date1
 * @param {Date|string} date2
 * @param {string} format Parse format for string dates
 * @param {string} timezone
 * @return {number}
 */
export function diffInDays(date1, date2, format = 'Y-m-d', timezone = UTC) {
    const day1 = dateParts(date1 instanceof Date ? date1 : parseDate(date1, format, timezone), timezone);
    const day2 = dateParts(date2 instanceof Date ? date2 : parseDate(date2, format, timezone), timezone);

    return Math.round((Date.UTC(day2.year, day2.month, day2.day) - Date.UTC(day1.year, day1.month, day1.day)) / DAY_MS);
}

export default {
    UTC,
    LOCAL,
    defaultLocale,
    dateParts,
    makeDate,
    dateModify,
    getDaysInMonth,
    cloneDate,
    subDays,
    subMonths,
    subYears,
    addDays,
    addMonths,
    addYears,
    formatDate,
    formatTime,
    parseDate,
    parseTime,
    diffInDays,
};
