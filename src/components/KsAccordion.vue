<template>
    <div>
        <ul class="ks-accordion">
            <slot></slot>
        </ul>
    </div>
</template>

<script>
    // External Dependencies

    // Internal Dependencies

    export default {
        name: 'KsAccordion',

        render(createElement) {
            return createElement(
                'div',
                createElement('ul', {
                    'attrs': {
                        'class': 'ks-accordion'
                    }
                }, this.$slots.default)
            )
        },

        mounted() {
            this.$nextTick(() => {
                console.log('SLOTS: ', this.$slots);
            });
        }
    }
</script>