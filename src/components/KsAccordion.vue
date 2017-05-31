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

        props: {
            collapsible: {
                type: Boolean,
                default: true
            }
        },

        data() {
            return{
                activeAccordion: null,
                accordions: []
            }
        },

        methods: {
            registerAccordion(accordion) {
                this.accordions.push(accordion);
            },

            setActiveAccordion(accordion) {
                if ( this.collapsible == true ) {
                    for ( let acc of this.accordions ) {
                        if ( acc.$data.showContent === true && acc != accordion ) {
                            acc.setActive(false);
                        } else if ( acc == accordion ) {
                            accordion.setActive(!accordion.$data.showContent);
                        }
                    }
                } else {
                    accordion.setActive(!accordion.$data.showContent);
                }
            }
        }
    }
</script>