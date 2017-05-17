
/**
 * @param Object
 * @param String expression
 */
export function object_get(obj, expression, default_val = '') {
  if (!(obj && expression)) throw new Error('both obj and expression args are required')

  return expression.trim().split('.').reduce(function (prev, curr) {
    var arr = curr.match(/(.*?)\[(.*?)\]/)
    if (arr) {
      return prev && prev[arr[1]][arr[2]]
    } else {
      return prev && prev[curr]
    }
  }, obj) || default_val

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


export default {
	object_get,
    object_only,
	looseIndexOf
}
