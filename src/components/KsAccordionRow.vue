<template>
    <li class="row">
        <a href="#" @click.prevent="handleClick">
            <slot name="title">{{title}}</slot>
        </a>

        <slide-transition>
            <div class="ks-accordion-content" ref="content" v-show="showContent">
                <slot></slot>
            </div>
        </slide-transition>
    </li>
</template>

<script>
    // External Dependencies

    // Internal Dependencies
    import {slideDown, slideUp} from '../helpers/animations';
    import './transitions/Transitions';

    export default {
        name: 'KsAccordionRow',

        props: {
            title: {}
        },

        data() {
            return {
                showContent: false
            }
        },

        methods: {
            handleClick(e) {
                this.showContent = !this.showContent;
            }
        }
    }
</script>