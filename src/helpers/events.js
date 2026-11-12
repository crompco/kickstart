/**
 * @param {EventTarget} el
 * @param {string} eventName
 * @param {Function} callback
 * @param {boolean|object} event_capturing Capture flag or listener options
 */
export function addEvent(el, eventName, callback, event_capturing = false) {
    if ( !el ) {
        return;
    }

    el.addEventListener(eventName, callback, event_capturing);
    if ( eventName === 'mousewheel' ) {
        el.addEventListener('DOMMouseScroll', callback, event_capturing);
    }
}

/**
 * @param {EventTarget} el
 * @param {string} eventName
 * @param {Function} callback
 * @param {boolean|object} event_capturing Must match the value given to addEvent
 */
export function removeEvent(el, eventName, callback, event_capturing = false) {
    if ( !el ) {
        return;
    }

    el.removeEventListener(eventName, callback, event_capturing);
    if ( eventName === 'mousewheel' ) {
        el.removeEventListener('DOMMouseScroll', callback, event_capturing);
    }
}

/**
 * Calls back with true when focus enters the element (or a child) and with
 * false once focus has left all of them for the delay.
 *
 * @param {HTMLElement} el
 * @param {Function} callback (focused, event)
 * @param {number} delay
 * @return {{el: HTMLElement, focus: Function, blur: Function, cancel: Function}} Pass to removeSmartFocusToggle
 */
export function smartFocusToggle(el, callback, delay = 150) {
    const focused = [];
    const timers = new Set();

    const smart_focus_toggle = {
        el,
        focus: (e) => {
            callback(true, e);
            focused.push(e.target);
        },
        blur: (e) => {
            const index = focused.indexOf(e.target);
            if ( index !== -1 ) {
                focused.splice(index, 1);
            }

            const timer = setTimeout(() => {
                timers.delete(timer);
                if ( focused.length === 0 && el !== document.activeElement ) {
                    callback(false, e);
                }
            }, delay);
            timers.add(timer);
        },
        cancel: () => {
            timers.forEach(timer => clearTimeout(timer));
            timers.clear();
        },
    };

    addEvent(el, 'focus', smart_focus_toggle.focus, true);
    addEvent(el, 'blur', smart_focus_toggle.blur, true);

    return smart_focus_toggle;
}

/**
 * Removes the listeners of a smartFocusToggle and cancels its pending callback
 *
 * @param {{el: HTMLElement, focus: Function, blur: Function, cancel?: Function}} o
 */
export function removeSmartFocusToggle(o) {
    if ( o && o.focus && o.blur && o.el ) {
        removeEvent(o.el, 'focus', o.focus, true);
        removeEvent(o.el, 'blur', o.blur, true);

        if ( o.cancel ) {
            o.cancel();
        }
    }
}

/**
 * @param {KeyboardEvent} e
 * @returns {number}
 */
export function keyCode(e) {
    return e.keyCode ? e.keyCode : e.charCode;
}

/**
 * Stops the wheel from scrolling the parent once the element hits its top or bottom
 *
 * @param {HTMLElement} el
 * @return {Function} Removes the listener
 */
export function stopParentScroll(el) {
    const listener = (e) => {
        const offsetHeight = el.offsetHeight;
        const scrollHeight = el.scrollHeight;
        const scrollTop = el.scrollTop;

        if ( e.wheelDelta > 0 || e.deltaY < 0 ) {
            if ( scrollTop === 0 ) {
                e.preventDefault();
            }
        } else if ( offsetHeight + scrollTop >= scrollHeight ) {
            e.preventDefault();
        }

        e.stopPropagation();
    };

    addEvent(el, 'wheel', listener, { passive: false });

    return () => removeEvent(el, 'wheel', listener, { passive: false });
}

/**
 * Calls back when the element is scrolled to the bottom
 *
 * @param {HTMLElement} el
 * @param {Function} callback
 * @param {number} delay
 * @param {number} threshold
 * @return {Function} Removes the listener
 */
export function scrolledToBottom(el, callback, delay = 100, threshold = 20) {
    let timer;

    const listener = () => {
        clearTimeout(timer);

        // A timeout keeps this from firing for every scroll event
        timer = setTimeout(() => {
            if ( isScrolledToBottom(el, threshold) ) {
                callback();
            }
        }, delay);
    };

    addEvent(el, 'scroll', listener);

    return () => {
        clearTimeout(timer);
        removeEvent(el, 'scroll', listener);
    };
}

/**
 * @param {HTMLElement} el
 * @param {number} threshold
 * @returns {boolean}
 */
export function isScrolledToBottom(el, threshold = 20) {
    const scrollTop = el.scrollTop;

    // Empty containers can fire a scroll at the top
    if ( scrollTop === 0 ) {
        return false;
    }

    return scrollTop + el.offsetHeight >= el.scrollHeight - threshold;
}

/**
 * Calls back repeatedly, faster over time, while the mouse is held down on the element
 *
 * @param {HTMLElement} el
 * @param {Function} callback
 * @param {number} delay Wait before the first repeat
 * @param {number} speed Starting interval
 * @return {Function} Removes the listeners
 */
export function mouseHold(el, callback, delay = 300, speed = 300) {
    let poll_timer = null;
    let delay_timer = null;
    let current_speed = speed;
    // Lower is faster
    const max_speed = 80;

    function sendPoll() {
        poll_timer = setTimeout(() => {
            callback();

            current_speed = Math.max(current_speed * 0.925, max_speed);
            sendPoll();
        }, current_speed);
    }

    const clearMouseHold = () => {
        clearTimeout(delay_timer);
        clearTimeout(poll_timer);
        current_speed = speed;
    };

    const startMouseHold = () => {
        clearMouseHold();
        delay_timer = setTimeout(sendPoll, delay);
    };

    addEvent(el, 'mousedown', startMouseHold);
    addEvent(el, 'mouseup', clearMouseHold);
    addEvent(el, 'mouseleave', clearMouseHold);
    addEvent(el, 'dragend', clearMouseHold);

    return () => {
        clearMouseHold();
        removeEvent(el, 'mousedown', startMouseHold);
        removeEvent(el, 'mouseup', clearMouseHold);
        removeEvent(el, 'mouseleave', clearMouseHold);
        removeEvent(el, 'dragend', clearMouseHold);
    };
}

export default {
    addEvent,
    removeEvent,
    smartFocusToggle,
    removeSmartFocusToggle,
    keyCode,
    stopParentScroll,
    scrolledToBottom,
    isScrolledToBottom,
    mouseHold,
};
