function isEmpty(value) {
    return value === null || typeof value === 'undefined';
}

/**
 * Reads a value by a dot path ("customer.name"). Returns the default when the
 * path is missing or the value is null or undefined; falsy values such as 0,
 * false and '' are returned as they are.
 *
 * @param {object} obj
 * @param {string} expression
 * @param {*} default_val
 * @return {*}
 */
export function object_get(obj, expression, default_val = '') {
    let reference = obj;

    for ( const key of String(expression).split('.') ) {
        if ( isEmpty(reference) ) {
            return default_val;
        }

        reference = reference[key];
    }

    return isEmpty(reference) ? default_val : reference;
}

/**
 * Sets a value by a dot path, creating objects on the way. A value set on an
 * array is pushed onto it.
 *
 * @param {object} obj
 * @param {string} expression
 * @param {*} value
 * @returns {object}
 */
export function object_set(obj, expression, value) {
    const reference = obj;
    const keys = expression.split('.');

    if ( keys.length > 1 ) {
        if ( isEmpty(reference[keys[0]]) ) {
            reference[keys[0]] = {};
        }
        reference[keys[0]] = object_set(reference[keys[0]], keys.slice(1).join('.'), value);
    } else if ( Array.isArray(reference[keys[0]]) ) {
        reference[keys[0]].push(value);
    } else {
        reference[keys[0]] = value;
    }

    return reference;
}

/**
 * @param {object} obj
 * @param {string[]} only
 * @return {object}
 */
export function object_only(obj, only) {
    const o = {};

    for ( const key of only ) {
        o[key] = typeof obj[key] !== 'undefined' ? obj[key] : null;
    }

    return o;
}

/**
 * Index of the first value that loosely equals val (1 == '1')
 *
 * @param {Array|object} obj
 * @param {*} val
 * @return {number|string} The array index, or the object key; -1 when not found
 */
export function looseIndexOf(obj, val) {
    if ( Array.isArray(obj) ) {
        return obj.findIndex(item => item == val);
    }

    for ( const i in obj ) {
        if ( obj[i] == val ) {
            return i;
        }
    }

    return -1;
}

/**
 * @param {Array} arr
 * @param {string} groupBy Dot path of the group value
 * @return {object}
 */
export function groupBy(arr, groupBy) {
    const groups = {};

    for ( const item of arr ) {
        const group = object_get(item, groupBy);

        if ( groups[group] ) {
            groups[group].push(item);
        } else {
            groups[group] = [item];
        }
    }

    return groups;
}

export default {
    object_get,
    object_only,
    looseIndexOf,
    object_set,
    groupBy,
};
