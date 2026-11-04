<template>
    <transition
        name="slide-transition"
        mode="in-out"
        :css="false"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @enter-cancelled="afterEnter"
        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
        @leave-cancelled="afterLeave"
    >
        <slot></slot>
    </transition>
</template>

<script>
    const DURATION = 400;
    const EASING = 'ease-in-out';

    function animate(el, keyframes, done) {
        if ( typeof el.animate !== 'function' ) {
            done();
            return;
        }

        const animation = el.animate(keyframes, { duration: DURATION, easing: EASING });
        animation.onfinish = () => done();
        animation.oncancel = () => done();
    }

    export default {
        name: 'SlideTransition',

        methods: {
            beforeEnter(el) {
                el.style.display = '';
                el.style.overflow = 'hidden';
            },

            enter(el, done) {
                const height = el.offsetHeight;

                animate(el, [
                    { opacity: 0, maxHeight: '0px' },
                    { opacity: 1, maxHeight: `${height}px` },
                ], done);
            },

            afterEnter(el) {
                el.style.removeProperty('overflow');
            },

            beforeLeave(el) {
                el.style.overflow = 'hidden';
            },

            leave(el, done) {
                const style = window.getComputedStyle(el);

                animate(el, [
                    { opacity: 1, maxHeight: `${el.offsetHeight}px`, paddingTop: style.paddingTop, paddingBottom: style.paddingBottom },
                    { opacity: 0, maxHeight: '0px', paddingTop: '0px', paddingBottom: '0px' },
                ], done);
            },

            afterLeave(el) {
                el.style.removeProperty('overflow');
            },
        },
    };
</script>
