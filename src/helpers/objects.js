
/**
 * @param Object
 * @param String expression
 */
export function object_get(obj, expression, default_val = '') {
    let reference = obj;
    let keys = expression.split('.');

    // Traverse to the last 'level' if we can. As soon as we find a missing
    // property, we return the default value
    for ( let i = 0; i < keys.length - 1; ++i ) {
        let expression = keys[i];

        if ( typeof reference[expression] == "undefined" ) {
            return default_val;
        }

        reference = reference[expression];
    }

    return reference[keys[keys.length - 1]] || default_val;
}

/**
 *
 * @param obj
 * @param expression
 * @param value
 * @returns {*}
 */
export function object_set(obj, expression, value) {
    let reference = obj
    let keys = expression.split('.');

    if ( keys.length > 1 ) {
        if ( typeof reference[keys[0]] == 'undefined' ) {
            reference[keys[0]] = {};
        }
        reference[keys[0]] = object_set(reference[keys[0]], keys.splice(1).join('.'), value);
    } else {
        if ( Object.prototype.toString.call(reference[keys[0]]) === '[object Array]' ) {
            reference[keys[0]].push(value);
        } else {
            reference[keys[0]] = value;
        }
    }

    return reference;
}

/**
 *
 * @param obj
 * @param only
 * @return {{}}
 */
export function object_only(obj, only) {
    let o = {};

    for ( var i in only ) {
        o[only[i]] = typeof obj[only[i]] !== 'undefined' ? obj[only[i]] : null;
    }

    return o;
}

/**
 *
 * @param obj
 * @param val
 * @return {Number}
 */
export function looseIndexOf(obj, val) {
	for ( var i in obj ) {
		if ( obj[i] == val ) {
			return i;
		}
	}

	return -1;
}

export function groupBy(arr, groupBy) {
    let groups = {};
    for ( var i in arr ) {
        let group = object_get(arr[i], groupBy)
        if ( groups[group] ) {
            groups[group].push(arr[i])
        } else {
            groups[group] = [arr[i]];
        }
    }
    return groups;
}


export default {
	object_get,
    object_only,
	looseIndexOf,
    object_set,
    groupBy
}
