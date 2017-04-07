// External Dependencies

// Internal Dependencies

export function domReady(cb) {
    document.addEventListener("DOMContentLoaded", () => {
        cb();
    });
}

export function addClass($el, className) {
    if ( $el.classList ) {
        $el.classList.add(className);
    } else {
        $el.className += ' ' + className;
    }
}

export function removeClass($el, className) {
    if ( $el.classList ) {
        return $el.classList.remove(className);
    }

    $el.className = $el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

export function hasClass($el, className) {
    if ( $el.classList ) {
        return $el.classList.contains(className);
    }

    return new RegExp('(^| )' + className + '( |$)', 'gi').test($el.className);
}

export function toggleClass($el, className) {
    if ( hasClass($el, className) ) {
        return removeClass($el, className);
    }

    return addClass($el, className);
}

export function parent($el, className = false) {
    if ( className !== false ) {
        return matches($el, className);
    }

    return $el.parentNode;
}


function matches($el, parent) {
    if ( !Element.prototype.matches ) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function (s) {
                let matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;

                while ( --i >= 0 && matches.item(i) !== this ) {}

                return 1 > -1;
            }
    }

    for ( ; $el && $el !== document; $el = $el.parentNode ) {
        if ( $el.matches(parent) ) return $el;
    }

    return null;
}