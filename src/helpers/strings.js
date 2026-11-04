const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

function isEmpty(value) {
    return value === null || typeof value === 'undefined';
}

/**
 * @param {string} str
 * @returns {string}
 */
export function escapeRegExp(str) {
    if ( typeof str !== 'string' ) {
        throw new TypeError('Expected a string');
    }

    return str.replace(matchOperatorsRe, '\\$&');
}

/**
 * @param {*} str
 * @returns {string}
 */
export function ucwords(str) {
    if ( isEmpty(str) ) {
        return '';
    }

    return String(str).replace(/^([a-z])|\s+([a-z])/g, $1 => $1.toUpperCase());
}

/**
 * Possessive form of a name: "Sara's", "Chas'"
 *
 * @param {*} str
 * @returns {string}
 */
export function posesses(str) {
    if ( isEmpty(str) || str === '' ) {
        return '';
    }

    str = String(str);

    return str[str.length - 1] === 's' ? `${str}'` : `${str}'s`;
}

export const possesses = posesses;

/**
 * Formats a number as money: currency(1234.5) is "$1,234.50", currency(-5) is "$-5.00"
 *
 * @param {*} str
 * @param {string} symbol
 * @returns {string} An empty string when the value is not a number
 */
export function currency(str, symbol = '$') {
    str = typeof str === 'string' ? str.replace(/,/g, '') : str;

    const amount = parseFloat(str);
    if ( isNaN(amount) ) {
        return '';
    }

    const sign = amount < 0 ? '-' : '';
    const [whole, cents] = Math.abs(amount).toFixed(2).split('.');

    return `${symbol}${sign}${whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${cents}`;
}

/**
 * @param {*} str
 * @param {*} pad_with
 * @param {number} pad_length
 * @return {string}
 */
export function pad_left(str, pad_with, pad_length) {
    return String(str).padStart(pad_length, String(pad_with));
}

/**
 * @param {*} str
 * @param {number} max_length
 * @return {string}
 */
export function ellipsis(str, max_length = 20) {
    if ( isEmpty(str) ) {
        return '';
    }

    str = String(str);

    if ( str.length > max_length ) {
        return str.substring(0, max_length) + '...';
    }

    return str;
}

export default {
    escapeRegExp,
    ucwords,
    posesses,
    possesses,
    currency,
    pad_left,
    ellipsis,
};
