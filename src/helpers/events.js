/**
 * Add event listener
 *
 * @param el
 * @param eventName
 * @param callback
 */
export function addEvent(el, eventName, callback, event_capturing = false) {
	if ( el.addEventListener ) {
		el.addEventListener(eventName, callback, event_capturing);
		if ( eventName == 'mousewheel' ) {
			el.addEventListener("DOMMouseScroll", callback, event_capturing);
		}
	} else {
		el.attachEvent(eventName, callback)
	}
};

/**
 *
 * @param el
 * @param callback
 * @param delay
 */
export function smartFocusToggle(el, callback, delay = 150) {
	let focused = [];

	addEvent(el, 'focus', (e) => {
		callback(true, e);
		focused.push(e.target);
	}, true);

	addEvent(el, 'blur', (e) => {
		let index = focused.indexOf(e.target);
		if ( index !== -1 ) {
			focused.splice(index, 1);
		}
		setTimeout(() => {
			if ( 0 == focused.length ) {
				if ( el !== document.activeElement ) {
					callback(false, e);
				}
			}
		}, delay);
	}, true);
}

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

/**
 * Custom event listener for when a mouse click is helf
 *
 * @param el
 * @param callback
 * @param delay
 * @param speed
 */
export function mouseHold(el, callback, delay = 300, speed = 300) {
	let held = false;
	let poll_timer = null;
	let delay_timer = null;
	let _speed = speed;

	// Incrementing poll
	function sendPoll() {
		poll_timer = setTimeout(() => {
			callback();

			_speed = _speed * 0.925;
			sendPoll();
		}, _speed);
	}

	// mousedown to start the event
	addEvent(el, 'mousedown', () => {
		delay_timer = setTimeout(() => {
			held = true;
			if ( held === true ) {
				sendPoll();
			}
		}, delay)
	});

	// mouseup to end the timers and reset the speed
	addEvent(el, 'mouseup', () => {
		clearTimeout(delay_timer);
		clearTimeout(poll_timer);
		held = false;
		_speed = speed;
	});
}
