/**
 * Formats typed digits into a pattern where "#" is a digit and every other
 * character is a literal: applyMask('0131', '##/##/####') is "01/31".
 * A literal is only added once a digit follows it, so deleting works naturally.
 *
 * @param {string} value
 * @param {string} pattern
 * @return {string}
 */
export function applyMask(value, pattern) {
    const digits = String(value || '').replace(/\D/g, '');
    let masked = '';
    let next = 0;

    for ( const char of pattern ) {
        if ( next >= digits.length ) {
            break;
        }

        if ( char === '#' ) {
            masked += digits[next++];
        } else {
            masked += char;
        }
    }

    return masked;
}

/**
 * The digit pattern of a date format: 'm/d/Y' is '##/##/####'
 *
 * @param {string} format
 * @return {string}
 */
export function dateMask(format) {
    return format.replace(/[mdyY]/g, token => token === 'Y' ? '####' : '##');
}

export default {
    applyMask,
    dateMask,
};
