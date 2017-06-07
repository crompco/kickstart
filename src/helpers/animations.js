export const slideDown = (el, timing = '0.4s ease', cb = null) => {
    if ( typeof timing === 'function' ) {
        cb = timing;
        timing = '0.4s ease';
    }

    el.style.removeProperty('display');
    el.style.maxHeight = 'none';
    el.style.overflow = 'hidden';
    el.style.opacity = '0';
    // Add transition
    el.style.webkitTransition = 'max-height ' + timing + ' 0s';
    el.style.transition = 'max-height ' + timing + ' 0s';

    let height = el.offsetHeight;
    el.style.maxHeight = '0';

    let endingTransition = (e) => {
        if ( cb !== null ) {
            cb(e);
        }

        el.removeEventListener('transitionend', endingTransition, false);
        el.style.removeProperty('max-height');
    };

    requestAnimationFrame(function() {
        el.style.maxHeight = height + 'px';
        el.style.opacity = '1';

        el.addEventListener('transitionend', endingTransition, false);
    });
};

export const slideUp = (el, timing = '0.4s ease', cb = null) => {
    if ( typeof timing === 'function' ) {
        cb = timing;
        timing = '0.4s ease';
    }

    el.style.maxHeight = el.offsetHeight + 'px';
    // Add transition
    el.style.webkitTransition = 'max-height ' + timing + ' 0s';
    el.style.transition = 'max-height ' + timing + ' 0s';

    let endingTransition = (e) => {
        el.style.opacity = '0';
        el.style.display = 'none';

        if ( cb !== null ) {
            cb(e);
        }

        el.removeEventListener('transitionend', endingTransition, false);
    };

    requestAnimationFrame(function () {
        el.style.maxHeight = '0';

        el.addEventListener('transitionend', endingTransition, false);
    });
};