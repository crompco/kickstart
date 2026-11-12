export function domReady(cb) {
    if ( document.readyState !== 'loading' ) {
        cb();
        return;
    }

    document.addEventListener('DOMContentLoaded', () => cb(), { once: true });
}

export function addClass($el, className) {
    if ( $el ) {
        $el.classList.add(className);
    }
}

export function removeClass($el, className) {
    if ( $el ) {
        $el.classList.remove(className);
    }
}

export function hasClass($el, className) {
    return !!$el && $el.classList.contains(className);
}

export function toggleClass($el, className) {
    if ( $el ) {
        $el.classList.toggle(className);
    }
}

/**
 * The parent node, or the closest element (itself included) that matches the selector
 *
 * @param {Element} $el
 * @param {string|false} selector
 * @return {Element|null}
 */
export function parent($el, selector = false) {
    if ( !$el ) {
        return null;
    }

    if ( selector !== false ) {
        return $el.closest(selector);
    }

    return $el.parentNode;
}
