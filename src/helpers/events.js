/**
 * Add event listener
 *
 * @param el
 * @param eventName
 * @param callback
 */
export function addEvent(el, eventName, callback) {
	if ( el.addEventListener ) {
		el.addEventListener(eventName, callback, false);
		if ( eventName == 'mousewheel' ) {
			el.addEventListener("DOMMouseScroll", callback, false);
		}
	} else {
		el.attachEvent(eventName, callback)
	}
};

/**
 *
 *
 * @param e
 * @returns {Number}
 */
export function keyCode(e) {
	return e.keyCode ? e.keyCode : e.charCode;
}

/**
 * Stop the parent element from scrolling on the wheel scroll
 *
 * @param e
 * @param el
 */
export function stopParentScroll(el) {
	addEvent(el, 'mousewheel', (e) => {
		let offsetHeight = el.offsetHeight;
		let scrollHeight = el.scrollHeight;
		let scrollTop = el.scrollTop;

		if ( e.wheelDelta > 0 || e.deltaY < 0 ) {
			if ( scrollTop == 0 ) {
				e.preventDefault();
			}
		} else {
			if ( offsetHeight + scrollTop >= scrollHeight ) {
				e.preventDefault();
			}
		}

		e.stopPropagation();
	});
}

/**
 *
 * @param el
 * @param threshold
 * @returns {boolean}
 */
export function scrolledToBottom(el, callback, delay = 100, threshold = 20) {
	let timer;

	addEvent(el, 'scroll', (e) => {
        clearTimeout(timer);

        // Using a timeout will prevent this from firing too often
        timer = setTimeout(() => {
            if ( isScrolledToBottom(el, threshold) ) {
                callback();
            }
        }, delay);
	});
}

/**
 *
 * @param el
 * @param threshold
 * @returns {boolean}
 */
export function isScrolledToBottom(el, threshold = 20) {
    let scrollTop = el.scrollTop;
    let offsetHeight = el.offsetHeight;
    let scrollHeight = el.scrollHeight;

    // When scrolled to the bottom then we should run the next page
    if ( scrollTop + offsetHeight >= scrollHeight - threshold ) {
        return true;
    }

    return false;
}