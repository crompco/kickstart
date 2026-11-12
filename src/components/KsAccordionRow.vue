<template>
    <li class="row">
        <div class="ks-accordion-title-row">
            <a
                href="#"
                class="ks-accordion-title"
                @click.prevent="handleClick"
            >
                <slot name="title">{{ title }}</slot>
            </a>

            <div class="ks-accordion-buttons">
                <slot name="actions"></slot>
            </div>
        </div>

        <slide-transition>
            <div
                v-show="showContent"
                ref="content"
                class="ks-accordion-content"
            >
                <slot></slot>
            </div>
        </slide-transition>
    </li>
</template>

<script>
    import { SlideTransition } from './transitions/Transitions';

    export default {
        name: 'KsAccordionRow',

        inject: {
            ksAccordion: {
                default: null,
            },
        },

        props: {
            title: {}
        },

        emits: ['row-clicked'],

        data() {
            return {
                showContent: false,
            }
        },

        mounted() {
            if ( this.ksAccordion ) {
                this.ksAccordion.registerAccordion(this);
            }
        },

        beforeDestroy() {
            this.unregister();
        },

        beforeUnmount() {
            this.unregister();
        },

        methods: {
            handleClick(e) {
                this.$emit('row-clicked', e);

                if ( this.ksAccordion ) {
                    this.ksAccordion.setActiveAccordion(this);
                } else {
                    this.setActive(!this.showContent);
                }
            },

            setActive(bool) {
                this.showContent = bool;
            },

            unregister() {
                if ( this.ksAccordion ) {
                    this.ksAccordion.unregisterAccordion(this);
                }
            },
        },

        components: {
            SlideTransition,
        },
    }
</script>
