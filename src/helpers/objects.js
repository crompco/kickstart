
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
