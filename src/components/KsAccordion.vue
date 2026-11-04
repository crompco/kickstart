<template>
    <div>
        <ul class="ks-accordion">
            <slot></slot>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'KsAccordion',

        provide() {
            return {
                ksAccordion: this,
            };
        },

        props: {
            // When true only one row is open at a time
            collapsible: {
                type: Boolean,
                default: true
            }
        },

        data() {
            return {
                accordions: []
            }
        },

        methods: {
            registerAccordion(accordion) {
                if ( !this.accordions.includes(accordion) ) {
                    this.accordions.push(accordion);
                }
            },

            unregisterAccordion(accordion) {
                const index = this.accordions.indexOf(accordion);
                if ( index !== -1 ) {
                    this.accordions.splice(index, 1);
                }
            },

            setActiveAccordion(accordion) {
                const open = !accordion.showContent;

                if ( this.collapsible && open ) {
                    for ( const acc of this.accordions ) {
                        if ( acc !== accordion ) {
                            acc.setActive(false);
                        }
                    }
                }

                accordion.setActive(open);
            },

            collapseAll() {
                for ( const acc of this.accordions ) {
                    acc.setActive(false);
                }
            }
        }
    }
</script>
