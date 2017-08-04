<template>
    <div class="ks-tabs">
        <ul class="tabs-title-bar" :class="classObj">
            <li v-for="tab in tabs" :class="{'selected-tab': tab.active}">
                <a :href="'#' + tab.title"
                   @click.prevent="setActiveTab(tab)"
                >
                    {{tab.title}}
                </a>
            </li>
        </ul>
        <div class="tabs-content">
            <slot></slot>
        </div>
    </div>
</template>


<script>

    import throttle from '../helpers/throttle';

    export default {
        name: 'KsTabs',

        props: {
            expand: {
                default: false
            },

            align: {
                type: String,
                default: 'center'
            },

            id: {
                type: String,
                default: null
            },

            rememberTab: {
                type: Boolean,
                default: true
            }
        },

        data() {
            return {
                tab: '',
                activeTab: null,
                tabs: [],
                sessionTab: null,
                classObj: {
                    "expand": this.expand,
                    "title-right": this.align === 'right',
                    "title-center": this.align === 'center',
                    "title-left": this.align === 'left'
                }
            };
        },

        computed: {
            hasTabCacheEnabled() {
                return this.rememberTab && this.id && sessionStorage ? true : false;
            }
        },

        mounted() {
            this.tabs = [];
            // If tab remembering is enabled then let's look for the active tab in the session
            if ( this.hasTabCacheEnabled ) {
                this.sessionTab = sessionStorage.getItem('ks-tabs.' + this.id);
            }
        },

        methods: {
            registerTab(tab) {
                this.tabs.push(tab);
                this.checkSetTab(tab);
            },

            checkSetTab(tab) {
                if ( this.sessionTab ) {
                    if ( tab.title == this.sessionTab ) {
                        return this.setActiveTab(tab);
                    }
                } else if ( !this.activeTab ) {
                    this.setActiveTab(tab);
                }
            },

            setActiveTab(tab) {
                this.activeTab = tab.title;
                tab.setActive(true);
                this.$emit('tab-changed', tab.title);
                if ( this.hasTabCacheEnabled ) {
                    sessionStorage.setItem('ks-tabs.' + this.id, tab.title);
                }
            }
        },

        watch: {},
    }
</script>
