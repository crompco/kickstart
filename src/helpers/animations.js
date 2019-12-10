export const slideDown = (el, timing = '0.4s ease', cb = null) => {
    if ( typeof timing === 'function' ) {
        cb = timing;
        timing = '0.4s ease';
    }

    el.style.display = '';
    el.style.maxHeight = 'none';
    el.style.overflow = 'hidden';
    el.style.opacity = '0';
    // Add transition
    el.style.webkitTransition = 'all ' + timing + ' 0s';
    el.style.transition = 'all ' + timing + ' 0s';

    let height = el.offsetHeight;
    el.style.maxHeight = '0';

    let endingTransition = (e) => {
        if ( cb !== null ) {
            cb(e);
        }

        el.removeEventListener('transitionend', endingTransition, false);
        el.removeEventListener('transitioncancel', cancelTransition, false);
        el.style.removeProperty('max-height');
        el.style.removeProperty('overflow');
    };

    let cancelTransition = (e) => {
        el.removeEventListener('transitionend', endingTransition, false);
        el.removeEventListener('transitioncancel', cancelTransition, false);
    };

    requestAnimationFrame(function() {
        el.style.maxHeight = height + 'px';
        el.style.opacity = '1';

        el.addEventListener('transitionend', endingTransition, false);
        el.addEventListener('transitioncancel', cancelTransition, false);
    });
};

export const slideUp = (el, timing = '0.4s ease', cb = null) => {
    if ( typeof timing === 'function' ) {
        cb = timing;
        timing = '0.4s ease';
    }

    el.style.maxHeight = el.offsetHeight + 'px';
    // Add transition
    el.style.webkitTransition = 'all ' + timing + ' 0s';
    el.style.transition = 'all ' + timing + ' 0s';
    el.style.overflow = 'hidden';

    let endingTransition = (e) => {
        el.style.opacity = '0';
        el.style.display = 'none';
        el.style.removeProperty('padding-top');
        el.style.removeProperty('padding-bottom');

        if ( cb !== null ) {
            cb(e);
        }

        el.removeEventListener('transitionend', endingTransition, false);
        el.removeEventListener('transitioncancel', cancelTransition, false);
    };

    let cancelTransition = (e) => {
        el.removeEventListener('transitionend', endingTransition, false);
        el.removeEventListener('transitioncancel', cancelTransition, false);
    };

    requestAnimationFrame(function () {
        el.style.maxHeight = '0';
        el.style.paddingTop = '0';
        el.style.paddingBottom = '0';

        el.addEventListener('transitionend', endingTransition, false);
        el.addEventListener('transitioncancel', cancelTransition, false);
    });
};