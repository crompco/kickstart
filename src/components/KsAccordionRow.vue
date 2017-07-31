<template>
    <li class="row">
        <div class="ks-accordion-title-row">
            <a href="#" @click.prevent="handleClick" class="ks-accordion-title">
                <slot name="title">{{title}}</slot>
            </a>

            <div class="ks-accordion-buttons">
                <slot name="actions"></slot>
            </div>
        </div>

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

    export default {
        name: 'KsAccordionRow',

        props: {
            title: {}
        },

        data() {
            return {
                showContent: false,
                parent: false
            }
        },

        mounted() {
            this.$nextTick(() => {
                this.parent = this.getAccordionParent(this);

                this.parent.registerAccordion(this);
            });
        },

        methods: {
            handleClick(e) {
                this.$emit('row-clicked', e);

                this.parent.setActiveAccordion(this);
            },

            getAccordionParent(vm) {
                if ( vm.$parent.$options.name === 'KsAccordion' ) {
                    return vm.$parent;
                }

                return this.getAccordionParent(vm.$parent);
            },

            setActive(bool) {
                this.showContent = bool;
            }
        }
    }
</script>