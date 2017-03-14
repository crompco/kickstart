
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

export function keyCode(e) {
	return e.keyCode ? e.keyCode : e.charCode;
}
